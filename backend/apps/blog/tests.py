import pytest
from apps.blog.models import Category, Article
from django.contrib.auth import get_user_model

User = get_user_model()


@pytest.mark.django_db
class TestBlogAPI:
    @pytest.fixture(autouse=True)
    def setup_data(self, db):
        self.author = User.objects.create_user(
            username="author", email="author@example.com", password="Pass123!"
        )
        self.cat = Category.objects.create(
            name="Vente", slug="vente", description="Articles sur la vente"
        )
        self.article = Article.objects.create(
            title="Conseils de vente",
            slug="conseils-de-vente",
            excerpt="Quelques conseils",
            content="Contenu complet de l'article.",
            category=self.cat,
            author=self.author,
            status="published",
        )
        Article.objects.create(
            title="Article brouillon",
            slug="article-brouillon",
            excerpt="Pas publie",
            content="Brouillon.",
            category=self.cat,
            author=self.author,
            status="draft",
        )

    def test_list_articles_only_published(self, api_client):
        resp = api_client.get("/api/v1/blog/articles/")
        assert resp.status_code == 200
        slugs = [a["slug"] for a in resp.data["results"]]
        assert "conseils-de-vente" in slugs
        assert "article-brouillon" not in slugs

    def test_article_detail(self, api_client):
        resp = api_client.get("/api/v1/blog/articles/conseils-de-vente/")
        assert resp.status_code == 200
        assert resp.data["title"] == "Conseils de vente"

    def test_list_categories(self, api_client):
        resp = api_client.get("/api/v1/blog/categories/")
        assert resp.status_code == 200
        assert len(resp.data["results"]) >= 1
