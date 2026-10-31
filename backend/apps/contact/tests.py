import pytest


@pytest.mark.django_db
class TestContactAPI:
    def test_submit_contact(self, api_client):
        resp = api_client.post("/api/v1/contact/messages/", {
            "full_name": "Jean Dupont",
            "email": "jean@example.com",
            "subject": "Demande info",
            "message": "Je souhaite des informations sur vos services.",
        }, format="json")
        assert resp.status_code == 201

    def test_submit_contact_missing_fields(self, api_client):
        resp = api_client.post("/api/v1/contact/messages/", {
            "full_name": "Jean",
        }, format="json")
        assert resp.status_code == 400
