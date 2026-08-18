import { createBrowserClient } from "@supabase/ssr";

// Für Client Components. Nutzt den anonymen Key — RLS greift serverseitig
// in der Datenbank, dieser Client bekommt nur, wofür der eingeloggte
// Nutzer laut Policy berechtigt ist.
//
// Genutzt von AuthForm/useSupabaseUser (Login/Signup) und VocabTrainer
// (Sync von vocab_progress für eingeloggte Nutzer).
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
