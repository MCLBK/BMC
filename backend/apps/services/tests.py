import pytest
from apps.services.models import ServiceCategory, Service


@pytest.mark.django_db
class TestServicesAPI:
    @pytest.fixture(autouse=True)
    def setup_data(self, db):
        self.cat = ServiceCategory.objects.create(
            name="Commercial", slug="commercial", description="Services commerciaux"
        )
        self.service = Service.objects.create(
            name="Audit", slug="audit", category=self.cat,
            short_description="Audit commercial",
            description="Description complete de l'audit",
            is_active=True, is_featured=True,
        )

    def test_list_categories(self, api_client):
        resp = api_client.get("/api/v1/services/categories/")
        assert resp.status_code == 200
        assert len(resp.data["results"]) >= 1

    def test_list_services(self, api_client):
        resp = api_client.get("/api/v1/services/services/")
        assert resp.status_code == 200
        assert len(resp.data["results"]) >= 1

    def test_service_detail_by_slug(self, api_client):
        resp = api_client.get("/api/v1/services/services/audit/")
        assert resp.status_code == 200
        assert resp.data["name"] == "Audit"

    def test_services_readonly(self, api_client):
        resp = api_client.post("/api/v1/services/services/", {
            "name": "New Service"
        }, format="json")
        assert resp.status_code in (403, 405)
