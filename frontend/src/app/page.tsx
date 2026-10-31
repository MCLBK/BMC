import Link from "next/link";
import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import ServiceCard from "@/components/ui/ServiceCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TestimonialsSection from "@/components/ui/TestimonialsSection";
import { images } from "@/lib/images";

const featuredServices = [
  { name: "Audit Commercial", slug: "audit-commercial", description: "Analysez la performance commerciale de votre entreprise et identifiez les leviers de croissance." },
  { name: "Formation Commerciale", slug: "formation-commerciale", description: "Developpez les competences de vos equipes avec nos programmes de formation sur mesure." },
  { name: "Force de Vente", slug: "force-de-vente", description: "Beneficiez de commerciaux formes et operationnels, deployes selon vos besoins." },
  { name: "Coaching Personnel", slug: "coaching-personnel", description: "Accompagnement personnalise pour salaries, etudiants, commerciaux et entrepreneurs." },
  { name: "Communication", slug: "communication", description: "Strategie, creation graphique, webmarketing et gestion de vos reseaux sociaux." },
  { name: "Televente", slug: "televente", description: "Mise en place d’equipes de televente pour augmenter vos ventes a distance." },
];

const audiences = [
  { title: "Entreprises", desc: "Optimisez votre performance commerciale avec nos solutions sur mesure.", href: "/entreprises", icon: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" },
  { title: "Talents", desc: "Rejoignez notre reseau de professionnels et accedez a des opportunites uniques.", href: "/talents", icon: "M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" },
  { title: "Formation", desc: "Developpez vos competences avec BMC Academy et nos programmes certifiants.", href: "/academy", icon: "M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" },
];

const stats = [
  { value: "9+", label: "Domaines d’expertise" },
  { value: "9", label: "Modules de formation" },
  { value: "6", label: "Types d’equipes commerciales" },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative text-white overflow-hidden min-h-[85vh] flex items-center">
        <Image
          src={images.hero}
          alt="Equipe professionnelle en reunion d'affaires"
          fill
          className="object-cover"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-800/80 to-navy-700/60" />
        <div className="relative container-bmc px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-3xl">
            <span className="inline-block text-orange-400 font-semibold text-sm uppercase tracking-wider mb-4">
              Business Marketing &amp; Coaching
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display leading-tight mb-6">
              Votre partenaire en{" "}
              <span className="text-orange-400">excellence commerciale</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-200 leading-relaxed mb-8 max-w-2xl">
              Nous optimisons et mobilisons les ressources de votre entreprise pour atteindre
              vos objectifs commerciaux. Audit, formation, force de vente, coaching et communication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/entreprises" className="btn-primary text-base px-8 py-4">
                Decouvrir nos solutions
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center text-base px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-navy-700 transition-colors">
                Parlons de votre projet
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white border-b border-slate-100">
        <div className="container-bmc px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-3 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl sm:text-4xl font-bold font-display text-orange-500">{s.value}</p>
                <p className="text-sm text-slate-600 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-padding bg-slate-50">
        <div className="container-bmc">
          <ScrollReveal>
            <SectionTitle
              label="Nos expertises"
              title="Des solutions completes pour votre croissance"
              description="Du diagnostic a l&apos;action, nous accompagnons les entreprises dans toutes les dimensions de leur developpement commercial."
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service, i) => (
              <ScrollReveal key={service.slug} delay={i * 0.1}>
                <ServiceCard {...service} />
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div className="text-center mt-10">
              <Link href="/expertises" className="btn-secondary">
                Voir toutes nos expertises
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* AUDIENCES */}
      <section className="section-padding">
        <div className="container-bmc">
          <ScrollReveal>
            <SectionTitle
              label="Qui accompagnons-nous"
              title="Un accompagnement adapte a chaque profil"
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {audiences.map((a, i) => (
              <ScrollReveal key={a.href} delay={i * 0.15}>
                <Link href={a.href} className="group text-center p-8 rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-lg transition-all block">
                  <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-navy-700 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d={a.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-navy-700 mb-2">{a.title}</h3>
                  <p className="text-slate-600 text-sm">{a.desc}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* CTA */}
      <section className="bg-orange-500 text-white">
        <div className="container-bmc section-padding text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
              Pret a transformer votre performance commerciale ?
            </h2>
            <p className="text-lg text-orange-100 mb-8 max-w-2xl mx-auto">
              Contactez-nous pour un premier echange sur vos enjeux. Notre equipe vous proposera un accompagnement adapte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-500 font-bold rounded-lg hover:bg-orange-50 transition-colors">
                Nous contacter
              </Link>
              <Link href="/entreprises/diagnostic" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-orange-500 transition-colors">
                Faire un diagnostic gratuit
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
