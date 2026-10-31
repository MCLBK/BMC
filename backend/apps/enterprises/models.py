import uuid
from django.db import models


class ServiceRequest(models.Model):
    class Status(models.TextChoices):
        NEW = "new", "Nouvelle"
        IN_PROGRESS = "in_progress", "En cours de traitement"
        RESPONDED = "responded", "Repondu"
        CLOSED = "closed", "Cloturee"

    class RequestType(models.TextChoices):
        AUDIT = "audit", "Audit commercial"
        TRAINING = "training", "Formation"
        RECRUITMENT = "recruitment", "Recrutement / Force de vente"
        TELESALES = "telesales", "Televente"
        COACHING = "coaching", "Coaching"
        COMMUNICATION = "communication", "Communication"
        BRAND_AMBASSADOR = "brand_ambassador", "Brand Ambassador"
        IMAGE_CONSULTING = "image_consulting", "Conseil en image"
        OTHER = "other", "Autre"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    request_type = models.CharField("Type de demande", max_length=20, choices=RequestType.choices)
    status = models.CharField("Statut", max_length=20, choices=Status.choices, default=Status.NEW)

    company_name = models.CharField("Entreprise", max_length=200)
    contact_name = models.CharField("Nom du contact", max_length=200)
    contact_email = models.EmailField("Email")
    contact_phone = models.CharField("Telephone", max_length=20)
    position = models.CharField("Fonction", max_length=100, blank=True)

    subject = models.CharField("Objet", max_length=300)
    message = models.TextField("Description du besoin")
    budget_range = models.CharField("Budget estimatif", max_length=100, blank=True)
    timeline = models.CharField("Delai souhaite", max_length=100, blank=True)
    team_size = models.CharField("Taille de l'equipe", max_length=50, blank=True)

    admin_notes = models.TextField("Notes internes", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Demande de prestation"
        verbose_name_plural = "Demandes de prestations"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.company_name} — {self.get_request_type_display()}"


class QuoteRequest(models.Model):
    class Status(models.TextChoices):
        NEW = "new", "Nouvelle"
        IN_PROGRESS = "in_progress", "En cours"
        SENT = "sent", "Devis envoye"
        ACCEPTED = "accepted", "Accepte"
        DECLINED = "declined", "Refuse"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    service = models.ForeignKey(
        "services.Service", on_delete=models.SET_NULL, null=True, blank=True,
        verbose_name="Service concerne"
    )
    status = models.CharField("Statut", max_length=20, choices=Status.choices, default=Status.NEW)

    company_name = models.CharField("Entreprise", max_length=200)
    contact_name = models.CharField("Nom du contact", max_length=200)
    contact_email = models.EmailField("Email")
    contact_phone = models.CharField("Telephone", max_length=20)
    sector = models.CharField("Secteur d'activite", max_length=100, blank=True)

    description = models.TextField("Description du projet")
    specifications = models.TextField("Cahier des charges", blank=True)

    admin_notes = models.TextField("Notes internes", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Demande de devis"
        verbose_name_plural = "Demandes de devis"
        ordering = ["-created_at"]

    def __str__(self):
        return f"Devis — {self.company_name}"
