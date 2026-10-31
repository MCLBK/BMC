from django.contrib import admin
from .models import TalentProfile, Opportunity, Application


@admin.register(TalentProfile)
class TalentProfileAdmin(admin.ModelAdmin):
    list_display = ["user", "headline", "city", "availability", "is_profile_complete", "created_at"]
    list_filter = ["availability", "is_profile_complete", "country"]
    search_fields = ["user__first_name", "user__last_name", "user__email", "headline", "skills"]
    readonly_fields = ["created_at", "updated_at"]
    fieldsets = [
        ("Utilisateur", {"fields": ("user", "photo")}),
        ("Profil", {"fields": ("headline", "bio", "phone", "city", "country")}),
        ("Parcours", {"fields": ("education", "experience", "skills", "sectors", "languages", "years_experience")}),
        ("Disponibilite", {"fields": ("availability", "geographic_zone")}),
        ("Documents", {"fields": ("cv",)}),
        ("Statut", {"fields": ("is_profile_complete", "is_visible", "created_at", "updated_at")}),
    ]


@admin.register(Opportunity)
class OpportunityAdmin(admin.ModelAdmin):
    list_display = ["title", "opportunity_type", "location", "is_active", "created_at"]
    list_filter = ["opportunity_type", "is_active"]
    search_fields = ["title", "description"]


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ["talent", "opportunity", "status", "created_at"]
    list_filter = ["status", "created_at"]
    search_fields = ["talent__user__first_name", "talent__user__last_name"]
    readonly_fields = ["id", "created_at", "updated_at"]
    list_editable = ["status"]
