from django.db import models
from django.utils.text import slugify


class Project(models.Model):
    title = models.CharField("Titre", max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    client_name = models.CharField("Client", max_length=200, blank=True)
    sector = models.CharField("Secteur", max_length=100, blank=True)
    context = models.TextField("Contexte")
    challenge = models.TextField("Problematique")
    intervention = models.TextField("Intervention")
    approach = models.TextField("Demarche", blank=True)
    results = models.TextField("Resultats")
    cover_image = models.ImageField("Image de couverture", upload_to="portfolio/", blank=True)
    service = models.ForeignKey(
        "services.Service", on_delete=models.SET_NULL, null=True, blank=True,
        verbose_name="Service associe"
    )
    is_featured = models.BooleanField("Mis en avant", default=False)
    is_active = models.BooleanField("Actif", default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Realisation"
        verbose_name_plural = "Realisations"
        ordering = ["-created_at"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class ProjectImage(models.Model):
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="images",
        verbose_name="Realisation"
    )
    image = models.ImageField("Image", upload_to="portfolio/gallery/")
    caption = models.CharField("Legende", max_length=200, blank=True)
    order = models.PositiveIntegerField("Ordre", default=0)

    class Meta:
        verbose_name = "Image"
        verbose_name_plural = "Images"
        ordering = ["order"]

    def __str__(self):
        return f"Image — {self.project.title}"
