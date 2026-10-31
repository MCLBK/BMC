"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { apiPost } from "@/lib/api";
import { images } from "@/lib/images";

const questions = [
  {
    id: "q1",
    category: "Processus de vente",
    text: "Comment evaluez-vous votre processus de vente actuel ?",
    scored: true,
    options: [
      { value: "1", label: "Inexistant ou tres informel" },
      { value: "2", label: "En cours de structuration" },
      { value: "3", label: "Structure mais perfectible" },
      { value: "4", label: "Bien structure et performant" },
    ],
  },
  {
    id: "q2",
    category: "Formation",
    text: "Vos equipes commerciales sont-elles regulierement formees ?",
    scored: true,
    options: [
      { value: "1", label: "Jamais de formation" },
      { value: "2", label: "Rarement (moins d'une fois par an)" },
      { value: "3", label: "Regulierement (1-2 fois par an)" },
      { value: "4", label: "Formation continue integree" },
    ],
  },
  {
    id: "q3",
    category: "Outils",
    text: "Disposez-vous d'outils de suivi de la performance commerciale ?",
    scored: true,
    options: [
      { value: "1", label: "Aucun outil" },
      { value: "2", label: "Suivi basique (tableur)" },
      { value: "3", label: "CRM en place" },
      { value: "4", label: "CRM + tableaux de bord avances" },
    ],
  },
  {
    id: "q4",
    category: "Defi principal",
    text: "Quel est votre principal defi commercial actuellement ?",
    scored: false,
    options: [
      { value: "prospection", label: "Generer de nouveaux leads" },
      { value: "conversion", label: "Convertir les prospects en clients" },
      { value: "fidelisation", label: "Fideliser les clients existants" },
      { value: "organisation", label: "Structurer l'equipe commerciale" },
    ],
  },
  {
    id: "q5",
    category: "Equipe",
    text: "Quelle est la taille de votre equipe commerciale ?",
    scored: false,
    options: [
      { value: "solo", label: "Je suis seul(e)" },
      { value: "small", label: "1-5 commerciaux" },
      { value: "medium", label: "6-20 commerciaux" },
      { value: "large", label: "Plus de 20 commerciaux" },
    ],
  },
];

const challengeLabels: Record<string, string> = {
  prospection: "la generation de leads",
  conversion: "la conversion des prospects",
  fidelisation: "la fidelisation client",
  organisation: "la structuration de l'equipe commerciale",
};

const teamLabels: Record<string, string> = {
  solo: "entrepreneur solo",
  small: "petite equipe (1-5)",
  medium: "equipe moyenne (6-20)",
  large: "grande equipe (20+)",
};

function computeScore(answers: Record<string, string>): number {
  let score = 0;
  for (const q of questions) {
    if (q.scored && answers[q.id]) {
      score += parseInt(answers[q.id], 10);
    }
  }
  return score;
}

type MaturityLevel = "low" | "mid" | "high";

function getMaturityLevel(score: number): MaturityLevel {
  if (score <= 5) return "low";
  if (score <= 8) return "mid";
  return "high";
}

const maturityInfo: Record<MaturityLevel, { label: string; color: string; bg: string; ring: string; description: string; recommendations: string[] }> = {
  low: {
    label: "Maturite commerciale faible",
    color: "text-red-600",
    bg: "bg-red-50",
    ring: "stroke-red-500",
    description: "Votre organisation commerciale necessite une structuration en profondeur pour atteindre ses objectifs.",
    recommendations: [
      "Audit commercial complet pour identifier les axes prioritaires",
      "Formation fondamentale des equipes aux techniques de vente",
      "Mise en place d'outils de suivi et de pilotage",
      "Accompagnement dans la definition d'une strategie commerciale",
    ],
  },
  mid: {
    label: "Maturite en developpement",
    color: "text-orange-600",
    bg: "bg-orange-50",
    ring: "stroke-orange-500",
    description: "Vous avez pose les bases, mais des axes d'amelioration significatifs peuvent accelerer vos resultats.",
    recommendations: [
      "Formation avancee et specialisee pour vos equipes",
      "Optimisation de vos processus de vente existants",
      "Renforcement des outils de pilotage commercial",
      "Interventions ciblees sur vos points de friction",
    ],
  },
  high: {
    label: "Bonne maturite commerciale",
    color: "text-green-600",
    bg: "bg-green-50",
    ring: "stroke-green-500",
    description: "Votre organisation commerciale est bien structuree. Des ajustements strategiques peuvent vous amener a l'excellence.",
    recommendations: [
      "Equipes specialisees (closing, upselling, cross-selling)",
      "Optimisation avancee de la performance commerciale",
      "Coaching de vos managers et leaders commerciaux",
      "Strategies de fidelisation et de croissance organique",
    ],
  },
};

export default function DiagnosticPage() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [companyName, setCompanyName] = useState("");

  const isComplete = Object.keys(answers).length === questions.length;
  const score = computeScore(answers);
  const level = getMaturityLevel(score);
  const maturity = maturityInfo[level];
  const scorePercent = Math.round((score / 12) * 100);

  function handleAnswer(questionId: string, value: string) {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await apiPost("/diagnostic/submit/", {
        company_name: companyName,
        contact_name: contactName,
        contact_email: contactEmail,
        contact_phone: contactPhone,
        answers,
        score,
        sent_to_cabinet: true,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'envoi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* HERO */}
      <section className="relative bg-navy-700 text-white overflow-hidden">
        <Image src={images.entreprises} alt="Diagnostic commercial" fill className="object-cover opacity-20" />
        <div className="relative container-bmc px-4 sm:px-6 lg:px-8 py-20">
          <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">Diagnostic</span>
          <h1 className="text-4xl sm:text-5xl font-bold font-display mt-3 mb-6">
            Diagnostic commercial
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            Evaluez la maturite commerciale de votre entreprise en quelques minutes
            et recevez des pistes d&apos;amelioration personnalisees.
          </p>
          <p className="text-sm text-slate-400 mt-4">
            Cet outil est un outil d&apos;auto-evaluation preliminaire. Il ne remplace pas un audit professionnel approfondi.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-bmc max-w-2xl">

          {/* PROGRESS BAR */}
          {!showResults && !submitted && (
            <div className="mb-10">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-slate-600">
                  {step < questions.length
                    ? `Question ${step + 1} sur ${questions.length}`
                    : "Questionnaire termine"}
                </p>
                <p className="text-sm text-slate-500">
                  {Math.round(((Math.min(step, questions.length)) / questions.length) * 100)} %
                </p>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 rounded-full transition-all duration-500"
                  style={{ width: `${(Math.min(step + (answers[questions[step]?.id] ? 1 : 0), questions.length) / questions.length) * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-3">
                {questions.map((q, i) => (
                  <button
                    key={q.id}
                    onClick={() => { if (answers[q.id] !== undefined) setStep(i); }}
                    disabled={answers[q.id] === undefined}
                    className={`flex flex-col items-center gap-1 disabled:cursor-default group`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      i === step
                        ? "bg-orange-500 text-white ring-2 ring-orange-300"
                        : answers[q.id] !== undefined
                          ? "bg-orange-100 text-orange-600 group-hover:bg-orange-200"
                          : "bg-slate-100 text-slate-400"
                    }`}>
                      {answers[q.id] !== undefined ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                      ) : (
                        i + 1
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 hidden sm:block">{q.category}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SUBMITTED SUCCESS */}
          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">Diagnostic transmis</h3>
              <p className="text-green-700 mb-6">
                Merci ! Notre equipe analysera vos reponses et vous contactera avec des recommandations detaillees.
              </p>
              <Link href="/contact" className="btn-primary">
                Nous contacter directement
              </Link>
            </div>

          /* RESULTS SCREEN */
          ) : showResults && isComplete ? (
            <div className="space-y-8">
              {/* Score Card */}
              <div className={`${maturity.bg} rounded-2xl p-8 border border-slate-100`}>
                <div className="flex flex-col sm:flex-row items-center gap-8">
                  {/* Score Circle */}
                  <div className="relative flex-shrink-0">
                    <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                      <circle
                        cx="60" cy="60" r="50" fill="none"
                        className={maturity.ring}
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={`${scorePercent * 3.14} ${314 - scorePercent * 3.14}`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={`text-3xl font-bold ${maturity.color}`}>{score}</span>
                      <span className="text-xs text-slate-500">/12</span>
                    </div>
                  </div>
                  {/* Text */}
                  <div className="text-center sm:text-left">
                    <h2 className={`text-2xl font-bold ${maturity.color} mb-2`}>{maturity.label}</h2>
                    <p className="text-slate-700 leading-relaxed">{maturity.description}</p>
                  </div>
                </div>
              </div>

              {/* Context: Challenge + Team */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-5 border border-slate-100">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Defi principal</p>
                  <p className="text-base font-medium text-navy-700">
                    {challengeLabels[answers.q4] || answers.q4}
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-slate-100">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Taille de l&apos;equipe</p>
                  <p className="text-base font-medium text-navy-700">
                    {teamLabels[answers.q5] || answers.q5}
                  </p>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-2xl p-8 border border-slate-100">
                <h3 className="text-lg font-bold text-navy-700 mb-4">Nos recommandations</h3>
                <ul className="space-y-3">
                  {maturity.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-orange-600 text-xs font-bold">{i + 1}</span>
                      </div>
                      <span className="text-sm text-slate-700">{rec}</span>
                    </li>
                  ))}
                </ul>
                {answers.q4 && (
                  <p className="text-sm text-slate-600 mt-5 pt-4 border-t border-slate-100">
                    Compte tenu de votre defi prioritaire — <strong>{challengeLabels[answers.q4]}</strong> — et de votre configuration
                    (<strong>{teamLabels[answers.q5]}</strong>), un accompagnement personnalise vous permettrait d&apos;obtenir
                    des resultats concrets rapidement.
                  </p>
                )}
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-slate-500 text-center leading-relaxed">
                Ce diagnostic est un outil d&apos;auto-evaluation preliminaire destine a vous donner une premiere indication.
                Il ne constitue pas un audit professionnel et ne saurait remplacer une analyse approfondie par nos consultants.
              </p>

              {/* Action Buttons */}
              {!showContactForm ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => setShowContactForm(true)} className="btn-primary flex-1">
                    Transmettre mon diagnostic au Cabinet BMC
                  </button>
                  <button onClick={() => { setShowResults(false); setStep(0); }} className="btn-secondary flex-1">
                    Modifier mes reponses
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-slate-100 space-y-5">
                  <h3 className="text-lg font-bold text-navy-700 mb-1">
                    Transmettre mon diagnostic
                  </h3>
                  <p className="text-sm text-slate-600">
                    Renseignez vos coordonnees pour que notre equipe puisse vous recontacter avec des recommandations detaillees.
                  </p>
                  {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">{error}</div>}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Nom *</label>
                      <input
                        type="text" required value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Entreprise</label>
                      <input
                        type="text" value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                      <input
                        type="email" required value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Telephone</label>
                      <input
                        type="tel" value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="+229 XX XX XX XX"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button type="submit" disabled={loading} className="btn-primary flex-1 disabled:opacity-50">
                      {loading ? "Envoi en cours..." : "Envoyer mon diagnostic"}
                    </button>
                    <button type="button" onClick={() => setShowContactForm(false)} className="text-sm text-slate-500 hover:text-navy-700 py-2">
                      Annuler
                    </button>
                  </div>
                </form>
              )}
            </div>

          /* QUESTIONS */
          ) : step < questions.length ? (
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
              <p className="text-xs font-semibold text-orange-500 uppercase tracking-wider mb-3">
                {questions[step].category}
              </p>
              <h3 className="text-lg font-bold text-navy-700 mb-6">
                {questions[step].text}
              </h3>
              <div className="space-y-3">
                {questions[step].options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(questions[step].id, opt.value)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      answers[questions[step].id] === opt.value
                        ? "border-orange-400 bg-orange-50"
                        : "border-slate-100 hover:border-orange-200 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-sm font-medium text-slate-700">{opt.label}</span>
                  </button>
                ))}
              </div>
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setStep(Math.max(0, step - 1))}
                  disabled={step === 0}
                  className="text-sm text-slate-500 hover:text-navy-700 disabled:opacity-30 flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
                  Precedent
                </button>
                {answers[questions[step].id] && step < questions.length - 1 && (
                  <button
                    onClick={() => setStep(step + 1)}
                    className="text-sm text-orange-500 hover:text-orange-600 font-medium flex items-center gap-1"
                  >
                    Suivant
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

          ) : (
            <div className="text-center py-8">
              <p className="text-slate-600">Veuillez repondre a toutes les questions.</p>
              <button onClick={() => setStep(0)} className="mt-4 btn-secondary">Reprendre</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
