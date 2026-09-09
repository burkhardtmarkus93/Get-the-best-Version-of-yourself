import { LegalPage } from "@/components/legal/LegalPage";
import { LEGAL } from "@/lib/legal/config";

export const metadata = {
  title: "Datenschutzerklärung",
};

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist:
        <br />
        {LEGAL.betreiberName}
        <br />
        {LEGAL.strasse}
        <br />
        {LEGAL.plzOrt}
        <br />
        E-Mail: {LEGAL.email}
      </p>

      <h2>2. Nutzung ohne Konto</h2>
      <p>
        Die Lernmodule lassen sich ohne Registrierung nutzen. Der
        Lernfortschritt im Fußballwörter Trainer wird in diesem Fall
        ausschließlich lokal im Speicher Ihres Browsers
        (<code>localStorage</code>) abgelegt und nicht an uns übertragen. Auch
        der Hinweis, ob Sie die Erste-Schritte-Tour bereits gesehen haben,
        wird nur lokal gespeichert. Sie können diese Daten jederzeit über die
        Einstellungen Ihres Browsers löschen.
      </p>

      <h2>3. Kundenkonto und Lernfortschritt</h2>
      <p>
        Wenn Sie ein Konto anlegen, verarbeiten wir Ihre E-Mail-Adresse, ein
        verschlüsselt gespeichertes Passwort sowie Ihren Lernfortschritt
        (welche Vokabelkarte Sie wie oft und wie erfolgreich bearbeitet
        haben). Zweck ist die Bereitstellung des geräteübergreifenden
        Fortschritts. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO
        (Vertragserfüllung).
      </p>
      <p>
        Auftragsverarbeiter ist Supabase. Die von uns genutzte
        Datenbankinstanz wird in der Region EU (Irland) betrieben. Der Zugriff
        auf Ihre Daten ist auf Datenbankebene durch Row-Level-Security so
        beschränkt, dass jeder Account ausschließlich die eigenen Daten lesen
        und schreiben kann.
      </p>

      <h2>4. Zahlungsabwicklung</h2>
      <p>
        Für kostenpflichtige Abonnements setzen wir den Zahlungsdienstleister
        Stripe ein (Stripe Payments Europe Ltd., Irland). Bei einem
        Vertragsabschluss werden die für die Zahlungsabwicklung erforderlichen
        Daten — insbesondere Name, E-Mail-Adresse und Zahlungsdaten — direkt
        an Stripe übermittelt und dort verarbeitet. Vollständige
        Zahlungsdaten wie Kreditkartennummern erhalten und speichern wir
        nicht. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO. Weitere
        Informationen finden Sie in der Datenschutzerklärung von Stripe unter{" "}
        <a
          href="https://stripe.com/de/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          stripe.com/de/privacy
        </a>
        .
      </p>

      <h2>5. Hosting</h2>
      <p>
        Diese Website wird bei Vercel gehostet. Beim Aufruf der Seite
        verarbeitet Vercel technisch notwendige Verbindungsdaten (u. a.
        IP-Adresse, Zeitpunkt der Anfrage, aufgerufene Seite, übertragene
        Datenmenge, Browsertyp). Diese Verarbeitung ist zur sicheren und
        stabilen Bereitstellung der Website erforderlich; Rechtsgrundlage ist
        Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
      </p>

      <h2>6. Cookies und Tracking</h2>
      <p>
        Wir setzen keine Analyse- oder Marketing-Cookies ein und binden keine
        Tracking-Dienste ein. Nach einer Anmeldung wird ein technisch
        notwendiges Sitzungs-Cookie gesetzt, das Sie eingeloggt hält. Dieses
        ist für den Betrieb des Kundenkontos erforderlich und
        einwilligungsfrei zulässig.
      </p>

      <h2>7. Affiliate-Links</h2>
      <p>
        Einzelne Seiten enthalten Affiliate-Links, die als Werbung
        gekennzeichnet sind. Erst wenn Sie einen solchen Link aktiv anklicken,
        werden Sie zum jeweiligen Anbieter weitergeleitet, der dann eigene
        Daten erhebt. Es findet keine Übertragung Ihrer Daten an
        Affiliate-Partner statt, solange Sie den Link nicht anklicken.
      </p>

      <h2>8. Minderjährige</h2>
      <p>
        Unsere Lerninhalte richten sich auch an Kinder und Jugendliche.
        Kundenkonten und kostenpflichtige Abonnements dürfen jedoch
        ausschließlich von volljährigen Personen angelegt bzw. abgeschlossen
        werden. Nutzt ein minderjähriger Torhüter die Inhalte, geschieht dies
        über den Zugang der Erziehungsberechtigten, die auch
        datenschutzrechtlich Ansprechpartner bleiben.
      </p>

      <h2>9. Speicherdauer</h2>
      <p>
        Kontodaten und Lernfortschritt speichern wir, solange Ihr Konto
        besteht. Nach Löschung des Kontos werden die zugehörigen Daten
        gelöscht, soweit keine gesetzlichen Aufbewahrungspflichten
        entgegenstehen; Rechnungsdaten bewahren wir aufgrund handels- und
        steuerrechtlicher Pflichten bis zu zehn Jahre auf.
      </p>

      <h2>10. Ihre Rechte</h2>
      <p>Sie haben jederzeit das Recht auf</p>
      <ul>
        <li>Auskunft über die zu Ihnen gespeicherten Daten (Art. 15 DSGVO),</li>
        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO),</li>
        <li>Löschung (Art. 17 DSGVO),</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO),</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO) sowie</li>
        <li>
          Widerspruch gegen Verarbeitungen auf Grundlage berechtigter
          Interessen (Art. 21 DSGVO).
        </li>
      </ul>
      <p>
        Wenden Sie sich dafür an {LEGAL.email}. Unabhängig davon steht Ihnen
        ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu
        (Art. 77 DSGVO).
      </p>
    </LegalPage>
  );
}
