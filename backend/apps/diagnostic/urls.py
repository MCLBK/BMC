from django.urls import path
from . import views

urlpatterns = [
    path("questions/", views.DiagnosticQuestionListView.as_view(), name="diagnostic_questions"),
    path("submit/", views.DiagnosticSessionCreateView.as_view(), name="diagnostic_submit"),
]
