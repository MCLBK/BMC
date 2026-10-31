import json
import os
import urllib.request

from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.views import APIView


BMC_CONTEXT = """Tu es l\u2019assistant virtuel du Cabinet BMC (Business Marketing & Coaching),
specialise en Developpement et Animation Commerciale au Benin.

Services proposes :
- Audit commercial (diagnostic interne et externe)
- Formation des equipes commerciales (9 modules)
- Recrutement et mise a disposition de forces de vente
- Equipes specialisees (closing, prospection, upselling)
- Televente
- Brand Ambassadors et reseau de distribution All10
- Coaching personnel et professionnel
- Conseil en image
- Communication, strategie, webmarketing

BMC Academy propose des formations en : techniques de vente, management, developpement personnel,
prise de parole en public, gestion du temps, gestion des emotions, reclamations clients,
relation client, experience client.

Contacts : +229 91 47 41 41 / +229 58 99 31 77 / +229 96 34 75 77
Email : cabinetbmc20@gmail.com

Reponds en francais, de maniere professionnelle et concise. Oriente les visiteurs vers
les services adaptes a leurs besoins. Si tu ne peux pas repondre, invite-les a contacter
le cabinet directement."""

FALLBACK_RESPONSES = {
    "services": "Le Cabinet BMC propose : audit commercial, formation des equipes, recrutement de forces de vente, televente, coaching, conseil en image et communication. Quel domaine vous interesse ?",
    "formation": "BMC Academy propose 9 modules de formation : techniques de vente, management, developpement personnel, prise de parole en public, gestion du temps et des emotions, relation client, et plus. Souhaitez-vous des details sur un module specifique ?",
    "diagnostic": "Notre diagnostic commercial gratuit vous permet d\u2019evaluer la maturite commerciale de votre entreprise en quelques minutes. Rendez-vous sur notre page Diagnostic pour le realiser en ligne.",
    "talent": "Rejoignez le reseau de talents BMC ! Creez votre profil en ligne, deposez votre CV et accedez aux opportunites : missions terrain, televente, closing, et plus. Inscrivez-vous sur notre page Talents.",
    "contact": "Vous pouvez nous joindre par telephone au +229 91 47 41 41, par email a cabinetbmc20@gmail.com, ou via le formulaire de contact sur notre site.",
    "default": "Merci pour votre question ! Le Cabinet BMC est specialise en developpement commercial. Nous proposons audit, formation, force de vente, coaching et communication. Comment puis-je vous orienter ?",
}


class AssistantThrottle(AnonRateThrottle):
    rate = "10/minute"


def get_fallback_response(message: str) -> str:
    msg = message.lower()
    if any(w in msg for w in ["service", "prestation", "offre", "proposez"]):
        return FALLBACK_RESPONSES["services"]
    if any(w in msg for w in ["formation", "academy", "apprendre", "module", "cours"]):
        return FALLBACK_RESPONSES["formation"]
    if any(w in msg for w in ["diagnostic", "evaluer", "audit", "analyse"]):
        return FALLBACK_RESPONSES["diagnostic"]
    if any(w in msg for w in ["talent", "profil", "cv", "candidat", "opportunit", "rejoindre"]):
        return FALLBACK_RESPONSES["talent"]
    if any(w in msg for w in ["contact", "telephone", "email", "joindre", "adresse"]):
        return FALLBACK_RESPONSES["contact"]
    return FALLBACK_RESPONSES["default"]


class ChatView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [AssistantThrottle]

    def post(self, request):
        message = request.data.get("message", "").strip()
        if not message:
            return Response(
                {"error": "Le message est requis."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        api_key = os.environ.get("AI_API_KEY", "")
        api_url = os.environ.get("AI_API_URL", "https://api.anthropic.com/v1/messages")
        model = os.environ.get("AI_MODEL", "claude-sonnet-4-20250514")

        if not api_key:
            return Response({"response": get_fallback_response(message)})

        history = request.data.get("history", [])
        messages = []
        for h in history[-6:]:
            if h.get("role") in ("user", "assistant"):
                messages.append({"role": h["role"], "content": h["content"]})
        messages.append({"role": "user", "content": message})

        try:
            payload = json.dumps({
                "model": model,
                "max_tokens": 500,
                "system": BMC_CONTEXT,
                "messages": messages,
            }).encode("utf-8")

            req = urllib.request.Request(
                api_url,
                data=payload,
                headers={
                    "Content-Type": "application/json",
                    "x-api-key": api_key,
                    "anthropic-version": "2023-06-01",
                },
                method="POST",
            )
            with urllib.request.urlopen(req, timeout=15) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                ai_response = data.get("content", [{}])[0].get("text", "")
                if ai_response:
                    return Response({"response": ai_response})
        except Exception:
            pass

        return Response({"response": get_fallback_response(message)})
