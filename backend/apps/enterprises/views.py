from rest_framework import generics, permissions
from .models import ServiceRequest, QuoteRequest
from .serializers import ServiceRequestSerializer, QuoteRequestSerializer


class ServiceRequestCreateView(generics.CreateAPIView):
    queryset = ServiceRequest.objects.all()
    serializer_class = ServiceRequestSerializer
    permission_classes = [permissions.AllowAny]
    throttle_scope = "contact"


class QuoteRequestCreateView(generics.CreateAPIView):
    queryset = QuoteRequest.objects.all()
    serializer_class = QuoteRequestSerializer
    permission_classes = [permissions.AllowAny]
    throttle_scope = "contact"
