"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { apiFetch, apiUpload } from "@/lib/api";

interface TalentProfile {
  headline: string;
  bio: string;
  phone: string;
  city: string;
  country: string;
  education: string;
  experience: string;
  skills: string;
  sectors: string;
  languages: string;
  availability: string;
  geographic_zone: string;
  years_experience: number | null;
  cv: string | null;
  is_profile_complete: boolean;
}

export default function ProfilePage() {
  const { user, token, isAuthenticated } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<TalentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/talents/login");
      return;
    }
    apiFetch<TalentProfile>("/talents/profile/", { token: token! })
      .then(setProfile)
      .catch(() => setProfile({ headline: "", bio: "", phone: "", city: "", country: "Benin", education: "", experience: "", skills: "", sectors: "", languages: "", availability: "available", geographic_zone: "", years_experience: null, cv: null, is_profile_complete: false }))
      .finally(() => setLoading(false));
  }, [isAuthenticated, token, router]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    const fd = new FormData(e.currentTarget);
    try {
      const fields = ["headline", "bio", "phone", "city", "country", "education", "experience", "skills", "sectors", "languages", "availability", "geographic_zone", "years_experience"];
      const cvFile = (e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement)?.files?.[0];
      if (cvFile) {
        const uploadData = new FormData();
        uploadData.append("cv", cvFile);
        for (const key of fields) {
          const val = fd.get(key);
          if (val !== null) uploadData.set(key, val as string);
        }
        await apiUpload("/talents/profile/", uploadData, { token: token! });
      } else {
        const body: Record<string, unknown> = {};
        for (const key of fields) {
          body[key] = fd.get(key) || "";
        }
        const ye = fd.get("years_experience");
        body.years_experience = ye ? parseInt(ye as string, 10) : null;
        await apiFetch("/talents/profile/", {
          token: token!,
          method: "PUT",
          body: JSON.stringify(body),
        });
      }
      setMessage("Profil mis a jour avec succes.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Erreur lors de la sauvegarde.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="section-padding text-center">Chargement...</div>;

  return (
    <section className="section-padding bg-gradient-cool">
      <div className="container-bmc max-w-2xl">
        <h1 className="heading-2 mb-8">Mon profil</h1>
        {message && (
          <div className={`mb-6 p-4 rounded-lg text-sm ${message.includes("succes") ? "bg-green-50 border border-green-200 text-green-700" : "bg-red-50 border border-red-200 text-red-700"}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Titre professionnel</label>
            <input type="text" name="headline" defaultValue={profile?.headline} placeholder="Ex: Commercial terrain senior" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Presentation</label>
            <textarea name="bio" rows={4} defaultValue={profile?.bio} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none resize-y" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Telephone</label>
              <input type="tel" name="phone" defaultValue={profile?.phone} placeholder="+229 XX XX XX XX" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Ville</label>
              <input type="text" name="city" defaultValue={profile?.city} placeholder="Ex: Cotonou" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Pays</label>
              <input type="text" name="country" defaultValue={profile?.country} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Annees d&apos;experience</label>
              <input type="number" name="years_experience" min={0} defaultValue={profile?.years_experience ?? ""} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Competences</label>
            <textarea name="skills" rows={2} defaultValue={profile?.skills} placeholder="Ex: Vente B2B, Negociation, CRM, Prospection..." className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none resize-y" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Experiences professionnelles</label>
            <textarea name="experience" rows={4} defaultValue={profile?.experience} placeholder="Decrivez vos experiences professionnelles..." className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none resize-y" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Formation</label>
            <textarea name="education" rows={2} defaultValue={profile?.education} placeholder="Diplomes et formations..." className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none resize-y" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Secteurs d&apos;activite</label>
              <input type="text" name="sectors" defaultValue={profile?.sectors} placeholder="Ex: FMCG, Telecom, Banque..." className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Langues</label>
              <input type="text" name="languages" defaultValue={profile?.languages} placeholder="Ex: Francais, Anglais, Fon..." className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Disponibilite</label>
              <select name="availability" defaultValue={profile?.availability} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none">
                <option value="available">Disponible</option>
                <option value="partially">Partiellement disponible</option>
                <option value="unavailable">Non disponible</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Zone geographique</label>
              <input type="text" name="geographic_zone" defaultValue={profile?.geographic_zone} placeholder="Ex: Cotonou et environs" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">CV (PDF, max 5 Mo)</label>
            <input type="file" accept=".pdf" className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-500 hover:file:bg-orange-100" />
            {profile?.cv && <p className="text-xs text-green-600 mt-1">CV actuel enregistre</p>}
          </div>
          <button type="submit" disabled={saving} className="btn-primary w-full disabled:opacity-50">
            {saving ? "Sauvegarde..." : "Mettre a jour mon profil"}
          </button>
        </form>
      </div>
    </section>
  );
}
