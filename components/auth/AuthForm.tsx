"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Mode = "login" | "signup";

export function AuthForm() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setPending(true);
    const supabase = createClient();

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth/confirm` },
      });
      if (error) {
        setError(error.message);
      } else {
        setNotice(
          "Fast geschafft — wir haben dir einen Bestätigungslink per E-Mail geschickt."
        );
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    }
    setPending(false);
  }

  return (
    <div className="card max-w-sm">
      <div className="flex gap-1.5">
        <button
          onClick={() => { setMode("login"); setError(null); setNotice(null); }}
          className={
            "flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors " +
            (mode === "login" ? "bg-pitch text-paper" : "border border-line text-muted hover:text-ink")
          }
        >
          Anmelden
        </button>
        <button
          onClick={() => { setMode("signup"); setError(null); setNotice(null); }}
          className={
            "flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors " +
            (mode === "signup" ? "bg-pitch text-paper" : "border border-line text-muted hover:text-ink")
          }
        >
          Registrieren
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium uppercase tracking-wide text-muted">
            E-Mail
          </label>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="select-field"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium uppercase tracking-wide text-muted">
            Passwort
          </label>
          <input
            type="password"
            required
            minLength={6}
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="select-field"
          />
        </div>

        {error && <p className="text-sm text-brick">{error}</p>}
        {notice && <p className="text-sm text-pitch">{notice}</p>}

        <button type="submit" disabled={pending} className="btn-primary mt-1 disabled:opacity-50">
          {pending ? "Einen Moment …" : mode === "signup" ? "Konto erstellen" : "Anmelden"}
        </button>
      </form>
    </div>
  );
}
