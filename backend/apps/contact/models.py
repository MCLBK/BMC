import uuid
from django.db import models


class ContactMessage(models.Model):
    class Status(models.TextChoices):
        NEW = "new", "Nouveau"
        READ = "read", "Lu"
        RESPONDED = "responded", "Repondu"
        ARCHIVED = "archived", "Archive"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    full_name = models.CharField("Nom complet", max_length=200)
    email = models.EmailField("Email")
    phone = models.CharField("Telephone", max_length=20, blank=True)
    company = models.CharField("Entreprise", max_length=200, blank=True)
    subject = models.CharField("Objet", max_length=300)
    message = models.TextField("Message")
    status = models.CharField("Statut", max_length=10, choices=Status.choices, default=Status.NEW)
    admin_notes = models.TextField("Notes internes", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Message de contact"
        verbose_name_plural = "Messages de contact"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.full_name} — {self.subject}"
