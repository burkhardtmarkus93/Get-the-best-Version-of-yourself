// Zentrale Stelle für Affiliate-/Werbelinks der Plattform. Neue Links hier
// eintragen statt irgendwo im UI-Code zu verdrahten — macht sie an einer
// Stelle auffindbar und einfach zu deaktivieren (leerer String), falls ein
// Partnerprogramm mal pausiert.
//
// Rechtlich: Deutsches Recht verlangt für Affiliate-Links eine eindeutige
// Kennzeichnung als Werbung (§ 5a UWG). Jede Stelle, die einen dieser
// Links rendert, muss ihn sichtbar mit "Werbung" bzw. "Affiliate-Link"
// kennzeichnen — siehe components/affiliate/AffiliateCallout.tsx.

export const affiliateLinks = {
  englishCourse: process.env.AFFILIATE_ENGLISH_COURSE_URL || "",
};

// Für Phase 2 vorgesehen, noch nicht angebunden: Torwarthandschuh-Marken.
// Bewusst hier als Platzhalter dokumentiert statt stillschweigend zu
// vergessen — siehe CLAUDE.md Abschnitt 4 (Phasenmodell).
export const plannedAffiliatePartners = {
  goalkeeperGloveBrands: [] as { name: string; url: string }[],
};
