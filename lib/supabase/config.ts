// Zentrale Stelle, um zu prüfen, ob Supabase konfiguriert ist. Ohne diese
// Env-Vars (z. B. in einer frischen Deployment-Umgebung ohne Setup) sollen
// Konto-Funktionen sauber deaktiviert sein statt Middleware/Client-Code
// crashen zu lassen.
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
