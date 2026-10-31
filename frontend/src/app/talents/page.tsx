import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Talents BMC",
  description: "Rejoignez le reseau de talents BMC et accedez a des opportunites commerciales uniques.",
};

const profiles = [
  { title: "Commerciaux Terrain", desc: "Experts en vente directe, interagissant avec les clients sur le terrain." },
  { title: "Commerciaux Specialises", desc: "Professionnels ciblant des marches ou produits specifiques." },
  { title: "Elite des Commerciaux", desc: "Equipe d\u2019elite formee pour exceller dans les defis les plus complexes." },
  { title: "Hotesses Commerciales", desc: "Hotesses de reception et de stand pour accueillir et informer les clients." },
  { title: "Equipes de Suivi", desc: "Suivi regulier des prospects et clients pour une relation continue." },
  { title: "Equipe de Closing", desc: "Specialisee dans la finalisation des ventes." },
];

export default function TalentsPage() {
  return (
    <>
      <section className="relative bg-navy-700 text-white overflow-hidden">
        <Image src={images.talents} alt="Professionnels dynamiques" fill className="object-cover opacity-20" />
        <div className="relative container-bmc px-4 sm:px-6 lg:px-8 py-20">
          <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">Talents BMC</span>
          <h1 className="text-4xl sm:text-5xl font-bold font-display mt-3 mb-6">
            Rejoignez notre reseau de talents
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl">
            Professionnels, commerciaux, etudiants ou jeunes diplomes : integrez le reseau BMC et accedez a des opportunites uniques.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-bmc">
          <SectionTitle label="Profils recherches" title="Les talents que nous recherchons" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {profiles.map((p, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-slate-100">
                <h3 className="text-lg font-semibold text-navy-700 mb-2">{p.title}</h3>
                <p className="text-sm text-slate-600">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center bg-slate-50 rounded-2xl p-10">
            <h2 className="heading-3 mb-4">Pret a rejoindre BMC ?</h2>
            <p className="text-body mb-6 max-w-xl mx-auto">
              Creez votre profil, deposez votre CV et accedez aux opportunites du cabinet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/talents/register" className="btn-primary">Creer mon profil</Link>
              <Link href="/talents/login" className="btn-secondary">Se connecter</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
