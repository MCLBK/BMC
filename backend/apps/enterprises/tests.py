import pytest


@pytest.mark.django_db
class TestEnterprisesAPI:
    def test_submit_service_request(self, api_client):
        resp = api_client.post("/api/v1/enterprises/request/", {
            "request_type": "audit",
            "company_name": "Entreprise Test",
            "contact_name": "Paul Martin",
            "contact_email": "paul@example.com",
            "contact_phone": "+229 91474141",
            "subject": "Audit commercial",
            "message": "Nous souhaitons un audit de notre equipe commerciale.",
        }, format="json")
        assert resp.status_code == 201

    def test_submit_quote_request(self, api_client):
        resp = api_client.post("/api/v1/enterprises/quote/", {
            "company_name": "Entreprise Test",
            "contact_name": "Paul Martin",
            "contact_email": "paul@example.com",
            "contact_phone": "+229 91474141",
            "services_requested": "Formation, Audit",
            "description": "Nous avons besoin de plusieurs prestations.",
        }, format="json")
        assert resp.status_code == 201

    def test_invalid_request_type(self, api_client):
        resp = api_client.post("/api/v1/enterprises/request/", {
            "request_type": "invalid_type",
            "company_name": "Test",
            "contact_name": "Test",
            "contact_email": "test@example.com",
            "contact_phone": "+229 00000000",
            "subject": "Test",
            "message": "Test message",
        }, format="json")
        assert resp.status_code == 400
