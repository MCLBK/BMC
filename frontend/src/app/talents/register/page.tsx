"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiPost } from "@/lib/api";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    try {
      await apiPost("/auth/register/", {
        username: fd.get("username"),
        email: fd.get("email"),
        first_name: fd.get("first_name"),
        last_name: fd.get("last_name"),
        phone: fd.get("phone"),
        password: fd.get("password"),
        password_confirm: fd.get("password_confirm"),
      });
      router.push("/talents/login?registered=true");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l\u2019inscription.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section-padding">
      <div className="container-bmc max-w-lg">
        <h1 className="heading-2 text-center mb-8">Creer un compte Talent</h1>
        <form onSubmit={handleSubmit} className="space-y-5 bg-white p-8 rounded-xl border border-slate-100 shadow-sm">
          {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">{error}</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Prenom *</label>
              <input type="text" name="first_name" required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nom *</label>
              <input type="text" name="last_name" required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nom d\u2019utilisateur *</label>
            <input type="text" name="username" required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
            <input type="email" name="email" required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Telephone</label>
            <input type="tel" name="phone" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Mot de passe *</label>
              <input type="password" name="password" required minLength={8} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Confirmer *</label>
              <input type="password" name="password_confirm" required minLength={8} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none" />
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? "Creation..." : "Creer mon compte"}
          </button>
          <p className="text-center text-sm text-slate-600">
            Deja un compte ?{" "}
            <Link href="/talents/login" className="text-orange-500 font-medium hover:underline">Se connecter</Link>
          </p>
        </form>
      </div>
    </section>
  );
}
