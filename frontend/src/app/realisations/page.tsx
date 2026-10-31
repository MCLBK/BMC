import type { Metadata } from "next";
import SectionTitle from "@/components/ui/SectionTitle";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nos Realisations",
  description: "Decouvrez les interventions et realisations du Cabinet BMC.",
};

export default function RealisationsPage() {
  return (
    <>
      <section className="bg-navy-700 text-white">
        <div className="container-bmc px-4 sm:px-6 lg:px-8 py-20">
          <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">Realisations</span>
          <h1 className="text-4xl sm:text-5xl font-bold font-display mt-3 mb-6">Nos interventions</h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            Decouvrez comment nous avons accompagne nos clients dans leur developpement commercial.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-bmc">
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-slate-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
              </svg>
            </div>
            <h2 className="heading-3 mb-4">Nos realisations arrivent bientot</h2>
            <p className="text-body max-w-md mx-auto mb-6">
              Cette section sera alimentee au fur et a mesure de nos interventions. Les realisations presentees ici seront exclusivement basees sur des cas reels.
            </p>
            <Link href="/contact" className="btn-primary">
              Contactez-nous pour discuter de votre projet
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
