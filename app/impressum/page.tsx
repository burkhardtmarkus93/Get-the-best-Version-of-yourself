import { LegalPage } from "@/components/legal/LegalPage";
import { LEGAL } from "@/lib/legal/config";

export const metadata = {
  title: "Impressum · Talent Catcher Academy",
};

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        {LEGAL.betreiberName}
        <br />
        {LEGAL.rechtsform}
        <br />
        {LEGAL.strasse}
        <br />
        {LEGAL.plzOrt}
        <br />
        {LEGAL.land}
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail: {LEGAL.email}
        <br />
        Telefon: {LEGAL.telefon}
      </p>

      <h2>Umsatzsteuer</h2>
      {LEGAL.kleinunternehmer ? (
        <p>
          Gemäß § 19 UStG wird keine Umsatzsteuer berechnet und daher auch
          nicht in Rechnungen ausgewiesen (Kleinunternehmerregelung).
        </p>
      ) : (
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a UStG:{" "}
          {LEGAL.umsatzsteuerId}
        </p>
      )}

      {LEGAL.registergericht && (
        <>
          <h2>Registereintrag</h2>
          <p>
            Registergericht: {LEGAL.registergericht}
            <br />
            Registernummer: {LEGAL.registernummer}
          </p>
        </>
      )}

      <h2>Verantwortlich für den Inhalt</h2>
      <p>
        {LEGAL.betreiberName}, Anschrift wie oben.
      </p>

      <h2>Verbraucherstreitbeilegung</h2>
      <p>
        Wir sind nicht bereit und nicht verpflichtet, an
        Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Die Inhalte dieser Seiten wurden mit größter Sorgfalt erstellt. Für
        die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können
        wir jedoch keine Gewähr übernehmen. Die auf dieser Plattform
        vermittelten Trainings-, Technik- und Ernährungsinhalte sind
        allgemeine Informationen und ersetzen keine individuelle
        sportmedizinische, physiotherapeutische oder ärztliche Beratung.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren
        Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten
        Seiten ist stets der jeweilige Anbieter oder Betreiber
        verantwortlich. Manche Links sind Affiliate-Links; diese sind als
        Werbung gekennzeichnet.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die durch den Betreiber erstellten Inhalte und Werke auf diesen
        Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind
        als solche gekennzeichnet.
      </p>
    </LegalPage>
  );
}
