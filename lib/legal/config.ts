// Zentrale Stelle für die Anbieterangaben, die in Impressum, AGB,
// Widerrufsbelehrung und Datenschutzerklärung auftauchen — damit eine
// Adressänderung nicht an vier Stellen nachgezogen werden muss.
//
// ACHTUNG: Die Platzhalter unten MÜSSEN vor dem Live-Gang durch die
// echten Angaben des Anbieters ersetzt werden. Ein Impressum mit
// falschen oder fehlenden Pflichtangaben (§ 5 DDG, früher § 5 TMG) ist
// selbst abmahnfähig. Solange `isComplete` false ist, weisen die
// Rechtsseiten sichtbar darauf hin, dass die Angaben noch fehlen.

export const LEGAL = {
  betreiberName: "PLATZHALTER — Vor- und Nachname bzw. Firma",
  rechtsform: "PLATZHALTER — z. B. Einzelunternehmen",
  strasse: "PLATZHALTER — Straße und Hausnummer",
  plzOrt: "PLATZHALTER — PLZ und Ort",
  land: "Deutschland",
  email: "PLATZHALTER — kontakt@example.de",
  telefon: "PLATZHALTER — Telefonnummer",
  // Entweder USt-IdNr. angeben ODER den Kleinunternehmer-Hinweis nutzen.
  umsatzsteuerId: null as string | null,
  kleinunternehmer: true,
  // Nur bei Eintragung im Handelsregister relevant.
  registergericht: null as string | null,
  registernummer: null as string | null,
} as const;

// Solange irgendein Pflichtfeld noch ein Platzhalter ist, gelten die
// Angaben als unvollständig.
export const isLegalConfigComplete = !Object.values(LEGAL).some(
  (value) => typeof value === "string" && value.startsWith("PLATZHALTER")
);

export const LEGAL_LAST_UPDATED = "18. August 2026";
