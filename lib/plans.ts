// Zentrale Plan-Definition für die Campo Academy.
//
// Preisherleitung (Stand August 2026, Quellen im zugehörigen Issue):
// Direkte Torwart-Konkurrenz liegt bei Goalplay (Oliver Kahn) bei
// 14,99 €/Monat bzw. ~8,33 €/Monat im Jahresabo. Allgemeine Lernplattformen
// für Schüler liegen bei sofatutor zwischen 11,99 € und 34,99 €/Monat,
// simpleclub ab 7,49 €/Monat; sofatutors Lehrkräfte-Tarif (7,99–19,99 €)
// ist der nächstliegende Anker für die Trainer-Zielgruppe.
//
// Bewusst am oberen Ende positioniert statt zu billig: Preise lassen sich
// später leichter senken als erhöhen.
//
// WICHTIG: Es gibt bewusst KEIN Abo, das ein Kind selbst abschließt. Auch
// das Spieler-Abo wird von einer volljährigen Person (i. d. R. den
// Erziehungsberechtigten) abgeschlossen und bezahlt — ein Vertrag mit
// Minderjährigen wäre nach § 107 BGB schwebend unwirksam. Siehe AGB § 2.

// "spieler" statt "torhueter": die Plattform ist für alle Positionen gedacht,
// der Torhüter ist nur der Anfang. Der Schlüssel landet später als Stripe
// lookup_key in der Abrechnung, deshalb jetzt umbenannt, solange nichts live ist.
export type PlanKey = "spieler" | "eltern" | "trainer";
export type BillingInterval = "monatlich" | "jaehrlich";

export interface Plan {
  key: PlanKey;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceYearly: number; // Gesamtpreis pro Jahr, nicht pro Monat
  features: string[];
}

export const PLANS: Record<PlanKey, Plan> = {
  spieler: {
    key: "spieler",
    name: "Spieler",
    tagline: "Alle Lernmodule für Spieler:innen — zunächst Torhüter",
    priceMonthly: 9.99,
    priceYearly: 99,
    features: [
      "Fußballwörter Trainer (449 Begriffe, 4 Sprachen)",
      "Technik-Grundlagen",
      "Taktik-Grundlagen",
      "Athletik & Ernährung",
      "Mentale Stärke",
      "Geräteübergreifender Lernfortschritt",
    ],
  },
  eltern: {
    key: "eltern",
    name: "Eltern",
    tagline: "Orientierung für Eltern von Fußball-Kindern",
    priceMonthly: 7.99,
    priceYearly: 79,
    features: [
      "Werdegang vom Bambini bis zum Herrenbereich",
      "Ausrüstung: was wirklich gebraucht wird",
      "Begleitung am Spieltag",
      "Umgang mit Rückschlägen und Druck",
      "Gespräche mit Verein und Trainer",
    ],
  },
  trainer: {
    key: "trainer",
    name: "Trainer",
    tagline: "Für Trainer:innen im Jugendfußball, Schwerpunkt Torwart",
    priceMonthly: 17.99,
    priceYearly: 179,
    features: [
      "Lizenzwege und Weiterbildung",
      "Themenbereiche des Torwarttrainings",
      "Coaching-Prinzipien",
      "Trainingssteuerung und Periodisierung",
      "Zugriff auf alle Spieler-Module",
    ],
  },
};

// Kostenlose Testphase für Neukunden, in Tagen. Bewusst kurz gehalten und
// ohne automatische Umwandlung in ein kostenpflichtiges Abo (siehe AGB § 4).
export const TRIAL_DAYS = 2;

// Solange die Stripe-Anbindung nicht steht, sind alle Inhalte frei nutzbar.
// Die Preisseite weist dann sichtbar darauf hin und bietet keinen
// Kaufen-Button an, der ins Leere läuft. Auf true setzen, sobald der
// Checkout live ist.
export const SUBSCRIPTIONS_LIVE = false;

// Ersparnis im Jahresabo gegenüber zwölf Monatszahlungen.
export function yearlySavings(plan: Plan): number {
  return plan.priceMonthly * 12 - plan.priceYearly;
}

// Rechnerischer Monatspreis im Jahresabo.
export function effectiveMonthly(plan: Plan): number {
  return plan.priceYearly / 12;
}

export function formatEuro(amount: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

// Stripe-Price-Lookup-Keys. Statt Price-IDs irgendwo zu speichern/kopieren,
// werden Preise zur Laufzeit per lookup_key aufgelöst — lib/plans.ts bleibt
// so die einzige Quelle der Wahrheit für Preise.
export function stripeLookupKey(
  plan: PlanKey,
  billingInterval: BillingInterval
): string {
  return `${plan}_${billingInterval === "monatlich" ? "monthly" : "yearly"}`;
}

export function planAndIntervalFromLookupKey(
  lookupKey: string
): { plan: PlanKey; billingInterval: BillingInterval } | null {
  const match = lookupKey.match(/^(spieler|eltern|trainer)_(monthly|yearly)$/);
  if (!match) return null;
  return {
    plan: match[1] as PlanKey,
    billingInterval: match[2] === "monthly" ? "monatlich" : "jaehrlich",
  };
}
