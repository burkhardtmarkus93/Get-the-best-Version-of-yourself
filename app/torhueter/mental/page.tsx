import { TopicSection } from "@/components/content/TopicSection";
import { CueCard } from "@/components/content/CueCard";

export const metadata = { title: "Mentale Stärke · Torwart Akademie" };

export default function MentalPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <span className="badge">Torhüter-Modul</span>
      <h1 className="mt-3 text-2xl font-semibold text-ink">
        🧠 Mentale Stärke
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Keine Position im Fußball ist so oft sofort sichtbar für Fehler
        wie die des Torhüters. Wie man damit umgeht, lässt sich genauso
        trainieren wie eine Fangtechnik.
      </p>

      <TopicSection
        title="Während des Spiels"
        intro="Der Moment direkt nach einer Aktion entscheidet oft über die nächste."
      >
        <CueCard
          title="Umgang mit Fehlern"
          cues={[
            "Ein Gegentor ist Teil des Spiels, nicht das Ende",
            "Kurzes, bewusstes Abhaken-Ritual statt Grübeln (z.B. tief durchatmen)",
            "Fokus sofort auf die nächste Aktion richten",
          ]}
        />
        <CueCard
          title="Aufmerksamkeitsregulation"
          cues={[
            "In ruhigen Spielphasen bewusst 'auftanken' — Schultern lockern",
            "Kurz vor Ballkontakt die Aufmerksamkeit gezielt hochfahren",
          ]}
        />
        <CueCard
          title="Verhalten bei gegnerischem Elfmeter"
          cues={[
            "Ruhige, präsente Körpersprache zeigen",
            "Fokus auf die eigenen Stärken statt nur auf den Schützen",
            "Späte Bewegung, um dem Schützen keine Information zu geben",
          ]}
        />
      </TopicSection>

      <TopicSection title="Nach dem Spiel">
        <CueCard
          title="Umgang mit Erfolgen"
          cues={[
            "Freude zulassen, aber zügig wieder auf das nächste Spiel fokussieren",
            "Konstanz über die Saison zählt mehr als einzelne Glanzparaden",
          ]}
        />
        <CueCard
          title="Umgang mit Kritik"
          cues={[
            "Sachliche Kritik als Werkzeug sehen, nicht als Angriff",
            "Selbstreflexion: Was kann ich an mir verbessern?",
          ]}
        />
        <CueCard
          title="Mental Reply"
          body="Kurze gedankliche Nachbereitung, kein stundenlanges Grübeln."
          cues={[
            "Das eigene Spiel kurz durchgehen: Was lief gut, was nicht?",
            "Ein Trainingstagebuch hilft, Muster über Zeit zu erkennen",
          ]}
        />
      </TopicSection>
    </div>
  );
}
