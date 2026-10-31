from django.contrib import admin
from .models import ContactMessage


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ["full_name", "email", "subject", "status", "created_at"]
    list_filter = ["status", "created_at"]
    search_fields = ["full_name", "email", "subject", "message"]
    readonly_fields = ["id", "full_name", "email", "phone", "company", "subject", "message", "created_at", "updated_at"]
    list_editable = ["status"]
    fieldsets = [
        ("Message", {"fields": ("id", "full_name", "email", "phone", "company", "subject", "message")}),
        ("Traitement", {"fields": ("status", "admin_notes")}),
        ("Dates", {"fields": ("created_at", "updated_at")}),
    ]
