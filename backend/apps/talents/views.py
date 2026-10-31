from rest_framework import generics, viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import TalentProfile, Opportunity, Application
from .serializers import TalentProfileSerializer, OpportunitySerializer, ApplicationSerializer


class IsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if hasattr(obj, "user"):
            return obj.user == request.user or request.user.is_staff
        if hasattr(obj, "talent"):
            return obj.talent.user == request.user or request.user.is_staff
        return request.user.is_staff


class TalentProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = TalentProfileSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]
    parser_classes = [MultiPartParser, FormParser]

    def get_object(self):
        profile, _ = TalentProfile.objects.get_or_create(user=self.request.user)
        return profile


class OpportunityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Opportunity.objects.filter(is_active=True)
    serializer_class = OpportunitySerializer
    permission_classes = [permissions.AllowAny]
    filterset_fields = ["opportunity_type"]
    search_fields = ["title", "description"]


class ApplicationCreateView(generics.CreateAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        profile = TalentProfile.objects.get(user=self.request.user)
        serializer.save(talent=profile)


class MyApplicationsView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Application.objects.filter(
            talent__user=self.request.user
        ).select_related("opportunity")
