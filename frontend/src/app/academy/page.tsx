import type { Metadata } from "next";
import Link from "next/link";
import SectionTitle from "@/components/ui/SectionTitle";

export const metadata: Metadata = {
  title: "BMC Academy",
  description: "Decouvrez nos formations en techniques de vente, management, developpement personnel et plus.",
};

const formations = [
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

export default function AcademyPage() {
  return (
    <>
      <section className="bg-navy-700 text-white">
        <div className="container-bmc px-4 sm:px-6 lg:px-8 py-20">
          <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">BMC Academy</span>
          <h1 className="text-4xl sm:text-5xl font-bold font-display mt-3 mb-6">
            Developpez vos competences
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl">
            Des formations concretes et operationnelles pour accompagner le developpement de vos equipes et de votre carriere.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-bmc">
          <SectionTitle label="Catalogue" title="Nos formations disponibles" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formations.map((f, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-slate-100 hover:border-orange-200 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-lg bg-navy-700 flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-sm">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="text-base font-semibold text-navy-700 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/contact" className="btn-primary">
              Demander des informations
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
