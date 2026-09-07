// Zentrale Plan-Definition für die Talent Catcher Academy.
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
// das Torhüter-Abo wird von einer volljährigen Person (i. d. R. den
// Erziehungsberechtigten) abgeschlossen und bezahlt — ein Vertrag mit
// Minderjährigen wäre nach § 107 BGB schwebend unwirksam. Siehe AGB § 2.

export type PlanKey = "torhueter" | "eltern" | "trainer";
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
  torhueter: {
    key: "torhueter",
    name: "Torhüter",
    tagline: "Alle Lernmodule für den Torhüter selbst",
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
    tagline: "Orientierung für Eltern von Torhüter-Kindern",
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
    tagline: "Für Trainer:innen mit Interesse am Torwarttraining",
    priceMonthly: 17.99,
    priceYearly: 179,
    features: [
      "Lizenzwege und Weiterbildung",
      "Themenbereiche des Torwarttrainings",
      "Coaching-Prinzipien",
      "Trainingssteuerung und Periodisierung",
      "Zugriff auf alle Torhüter-Module",
    ],
  },
};

// Kostenlose Testphase für Neukunden, in Tagen. Bewusst kurz gehalten und
// ohne automatische Umwandlung in ein kostenpflichtiges Abo (siehe AGB § 4).
export const TRIAL_DAYS = 2;

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
  const match = lookupKey.match(/^(torhueter|eltern|trainer)_(monthly|yearly)$/);
  if (!match) return null;
  return {
    plan: match[1] as PlanKey,
    billingInterval: match[2] === "monthly" ? "monatlich" : "jaehrlich",
  };
}
