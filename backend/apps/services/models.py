from django.db import models
from django.utils.text import slugify


class ServiceCategory(models.Model):
    name = models.CharField("Nom", max_length=100)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField("Description", blank=True)
    icon = models.CharField("Icone (classe CSS)", max_length=50, blank=True)
    order = models.PositiveIntegerField("Ordre", default=0)

    class Meta:
        verbose_name = "Categorie de service"
        verbose_name_plural = "Categories de services"
        ordering = ["order"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Service(models.Model):
    category = models.ForeignKey(
        ServiceCategory, on_delete=models.CASCADE, related_name="services",
        verbose_name="Categorie"
    )
    name = models.CharField("Nom du service", max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    short_description = models.TextField("Description courte", max_length=300)
    description = models.TextField("Description complete")
    target_audience = models.TextField("Public concerne", blank=True)
    benefits = models.TextField("Benefices attendus", blank=True)
    approach = models.TextField("Modalites d'intervention", blank=True)
    image = models.ImageField("Image", upload_to="services/", blank=True)
    is_featured = models.BooleanField("Mis en avant", default=False)
    is_active = models.BooleanField("Actif", default=True)
    order = models.PositiveIntegerField("Ordre", default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Service"
        verbose_name_plural = "Services"
        ordering = ["category__order", "order"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
