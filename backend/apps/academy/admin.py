from django.contrib import admin
from .models import Training, Enrollment


@admin.register(Training)
class TrainingAdmin(admin.ModelAdmin):
    list_display = ["title", "format", "level", "start_date", "is_featured", "is_active"]
    list_filter = ["format", "level", "is_featured", "is_active"]
    search_fields = ["title", "description"]
    prepopulated_fields = {"slug": ("title",)}
    fieldsets = [
        (None, {"fields": ("title", "slug", "image")}),
        ("Contenu", {"fields": ("short_description", "description", "objectives", "target_audience", "program", "prerequisites")}),
        ("Organisation", {"fields": ("duration", "format", "level", "start_date", "end_date", "max_participants")}),
        ("Options", {"fields": ("is_featured", "is_active")}),
    ]


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ["full_name", "training", "email", "status", "created_at"]
    list_filter = ["status", "training", "created_at"]
    search_fields = ["full_name", "email", "company"]
    readonly_fields = ["id", "created_at", "updated_at"]
    list_editable = ["status"]
