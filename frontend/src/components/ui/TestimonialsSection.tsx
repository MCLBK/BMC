"use client";

import ScrollReveal from "./ScrollReveal";

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-navy-700 text-white">
      <div className="container-bmc text-center">
        <ScrollReveal>
          <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">Temoignages</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display mt-3 mb-8">
            Ce que disent nos clients
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-navy-600/50 rounded-2xl p-8 border border-navy-500/30">
              <svg className="w-10 h-10 text-orange-400 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
              <p className="text-lg text-slate-300 italic leading-relaxed mb-4">
                Les temoignages de nos clients seront affiches ici au fur et a mesure de nos collaborations.
                Chaque retour presente sera authentique et verifie.
              </p>
              <p className="text-sm text-orange-400 font-medium">
                Section reservee aux retours clients reels
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
