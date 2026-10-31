"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import { apiPost } from "@/lib/api";
import SectionTitle from "@/components/ui/SectionTitle";
import { images } from "@/lib/images";

const serviceTypes = [
  { value: "audit", label: "Audit commercial" },
  { value: "training", label: "Formation" },
  { value: "recruitment", label: "Recrutement / Force de vente" },
  { value: "telesales", label: "Televente" },
  { value: "coaching", label: "Coaching" },
  { value: "communication", label: "Communication" },
  { value: "brand_ambassador", label: "Brand Ambassador" },
  { value: "image_consulting", label: "Conseil en image" },
  { value: "other", label: "Autre" },
];

export default function EntreprisesPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    try {
      await apiPost("/enterprises/request/", {
        request_type: fd.get("request_type"),
        company_name: fd.get("company_name"),
        contact_name: fd.get("contact_name"),
        contact_email: fd.get("contact_email"),
        contact_phone: fd.get("contact_phone"),
        position: fd.get("position"),
        subject: fd.get("subject"),
        message: fd.get("message"),
        team_size: fd.get("team_size"),
        timeline: fd.get("timeline"),
      });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l\u2019envoi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="relative bg-navy-700 text-white overflow-hidden">
        <Image src={images.entreprises} alt="Equipe professionnelle" fill className="object-cover opacity-20" />
        <div className="relative container-bmc px-4 sm:px-6 lg:px-8 py-20">
          <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">Entreprises</span>
          <h1 className="text-4xl sm:text-5xl font-bold font-display mt-3 mb-6">
            Developpez votre performance commerciale
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl">
            Decrivez votre besoin et notre equipe vous proposera un accompagnement adapte.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gradient-cool">
        <div className="container-bmc max-w-3xl">
          <SectionTitle title="Demande de prestation" description="Remplissez ce formulaire pour nous decrire votre besoin. Nous reviendrons vers vous rapidement." />

          {success ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Demande envoyee</h3>
              <p className="text-green-700">Notre equipe analysera votre demande et vous contactera dans les meilleurs delais.</p>
              <button onClick={() => setSuccess(false)} className="mt-4 text-sm text-green-600 underline">Nouvelle demande</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">{error}</div>}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Type de prestation *</label>
                <select name="request_type" required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none">
                  <option value="">Selectionnez...</option>
                  {serviceTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Entreprise *</label>
                  <input type="text" name="company_name" required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nom du contact *</label>
                  <input type="text" name="contact_name" required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                  <input type="email" name="contact_email" required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Telephone *</label>
                  <input type="tel" name="contact_phone" required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Fonction</label>
                  <input type="text" name="position" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Taille de l\u2019equipe</label>
                  <input type="text" name="team_size" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Objet de la demande *</label>
                <input type="text" name="subject" required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description du besoin *</label>
                <textarea name="message" rows={5} required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none resize-y" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Delai souhaite</label>
                <input type="text" name="timeline" placeholder="Ex: Sous 2 semaines" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none" />
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
                {loading ? "Envoi en cours..." : "Envoyer la demande"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
