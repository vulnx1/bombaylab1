from django.urls import path
from .views import SubmissionCreateView, SendEmailView

urlpatterns = [
    path('submissions/', SubmissionCreateView.as_view(), name='submission-create'),
    path('send-email/', SendEmailView.as_view(), name='send-email'),
]
