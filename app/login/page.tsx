
"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("Chargement...");

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setMessage(error ? error.message : "Connexion réussie !");
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      setMessage(
        error
          ? error.message
          : "Inscription réussie ! Vérifie tes emails pour confirmer ton compte."
      );
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-5 rounded-2xl bg-white p-8 shadow-xl"
      >
        <h1 className="text-3xl font-bold text-slate-900">SalesPilot AI</h1>
        <p className="text-slate-500">
          {isLogin ? "Connecte-toi à ton espace" : "Crée ton compte"}
        </p>

        <input
          type="email"
          placeholder="Adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-lg border p-3"
        />

        <input
          type="password"
          placeholder="Mot de passe (6 caractères minimum)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full rounded-lg border p-3"
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-violet-600 p-3 font-semibold text-white"
        >
          {isLogin ? "Se connecter" : "Créer mon compte"}
        </button>

        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setMessage("");
          }}
          className="w-full text-sm text-violet-700"
        >
          {isLogin
            ? "Créer un compte"
            : "J'ai déjà un compte"}
        </button>

        {message && <p className="text-sm text-slate-600">{message}</p>}
      </form>
    </main>
  );
}
