import { TopicSection } from "@/components/content/TopicSection";
import { CueCard } from "@/components/content/CueCard";

export const metadata = { title: "Athletik & Ernährung · Torwart Akademie" };

export default function AthletikPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <span className="badge">Torhüter-Modul</span>
      <h1 className="mt-3 text-2xl font-semibold text-ink">
        💪 Athletik & Ernährung
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Der Körper ist das Werkzeug für jede Technik. Was außerhalb des
        Trainings passiert — Schlaf, Ernährung, Regeneration — entscheidet
        oft genauso über die Leistung wie die Übung selbst.
      </p>

      <TopicSection
        title="Athletik-Bausteine"
        intro="Fünf Bereiche, die sich gegenseitig ergänzen — keiner ersetzt den anderen."
      >
        <CueCard
          title="Beweglichkeit"
          cues={[
            "Dynamisches Aufwärmen vor jeder Einheit, nie kalt starten",
            "Gezieltes Dehnen von Hüft- und Schultermuskulatur",
          ]}
        />
        <CueCard
          title="Kraft & Stabilisation"
          cues={[
            "Rumpfstabilität als Basis für explosive Bewegungen",
            "Stabilisationsübungen 2–3× pro Woche fest einplanen",
          ]}
        />
        <CueCard
          title="Schnelligkeit"
          cues={[
            "Kurze, explosive Sprints statt langer Sprintstrecken",
            "Reaktionsschnelligkeit trainieren, nicht nur reine Laufgeschwindigkeit",
          ]}
        />
        <CueCard
          title="Ausdauer & Koordination"
          cues={[
            "Grundlagenausdauer für konstante Leistung über 90 Minuten",
            "Koordinationsübungen wie Finger-/Handgymnastik und Quick Steps",
          ]}
        />
      </TopicSection>

      <TopicSection
        title="Ernährung rund ums Spiel"
        intro="Nichts Neues am Spieltag ausprobieren — was funktioniert, im Training testen."
      >
        <CueCard
          title="Vor dem Spiel"
          cues={[
            "Leicht verdauliche Kohlenhydrate, nicht zu knapp vor Anpfiff essen",
            "Ausreichend trinken, aber nicht auf einmal große Mengen",
          ]}
        />
        <CueCard
          title="Während & nach dem Spiel"
          cues={[
            "In Pausen gezielt Flüssigkeit nachfüllen",
            "Nach dem Spiel: Eiweiß und Kohlenhydrate für die Regeneration",
          ]}
        />
        <CueCard
          title="Im Alltag"
          cues={[
            "Ausgewogene Ernährung statt Extremdiäten",
            "Ein Trinktagebuch hilft, Gewohnheiten sichtbar zu machen",
            "Nicht hungrig einkaufen gehen",
          ]}
        />
      </TopicSection>

      <TopicSection title="Schlaf & Regeneration">
        <CueCard
          title="Rituale & Rhythmus"
          cues={[
            "Fester Schlafrhythmus, besonders vor Spieltagen",
            "Immer gleicher Ablauf vor dem Spiel gibt Sicherheit",
          ]}
        />
        <CueCard
          title="Aktive Erholung"
          cues={[
            "Leichtes Auslaufen und Dehnen nach intensiven Einheiten",
            "Regeneration ist Teil des Trainings, nicht dessen Gegenteil",
          ]}
        />
      </TopicSection>
    </div>
  );
}
