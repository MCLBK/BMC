from rest_framework import serializers
from .models import DiagnosticQuestion, DiagnosticSession


class DiagnosticQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiagnosticQuestion
        fields = ["id", "text", "question_type", "category",
                  "help_text", "options", "order"]


class DiagnosticSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiagnosticSession
        fields = ["id", "company_name", "contact_name", "contact_email",
                  "contact_phone", "answers", "score", "results_summary",
                  "sent_to_cabinet", "created_at"]
        read_only_fields = ["id", "score", "results_summary", "created_at"]
