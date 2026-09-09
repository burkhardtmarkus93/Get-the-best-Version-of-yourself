import Link from "next/link";
import { PricingTable } from "@/components/pricing/PricingTable";
import { LEGAL } from "@/lib/legal/config";
import { SUBSCRIPTIONS_LIVE, TRIAL_DAYS } from "@/lib/plans";

export const metadata = {
  title: "Preise",
  description:
    "Drei Abos für Torhüter, Eltern und Trainer:innen — monatlich oder jährlich, jederzeit kündbar.",
};

// Bewusst knapp gehalten: eine Entscheidung pro Abschnitt, kurze Listen,
// keine Countdown-Timer oder "nur noch heute"-Hinweise. Die Zielgruppe
// umfasst Kinder und Jugendliche, deshalb kein Kaufdruck (CLAUDE.md §3).
const FAQ = [
  {
    frage: "Wer schließt das Abo ab, wenn mein Kind lernen will?",
    antwort:
      "Immer eine volljährige Person. Auch das Torhüter-Abo wird von einem Elternteil abgeschlossen und bezahlt — das Kind nutzt es dann. Ein Vertrag, den ein Kind selbst abschließt, wäre rechtlich nicht wirksam.",
  },
  {
    frage: "Wie kündige ich?",
    antwort:
      "Mit einem Klick im eigenen Konto, ohne Anruf und ohne Begründung. Monatsabos enden zum Ende des laufenden Monats, Jahresabos zum Ende des Jahreszeitraums.",
  },
  {
    frage: "Was passiert nach der Testphase?",
    antwort: `Nichts von allein. Nach ${TRIAL_DAYS} Tagen endet die Testphase einfach — sie wandelt sich nicht automatisch in ein kostenpflichtiges Abo um. Wenn du weitermachen willst, entscheidest du das aktiv.`,
  },
  {
    frage: "Brauche ich alle drei Abos?",
    antwort:
      "Nein. Die meisten Familien brauchen genau eins. Das Trainer-Abo schließt die Torhüter-Module mit ein, ist also für Trainer:innen die einzige nötige Stufe.",
  },
];

export default function PreisePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-3xl font-semibold text-ink">Preise</h1>
        <p className="mt-3 text-muted">
          Drei Bereiche, drei Abos. Such dir den aus, der zu dir passt — mehr
          brauchst du nicht.
        </p>
      </div>

      {!SUBSCRIPTIONS_LIVE && (
        <p className="mx-auto mt-8 max-w-2xl rounded-xl border border-amber/40 bg-amber-dim px-5 py-4 text-sm text-ink">
          <strong className="font-semibold">Noch nichts zu bezahlen.</strong>{" "}
          Die Abos sind vorbereitet, aber noch nicht freigeschaltet — aktuell
          sind alle Inhalte frei zugänglich. Die Preise unten zeigen, was
          später gelten wird.
        </p>
      )}

      <div className="mt-12">
        <PricingTable />
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-3">
        {[
          {
            titel: `${TRIAL_DAYS} Tage testen`,
            text: "Ohne automatische Verlängerung. Läuft einfach aus, wenn du nichts tust.",
          },
          {
            titel: "Jederzeit kündbar",
            text: "Mit einem Klick im Konto — kein Anruf, keine Frist zum Suchen.",
          },
          {
            titel: "Keine versteckten Kosten",
            text: "Der angezeigte Preis ist der Endpreis. Keine Einrichtungsgebühr.",
          },
        ].map((punkt) => (
          <div key={punkt.titel} className="card">
            <h3 className="font-medium text-ink">{punkt.titel}</h3>
            <p className="mt-1.5 text-sm text-muted">{punkt.text}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-2xl">
        <h2 className="font-display text-xl font-semibold text-ink">
          Häufige Fragen
        </h2>
        <div className="mt-4 flex flex-col gap-2">
          {FAQ.map((eintrag) => (
            <details
              key={eintrag.frage}
              className="group rounded-xl border border-line bg-surface px-5 py-4"
            >
              <summary className="cursor-pointer list-none text-sm font-medium text-ink marker:content-none">
                <span className="flex items-center justify-between gap-4">
                  {eintrag.frage}
                  <span
                    aria-hidden
                    className="shrink-0 text-muted transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm text-muted">{eintrag.antwort}</p>
            </details>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted">
          Es gelten unsere{" "}
          <Link href="/agb" className="underline hover:text-ink">
            AGB
          </Link>{" "}
          und die{" "}
          <Link href="/widerruf" className="underline hover:text-ink">
            Widerrufsbelehrung
          </Link>
          .{" "}
          {LEGAL.kleinunternehmer
            ? "Kein Ausweis von Umsatzsteuer gemäß § 19 UStG (Kleinunternehmerregelung)."
            : "Alle Preise inklusive gesetzlicher Umsatzsteuer."}
        </p>
      </div>
    </div>
  );
}
