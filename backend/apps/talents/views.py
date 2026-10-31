from rest_framework import generics, viewsets, permissions, serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
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
        profile, _ = TalentProfile.objects.get_or_create(user=self.request.user)
        if Application.objects.filter(talent=profile, opportunity=serializer.validated_data["opportunity"]).exists():
            raise serializers.ValidationError({"detail": "Vous avez deja postule a cette opportunite."})
        serializer.save(talent=profile)


class MyApplicationsView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Application.objects.filter(
            talent__user=self.request.user
        ).select_related("opportunity")


class CVDownloadView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id):
        if str(request.user.id) != str(user_id) and not request.user.is_staff:
            return Response({"detail": "Acces refuse."}, status=status.HTTP_403_FORBIDDEN)
        try:
            profile = TalentProfile.objects.get(user_id=user_id)
        except TalentProfile.DoesNotExist:
            return Response({"detail": "Profil introuvable."}, status=status.HTTP_404_NOT_FOUND)
        if not profile.cv:
            return Response({"detail": "Aucun CV enregistre."}, status=status.HTTP_404_NOT_FOUND)
        from django.http import FileResponse
        return FileResponse(profile.cv.open("rb"), content_type="application/pdf")
