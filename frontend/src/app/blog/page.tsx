import type { Metadata } from "next";
import SectionTitle from "@/components/ui/SectionTitle";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conseils & Ressources",
  description: "Articles, conseils et ressources sur le developpement commercial, le management et l\u2019entrepreneuriat.",
};

export default function BlogPage() {
  return (
    <>
      <section className="bg-navy-700 text-white">
        <div className="container-bmc px-4 sm:px-6 lg:px-8 py-20">
          <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">Blog</span>
          <h1 className="text-4xl sm:text-5xl font-bold font-display mt-3 mb-6">Conseils & Ressources</h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            Articles, conseils et ressources pour developper vos competences commerciales et votre activite.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-bmc">
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-slate-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
              </svg>
            </div>
            <h2 className="heading-3 mb-4">Les premiers articles arrivent bientot</h2>
            <p className="text-body max-w-md mx-auto mb-6">
              Notre equipe editoriale prepare des contenus de qualite sur le developpement commercial, le management et l\u2019entrepreneuriat.
            </p>
            <Link href="/contact" className="btn-primary">
              Restez informe
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
