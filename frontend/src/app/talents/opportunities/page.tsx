"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { apiFetch, apiPost } from "@/lib/api";
import type { Opportunity } from "@/lib/types";

export default function OpportunitiesPage() {
  const { token, isAuthenticated } = useAuth();
  const router = useRouter();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState<number | null>(null);
  const [applied, setApplied] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/talents/login");
      return;
    }
    apiFetch<{ results: Opportunity[] }>("/talents/opportunities/", { token: token! })
      .then((data) => setOpportunities(data.results || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isAuthenticated, token, router]);

  async function handleApply(opportunityId: number) {
    setApplying(opportunityId);
    try {
      await apiPost("/talents/apply/", { opportunity: opportunityId }, { token: token! });
      setApplied((prev) => new Set(prev).add(opportunityId));
    } catch {
      // Already applied or error
    } finally {
      setApplying(null);
    }
  }

  const typeLabels: Record<string, string> = {
    terrain: "Terrain",
    specialized: "Specialise",
    elite: "Elite",
    hostess: "Hotesse",
    follow_up: "Suivi",
    closing: "Closing",
    telesales: "Televente",
  };

  if (loading) return <div className="section-padding text-center">Chargement...</div>;

  return (
    <section className="section-padding bg-gradient-cool">
      <div className="container-bmc">
        <h1 className="heading-2 mb-8">Opportunites disponibles</h1>
        {opportunities.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-xl">
            <p className="text-slate-600">Aucune opportunite disponible pour le moment.</p>
            <p className="text-sm text-slate-500 mt-2">Revenez regulierement pour decouvrir de nouvelles missions.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {opportunities.map((opp) => (
              <div key={opp.id} className="bg-white rounded-xl p-6 border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-navy-700">{opp.title}</h3>
                  <span className="text-xs font-medium bg-orange-50 text-orange-600 px-2 py-1 rounded">
                    {typeLabels[opp.opportunity_type] || opp.opportunity_type}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-4 line-clamp-3">{opp.description}</p>
                <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-4">
                  {opp.location && (
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                      {opp.location}
                    </span>
                  )}
                  {opp.duration && <span>{opp.duration}</span>}
                </div>
                {applied.has(opp.id) ? (
                  <span className="text-sm font-medium text-green-600">Candidature envoyee</span>
                ) : (
                  <button
                    onClick={() => handleApply(opp.id)}
                    disabled={applying === opp.id}
                    className="text-sm font-medium text-orange-500 hover:text-orange-600"
                  >
                    {applying === opp.id ? "Envoi..." : "Postuler"}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
