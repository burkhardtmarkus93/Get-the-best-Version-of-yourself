import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "./config";

type SupabaseCookie = {
  name: string;
  value: string;
  options: CookieOptions;
};

// Für Server Components / Server Actions. Gibt null zurück, wenn Supabase
// nicht konfiguriert ist (siehe lib/supabase/client.ts).
export async function createClient() {
  if (!isSupabaseConfigured) return null;
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: SupabaseCookie[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // In Server Components kann das in manchen Situationen nicht
          // gesetzt werden; sobald es eine Auth-Middleware gibt,
          // übernimmt die den Refresh.
        }
      },
    },
  });
}
