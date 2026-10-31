import pytest
from django.contrib.auth import get_user_model

User = get_user_model()


@pytest.mark.django_db
class TestUserModel:
    def test_create_user(self):
        user = User.objects.create_user(
            username="john", email="john@example.com", password="Pass123!"
        )
        assert user.username == "john"
        assert user.email == "john@example.com"
        assert user.check_password("Pass123!")
        assert user.role == "client"
        assert user.pk is not None

    def test_create_superuser(self):
        admin = User.objects.create_superuser(
            username="admin", email="admin@example.com", password="Admin123!"
        )
        assert admin.is_staff
        assert admin.is_superuser
        assert admin.role == "admin"


@pytest.mark.django_db
class TestAuthAPI:
    def test_register(self, api_client):
        resp = api_client.post("/api/v1/auth/register/", {
            "username": "newuser",
            "email": "new@example.com",
            "password": "StrongPass123!",
            "password_confirm": "StrongPass123!",
            "first_name": "Jean",
            "last_name": "Dupont",
        }, format="json")
        assert resp.status_code == 201
        assert User.objects.filter(username="newuser").exists()

    def test_register_password_mismatch(self, api_client):
        resp = api_client.post("/api/v1/auth/register/", {
            "username": "newuser",
            "email": "new@example.com",
            "password": "StrongPass123!",
            "password_confirm": "WrongPass456!",
        }, format="json")
        assert resp.status_code == 400

    def test_login(self, api_client, create_user):
        create_user(username="loginuser", password="TestPass123!")
        resp = api_client.post("/api/v1/auth/token/", {
            "username": "loginuser",
            "password": "TestPass123!",
        }, format="json")
        assert resp.status_code == 200
        assert "access" in resp.data
        assert "refresh" in resp.data

    def test_login_invalid(self, api_client):
        resp = api_client.post("/api/v1/auth/token/", {
            "username": "noone",
            "password": "wrong",
        }, format="json")
        assert resp.status_code == 401

    def test_profile_authenticated(self, auth_client):
        client, user = auth_client
        resp = client.get("/api/v1/auth/profile/")
        assert resp.status_code == 200
        assert resp.data["username"] == user.username

    def test_profile_unauthenticated(self, api_client):
        resp = api_client.get("/api/v1/auth/profile/")
        assert resp.status_code == 401
