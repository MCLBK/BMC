from rest_framework import viewsets, generics, permissions
from .models import Training, Enrollment
from .serializers import TrainingListSerializer, TrainingDetailSerializer, EnrollmentSerializer


class TrainingViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Training.objects.filter(is_active=True)
    permission_classes = [permissions.AllowAny]
    lookup_field = "slug"
    filterset_fields = ["format", "level", "is_featured"]
    search_fields = ["title", "description"]

    def get_serializer_class(self):
        if self.action == "retrieve":
            return TrainingDetailSerializer
        return TrainingListSerializer


class EnrollmentCreateView(generics.CreateAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.AllowAny]
    throttle_scope = "contact"
