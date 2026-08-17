import { TopicSection } from "@/components/content/TopicSection";
import { CueCard } from "@/components/content/CueCard";

export const metadata = { title: "Technik-Grundlagen · Torwart Akademie" };

export default function TechnikPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <span className="badge">Torhüter-Modul</span>
      <h1 className="mt-3 text-2xl font-semibold text-ink">
        🥅 Technik-Grundlagen
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Die Basistechniken im Torwartspiel, Schritt für Schritt erklärt.
        Erst wenn die Grundlagen automatisiert sind, lohnt sich der Blick
        auf Feinheiten — lieber wenige Punkte sauber üben als alles auf
        einmal.
      </p>

      <TopicSection
        title="Grundlagen"
        intro="Ausgangspunkt für alles Weitere: Wer hier ungenau steht, verliert wertvolle Zehntelsekunden."
      >
        <CueCard
          title="Grundstellung"
          cues={[
            "Hüftbreiter Stand, Knie leicht gebeugt",
            "Gewicht auf dem Vorfuß, Fersen leicht abheben",
            "Hände auf Hüfthöhe, Handflächen nach vorne",
            "Blick über den Ball, Kopf ruhig halten",
            "Je näher der Ball, desto tiefer die Grundstellung",
          ]}
        />
        <CueCard
          title="Fangen"
          cues={[
            "W-Fassung über Kopfhöhe (Daumen und Zeigefinger formen ein W)",
            "Basket-Fassung unterhalb der Hüfte, kleine Finger zusammen",
            "Ball so früh wie möglich fixieren",
            "Beim Kontakt leicht mit den Händen nachgeben, um abzufedern",
          ]}
        />
        <CueCard
          title="Fausten"
          body="Nur wenn Fangen zu riskant ist — bei Bedrängnis, hohen Flanken oder nassem Ball."
          cues={[
            "Mit beiden Fäusten für mehr Wucht und Präzision, wenn möglich",
            "Ziel ist Höhe und Weite, nicht Präzision — Ball raus aus der Gefahrenzone",
            "Aus der Schulter heraus schlagen, Handgelenk stabil halten",
          ]}
        />
      </TopicSection>

      <TopicSection
        title="Fallen & Hechten"
        intro="Kontrollierter Bodenkontakt schützt vor Verletzungen und macht schnelles Wiederaufstehen möglich."
      >
        <CueCard
          title="Fallen"
          cues={[
            "Über Oberschenkel-Außenseite und Hüfte abrollen, nie auf den Ellbogen",
            "Ball zuerst mit den Händen sichern, der Körper folgt",
            "Bei nahen Bällen kurze Wege — nicht unnötig hechten",
          ]}
        />
        <CueCard
          title="Abkippen"
          body="Bei sehr flachen, nahen Bällen eine Alternative zum vollen Hechten."
          cues={[
            "Becken seitlich abkippen statt hechten",
            "Ermöglicht deutlich schnelleres Wiederaufstehen",
          ]}
        />
        <CueCard
          title="Hechten"
          cues={[
            "Absprung seitlich-nach-vorne aus den Beinen, nicht nach hinten fallen",
            "Oberer Arm führt zum Ball, unterer Arm sichert die Landung",
            "Nach der Landung: Ball sofort sichern, dann kontrolliert aufstehen",
          ]}
        />
        <CueCard
          title="Abrollen"
          cues={[
            "Über die Schulter abrollen, um Aufprallkraft zu verteilen",
            "Ball während der gesamten Rolle am Körper fixieren",
          ]}
        />
      </TopicSection>

      <TopicSection
        title="Abwehrtechniken"
        intro="Situationen, in denen nicht der ganze Körper zum Ball muss, sondern der Ball gezielt entschärft wird."
      >
        <CueCard
          title="Block (z.B. 1-gegen-1)"
          cues={[
            "Fläche groß machen: Arme und Beine kontrolliert ausbreiten",
            "Später Bewegungszeitpunkt, um dem Schützen keine Ecke zu verraten",
            "Stabiler Stand bei kurzer Distanz — nicht zu früh hechten",
          ]}
        />
        <CueCard
          title="Gezieltes Ablenken"
          body="Für Bälle, die nicht sicher zu halten sind."
          cues={[
            "Bewusst um den Pfosten oder über die Latte lenken",
            "Mit flacher Hand oder Fingerspitzen kontrolliert berühren, nicht wegschlagen",
          ]}
        />
      </TopicSection>

      <TopicSection
        title="Spieleröffnung"
        intro="Der erste Pass nach der Ballsicherung entscheidet oft über die nächste Torchance — der eigenen Mannschaft."
      >
        <CueCard
          title="Abwurf"
          cues={[
            "Kurzer Abwurf: präzise und flach, in den Fuß oder freien Raum",
            "Weiter Abwurf aus der Schulter für schnelles Konterspiel",
            "Immer den offenen Mitspieler suchen, nicht irgendwohin werfen",
          ]}
        />
        <CueCard
          title="Abschlag & Abstoß"
          cues={[
            "Vor dem Schlag das Spielfeld scannen und Anspielstation wählen",
            "Kurzvariante als Alternative, wenn der Gegner hoch anläuft",
            "Sauberer Treffpunkt entscheidet über Weite und Kontrolle",
          ]}
        />
        <CueCard
          title="Passspiel"
          body="Für Torhüter, die aktiv am Spielaufbau beteiligt sind."
          cues={[
            "Ruhiger erster Kontakt, Körperstellung offen zum Spielfeld",
            "Passschärfe an die Situation anpassen — kurz weich, lang druckvoll",
            "Unter Druck lieber einfach als riskant entscheiden",
          ]}
        />
      </TopicSection>

      <div className="card mt-10 opacity-70">
        <p className="text-sm text-muted">
          Video-Beispiele und konkrete Trainingsformen zu jeder Technik
          sind als nächster Ausbauschritt geplant.
        </p>
      </div>
    </div>
  );
}
