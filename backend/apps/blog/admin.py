from django.contrib import admin
from .models import Category, Article


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "order"]
    list_editable = ["order"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ["title", "category", "author", "status", "is_featured", "published_at"]
    list_filter = ["status", "category", "is_featured"]
    search_fields = ["title", "content"]
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ["created_at", "updated_at"]
    fieldsets = [
        (None, {"fields": ("title", "slug", "category", "author", "cover_image")}),
        ("Contenu", {"fields": ("excerpt", "content")}),
        ("Publication", {"fields": ("status", "is_featured", "published_at")}),
        ("SEO", {"fields": ("meta_title", "meta_description")}),
        ("Dates", {"fields": ("created_at", "updated_at")}),
    ]
