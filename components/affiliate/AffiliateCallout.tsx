import { affiliateLinks } from "@/lib/affiliate/config";

// Rendert nichts, solange kein echter Link hinterlegt ist (siehe
// lib/affiliate/config.ts) — lieber unsichtbar als ein totes Werbebanner.
export function AffiliateCallout() {
  const url = affiliateLinks.englishCourse;
  if (!url) return null;

  return (
    <div className="card flex flex-wrap items-center justify-between gap-4 border-amber/40 bg-amber-dim/40">
      <div>
        <span className="text-[10px] font-semibold uppercase tracking-wide text-amber">
          Werbung · Affiliate-Link
        </span>
        <p className="mt-1 text-sm text-ink">
          Willst du dein Fußball-Englisch auch außerhalb des Platzes
          verbessern? Hier geht&apos;s zu unserem Empfehlungs-Englischkurs.
        </p>
      </div>
      <a href={url} target="_blank" rel="noopener noreferrer sponsored" className="btn-primary shrink-0">
        Kurs ansehen
      </a>
    </div>
  );
}
