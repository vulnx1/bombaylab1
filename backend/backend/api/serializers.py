from io import BytesIO
from django.core.files.base import ContentFile
from rest_framework import serializers
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import cm
from reportlab.lib.utils import ImageReader
from PIL import Image
from PyPDF2 import PdfReader, PdfWriter, PdfMerger
from .models import SampleSubmission
import os
from django.core.mail import EmailMessage
from django.conf import settings


class SampleSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SampleSubmission
        fields = [
            'id',
            'full_name',
            'email',
            'mobile',
            'organization',
            'department',
            'requirements',
            'file',
            'pdf',
            'created_at',
        ]
        read_only_fields = ['id', 'pdf', 'created_at']

    def validate_file(self, value):
        """Ensure valid size and type."""
        if not value:
            return value
        if value.size > 10 * 1024 * 1024:
            raise serializers.ValidationError("File size must be less than 10MB.")
        allowed_exts = ('.pdf', '.png', '.jpg', '.jpeg', '.webp')
        if not value.name.lower().endswith(allowed_exts):
            raise serializers.ValidationError("Only PDF or image files are allowed.")
        return value

    def create(self, validated_data):
        instance = super().create(validated_data)
        self._generate_pdf(instance)

        try:
            to_addr = "laalubada@gmail.com"
            from_email = getattr(settings, "DEFAULT_FROM_EMAIL", None) or getattr(settings, "EMAIL_HOST_USER", "")
            body = (
                f"New Sample Submission\n"
                f"Name: {instance.full_name}\n"
                f"Email: {instance.email}\n"
                f"Mobile: {instance.mobile}\n"
                f"Organization: {instance.organization}\n"
                f"Department: {instance.department}\n\n"
                f"Requirements:\n{instance.requirements or ''}\n"
                f"Attachment:\n{instance.file}\n"
            )
            msg = EmailMessage(
                subject="New Sample Submission",
                body=body,
                from_email=from_email,
                to=[to_addr],
            )
            msg.send(fail_silently=True)
        except Exception:
            pass

        return instance

    def _generate_pdf(self, instance: SampleSubmission):
        width, height = A4
        receipt_buf = BytesIO()
        p = canvas.Canvas(receipt_buf, pagesize=A4)

        # ===== HEADER =====
        y = height - 2 * cm
        p.setFont("Helvetica-Bold", 16)
        p.drawString(2 * cm, y, "Sample Submission Receipt")
        y -= 1.2 * cm

        # ===== USER DETAILS =====
        p.setFont("Helvetica", 11)
        details = [
            f"Full Name: {instance.full_name}",
            f"Email: {instance.email}",
            f"Mobile: {instance.mobile}",
            f"Organization: {instance.organization}",
            f"Department: {instance.department}",
            "",
            "Requirements:",
        ]
        for line in details:
            p.drawString(2 * cm, y, line)
            y -= 0.8 * cm

        # Requirements text wrapping
        req_lines = (instance.requirements or "").splitlines()
        for line in req_lines:
            while line:
                p.drawString(2 * cm, y, line[:95])
                line = line[95:]
                y -= 0.6 * cm
            if y < 2 * cm:
                p.showPage()
                y = height - 2 * cm
                p.setFont("Helvetica", 11)

        # Attachment name
        if instance.file:
            attach_name = os.path.basename(instance.file.name)
            if y < 2.8 * cm:
                p.showPage()
                y = height - 2 * cm
                p.setFont("Helvetica", 11)
            p.drawString(2 * cm, y, f"Attachment: {attach_name}")

        p.save()
        receipt_buf.seek(0)

        # ===== MERGE FILES (robust) =====
        final_buf = BytesIO()
        merger = PdfMerger()

        # Add the generated receipt as the first document
        try:
            receipt_pdf_bytes = receipt_buf.getvalue()
            merger.append(BytesIO(receipt_pdf_bytes))
            print("ℹ️ Added receipt page(s) to PDF")
        except Exception as e:
            print("⚠️ Failed to add receipt to PDF:", e)

        # Append uploaded file if present
        if instance.file:
            file_name = instance.file.name.lower()
            print("ℹ️ Attachment detected:", file_name)

            # --- PDF Upload ---
            if file_name.endswith('.pdf'):
                try:
                    instance.file.open('rb')
                    f = instance.file.file
                    f.seek(0)
                    merger.append(f)
                    print("ℹ️ Appended uploaded PDF")
                except Exception as e:
                    print("⚠️ PDF merge failed:", e)
                finally:
                    try:
                        instance.file.close()
                    except Exception:
                        pass

            # --- Image Upload ---
            elif file_name.endswith(('.png', '.jpg', '.jpeg', '.webp')):
                try:
                    instance.file.open('rb')
                    img = Image.open(instance.file)
                    if img.mode in ("RGBA", "P"):
                        img = img.convert("RGB")

                    # Create one A4 page containing the image
                    img_pdf_buf = BytesIO()
                    p2 = canvas.Canvas(img_pdf_buf, pagesize=A4)
                    iw, ih = img.size
                    margin = 1.5 * cm
                    max_w, max_h = width - 2 * margin, height - 2 * margin
                    scale = min(max_w / iw, max_h / ih)
                    dw, dh = iw * scale, ih * scale
                    x, y = (width - dw) / 2, (height - dh) / 2

                    # Draw using ImageReader for consistent sizing
                    img_buf = BytesIO()
                    img.save(img_buf, format='PNG')
                    img_buf.seek(0)
                    p2.drawImage(ImageReader(img_buf), x, y, width=dw, height=dh)
                    p2.save()
                    img_pdf_buf.seek(0)
                    merger.append(BytesIO(img_pdf_buf.getvalue()))
                    print("ℹ️ Appended uploaded image as PDF page")
                    img_buf.close()
                    img_pdf_buf.close()
                except Exception as e:
                    print("⚠️ Image merge failed:", e)
                finally:
                    try:
                        instance.file.close()
                    except Exception:
                        pass

        # ===== SAVE FINAL PDF =====
        try:
            merger.write(final_buf)
            final_buf.seek(0)
        finally:
            merger.close()

        pdf_name = f"submission_{instance.pk}.pdf"
        instance.pdf.save(pdf_name, ContentFile(final_buf.read()), save=True)

        # Cleanup
        receipt_buf.close()
        final_buf.close()
