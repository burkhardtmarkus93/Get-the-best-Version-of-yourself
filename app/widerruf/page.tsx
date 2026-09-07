import { LegalPage } from "@/components/legal/LegalPage";
import { LEGAL } from "@/lib/legal/config";

export const metadata = {
  title: "Widerrufsbelehrung · Talent Catcher Academy",
};

export default function WiderrufPage() {
  return (
    <LegalPage
      title="Widerrufsbelehrung"
      intro="Für Verbraucher, die ein kostenpflichtiges Abonnement abschließen."
    >
      <h2>Widerrufsrecht</h2>
      <p>
        Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen
        diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn
        Tage ab dem Tag des Vertragsabschlusses.
      </p>
      <p>
        Um Ihr Widerrufsrecht auszuüben, müssen Sie uns —{" "}
        {LEGAL.betreiberName}, {LEGAL.strasse}, {LEGAL.plzOrt}, E-Mail:{" "}
        {LEGAL.email} — mittels einer eindeutigen Erklärung (z. B. ein mit
        der Post versandter Brief oder eine E-Mail) über Ihren Entschluss,
        diesen Vertrag zu widerrufen, informieren. Sie können dafür das
        untenstehende Muster-Widerrufsformular verwenden, das jedoch nicht
        vorgeschrieben ist.
      </p>
      <p>
        Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung
        über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist
        absenden.
      </p>

      <h2>Folgen des Widerrufs</h2>
      <p>
        Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen,
        die wir von Ihnen erhalten haben, unverzüglich und spätestens binnen
        vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über
        Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese
        Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der
        ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen
        wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden
        Ihnen wegen dieser Rückzahlung Entgelte berechnet.
      </p>

      <h2>Vorzeitiges Erlöschen des Widerrufsrechts</h2>
      <p>
        Bei einem Vertrag über die Bereitstellung digitaler Inhalte, die
        nicht auf einem körperlichen Datenträger geliefert werden, erlischt
        Ihr Widerrufsrecht, wenn wir mit der Ausführung des Vertrags begonnen
        haben, nachdem Sie
      </p>
      <ul>
        <li>
          ausdrücklich zugestimmt haben, dass wir mit der Ausführung des
          Vertrags vor Ablauf der Widerrufsfrist beginnen, und
        </li>
        <li>
          Ihre Kenntnis davon bestätigt haben, dass Sie durch Ihre Zustimmung
          mit Beginn der Ausführung des Vertrags Ihr Widerrufsrecht
          verlieren.
        </li>
      </ul>
      <p>
        <strong>Hinweis:</strong> Beim Abschluss eines Abonnements werden Sie
        im Bestellprozess ausdrücklich gefragt, ob Sie den sofortigen Zugriff
        auf die Inhalte wünschen. Stimmen Sie nicht zu, wird der Zugang erst
        nach Ablauf der Widerrufsfrist freigeschaltet und Ihr Widerrufsrecht
        bleibt vollständig bestehen. Unabhängig davon steht Ihnen vor jedem
        Vertragsabschluss die kostenlose zweitägige Testphase zur Verfügung.
      </p>

      <h2>Muster-Widerrufsformular</h2>
      <p>
        (Wenn Sie den Vertrag widerrufen wollen, füllen Sie bitte dieses
        Formular aus und senden Sie es zurück.)
      </p>
      <ul>
        <li>
          An {LEGAL.betreiberName}, {LEGAL.strasse}, {LEGAL.plzOrt}, E-Mail:{" "}
          {LEGAL.email}
        </li>
        <li>
          Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen
          Vertrag über die Erbringung der folgenden Dienstleistung (*)
        </li>
        <li>Bestellt am (*)</li>
        <li>Name des/der Verbraucher(s)</li>
        <li>Anschrift des/der Verbraucher(s)</li>
        <li>
          Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)
        </li>
        <li>Datum</li>
      </ul>
      <p>(*) Unzutreffendes streichen.</p>
    </LegalPage>
  );
}
