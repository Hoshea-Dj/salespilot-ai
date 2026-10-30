
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function signIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      window.location.href = "/";
    }

    setLoading(false);
  }

  async function signUp() {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setMessage(
      error
        ? error.message
        : "Inscription envoyée. Vérifie ta boîte mail pour confirmer ton compte."
    );

    setLoading(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 p-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="text-3xl font-bold text-slate-900">
            SalesPilot <span className="text-violet-600">AI</span>
          </div>
          <p className="mt-2 text-slate-500">
            Votre assistant commercial intelligent.
          </p>
        </div>

        <h1 className="mb-2 text-2xl font-bold text-slate-900">
          Bienvenue
        </h1>
        <p className="mb-6 text-sm text-slate-500">
          Connectez-vous ou créez votre compte.
        </p>

        <form onSubmit={signIn} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Adresse e-mail
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@entreprise.fr"
              className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Mot de passe
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="6 caractères minimum"
              className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-violet-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-violet-600 p-3 font-semibold text-white hover:bg-violet-700 disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <button
          type="button"
          disabled={loading}
          onClick={signUp}
          className="mt-3 w-full rounded-xl border border-slate-200 p-3 font-semibold text-slate-700 hover:bg-slate-50"
        >
          Créer un compte
        </button>

        {message && (
          <p className="mt-5 rounded-xl bg-slate-100 p-3 text-sm text-slate-700">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}
