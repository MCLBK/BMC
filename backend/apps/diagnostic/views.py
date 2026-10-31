from rest_framework import generics, permissions
from .models import DiagnosticQuestion, DiagnosticSession
from .serializers import DiagnosticQuestionSerializer, DiagnosticSessionSerializer


class DiagnosticQuestionListView(generics.ListAPIView):
    queryset = DiagnosticQuestion.objects.filter(is_active=True)
    serializer_class = DiagnosticQuestionSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None


class DiagnosticSessionCreateView(generics.CreateAPIView):
    queryset = DiagnosticSession.objects.all()
    serializer_class = DiagnosticSessionSerializer
    permission_classes = [permissions.AllowAny]
    throttle_scope = "contact"

    def perform_create(self, serializer):
        answers = serializer.validated_data.get("answers", {})
        score = 0
        for key in ("q1", "q2", "q3"):
            val = answers.get(key, "0")
            try:
                score += int(val)
            except (ValueError, TypeError):
                pass
        score = max(0, min(score, 12))

        if score <= 5:
            summary = "Maturite commerciale faible. Un audit complet et un programme de formation sont recommandes."
        elif score <= 8:
            summary = "Maturite en developpement. Des formations avancees et des interventions ciblees accelereront vos resultats."
        else:
            summary = "Bonne maturite commerciale. Des ajustements strategiques et des equipes specialisees peuvent vous amener a l'excellence."

        challenge = answers.get("q4", "")
        team = answers.get("q5", "")
        if challenge:
            labels = {
                "prospection": "generation de leads",
                "conversion": "conversion des prospects",
                "fidelisation": "fidelisation client",
                "organisation": "structuration de l'equipe",
            }
            summary += f" Defi principal : {labels.get(challenge, challenge)}."
        if team:
            labels = {"solo": "solo", "small": "1-5 commerciaux", "medium": "6-20 commerciaux", "large": "20+ commerciaux"}
            summary += f" Equipe : {labels.get(team, team)}."

        serializer.save(score=score, results_summary=summary)
