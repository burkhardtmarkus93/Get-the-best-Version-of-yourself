import { LegalPage } from "@/components/legal/LegalPage";
import { LEGAL } from "@/lib/legal/config";
import { PLANS, formatEuro } from "@/lib/plans";

export const metadata = {
  title: "AGB",
};

export default function AgbPage() {
  return (
    <LegalPage
      title="Allgemeine Geschäftsbedingungen"
      intro="Für die Nutzung der kostenpflichtigen Abonnements der Campo Academy."
    >
      <h2>§ 1 Geltungsbereich und Vertragspartner</h2>
      <p>
        Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge
        über kostenpflichtige Abonnements der Campo Academy zwischen{" "}
        {LEGAL.betreiberName}, {LEGAL.strasse}, {LEGAL.plzOrt} (nachfolgend
        „Anbieter") und dem Kunden.
      </p>
      <p>
        Abweichende Bedingungen des Kunden werden nicht Vertragsbestandteil,
        es sei denn, der Anbieter stimmt ihrer Geltung ausdrücklich in
        Textform zu.
      </p>

      <h2>§ 2 Vertragsschluss nur mit volljährigen Personen</h2>
      <p>
        <strong>
          Ein Vertrag über ein kostenpflichtiges Abonnement kann
          ausschließlich mit unbeschränkt geschäftsfähigen, volljährigen
          Personen geschlossen werden.
        </strong>{" "}
        Minderjährige können selbst kein Abonnement abschließen. Soll ein
        minderjähriger Spieler oder eine minderjährige Spielerin die Inhalte nutzen, schließen die
        Erziehungsberechtigten den Vertrag im eigenen Namen ab und stellen
        den Zugang bereit; sie bleiben Vertrags- und Zahlungspartei.
      </p>
      <p>
        Mit dem Abschluss eines Abonnements bestätigt der Kunde, volljährig
        und unbeschränkt geschäftsfähig zu sein.
      </p>

      <h2>§ 3 Leistungsbeschreibung</h2>
      <p>
        Der Anbieter stellt über die Plattform digitale Lerninhalte rund um
        das Fußballspiel bereit. Der konkrete Leistungsumfang richtet sich
        nach dem gewählten Abonnement:
      </p>
      <ul>
        {Object.values(PLANS).map((plan) => (
          <li key={plan.key}>
            <strong>{plan.name}</strong> — {plan.tagline}
          </li>
        ))}
      </ul>
      <p>
        Die Inhalte sind allgemeine Informations- und Lernangebote. Sie
        ersetzen keine individuelle sportmedizinische, physiotherapeutische
        oder ärztliche Beratung und begründen keinen Anspruch auf einen
        bestimmten sportlichen Erfolg.
      </p>

      <h2>§ 4 Testphase</h2>
      <p>
        Neukunden erhalten eine kostenlose Testphase von zwei (2) Tagen ab
        Registrierung. Während der Testphase entstehen keine Kosten. Ein
        kostenpflichtiges Abonnement beginnt erst, wenn der Kunde es aktiv
        abschließt — es erfolgt keine automatische Umwandlung der Testphase
        in ein kostenpflichtiges Abonnement.
      </p>

      <h2>§ 5 Preise, Laufzeit und Kündigung</h2>
      <p>Es gelten die folgenden Preise (Endpreise):</p>
      <ul>
        {Object.values(PLANS).map((plan) => (
          <li key={plan.key}>
            <strong>{plan.name}:</strong>{" "}
            {formatEuro(plan.priceMonthly)} pro Monat oder{" "}
            {formatEuro(plan.priceYearly)} pro Jahr
          </li>
        ))}
      </ul>
      {LEGAL.kleinunternehmer && (
        <p>
          Gemäß § 19 UStG wird keine Umsatzsteuer berechnet und daher auch
          nicht ausgewiesen (Kleinunternehmerregelung).
        </p>
      )}
      <p>
        Das Abonnement läuft je nach Wahl monatlich oder jährlich und
        verlängert sich automatisch um die jeweils gewählte Laufzeit, wenn es
        nicht vor Ablauf gekündigt wird. Nach der ersten Mindestlaufzeit ist
        das Abonnement jederzeit mit einer Frist von einem Monat kündbar.
      </p>
      <p>
        Die Kündigung ist jederzeit über die Schaltfläche „Abo kündigen" im
        Kundenkonto möglich (Kündigungsbutton gemäß § 312k BGB). Alternativ
        genügt eine formlose Erklärung in Textform an {LEGAL.email}.
      </p>

      <h2>§ 6 Zahlungsabwicklung</h2>
      <p>
        Die Zahlungsabwicklung erfolgt über den Zahlungsdienstleister Stripe.
        Die Zahlung ist jeweils zu Beginn der Abrechnungsperiode im Voraus
        fällig. Bei Zahlungsverzug kann der Anbieter den Zugang bis zum
        Ausgleich sperren.
      </p>

      <h2>§ 7 Nutzungsrechte</h2>
      <p>
        Der Kunde erhält für die Dauer des Abonnements ein einfaches, nicht
        übertragbares Recht, die Inhalte zu privaten bzw. — beim
        Trainer-Abonnement — zu eigenen Trainingszwecken zu nutzen. Eine
        Weitergabe der Zugangsdaten, Vervielfältigung, öffentliche
        Zugänglichmachung oder ein Weiterverkauf der Inhalte ist nicht
        gestattet.
      </p>

      <h2>§ 8 Änderungen von Inhalten und Preisen</h2>
      <p>
        Der Anbieter darf den Leistungsumfang weiterentwickeln, solange der
        vertraglich geschuldete Kern erhalten bleibt. Preisänderungen für
        laufende Abonnements werden dem Kunden mindestens sechs Wochen vor
        Wirksamwerden in Textform mitgeteilt; der Kunde kann in diesem Fall
        bis zum Wirksamwerden zum Änderungszeitpunkt kündigen.
      </p>

      <h2>§ 9 Haftung</h2>
      <p>
        Der Anbieter haftet unbeschränkt bei Vorsatz und grober
        Fahrlässigkeit sowie bei der Verletzung von Leben, Körper oder
        Gesundheit. Bei einfacher Fahrlässigkeit haftet der Anbieter nur bei
        Verletzung einer wesentlichen Vertragspflicht und begrenzt auf den
        vertragstypischen, vorhersehbaren Schaden. Im Übrigen ist die Haftung
        ausgeschlossen.
      </p>

      <h2>§ 10 Schlussbestimmungen</h2>
      <p>
        Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des
        UN-Kaufrechts. Zwingende Verbraucherschutzvorschriften des Staates,
        in dem der Kunde seinen gewöhnlichen Aufenthalt hat, bleiben
        unberührt. Sollte eine Bestimmung dieser AGB unwirksam sein, bleibt
        die Wirksamkeit der übrigen Bestimmungen unberührt.
      </p>
    </LegalPage>
  );
}
