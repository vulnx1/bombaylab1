from django.db import models


def upload_submission_file(instance: 'SampleSubmission', filename: str) -> str:
    return f"submissions/uploads/{filename}"


def upload_submission_pdf(instance: 'SampleSubmission', filename: str) -> str:
    return f"submissions/pdfs/{filename}"


class SampleSubmission(models.Model):
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    mobile = models.CharField(max_length=20)
    organization = models.CharField(max_length=255)
    department = models.CharField(max_length=100)
    requirements = models.TextField()
    file = models.FileField(upload_to=upload_submission_file, blank=True, null=True)
    pdf = models.FileField(upload_to=upload_submission_pdf, blank=True, null=True, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self) -> str:  # type: ignore[override]
        return f"Submission by {self.full_name} ({self.email})"

# Create your models here.
