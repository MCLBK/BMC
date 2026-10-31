import pytest
from apps.academy.models import Training


@pytest.mark.django_db
class TestAcademyAPI:
    @pytest.fixture(autouse=True)
    def setup_data(self, db):
        self.training = Training.objects.create(
            title="Techniques de vente",
            slug="techniques-de-vente",
            short_description="Formation aux techniques de vente",
            description="Programme complet",
            duration="3 jours",
            format="in_person",
            level="intermediate",
            is_active=True,
            is_featured=True,
            max_participants=20,
        )

    def test_list_trainings(self, api_client):
        resp = api_client.get("/api/v1/academy/trainings/")
        assert resp.status_code == 200
        assert len(resp.data["results"]) >= 1

    def test_training_detail(self, api_client):
        resp = api_client.get("/api/v1/academy/trainings/techniques-de-vente/")
        assert resp.status_code == 200
        assert resp.data["title"] == "Techniques de vente"

    def test_enroll(self, auth_client):
        client, user = auth_client
        resp = client.post("/api/v1/academy/enrollments/", {
            "training": self.training.pk,
            "full_name": "Jean Test",
            "email": user.email,
            "phone": "+229 12345678",
        }, format="json")
        assert resp.status_code == 201
