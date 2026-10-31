from django.contrib import admin
from .models import Project, ProjectImage


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["title", "client_name", "sector", "service", "is_featured", "is_active"]
    list_filter = ["is_featured", "is_active", "service"]
    search_fields = ["title", "client_name"]
    prepopulated_fields = {"slug": ("title",)}
    inlines = [ProjectImageInline]
