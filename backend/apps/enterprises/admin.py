from django.contrib import admin
from .models import ServiceRequest, QuoteRequest


@admin.register(ServiceRequest)
class ServiceRequestAdmin(admin.ModelAdmin):
    list_display = ["company_name", "contact_name", "request_type", "status", "created_at"]
    list_filter = ["request_type", "status", "created_at"]
    search_fields = ["company_name", "contact_name", "contact_email"]
    readonly_fields = ["id", "created_at", "updated_at"]
    list_editable = ["status"]
    fieldsets = [
        ("Demande", {"fields": ("id", "request_type", "status")}),
        ("Contact", {"fields": ("company_name", "contact_name", "contact_email", "contact_phone", "position")}),
        ("Details", {"fields": ("subject", "message", "budget_range", "timeline", "team_size")}),
        ("Administration", {"fields": ("admin_notes", "created_at", "updated_at")}),
    ]


@admin.register(QuoteRequest)
class QuoteRequestAdmin(admin.ModelAdmin):
    list_display = ["company_name", "contact_name", "service", "status", "created_at"]
    list_filter = ["status", "created_at"]
    search_fields = ["company_name", "contact_name"]
    readonly_fields = ["id", "created_at", "updated_at"]
    list_editable = ["status"]
