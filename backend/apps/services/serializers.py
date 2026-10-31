from rest_framework import serializers
from .models import ServiceCategory, Service


class ServiceSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = Service
        fields = ["id", "name", "slug", "short_description", "description",
                  "target_audience", "benefits", "approach", "image",
                  "category", "category_name", "is_featured", "order"]


class ServiceCategorySerializer(serializers.ModelSerializer):
    services = ServiceSerializer(many=True, read_only=True)

    class Meta:
        model = ServiceCategory
        fields = ["id", "name", "slug", "description", "icon", "order", "services"]
