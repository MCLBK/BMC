import uuid
from django.db import models
from django.utils.text import slugify


class Training(models.Model):
    class Format(models.TextChoices):
        IN_PERSON = "in_person", "Presentiel"
        ONLINE = "online", "En ligne"
        HYBRID = "hybrid", "Hybride"

    class Level(models.TextChoices):
        BEGINNER = "beginner", "Debutant"
        INTERMEDIATE = "intermediate", "Intermediaire"
        ADVANCED = "advanced", "Avance"
        ALL = "all", "Tous niveaux"

    title = models.CharField("Titre", max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    short_description = models.TextField("Description courte", max_length=300)
    description = models.TextField("Description complete")
    objectives = models.TextField("Objectifs pedagogiques")
    target_audience = models.TextField("Public concerne")
    program = models.TextField("Programme detaille")
    prerequisites = models.TextField("Pre-requis", blank=True)

    duration = models.CharField("Duree", max_length=100, blank=True)
    format = models.CharField("Format", max_length=15, choices=Format.choices, default=Format.IN_PERSON)
    level = models.CharField("Niveau", max_length=15, choices=Level.choices, default=Level.ALL)

    start_date = models.DateField("Date de debut", null=True, blank=True)
    end_date = models.DateField("Date de fin", null=True, blank=True)
    max_participants = models.PositiveIntegerField("Nombre maximum de participants", null=True, blank=True)

    image = models.ImageField("Image", upload_to="academy/", blank=True)
    is_featured = models.BooleanField("Mis en avant", default=False)
    is_active = models.BooleanField("Actif", default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Formation"
        verbose_name_plural = "Formations"
        ordering = ["-created_at"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    @property
    def available_spots(self):
        if self.max_participants is None:
            return None
        return self.max_participants - self.enrollments.filter(
            status__in=[Enrollment.Status.CONFIRMED, Enrollment.Status.PENDING]
        ).count()


class Enrollment(models.Model):
    class Status(models.TextChoices):
        PENDING = "pending", "En attente"
        CONFIRMED = "confirmed", "Confirmee"
        CANCELLED = "cancelled", "Annulee"
        COMPLETED = "completed", "Terminee"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    training = models.ForeignKey(
        Training, on_delete=models.CASCADE, related_name="enrollments",
        verbose_name="Formation"
    )
    full_name = models.CharField("Nom complet", max_length=200)
    email = models.EmailField("Email")
    phone = models.CharField("Telephone", max_length=20)
    company = models.CharField("Entreprise", max_length=200, blank=True)
    position = models.CharField("Fonction", max_length=100, blank=True)
    motivation = models.TextField("Motivation", blank=True)

    status = models.CharField("Statut", max_length=15, choices=Status.choices, default=Status.PENDING)
    admin_notes = models.TextField("Notes internes", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Inscription"
        verbose_name_plural = "Inscriptions"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.full_name} — {self.training.title}"
