from rest_framework import generics, permissions, parsers
from .models import SampleSubmission
from .serializers import SampleSubmissionSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import EmailMessage, send_mail
from django.conf import settings

class SubmissionCreateView(generics.CreateAPIView):
    queryset = SampleSubmission.objects.all()
    serializer_class = SampleSubmissionSerializer
    permission_classes = [permissions.AllowAny]
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]

class SendEmailView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        to_email = request.data.get("to")
        subject = request.data.get("subject")
        body = request.data.get("message")
        from_email = request.data.get("from_email") or settings.DEFAULT_FROM_EMAIL
        use_emailmessage = bool(request.data.get("useEmailMessage", False))
        if not to_email or not subject or not body:
            return Response({"detail": "Missing to/subject/message"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            if use_emailmessage:
                msg = EmailMessage(subject=subject, body=body, from_email=from_email, to=[to_email])
                msg.send(fail_silently=False)
            else:
                send_mail(subject, body, from_email, [to_email], fail_silently=False)
            return Response({"ok": True})
        except Exception as e:
            return Response({"ok": False, "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
