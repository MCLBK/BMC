"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { images } from "@/lib/images";
import { apiFetch, apiPost } from "@/lib/api";

interface Training {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  duration: string;
  format: string;
  level: string;
  is_featured: boolean;
  available_spots: number | null;
}

const defaultFormations = [
  { title: "Appropriation de la fonction commerciale", desc: "Maitrisez les fondamentaux de la fonction commerciale et developpez votre posture de vente." },
  { title: "Techniques de vente et simulation", desc: "Apprenez et pratiquez les techniques de vente les plus efficaces a travers des simulations realistes." },
  { title: "Developpement personnel", desc: "Renforcez vos competences personnelles pour exceller dans votre carriere." },
  { title: "Prise de parole en public", desc: "Gagnez en confiance et en impact lors de vos presentations et prises de parole." },
  { title: "Organisation du temps de prospection", desc: "Optimisez votre planning de prospection pour maximiser vos resultats commerciaux." },
  { title: "Gestion des emotions", desc: "Apprenez a gerer vos emotions pour maintenir votre performance en toutes circonstances." },
  { title: "Gestion des reclamations clients", desc: "Transformez les insatisfactions en opportunites de fidelisation." },
  { title: "Relation client et Experience client", desc: "Creez une experience client memorable et fidelisante." },
  { title: "Management des equipes", desc: "Developpez votre leadership et vos competences manageriales." },
];

const formatLabels: Record<string, string> = {
  in_person: "Presentiel",
  online: "En ligne",
  hybrid: "Hybride",
};

const levelLabels: Record<string, string> = {
  beginner: "Debutant",
  intermediate: "Intermediaire",
  advanced: "Avance",
  all: "Tous niveaux",
};

export default function AcademyPage() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [enrolling, setEnrolling] = useState<string | null>(null);
  const [enrollSuccess, setEnrollSuccess] = useState<string | null>(null);
  const [enrollError, setEnrollError] = useState("");
  const [enrollForm, setEnrollForm] = useState({ full_name: "", email: "", phone: "" });

  useEffect(() => {
    apiFetch<{ results: Training[] }>("/academy/trainings/")
      .then((data) => {
        if (data.results && data.results.length > 0) setTrainings(data.results);
      })
      .catch(() => {});
  }, []);

  async function handleEnroll(trainingId: number) {
    setEnrollError("");
    if (!enrollForm.full_name || !enrollForm.email) {
      setEnrollError("Le nom et l'email sont requis.");
      return;
    }
    try {
      await apiPost("/academy/enroll/", { training: trainingId, ...enrollForm });
      setEnrollSuccess(enrolling);
      setEnrolling(null);
      setEnrollForm({ full_name: "", email: "", phone: "" });
    } catch (err) {
      setEnrollError(err instanceof Error ? err.message : "Erreur lors de l'inscription.");
    }
  }

  const hasApiTrainings = trainings.length > 0;

  return (
    <>
      <section className="relative bg-navy-700 text-white overflow-hidden">
        <Image src={images.academy} alt="Salle de formation" fill className="object-cover opacity-20" />
        <div className="relative container-bmc px-4 sm:px-6 lg:px-8 py-20">
          <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">BMC Academy</span>
          <h1 className="text-4xl sm:text-5xl font-bold font-display mt-3 mb-6">
            Developpez vos competences
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl">
            Des formations concretes et operationnelles pour accompagner le developpement de vos equipes et de votre carriere.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gradient-warm">
        <div className="container-bmc">
          <ScrollReveal>
            <SectionTitle label="Catalogue" title="Nos formations" />
          </ScrollReveal>

          {hasApiTrainings ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trainings.map((t, i) => (
                <ScrollReveal key={t.id} delay={i * 0.08}>
                  <div className="bg-white rounded-xl p-6 border border-slate-100 hover:border-orange-200 hover:shadow-md transition-all h-full flex flex-col">
                    {t.is_featured && (
                      <span className="inline-block text-xs font-semibold bg-orange-100 text-orange-600 px-2 py-0.5 rounded mb-3 w-fit">Recommandee</span>
                    )}
                    <h3 className="text-base font-semibold text-navy-700 mb-2">{t.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">{t.short_description}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-slate-500 mb-4">
                      {t.format && <span className="bg-slate-100 px-2 py-0.5 rounded">{formatLabels[t.format] || t.format}</span>}
                      {t.level && <span className="bg-slate-100 px-2 py-0.5 rounded">{levelLabels[t.level] || t.level}</span>}
                      {t.duration && <span className="bg-slate-100 px-2 py-0.5 rounded">{t.duration}</span>}
                    </div>
                    {enrollSuccess === t.slug ? (
                      <p className="text-sm text-green-600 font-medium">Demande envoyee</p>
                    ) : enrolling === t.slug ? (
                      <div className="space-y-2 border-t border-slate-100 pt-3">
                        {enrollError && <p className="text-xs text-red-600">{enrollError}</p>}
                        <input type="text" placeholder="Nom complet *" value={enrollForm.full_name} onChange={(e) => setEnrollForm({ ...enrollForm, full_name: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none" />
                        <input type="email" placeholder="Email *" value={enrollForm.email} onChange={(e) => setEnrollForm({ ...enrollForm, email: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none" />
                        <input type="tel" placeholder="Telephone" value={enrollForm.phone} onChange={(e) => setEnrollForm({ ...enrollForm, phone: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none" />
                        <div className="flex gap-2">
                          <button onClick={() => handleEnroll(t.id)} className="text-sm font-medium bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">Envoyer</button>
                          <button onClick={() => { setEnrolling(null); setEnrollError(""); }} className="text-sm text-slate-500 hover:text-slate-700">Annuler</button>
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => setEnrolling(t.slug)} className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors self-start">
                        S&apos;inscrire
                      </button>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {defaultFormations.map((f, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="bg-white rounded-xl p-6 border border-slate-100 hover:border-orange-200 hover:shadow-md transition-all">
                    <div className="w-10 h-10 rounded-lg bg-navy-700 flex items-center justify-center mb-4">
                      <span className="text-white font-bold text-sm">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="text-base font-semibold text-navy-700 mb-2">{f.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}

          <ScrollReveal>
            <div className="text-center mt-12">
              <Link href="/contact" className="btn-primary">
                Demander des informations
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-bmc text-center max-w-3xl">
          <ScrollReveal>
            <h2 className="heading-2 mb-4">Un accompagnement sur mesure</h2>
            <p className="text-body mb-8">
              Chaque formation peut etre adaptee aux besoins specifiques de votre entreprise.
              Contactez-nous pour discuter d&apos;un programme personnalise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/entreprises" className="btn-primary">Demander une prestation</Link>
              <Link href="/contact" className="btn-secondary">Nous contacter</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
