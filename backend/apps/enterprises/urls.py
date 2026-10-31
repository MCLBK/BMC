from django.urls import path
from . import views

urlpatterns = [
    path("request/", views.ServiceRequestCreateView.as_view(), name="service_request"),
    path("quote/", views.QuoteRequestCreateView.as_view(), name="quote_request"),
]
