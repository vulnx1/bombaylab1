from django.contrib import admin
from django.utils.html import format_html
from .models import SampleSubmission

@admin.register(SampleSubmission)
class SampleSubmissionAdmin(admin.ModelAdmin):
    list_display = (
        'full_name', 'email', 'mobile', 'organization', 'department', 'created_at', 'pdf_link'
    )
    search_fields = ('full_name', 'email', 'mobile', 'organization', 'department')
    list_filter = ('department', 'created_at')

    def pdf_link(self, obj: SampleSubmission):
        if obj.pdf:
            return format_html('<a href="{}" target="_blank">Download PDF</a>', obj.pdf.url)
        return '-'
    pdf_link.short_description = 'PDF'
