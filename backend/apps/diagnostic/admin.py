from django.contrib import admin
from .models import DiagnosticQuestion, DiagnosticSession


@admin.register(DiagnosticQuestion)
class DiagnosticQuestionAdmin(admin.ModelAdmin):
    list_display = ["text", "category", "question_type", "weight", "order", "is_active"]
    list_filter = ["category", "question_type", "is_active"]
    list_editable = ["order", "is_active"]


@admin.register(DiagnosticSession)
class DiagnosticSessionAdmin(admin.ModelAdmin):
    list_display = ["company_name", "contact_name", "score", "sent_to_cabinet", "created_at"]
    list_filter = ["sent_to_cabinet", "created_at"]
    search_fields = ["company_name", "contact_name", "contact_email"]
    readonly_fields = ["id", "answers", "score", "results_summary", "created_at"]
