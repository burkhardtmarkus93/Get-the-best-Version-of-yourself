"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AuthForm } from "@/components/auth/AuthForm";
import { useSupabaseUser } from "@/lib/hooks/useSupabaseUser";
import { createClient } from "@/lib/supabase/client";

function ConfirmError() {
  const searchParams = useSearchParams();
  const confirmError = searchParams.get("error") === "bestaetigung_fehlgeschlagen";
  if (!confirmError) return null;
  return (
    <p className="mt-4 text-sm text-brick">
      Der Bestätigungslink war ungültig oder abgelaufen. Bitte versuche es
      erneut.
    </p>
  );
}

export default function KontoPage() {
  const { user, loading } = useSupabaseUser();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-semibold text-ink">👤 Mein Konto</h1>
      <p className="mt-2 text-sm text-muted">
        Mit Konto wird dein Lernfortschritt (z. B. im Fußballwörter Trainer)
        geräteübergreifend gespeichert, statt nur lokal in diesem Browser.
      </p>

      <Suspense fallback={null}>
        <ConfirmError />
      </Suspense>

      <div className="mt-8">
        {loading ? (
          <p className="text-sm text-muted">Einen Moment …</p>
        ) : user ? (
          <div className="card max-w-sm">
            <p className="text-sm text-muted">Angemeldet als</p>
            <p className="mt-1 font-medium text-ink">{user.email}</p>
            <p className="mt-3 text-sm text-pitch">
              ✅ Fortschritt wird synchronisiert
            </p>
            <button onClick={handleLogout} className="btn-ghost mt-4">
              Abmelden
            </button>
          </div>
        ) : (
          <AuthForm />
        )}
      </div>
    </div>
  );
}
