import { TopicSection } from "@/components/content/TopicSection";
import { CueCard } from "@/components/content/CueCard";

export const metadata = { title: "Taktik-Grundlagen · Torwart Akademie" };

export default function TaktikPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <span className="badge">Torhüter-Modul</span>
      <h1 className="mt-3 text-2xl font-semibold text-ink">
        📐 Taktik-Grundlagen
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Gute Technik allein reicht nicht — die richtige Position und
        Entscheidung im richtigen Moment entscheidet oft schon vor dem
        eigentlichen Torschuss.
      </p>

      <TopicSection
        title="Stellungsspiel"
        intro="Die Basis für alles Weitere: Wer richtig steht, muss seltener außergewöhnlich reagieren."
      >
        <CueCard
          title="Grundprinzip"
          cues={[
            "Position auf der Winkelhalbierenden zwischen Ball und Toröffnung",
            "Position passt sich mit jedem Ballkontakt des Gegners neu an",
            "Bei Distanzschüssen etwas näher am Tor bleiben für mehr Reaktionszeit",
          ]}
        />
        <CueCard
          title="Querpassverteidigung"
          body="Wenn der Ball quer durch den Strafraum gespielt wird."
          cues={[
            "Startposition anpassen, bevor der Pass gespielt wird — nicht erst danach",
            "Klare Absprache mit der Abwehr, wer den ersten Kontakt übernimmt",
          ]}
        />
      </TopicSection>

      <TopicSection
        title="Ballgewinnspiel"
        intro="Situationen, in denen der Torhüter aktiv den Strafraum verlässt."
      >
        <CueCard
          title="Herauslaufen & 1-gegen-1"
          cues={[
            "Nur herauslaufen, wenn der Vorteil eindeutig ist",
            "Tempo verzögern statt sofort einzugreifen: Fläche einnehmen, spät reagieren",
            "Klare Kommunikation mit der Abwehr, wer welchen Laufweg deckt",
          ]}
        />
      </TopicSection>

      <TopicSection
        title="Angriffsspiel & Spielaufbau"
        intro="Der moderne Torhüter ist Teil des Spielaufbaus, nicht nur letzte Instanz der Abwehr."
      >
        <CueCard
          title="Torhüter im Aufbau"
          cues={[
            "Zusätzliche, ruhige Anspielstation für die Abwehr",
            "Sich Zeit nehmen, Räume und offene Mitspieler beobachten",
            "Bei hohem Gegnerdruck lieber lang spielen als riskant kurz",
          ]}
        />
      </TopicSection>

      <TopicSection
        title="Standardsituationen"
        intro="Konkrete Abläufe helfen der ganzen Mannschaft, in hektischen Momenten ruhig zu bleiben."
      >
        <CueCard
          title="Freistoß: Mauer stellen"
          cues={[
            "Sofort einen Spieler vor den Ball stellen",
            "Mauerspieler laut beim Namen rufen",
            "Der äußerste Mauerspieler dreht sich um und hilft, die Mauer zu stellen",
            "Größter Spieler außen, kleinster Spieler innen",
          ]}
        />
        <CueCard
          title="Ecken"
          cues={[
            "Klare Zuordnung, wer den ersten und wer den zweiten Pfosten sichert",
            "Torhüter positioniert sich zentral, mit Blick auf den ganzen Fünfmeterraum",
          ]}
        />
      </TopicSection>
    </div>
  );
}
