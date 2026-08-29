import { createClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "@/lib/supabase/config";

// Supabase pausiert Projekte im Free-Tier nach längerer Inaktivität. Solange
// die Plattform noch keine echten Nutzer hat, entsteht diese Aktivität nicht
// von allein — das Projekt wurde deshalb bereits einmal pausiert.
//
// Dieser Endpunkt setzt einmal täglich eine minimale Datenbankabfrage ab
// (per Vercel Cron, siehe vercel.json) und hält das Projekt so wach.
// Bewusst eine echte Query gegen Postgres statt nur ein HTTP-Ping, weil
// nur Datenbankaktivität den Inaktivitäts-Timer zurücksetzt.
//
// Sobald die Plattform echten Traffic hat oder auf einen bezahlten Plan
// wechselt, kann dieser Cron ersatzlos entfallen.

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // Vercel schickt bei konfigurierten Cron Jobs automatisch
  // "Authorization: Bearer $CRON_SECRET" mit, sobald die Env-Var im
  // Projekt gesetzt ist. Ohne gesetztes Secret bleibt der Endpunkt offen —
  // er löst zwar nur eine Lese-Query aus, sollte aber trotzdem abgesichert
  // werden, damit er nicht von außen beliebig oft aufgerufen werden kann.
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }
  }

  if (!isSupabaseConfigured) {
    return NextResponse.json(
      { ok: false, reason: "Supabase ist nicht konfiguriert" },
      { status: 503 }
    );
  }

  const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

  // Leichtgewichtige Query: durch RLS kommen ohne Session ohnehin keine
  // Zeilen zurück — die Abfrage erreicht Postgres aber trotzdem, und genau
  // darum geht es hier.
  const { error } = await supabase
    .from("vocab_progress")
    .select("card_key", { count: "exact", head: true });

  if (error) {
    // Bei einem fehlgeschlagenen Netzwerk-Request liefert supabase-js eine
    // leere message — dann ist der Grund fast immer, dass die Umgebung das
    // Supabase-Projekt nicht erreicht (Firewall, pausiertes Projekt).
    const reason = error.message || "Supabase-Projekt nicht erreichbar";
    console.error("Supabase-Keepalive fehlgeschlagen:", reason, error);
    return NextResponse.json({ ok: false, error: reason }, { status: 500 });
  }

  return NextResponse.json({ ok: true, checkedAt: new Date().toISOString() });
}
