import type { Metadata } from "next";
import SectionTitle from "@/components/ui/SectionTitle";

export const metadata: Metadata = {
  title: "Le Cabinet",
  description: "Decouvrez le Cabinet BMC, specialise en Developpement et Animation Commerciale au Benin.",
};

const domaines = [
  "Audit et diagnostic commercial",
  "Formation et management des equipes commerciales",
  "Recrutement et mise a disposition de forces de vente",
  "Constitution d\u2019equipes specialisees (closing, prospection, upselling)",
  "Televente",
  "Positionnement de produits via Brand Ambassadors",
  "Coaching personnel et professionnel",
  "Conseil en image",
  "Communication, strategie et webmarketing",
];

export default function CabinetPage() {
  return (
    <>
      <section className="bg-navy-700 text-white">
        <div className="container-bmc px-4 sm:px-6 lg:px-8 py-20">
          <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">Le Cabinet</span>
          <h1 className="text-4xl sm:text-5xl font-bold font-display mt-3 mb-6">Qui sommes-nous ?</h1>
          <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
            Le Cabinet BMC est specialise en Developpement et Animation Commerciale. Notre mission est
            d\u2019optimiser et de mobiliser les ressources de votre entreprise pour l\u2019atteinte d\u2019une excellence commerciale.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-bmc">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="heading-2 mb-6">Notre Mission</h2>
              <p className="text-body mb-4">
                Nous accompagnons les entreprises dans l\u2019optimisation de leur organisation commerciale
                a travers la mise en place de programmes de formations en techniques de vente, management
                d\u2019equipe, developpement personnel et developpement de competences.
              </p>
              <p className="text-body">
                Nous intervenons dans les differents domaines ou le besoin se fait sentir,
                avec une approche pragmatique orientee vers les resultats concrets.
              </p>
            </div>
            <div>
              <h2 className="heading-2 mb-6">Notre Approche</h2>
              <p className="text-body mb-4">
                Nous sommes en partenariat avec des consultants et experts chevronnes ainsi que
                des cabinets exercant dans ces divers domaines, ce qui nous permet de proposer
                des solutions completes et adaptees a chaque contexte.
              </p>
              <p className="text-body">
                Notre force reside dans notre capacite a mobiliser rapidement les ressources
                humaines adaptees aux besoins specifiques de chaque client.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-bmc">
          <SectionTitle
            label="Nos domaines"
            title="Un ecosysteme commercial complet"
            description="BMC couvre l\u2019ensemble de la chaine de valeur commerciale, du diagnostic a la mise en oeuvre operationnelle."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {domaines.map((d, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-slate-100">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-orange-500 font-bold text-sm">{i + 1}</span>
                </div>
                <p className="text-sm text-slate-700 font-medium">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
