"use client";

import { useState, FormEvent } from "react";
import { apiPost } from "@/lib/api";
import SectionTitle from "@/components/ui/SectionTitle";

const questions = [
  {
    id: "q1",
    text: "Comment evaluez-vous votre processus de vente actuel ?",
    options: [
      { value: "1", label: "Inexistant ou tres informel" },
      { value: "2", label: "En cours de structuration" },
      { value: "3", label: "Structure mais perfectible" },
      { value: "4", label: "Bien structure et performant" },
    ],
  },
  {
    id: "q2",
    text: "Vos equipes commerciales sont-elles regulierement formees ?",
    options: [
      { value: "1", label: "Jamais de formation" },
      { value: "2", label: "Rarement (moins d’une fois par an)" },
      { value: "3", label: "Regulierement (1-2 fois par an)" },
      { value: "4", label: "Formation continue integree" },
    ],
  },
  {
    id: "q3",
    text: "Disposez-vous d’outils de suivi de la performance commerciale ?",
    options: [
      { value: "1", label: "Aucun outil" },
      { value: "2", label: "Suivi basique (tableur)" },
      { value: "3", label: "CRM en place" },
      { value: "4", label: "CRM + tableaux de bord avances" },
    ],
  },
  {
    id: "q4",
    text: "Quel est votre principal defi commercial actuellement ?",
    options: [
      { value: "prospection", label: "Generer de nouveaux leads" },
      { value: "conversion", label: "Convertir les prospects en clients" },
      { value: "fidelisation", label: "Fideliser les clients existants" },
      { value: "organisation", label: "Structurer l’equipe commerciale" },
    ],
  },
  {
    id: "q5",
    text: "Quelle est la taille de votre equipe commerciale ?",
    options: [
      { value: "solo", label: "Je suis seul(e)" },
      { value: "small", label: "1-5 commerciaux" },
      { value: "medium", label: "6-20 commerciaux" },
      { value: "large", label: "Plus de 20 commerciaux" },
    ],
  },
];

export default function DiagnosticPage() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isComplete = Object.keys(answers).length === questions.length;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await apiPost("/diagnostic/sessions/", {
        respondent_email: email,
        respondent_company: company,
        answers,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l’envoi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="bg-navy-700 text-white">
        <div className="container-bmc px-4 sm:px-6 lg:px-8 py-20">
          <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">Diagnostic</span>
          <h1 className="text-4xl sm:text-5xl font-bold font-display mt-3 mb-6">
            Diagnostic commercial gratuit
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            Evaluez la maturite commerciale de votre entreprise en quelques minutes et recevez des recommandations personnalisees.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-bmc max-w-2xl">
          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">Diagnostic envoye</h3>
              <p className="text-green-700">
                Merci pour vos reponses. Notre equipe analysera votre profil et vous contactera avec des recommandations personnalisees.
              </p>
            </div>
          ) : (
            <>
              <SectionTitle
                title="Repondez aux questions"
                description={`Question ${Math.min(step + 1, questions.length)} sur ${questions.length}`}
              />

              {step < questions.length ? (
                <div className="bg-white rounded-xl p-8 border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-semibold text-navy-700 mb-6">
                    {questions[step].text}
                  </h3>
                  <div className="space-y-3">
                    {questions[step].options.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setAnswers({ ...answers, [questions[step].id]: opt.value });
                          if (step < questions.length - 1) setStep(step + 1);
                          else setStep(questions.length);
                        }}
                        className={`w-full text-left p-4 rounded-lg border transition-all ${
                          answers[questions[step].id] === opt.value
                            ? "border-orange-400 bg-orange-50"
                            : "border-slate-200 hover:border-orange-200 hover:bg-slate-50"
                        }`}
                      >
                        <span className="text-sm font-medium text-slate-700">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between mt-6">
                    <button
                      onClick={() => setStep(Math.max(0, step - 1))}
                      disabled={step === 0}
                      className="text-sm text-slate-500 hover:text-navy-700 disabled:opacity-30"
                    >
                      Precedent
                    </button>
                    <div className="flex gap-1">
                      {questions.map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full ${i <= step ? "bg-orange-400" : "bg-slate-200"}`} />
                      ))}
                    </div>
                  </div>
                </div>
              ) : isComplete ? (
                <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 border border-slate-100 shadow-sm space-y-5">
                  <h3 className="text-lg font-semibold text-navy-700 mb-2">
                    Recevez vos resultats
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Renseignez vos coordonnees pour recevoir votre diagnostic personnalise.
                  </p>
                  {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">{error}</div>}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Entreprise</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
                    />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
                    {loading ? "Envoi..." : "Recevoir mon diagnostic"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="w-full text-sm text-slate-500 hover:text-navy-700"
                  >
                    Modifier mes reponses
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-600">Veuillez repondre a toutes les questions.</p>
                  <button onClick={() => setStep(0)} className="mt-4 btn-secondary">Reprendre</button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
