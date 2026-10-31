import type { Metadata } from "next";
import ContactForm from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez le Cabinet BMC pour discuter de vos projets de developpement commercial.",
};

const contacts = [
  { label: "Telephone", values: ["+229 91 47 41 41", "+229 58 99 31 77", "+229 96 34 75 77"], icon: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" },
  { label: "Email", values: ["cabinetbmc20@gmail.com"], icon: "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" },
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy-700 text-white">
        <div className="container-bmc px-4 sm:px-6 lg:px-8 py-20">
          <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">Contact</span>
          <h1 className="text-4xl sm:text-5xl font-bold font-display mt-3 mb-6">Parlons de votre projet</h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            Notre equipe est a votre disposition pour repondre a vos questions et vous accompagner dans vos projets.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-bmc">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="heading-3 mb-6">Envoyez-nous un message</h2>
              <ContactForm />
            </div>
            <div>
              <h2 className="heading-3 mb-6">Nos coordonnees</h2>
              <div className="space-y-6">
                {contacts.map((c) => (
                  <div key={c.label} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d={c.icon} />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy-700">{c.label}</p>
                      {c.values.map((v) => (
                        <p key={v} className="text-sm text-slate-600">{v}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
