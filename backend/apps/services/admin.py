from django.contrib import admin
from .models import ServiceCategory, Service


@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "order"]
    list_editable = ["order"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ["name", "category", "is_featured", "is_active", "order"]
    list_filter = ["category", "is_featured", "is_active"]
    list_editable = ["is_featured", "is_active", "order"]
    search_fields = ["name", "description"]
    prepopulated_fields = {"slug": ("name",)}
    fieldsets = [
        (None, {"fields": ("category", "name", "slug", "image")}),
        ("Contenu", {"fields": ("short_description", "description", "target_audience", "benefits", "approach")}),
        ("Options", {"fields": ("is_featured", "is_active", "order")}),
    ]
