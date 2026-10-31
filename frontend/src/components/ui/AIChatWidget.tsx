"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { apiPost } from "@/lib/api";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "Quels services proposez-vous ?",
  "Comment fonctionne le diagnostic commercial ?",
  "Je cherche une formation pour mon equipe",
  "Comment rejoindre le reseau de talents ?",
];

const FALLBACK_RESPONSES: Record<string, { keywords: string[]; response: string }> = {
  services: {
    keywords: ["service", "prestation", "offre", "proposez", "faites"],
    response: "Le Cabinet BMC propose : audit commercial, formation des equipes, recrutement de forces de vente, televente, coaching, conseil en image et communication. Quel domaine vous interesse ?",
  },
  formation: {
    keywords: ["formation", "academy", "apprendre", "module", "cours", "former"],
    response: "BMC Academy propose 9 modules de formation : techniques de vente, management, developpement personnel, prise de parole en public, gestion du temps et des emotions, relation client, et plus. Souhaitez-vous des details sur un module specifique ?",
  },
  diagnostic: {
    keywords: ["diagnostic", "evaluer", "audit", "analyse", "maturite"],
    response: "Notre diagnostic commercial vous permet d’evaluer la maturite commerciale de votre entreprise. Rendez-vous sur notre page Diagnostic pour le realiser en ligne, ou contactez-nous pour un audit approfondi.",
  },
  talent: {
    keywords: ["talent", "profil", "cv", "candidat", "opportunit", "rejoindre", "recrutement"],
    response: "Rejoignez le reseau de talents BMC ! Creez votre profil en ligne, deposez votre CV et accedez aux opportunites : missions terrain, televente, closing, et plus. Inscrivez-vous sur notre page Talents.",
  },
  contact: {
    keywords: ["contact", "telephone", "email", "joindre", "adresse", "appeler"],
    response: "Vous pouvez nous joindre par telephone au +229 91 47 41 41, par email a cabinetbmc20@gmail.com, ou via le formulaire de contact sur notre site.",
  },
  coaching: {
    keywords: ["coaching", "coach", "accompagnement", "personnel", "professionnel"],
    response: "Le Cabinet BMC propose des programmes de coaching personnalises pour salaries, etudiants, commerciaux et entrepreneurs. Contactez-nous pour definir un programme adapte a vos objectifs.",
  },
  prix: {
    keywords: ["prix", "tarif", "cout", "combien", "devis", "budget"],
    response: "Nos tarifs sont adaptes a chaque projet. Demandez un devis personnalise via notre page Entreprises ou contactez-nous au +229 91 47 41 41 pour en discuter.",
  },
};

function getLocalFallback(message: string): string {
  const msg = message.toLowerCase();
  for (const entry of Object.values(FALLBACK_RESPONSES)) {
    if (entry.keywords.some((kw) => msg.includes(kw))) {
      return entry.response;
    }
  }
  return "Merci pour votre question ! Le Cabinet BMC est specialise en developpement commercial. Nous proposons audit, formation, force de vente, coaching et communication. Comment puis-je vous orienter ?";
}

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Bonjour ! Je suis l\u2019assistant du Cabinet BMC. Comment puis-je vous aider ?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(text?: string) {
    const msg = text || input.trim();
    if (!msg || loading) return;

    const userMsg: Message = { role: "user", content: msg };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const resp = await apiPost<{ response: string }>("/assistant/chat/", {
        message: msg,
        history: messages.slice(-6),
      });
      setMessages((prev) => [...prev, { role: "assistant", content: resp.response }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: getLocalFallback(msg) },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    handleSend();
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-navy-700 rounded-full shadow-lg hover:bg-navy-600 hover:scale-110 transition-all duration-300 flex items-center justify-center"
        aria-label={open ? "Fermer l\u2019assistant" : "Ouvrir l\u2019assistant"}
      >
        {open ? (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 left-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden" style={{ maxHeight: "70vh" }}>
          {/* Header */}
          <div className="bg-navy-700 text-white px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">BMC</span>
            </div>
            <div>
              <p className="text-sm font-semibold">Assistant BMC</p>
              <p className="text-xs text-slate-300">Toujours disponible</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: "250px", maxHeight: "400px" }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.role === "user"
                      ? "bg-navy-700 text-white rounded-br-md"
                      : "bg-slate-100 text-slate-700 rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(s)}
                  className="text-xs bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full hover:bg-orange-100 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-slate-100 p-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Votre question..."
              className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center text-white hover:bg-orange-600 transition-colors disabled:opacity-50"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
