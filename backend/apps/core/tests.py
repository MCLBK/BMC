import pytest
from apps.core.models import SiteSettings


@pytest.mark.django_db
class TestCoreAPI:
    @pytest.fixture(autouse=True)
    def setup_data(self, db):
        SiteSettings.objects.create(
            site_name="Cabinet BMC",
            tagline="Excellence commerciale",
            email="cabinetbmc20@gmail.com",
            phone_1="+229 91474141",
        )

    def test_site_settings(self, api_client):
        resp = api_client.get("/api/v1/core/settings/")
        assert resp.status_code == 200
        assert resp.data["site_name"] == "Cabinet BMC"

    def test_hero_sections(self, api_client):
        resp = api_client.get("/api/v1/core/hero/")
        assert resp.status_code == 200

    def test_partners(self, api_client):
        resp = api_client.get("/api/v1/core/partners/")
        assert resp.status_code == 200
