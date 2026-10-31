"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import { apiPost } from "@/lib/api";
import SectionTitle from "@/components/ui/SectionTitle";
import { images } from "@/lib/images";

export default function DevisPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    try {
      await apiPost("/enterprises/quote/", {
        company_name: fd.get("company_name"),
        contact_name: fd.get("contact_name"),
        contact_email: fd.get("contact_email"),
        contact_phone: fd.get("contact_phone"),
        sector: fd.get("sector"),
        description: fd.get("description"),
        specifications: fd.get("specifications"),
      });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l’envoi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="relative bg-navy-700 text-white overflow-hidden">
        <Image src={images.entreprises} alt="Espace professionnel" fill className="object-cover opacity-20" />
        <div className="relative container-bmc px-4 sm:px-6 lg:px-8 py-20">
          <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">Devis</span>
          <h1 className="text-4xl sm:text-5xl font-bold font-display mt-3 mb-6">
            Demandez un devis
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            Decrivez votre projet et recevez une proposition commerciale adaptee a vos besoins.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gradient-cool">
        <div className="container-bmc max-w-3xl">
          <SectionTitle title="Formulaire de demande de devis" />

          {success ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Demande envoyee</h3>
              <p className="text-green-700">Nous preparons votre devis et vous recontacterons rapidement.</p>
              <button onClick={() => setSuccess(false)} className="mt-4 text-sm text-green-600 underline">Nouvelle demande</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">{error}</div>}

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

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Secteur d&apos;activite</label>
                <input type="text" name="sector" placeholder="Ex: Agroalimentaire, Telecom, Banque..." className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description du projet *</label>
                <textarea name="description" rows={5} required placeholder="Decrivez votre projet et les services souhaites..." className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none resize-y" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Cahier des charges / Precisions</label>
                <textarea name="specifications" rows={3} placeholder="Informations complementaires, contraintes, budget indicatif, delais..." className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none resize-y" />
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
                {loading ? "Envoi en cours..." : "Demander un devis"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
