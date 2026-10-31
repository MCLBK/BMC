from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register("trainings", views.TrainingViewSet)

urlpatterns = [
    path("enroll/", views.EnrollmentCreateView.as_view(), name="enroll"),
    path("", include(router.urls)),
]
