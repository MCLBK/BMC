from rest_framework import viewsets, permissions
from .models import Project
from .serializers import ProjectListSerializer, ProjectDetailSerializer


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.filter(is_active=True).select_related("service")
    permission_classes = [permissions.AllowAny]
    lookup_field = "slug"
    filterset_fields = ["is_featured"]
    search_fields = ["title", "client_name"]

    def get_serializer_class(self):
        if self.action == "retrieve":
            return ProjectDetailSerializer
        return ProjectListSerializer
