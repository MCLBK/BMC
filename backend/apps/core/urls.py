from django.urls import path
from . import views

urlpatterns = [
    path("settings/", views.SiteSettingsView.as_view(), name="site_settings"),
    path("hero/", views.HeroSectionListView.as_view(), name="hero_sections"),
    path("partners/", views.PartnerListView.as_view(), name="partners"),
]
