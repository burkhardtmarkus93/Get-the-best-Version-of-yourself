import { createBrowserClient } from "@supabase/ssr";

// Für Client Components. Nutzt den anonymen Key — RLS greift serverseitig
// in der Datenbank, dieser Client bekommt nur, wofür der eingeloggte
// Nutzer laut Policy berechtigt ist.
//
// Aktuell nutzt noch kein Modul diesen Client (der Vokabeltrainer speichert
// Fortschritt lokal im Browser) — er ist Teil des übernommenen
// Grundgerüsts für Module, die ab Phase 2 einen Account/Sync brauchen
// (z.B. Elternbereich, Trainer-Bereich).
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
