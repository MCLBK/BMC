from rest_framework import serializers
from .models import SiteSettings, HeroSection, Partner


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = ["site_name", "tagline", "description", "email",
                  "phone_1", "phone_2", "phone_3", "address",
                  "facebook_url", "linkedin_url", "instagram_url",
                  "twitter_url", "whatsapp_number"]


class HeroSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSection
        fields = ["id", "title", "subtitle", "cta_text", "cta_url", "image", "order"]


class PartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        fields = ["id", "name", "logo", "website"]
