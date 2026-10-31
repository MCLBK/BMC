"use client";

import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function TalentDashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push("/talents/login");
  }, [isAuthenticated, router]);

  if (!user) return <div className="section-padding text-center">Chargement...</div>;

  return (
    <section className="section-padding bg-gradient-cool min-h-[80vh]">
      <div className="container-bmc">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="heading-2">Bienvenue, {user.first_name || user.username}</h1>
            <p className="text-body mt-1">Gerez votre profil et vos candidatures.</p>
          </div>
          <button onClick={logout} className="text-sm text-slate-500 hover:text-red-500 transition-colors">
            Deconnexion
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-slate-100">
            <h3 className="text-base font-semibold text-navy-700 mb-2">Mon profil</h3>
            <p className="text-sm text-slate-600 mb-4">Completez votre profil pour etre visible par notre equipe.</p>
            <Link href="/talents/profile" className="text-sm font-medium text-orange-500 hover:underline">Editer mon profil</Link>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-100">
            <h3 className="text-base font-semibold text-navy-700 mb-2">Opportunites</h3>
            <p className="text-sm text-slate-600 mb-4">Consultez les opportunites disponibles et postulez.</p>
            <Link href="/talents/opportunities" className="text-sm font-medium text-orange-500 hover:underline">Voir les opportunites</Link>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-100">
            <h3 className="text-base font-semibold text-navy-700 mb-2">Mes candidatures</h3>
            <p className="text-sm text-slate-600 mb-4">Suivez le statut de vos candidatures en cours.</p>
            <Link href="/talents/applications" className="text-sm font-medium text-orange-500 hover:underline">Mes candidatures</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
