import type { Metadata } from "next";
import Link from "next/link";
import SectionTitle from "@/components/ui/SectionTitle";

export const metadata: Metadata = {
  title: "Nos Expertises",
  description: "Decouvrez l\u2019ensemble des services du Cabinet BMC : audit, formation, force de vente, coaching et communication.",
};

const services = [
  {
    category: "Developpement Commercial",
    items: [
      { name: "Audit Commercial", slug: "audit-commercial", desc: "Analysez votre performance commerciale avec un diagnostic interne et externe complet." },
      { name: "Formation des Equipes Commerciales", slug: "formation-commerciale", desc: "9 modules de formation : techniques de vente, management, relation client, prospection et plus." },
      { name: "Recrutement & Force de Vente", slug: "force-de-vente", desc: "Recrutement, mise a disposition et suivi de commerciaux adaptes a vos besoins." },
    ],
  },
  {
    category: "Force de Vente Operationnelle",
    items: [
      { name: "Equipes Specialisees", slug: "equipes-specialisees", desc: "Forces Speciales, Equipe de Closing, Equipe de Vente Additionnelle et cross-selling." },
      { name: "Televente", slug: "televente", desc: "Mise en place d\u2019equipes de televente pour augmenter les ventes a distance." },
      { name: "Brand Ambassadors", slug: "brand-ambassadors", desc: "Positionnez vos produits via nos ambassadeurs et notre reseau de distribution All10." },
    ],
  },
  {
    category: "Accompagnement & Developpement",
    items: [
      { name: "Coaching Personnel", slug: "coaching-personnel", desc: "Programmes personnalises pour salaries, etudiants, commerciaux et entrepreneurs." },
      { name: "Conseil en Image", slug: "conseil-en-image", desc: "Accompagnement en image professionnelle pour individus et equipes." },
      { name: "Communication & Marketing", slug: "communication", desc: "Strategie, creation graphique, video, webmarketing et gestion des reseaux sociaux." },
    ],
  },
];

export default function ExpertisesPage() {
  return (
    <>
      <section className="bg-navy-700 text-white">
        <div className="container-bmc px-4 sm:px-6 lg:px-8 py-20">
          <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">Nos Expertises</span>
          <h1 className="text-4xl sm:text-5xl font-bold font-display mt-3 mb-6">
            L\u2019excellence commerciale, de A a Z
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl">
            Du diagnostic a la mise en oeuvre operationnelle, nous vous accompagnons sur toutes les
            dimensions de votre developpement commercial.
          </p>
        </div>
      </section>

      {services.map((cat, ci) => (
        <section key={ci} className={ci % 2 === 0 ? "section-padding" : "section-padding bg-slate-50"}>
          <div className="container-bmc">
            <SectionTitle title={cat.category} centered={false} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.items.map((item) => (
                <Link
                  key={item.slug}
                  href={`/expertises/${item.slug}`}
                  className="group bg-white rounded-xl p-6 border border-slate-100 hover:border-orange-200 hover:shadow-lg transition-all"
                >
                  <h3 className="text-lg font-semibold text-navy-700 mb-3 group-hover:text-orange-500 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{item.desc}</p>
                  <span className="text-sm font-medium text-orange-500 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    En savoir plus
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="bg-orange-500 text-white">
        <div className="container-bmc section-padding text-center">
          <h2 className="text-3xl font-bold font-display mb-4">
            Besoin d\u2019un accompagnement sur mesure ?
          </h2>
          <p className="text-orange-100 mb-8 max-w-xl mx-auto">
            Chaque entreprise est unique. Contactez-nous pour definir ensemble la solution adaptee a vos enjeux.
          </p>
          <Link href="/entreprises" className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-500 font-bold rounded-lg hover:bg-orange-50 transition-colors">
            Demander une prestation
          </Link>
        </div>
      </section>
    </>
  );
}
