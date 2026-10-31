from rest_framework import generics, permissions
from .models import DiagnosticQuestion, DiagnosticSession
from .serializers import DiagnosticQuestionSerializer, DiagnosticSessionSerializer


class DiagnosticQuestionListView(generics.ListAPIView):
    queryset = DiagnosticQuestion.objects.filter(is_active=True)
    serializer_class = DiagnosticQuestionSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None


class DiagnosticSessionCreateView(generics.CreateAPIView):
    queryset = DiagnosticSession.objects.all()
    serializer_class = DiagnosticSessionSerializer
    permission_classes = [permissions.AllowAny]
    throttle_scope = "contact"
