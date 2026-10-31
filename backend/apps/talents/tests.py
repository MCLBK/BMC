import pytest
from django.contrib.auth import get_user_model

User = get_user_model()


@pytest.mark.django_db
class TestTalentsAPI:
    def test_get_profile_creates_one(self, auth_client):
        client, user = auth_client
        resp = client.get("/api/v1/talents/profile/")
        assert resp.status_code == 200

    def test_profile_unauthenticated(self, api_client):
        resp = api_client.get("/api/v1/talents/profile/")
        assert resp.status_code == 401

    def test_update_profile(self, auth_client):
        client, user = auth_client
        client.get("/api/v1/talents/profile/")
        resp = client.put("/api/v1/talents/profile/", {
            "title": "Commercial Senior",
            "bio": "10 ans d'experience",
            "skills": "Vente B2B, Negociation",
            "experience_years": 10,
            "location": "Cotonou",
        }, format="json")
        assert resp.status_code == 200
        assert resp.data["title"] == "Commercial Senior"

    def test_list_opportunities(self, auth_client):
        client, _ = auth_client
        resp = client.get("/api/v1/talents/opportunities/")
        assert resp.status_code == 200
