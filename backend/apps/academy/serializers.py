from rest_framework import serializers
from .models import Training, Enrollment


class TrainingListSerializer(serializers.ModelSerializer):
    available_spots = serializers.IntegerField(read_only=True)

    class Meta:
        model = Training
        fields = ["id", "title", "slug", "short_description", "image",
                  "duration", "format", "level", "start_date", "end_date",
                  "is_featured", "available_spots"]


class TrainingDetailSerializer(serializers.ModelSerializer):
    available_spots = serializers.IntegerField(read_only=True)

    class Meta:
        model = Training
        fields = ["id", "title", "slug", "short_description", "description",
                  "objectives", "target_audience", "program", "prerequisites",
                  "duration", "format", "level", "start_date", "end_date",
                  "max_participants", "image", "is_featured", "available_spots"]


class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = ["id", "training", "full_name", "email", "phone",
                  "company", "position", "motivation", "created_at"]
        read_only_fields = ["id", "created_at"]
