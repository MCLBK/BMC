from django.conf import settings
from django.db import models
from django.utils.text import slugify


class Category(models.Model):
    name = models.CharField("Nom", max_length=100)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField("Description", blank=True)
    order = models.PositiveIntegerField("Ordre", default=0)

    class Meta:
        verbose_name = "Categorie"
        verbose_name_plural = "Categories"
        ordering = ["order", "name"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Article(models.Model):
    class Status(models.TextChoices):
        DRAFT = "draft", "Brouillon"
        PUBLISHED = "published", "Publie"

    title = models.CharField("Titre", max_length=300)
    slug = models.SlugField(unique=True, blank=True)
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True, blank=True,
        related_name="articles", verbose_name="Categorie"
    )
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True,
        related_name="articles", verbose_name="Auteur"
    )
    excerpt = models.TextField("Extrait", max_length=500, blank=True)
    content = models.TextField("Contenu")
    cover_image = models.ImageField("Image de couverture", upload_to="blog/", blank=True)
    status = models.CharField("Statut", max_length=10, choices=Status.choices, default=Status.DRAFT)
    is_featured = models.BooleanField("Mis en avant", default=False)
    published_at = models.DateTimeField("Date de publication", null=True, blank=True)
    meta_title = models.CharField("Titre SEO", max_length=70, blank=True)
    meta_description = models.CharField("Description SEO", max_length=160, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Article"
        verbose_name_plural = "Articles"
        ordering = ["-published_at", "-created_at"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
