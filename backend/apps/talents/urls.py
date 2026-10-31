from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register("opportunities", views.OpportunityViewSet)

urlpatterns = [
    path("profile/", views.TalentProfileView.as_view(), name="talent_profile"),
    path("apply/", views.ApplicationCreateView.as_view(), name="apply"),
    path("applications/", views.MyApplicationsView.as_view(), name="my_applications"),
    path("", include(router.urls)),
]
