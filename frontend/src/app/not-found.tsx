import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center">
      <div className="container-bmc text-center px-4">
        <h1 className="text-8xl font-bold font-display text-navy-700 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">Page introuvable</h2>
        <p className="text-body max-w-md mx-auto mb-8">
          La page que vous recherchez n\u2019existe pas ou a ete deplacee.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            Retour a l\u2019accueil
          </Link>
          <Link href="/contact" className="btn-secondary">
            Nous contacter
          </Link>
        </div>
      </div>
    </section>
  );
}
