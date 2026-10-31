from django.db import models


class SiteSettings(models.Model):
    site_name = models.CharField("Nom du site", max_length=100, default="Cabinet BMC")
    tagline = models.CharField("Slogan", max_length=200, default="Votre partenaire en excellence commerciale")
    description = models.TextField("Description", blank=True)
    email = models.EmailField("Email de contact", default="cabinetbmc20@gmail.com")
    phone_1 = models.CharField("Telephone 1", max_length=20, default="+229 91474141")
    phone_2 = models.CharField("Telephone 2", max_length=20, default="+229 58993177")
    phone_3 = models.CharField("Telephone 3", max_length=20, default="+229 96347577")
    address = models.TextField("Adresse", blank=True)
    facebook_url = models.URLField("Facebook", blank=True)
    linkedin_url = models.URLField("LinkedIn", blank=True)
    instagram_url = models.URLField("Instagram", blank=True)
    twitter_url = models.URLField("Twitter/X", blank=True)
    whatsapp_number = models.CharField("WhatsApp", max_length=20, blank=True)

    class Meta:
        verbose_name = "Parametres du site"
        verbose_name_plural = "Parametres du site"

    def __str__(self):
        return self.site_name

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj


class HeroSection(models.Model):
    title = models.CharField("Titre principal", max_length=200)
    subtitle = models.TextField("Sous-titre")
    cta_text = models.CharField("Texte du bouton", max_length=100, default="Parlons de votre projet")
    cta_url = models.CharField("Lien du bouton", max_length=200, default="/contact")
    image = models.ImageField("Image", upload_to="hero/", blank=True)
    is_active = models.BooleanField("Actif", default=True)
    order = models.PositiveIntegerField("Ordre", default=0)

    class Meta:
        verbose_name = "Section Hero"
        verbose_name_plural = "Sections Hero"
        ordering = ["order"]

    def __str__(self):
        return self.title


class Partner(models.Model):
    name = models.CharField("Nom", max_length=100)
    logo = models.ImageField("Logo", upload_to="partners/", blank=True)
    website = models.URLField("Site web", blank=True)
    is_active = models.BooleanField("Actif", default=True)
    order = models.PositiveIntegerField("Ordre", default=0)

    class Meta:
        verbose_name = "Partenaire"
        verbose_name_plural = "Partenaires"
        ordering = ["order"]

    def __str__(self):
        return self.name
