import uuid
from django.db import models


class DiagnosticQuestion(models.Model):
    class QuestionType(models.TextChoices):
        SINGLE = "single", "Choix unique"
        MULTIPLE = "multiple", "Choix multiples"
        SCALE = "scale", "Echelle"
        TEXT = "text", "Texte libre"

    text = models.TextField("Question")
    question_type = models.CharField("Type", max_length=10, choices=QuestionType.choices, default=QuestionType.SINGLE)
    category = models.CharField("Categorie", max_length=100)
    help_text = models.TextField("Aide", blank=True)
    options = models.JSONField("Options de reponse", default=list, blank=True)
    weight = models.PositiveIntegerField("Poids", default=1)
    order = models.PositiveIntegerField("Ordre", default=0)
    is_active = models.BooleanField("Actif", default=True)

    class Meta:
        verbose_name = "Question diagnostic"
        verbose_name_plural = "Questions diagnostic"
        ordering = ["order"]

    def __str__(self):
        return self.text[:80]


class DiagnosticSession(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company_name = models.CharField("Entreprise", max_length=200, blank=True)
    contact_name = models.CharField("Nom", max_length=200, blank=True)
    contact_email = models.EmailField("Email", blank=True)
    contact_phone = models.CharField("Telephone", max_length=20, blank=True)

    answers = models.JSONField("Reponses", default=dict)
    score = models.FloatField("Score global", null=True, blank=True)
    results_summary = models.TextField("Synthese", blank=True)
    recommended_services = models.ManyToManyField(
        "services.Service", blank=True, verbose_name="Services recommandes"
    )

    sent_to_cabinet = models.BooleanField("Transmis au cabinet", default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Session diagnostic"
        verbose_name_plural = "Sessions diagnostic"
        ordering = ["-created_at"]

    def __str__(self):
        return f"Diagnostic — {self.company_name or 'Anonyme'}"
