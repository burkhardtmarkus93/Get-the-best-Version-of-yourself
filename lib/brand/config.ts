// Zentrale Stelle für den Markennamen — damit eine Umbenennung nicht
// quer durch alle Seiten-Metadaten nachgezogen werden muss.
//
// Markenvorgabe Campo Academy (Stand 9. September 2026):
// „Academy" bleibt in allen Sprachen englisch, wird also auch im
// deutschen Text nie zu „Akademie".
//
// Farben, Zeichen und Wortmarke liegen nicht hier, sondern dort, wo sie
// hingehören: die Palette als Design-Tokens in `tailwind.config.ts`, das
// Zeichen als Komponente in `components/brand/`, die exportierbaren
// Dateifassungen unter `public/marke/`.

// Seitentitel setzen Unterseiten nur mit ihrem eigenen Namen; den
// Markennamen hängt die Titel-Vorlage in `app/layout.tsx` an.
export const SITE_NAME = "Campo Academy";
