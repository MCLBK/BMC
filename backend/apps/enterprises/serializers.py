from rest_framework import serializers
from .models import ServiceRequest, QuoteRequest


class ServiceRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceRequest
        fields = ["id", "request_type", "company_name", "contact_name",
                  "contact_email", "contact_phone", "position",
                  "subject", "message", "budget_range", "timeline",
                  "team_size", "created_at"]
        read_only_fields = ["id", "created_at"]


class QuoteRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuoteRequest
        fields = ["id", "service", "company_name", "contact_name",
                  "contact_email", "contact_phone", "sector",
                  "description", "specifications", "created_at"]
        read_only_fields = ["id", "created_at"]
