import { createBrowserClient } from "@supabase/ssr";
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "./config";

// Für Client Components. Nutzt den anonymen Key — RLS greift serverseitig
// in der Datenbank, dieser Client bekommt nur, wofür der eingeloggte
// Nutzer laut Policy berechtigt ist.
//
// Genutzt von AuthForm/useSupabaseUser (Login/Signup) und VocabTrainer
// (Sync von vocab_progress für eingeloggte Nutzer). Gibt null zurück, wenn
// Supabase nicht konfiguriert ist — Aufrufer behandeln das als "Konto-
// Funktion aktuell nicht verfügbar" statt abzustürzen.
export function createClient() {
  if (!isSupabaseConfigured) return null;
  return createBrowserClient(supabaseUrl!, supabaseAnonKey!);
}
