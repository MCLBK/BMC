import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  cabinet: [
    { name: "Qui sommes-nous", href: "/cabinet" },
    { name: "Nos expertises", href: "/expertises" },
    { name: "Realisations", href: "/realisations" },
    { name: "Blog", href: "/blog" },
  ],
  services: [
    { name: "Audit commercial", href: "/expertises/audit-commercial" },
    { name: "Formation commerciale", href: "/expertises/formation-commerciale" },
    { name: "Force de vente", href: "/expertises/force-de-vente" },
    { name: "Coaching", href: "/expertises/coaching-personnel" },
    { name: "Communication", href: "/expertises/communication" },
  ],
  actions: [
    { name: "Demande de prestation", href: "/entreprises" },
    { name: "Rejoindre les talents", href: "/talents" },
    { name: "Formations", href: "/academy" },
    { name: "Contact", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy-700 text-white">
      <div className="container-bmc section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Image
              src="/images/logo-bmc-white.png"
              alt="Cabinet BMC"
              width={140}
              height={50}
              className="h-12 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Cabinet specialise en Developpement et Animation Commerciale.
              Votre partenaire en excellence commerciale.
            </p>
            <div className="space-y-2 text-sm text-slate-300">
              <p>+229 91 47 41 41</p>
              <p>+229 58 99 31 77</p>
              <p>cabinetbmc20@gmail.com</p>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-4 text-orange-400">Le Cabinet</h3>
            <ul className="space-y-2">
              {footerLinks.cabinet.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-300 hover:text-orange-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-4 text-orange-400">Nos Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-300 hover:text-orange-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-4 text-orange-400">Actions</h3>
            <ul className="space-y-2">
              {footerLinks.actions.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-300 hover:text-orange-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-600 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Cabinet BMC — Business Marketing & Coaching. Tous droits reserves.
          </p>
        </div>
      </div>
    </footer>
  );
}
