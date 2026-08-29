import type { ReactNode } from "react";
import { isLegalConfigComplete, LEGAL_LAST_UPDATED } from "@/lib/legal/config";

// Gemeinsames Gerüst für alle Rechtsseiten: einheitliche Typografie,
// Stand-Datum und — solange die Anbieterangaben noch Platzhalter sind —
// ein unübersehbarer Warnhinweis, damit die Seiten nicht versehentlich
// unvollständig live gehen.
export function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-semibold text-ink">{title}</h1>
      {intro && <p className="mt-2 text-sm text-muted">{intro}</p>}

      {!isLegalConfigComplete && (
        <p className="mt-6 rounded-lg border border-amber bg-amber-dim p-4 text-sm text-amber">
          <strong>Hinweis für den Betreiber:</strong> Die Anbieterangaben in{" "}
          <code>lib/legal/config.ts</code> sind noch Platzhalter. Diese Seite
          darf so nicht öffentlich live gehen — fehlende oder falsche
          Pflichtangaben sind abmahnfähig.
        </p>
      )}

      <div className="legal-prose mt-8">{children}</div>

      <p className="mt-10 text-xs text-muted">Stand: {LEGAL_LAST_UPDATED}</p>
    </div>
  );
}
