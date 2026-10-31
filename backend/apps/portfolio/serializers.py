from rest_framework import serializers
from .models import Project, ProjectImage


class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ["id", "image", "caption", "order"]


class ProjectListSerializer(serializers.ModelSerializer):
    service_name = serializers.CharField(source="service.name", read_only=True, default="")

    class Meta:
        model = Project
        fields = ["id", "title", "slug", "client_name", "sector",
                  "cover_image", "service_name", "is_featured"]


class ProjectDetailSerializer(serializers.ModelSerializer):
    images = ProjectImageSerializer(many=True, read_only=True)
    service_name = serializers.CharField(source="service.name", read_only=True, default="")

    class Meta:
        model = Project
        fields = ["id", "title", "slug", "client_name", "sector",
                  "context", "challenge", "intervention", "approach",
                  "results", "cover_image", "service_name", "is_featured", "images"]
