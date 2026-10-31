"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

interface Application {
  id: number;
  opportunity_title: string;
  opportunity_type: string;
  status: string;
  created_at: string;
}

export default function ApplicationsPage() {
  const { token, isAuthenticated } = useAuth();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/talents/login");
      return;
    }
    apiFetch<{ results: Application[] }>("/talents/applications/", { token: token! })
      .then((data) => setApplications(data.results || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isAuthenticated, token, router]);

  const statusLabels: Record<string, { label: string; color: string }> = {
    submitted: { label: "Soumise", color: "bg-yellow-50 text-yellow-700" },
    reviewing: { label: "En cours d’examen", color: "bg-blue-50 text-blue-700" },
    shortlisted: { label: "Preselectionne", color: "bg-indigo-50 text-indigo-700" },
    accepted: { label: "Acceptee", color: "bg-green-50 text-green-700" },
    rejected: { label: "Refusee", color: "bg-red-50 text-red-700" },
  };

  if (loading) return <div className="section-padding text-center">Chargement...</div>;

  return (
    <section className="section-padding bg-gradient-cool">
      <div className="container-bmc max-w-3xl">
        <h1 className="heading-2 mb-8">Mes candidatures</h1>
        {applications.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-xl">
            <p className="text-slate-600">Vous n&apos;avez pas encore de candidature.</p>
            <a href="/talents/opportunities" className="mt-4 inline-block text-orange-500 font-medium hover:underline">
              Voir les opportunites
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => {
              const status = statusLabels[app.status] || { label: app.status, color: "bg-slate-50 text-slate-700" };
              return (
                <div key={app.id} className="bg-white rounded-xl p-5 border border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-navy-700">{app.opportunity_title}</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Postule le {new Date(app.created_at).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${status.color}`}>
                    {status.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
