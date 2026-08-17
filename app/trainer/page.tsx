import Link from "next/link";
import { coachingLicenses, coachingTopics } from "@/lib/career/coaching-topics";
import { TopicSection } from "@/components/content/TopicSection";
import { CueCard } from "@/components/content/CueCard";

export const metadata = { title: "Für Trainer · Torwart Akademie" };

export default function TrainerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-semibold text-ink">Für Trainer</h1>
      <p className="mt-2 text-muted">
        Für Trainer:innen, die sich für Torwarttraining interessieren —
        egal ob als Einstieg oder Vertiefung neben der Feldspieler-Lizenz.
      </p>

      <h2 className="mt-10 text-lg font-semibold text-ink">
        Lizenzwege Torspieler-Trainer
      </h2>
      <ul className="mt-3 flex flex-col gap-2">
        {coachingLicenses.map((l) => (
          <li key={l} className="card py-3 text-sm text-ink">
            {l}
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-lg font-semibold text-ink">
        Themenbereiche
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {coachingTopics.map((t) => (
          <div key={t.title} className="card">
            <h3 className="font-semibold text-ink">{t.title}</h3>
            <p className="mt-2 text-sm text-muted">{t.body}</p>
          </div>
        ))}
      </div>

      <TopicSection
        title="Coaching-Prinzipien"
        intro="Was beim Korrigieren zählt, ist selten die fachliche Tiefe — sondern wie es beim Torhüter ankommt."
      >
        <CueCard
          title="Richtiges Coaching"
          cues={[
            "Fehler erkennen, Übung sofort unterbrechen",
            "Fragen, was falsch war — zeigt, ob der Torhüter es selbst bemerkt hat",
            "Übung richtig vormachen und wiederholen lassen",
          ]}
        />
        <CueCard
          title="Feedback-Verhältnis"
          cues={[
            "Lob-zu-Kritik-Verhältnis von etwa 8:1 anstreben",
            "Grobe Fehler sofort ansprechen, aber nicht zu viele auf einmal",
            "'Natürlich nicht' statt hartem 'Nein' — Ton macht den Unterschied",
          ]}
        />
      </TopicSection>

      <TopicSection title="Trainingssteuerung">
        <CueCard
          title="Trainingsaufbau (WASIC)"
          cues={[
            "Torhütern erklären, welche Übung gemacht wird und wofür",
            "Verständnisfragen zulassen, bevor es losgeht",
            "Nach der Erklärung motivieren statt nur anweisen",
          ]}
        />
        <CueCard
          title="Intensitätssteuerung"
          body="Grobe Orientierung für den Belastungsverlauf einer Einheit (in %)."
          cues={["60 – 80 – 100 – 100 – 80 – 60"]}
        />
      </TopicSection>

      <div className="card mt-10 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-ink">
          Die Torhüter-Lernmodule (Technik, Taktik, Athletik, Mental)
          eignen sich auch als schnelle fachliche Auffrischung für
          Trainer:innen.
        </p>
        <Link href="/torhueter" className="btn-ghost shrink-0">
          Module ansehen →
        </Link>
      </div>

      <div className="card mt-4 opacity-70">
        <p className="text-sm text-muted">
          Konkrete Trainingsformen, Arbeitsblätter und Video-Beispiele
          sind als nächster Ausbauschritt geplant.
        </p>
      </div>
    </div>
  );
}
