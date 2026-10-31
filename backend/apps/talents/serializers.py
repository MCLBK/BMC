import os

from django.conf import settings
from rest_framework import serializers

from .models import TalentProfile, Opportunity, Application


class TalentProfileSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source="user.get_full_name", read_only=True)
    user_email = serializers.EmailField(source="user.email", read_only=True)

    class Meta:
        model = TalentProfile
        fields = ["id", "user", "user_name", "user_email", "headline", "bio",
                  "phone", "city", "country", "education", "experience",
                  "skills", "sectors", "languages", "availability",
                  "geographic_zone", "years_experience", "cv", "photo",
                  "is_profile_complete", "created_at", "updated_at"]
        read_only_fields = ["id", "user", "is_profile_complete", "created_at", "updated_at"]

    def validate_cv(self, value):
        if value:
            ext = os.path.splitext(value.name)[1].lower()
            allowed = getattr(settings, "ALLOWED_UPLOAD_EXTENSIONS", [".pdf"])
            if ext not in allowed:
                raise serializers.ValidationError("Seuls les fichiers PDF sont acceptes.")
            max_size = getattr(settings, "MAX_UPLOAD_SIZE", 5 * 1024 * 1024)
            if value.size > max_size:
                raise serializers.ValidationError("Le fichier ne doit pas depasser 5 Mo.")
        return value


class OpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Opportunity
        fields = ["id", "title", "opportunity_type", "description",
                  "requirements", "location", "duration", "is_active", "created_at"]


class ApplicationSerializer(serializers.ModelSerializer):
    opportunity_title = serializers.CharField(source="opportunity.title", read_only=True)

    class Meta:
        model = Application
        fields = ["id", "talent", "opportunity", "opportunity_title",
                  "cover_letter", "status", "created_at"]
        read_only_fields = ["id", "talent", "status", "created_at"]
