from django.contrib import admin
from .models import SiteSettings, HeroSection, Partner


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    fieldsets = [
        ("Informations generales", {"fields": ("site_name", "tagline", "description")}),
        ("Contact", {"fields": ("email", "phone_1", "phone_2", "phone_3", "address")}),
        ("Reseaux sociaux", {"fields": ("facebook_url", "linkedin_url", "instagram_url", "twitter_url", "whatsapp_number")}),
    ]

    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(HeroSection)
class HeroSectionAdmin(admin.ModelAdmin):
    list_display = ["title", "is_active", "order"]
    list_editable = ["is_active", "order"]
    list_filter = ["is_active"]


@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ["name", "is_active", "order"]
    list_editable = ["is_active", "order"]
