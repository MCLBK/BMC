import uuid
import os
from django.conf import settings
from django.db import models


def cv_upload_path(instance, filename):
    ext = os.path.splitext(filename)[1]
    return f"cv/{instance.user.id}/{uuid.uuid4().hex}{ext}"


class TalentProfile(models.Model):
    class AvailabilityStatus(models.TextChoices):
        AVAILABLE = "available", "Disponible"
        PARTIALLY = "partially", "Partiellement disponible"
        UNAVAILABLE = "unavailable", "Non disponible"

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
        related_name="talent_profile", verbose_name="Utilisateur"
    )
    headline = models.CharField("Titre professionnel", max_length=200, blank=True)
    bio = models.TextField("Presentation", blank=True)
    phone = models.CharField("Telephone", max_length=20, blank=True)
    city = models.CharField("Ville", max_length=100, blank=True)
    country = models.CharField("Pays", max_length=100, default="Benin")

    education = models.TextField("Formation", blank=True)
    experience = models.TextField("Experiences professionnelles", blank=True)
    skills = models.TextField("Competences", blank=True)
    sectors = models.CharField("Secteurs d'activite", max_length=500, blank=True)
    languages = models.CharField("Langues", max_length=200, blank=True)

    availability = models.CharField(
        "Disponibilite", max_length=15,
        choices=AvailabilityStatus.choices, default=AvailabilityStatus.AVAILABLE
    )
    geographic_zone = models.CharField("Zone geographique", max_length=200, blank=True)
    years_experience = models.PositiveIntegerField("Annees d'experience", null=True, blank=True)

    cv = models.FileField("CV (PDF)", upload_to=cv_upload_path, blank=True)
    photo = models.ImageField("Photo", upload_to="talents/photos/", blank=True)

    is_profile_complete = models.BooleanField("Profil complet", default=False)
    is_visible = models.BooleanField("Visible par l'administration", default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Profil talent"
        verbose_name_plural = "Profils talents"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user.get_full_name()} — {self.headline}"


class Opportunity(models.Model):
    class OpportunityType(models.TextChoices):
        FIELD_SALES = "field_sales", "Commercial terrain"
        SPECIALIZED = "specialized", "Commercial specialise"
        ELITE = "elite", "Elite des commerciaux"
        HOSTESS = "hostess", "Hotesse commerciale"
        TELESALES = "telesales", "Televente"
        COACHING = "coaching", "Coaching"
        OTHER = "other", "Autre"

    title = models.CharField("Titre", max_length=200)
    opportunity_type = models.CharField(
        "Type", max_length=20, choices=OpportunityType.choices
    )
    description = models.TextField("Description")
    requirements = models.TextField("Profil recherche")
    location = models.CharField("Localisation", max_length=200)
    duration = models.CharField("Duree", max_length=100, blank=True)
    is_active = models.BooleanField("Active", default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Opportunite"
        verbose_name_plural = "Opportunites"
        ordering = ["-created_at"]

    def __str__(self):
        return self.title


class Application(models.Model):
    class Status(models.TextChoices):
        SUBMITTED = "submitted", "Soumise"
        REVIEWING = "reviewing", "En cours d'examen"
        SHORTLISTED = "shortlisted", "Preselectionne"
        ACCEPTED = "accepted", "Accepte"
        REJECTED = "rejected", "Refuse"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    talent = models.ForeignKey(
        TalentProfile, on_delete=models.CASCADE, related_name="applications",
        verbose_name="Talent"
    )
    opportunity = models.ForeignKey(
        Opportunity, on_delete=models.CASCADE, related_name="applications",
        verbose_name="Opportunite"
    )
    cover_letter = models.TextField("Lettre de motivation", blank=True)
    status = models.CharField(
        "Statut", max_length=15, choices=Status.choices, default=Status.SUBMITTED
    )
    admin_notes = models.TextField("Notes internes", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Candidature"
        verbose_name_plural = "Candidatures"
        ordering = ["-created_at"]
        unique_together = ["talent", "opportunity"]

    def __str__(self):
        return f"{self.talent} — {self.opportunity}"
