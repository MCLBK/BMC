"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    try {
      await login(fd.get("username") as string, fd.get("password") as string);
      router.push("/talents/dashboard");
    } catch {
      setError("Identifiants incorrects. Verifiez votre nom d\u2019utilisateur et mot de passe.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section-padding">
      <div className="container-bmc max-w-md">
        <h1 className="heading-2 text-center mb-8">Connexion Talents</h1>
        <form onSubmit={handleSubmit} className="space-y-5 bg-white p-8 rounded-xl border border-slate-100 shadow-sm">
          {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">{error}</div>}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nom d\u2019utilisateur</label>
            <input type="text" name="username" required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mot de passe</label>
            <input type="password" name="password" required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none" />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? "Connexion..." : "Se connecter"}
          </button>
          <p className="text-center text-sm text-slate-600">
            Pas encore de compte ?{" "}
            <Link href="/talents/register" className="text-orange-500 font-medium hover:underline">Creer un compte</Link>
          </p>
        </form>
      </div>
    </section>
  );
}
