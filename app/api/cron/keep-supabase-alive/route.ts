import { createClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "@/lib/supabase/config";

// Supabase pausiert Projekte im Free-Tier nach längerer Inaktivität. Solange
// die Plattform noch keine echten Nutzer hat, entsteht diese Aktivität nicht
// von allein — das Projekt wurde deshalb bereits einmal pausiert.
//
// Erster Versuch war ein täglicher Lesezugriff, der durch RLS null Zeilen
// zurückgab. Die Requests kamen laut Supabase-Logs zuverlässig an, trotzdem
// kam erneut eine Pausierungswarnung ("not seen sufficient activity") —
// ein leerer Lesezugriff pro Tag reicht Supabase offenbar nicht.
//
// Deshalb jetzt ein echter Schreibvorgang über die Funktion
// keepalive_ping() (siehe Migration 20260904053800_keepalive.sql), und
// zusätzlich ein häufigerer Ping über GitHub Actions, da Vercel im
// Hobby-Plan nur eine Cron-Ausführung pro Tag erlaubt.
//
// Sobald die Plattform echten Traffic hat oder auf einen bezahlten Plan
// wechselt, kann das alles ersatzlos entfallen.

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

  // Schreibvorgang statt Lesezugriff: aktualisiert einen Zeitstempel in der
  // keepalive-Tabelle. Die Tabelle selbst ist per RLS gesperrt, geschrieben
  // wird ausschließlich über diese security-definer-Funktion.
  const { data, error } = await supabase.rpc("keepalive_ping");

  if (error) {
    // Bei einem fehlgeschlagenen Netzwerk-Request liefert supabase-js eine
    // leere message — dann ist der Grund fast immer, dass die Umgebung das
    // Supabase-Projekt nicht erreicht (Firewall, pausiertes Projekt).
    const reason = error.message || "Supabase-Projekt nicht erreichbar";
    console.error("Supabase-Keepalive fehlgeschlagen:", reason, error);
    return NextResponse.json({ ok: false, error: reason }, { status: 500 });
  }

  return NextResponse.json({ ok: true, lastPing: data });
}
