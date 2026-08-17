import Link from "next/link";
import { careerTimeline } from "@/lib/career/timeline";

export const metadata = { title: "Für Eltern · Torwart Akademie" };

const topics = [
  {
    title: "Ausrüstung",
    body:
      "Passende Handschuhgröße, Schienbeinschoner und Torwarthose sind für Training und Spiel wichtiger als das teuerste Modell. Ausführliche Kaufberatung folgt hier als eigenes Modul.",
  },
  {
    title: "Alltag & Unterstützung",
    body:
      "Regelmäßiger Schlaf, ausgewogene Ernährung und ein fester Trainingsrhythmus helfen jungen Torhütern mehr als zusätzlicher Druck vor dem Spiel.",
  },
  {
    title: "Umgang mit Fehlern",
    body:
      "Ein Gegentor gehört zum Torwartspiel dazu. Zuhause über das Spiel statt nur über Fehler zu sprechen, hilft beim Dranbleiben.",
  },
  {
    title: "Kommunikation mit dem Trainer",
    body:
      "Fragen zur Spielzeit oder Position gehören dem Kind, nicht den Eltern. Direkter Kontakt zum Trainer ist sinnvoll bei organisatorischen Themen, nicht bei jeder einzelnen Trainingsentscheidung.",
  },
  {
    title: "Spieltage begleiten",
    body:
      "Ankommen, unaufgeregt anfeuern, nach dem Spiel nicht sofort analysieren. Die Autofahrt nach Hause muss kein Nachbesprechungstermin sein.",
  },
  {
    title: "Wenn's mal nicht läuft",
    body:
      "Formtiefs und Nichtnominierungen gehören zur Entwicklung dazu. Der Vergleich mit Mannschaftskollegen hilft selten — der Vergleich mit dem eigenen letzten Stand schon.",
  },
];

export default function ElternPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-semibold text-ink">Für Eltern</h1>
      <p className="mt-2 text-muted">
        Ein Überblick, was auf dem Weg zum Torhüter wichtig wird — und wie
        ihr euer Kind dabei unterstützen könnt.
      </p>

      <h2 className="mt-10 text-lg font-semibold text-ink">
        Der Weg vom Bambini zum Torhüter im Herrenbereich
      </h2>
      <p className="mt-1 text-sm text-muted">
        Ein grober Orientierungsrahmen — jedes Kind entwickelt sich anders,
        die Altersangaben sind kein Maßstab, an dem man sich messen sollte.
      </p>
      <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
        {careerTimeline.map((step) => (
          <div
            key={step.age}
            className="card w-40 shrink-0"
          >
            <span className="text-xs font-semibold text-pitch">
              {step.age}
            </span>
            <p className="mt-1 text-sm font-semibold text-ink">
              {step.stage}
            </p>
            <p className="mt-1 text-xs text-muted">{step.goal}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-lg font-semibold text-ink">Themen für euch</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {topics.map((t) => (
          <div key={t.title} className="card">
            <h3 className="font-semibold text-ink">{t.title}</h3>
            <p className="mt-2 text-sm text-muted">{t.body}</p>
          </div>
        ))}
      </div>

      <div className="card mt-10 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-ink">
          Neugierig, was euer Kind gerade übt? Die Torhüter-Lernmodule
          sind frei zugänglich.
        </p>
        <Link href="/torhueter" className="btn-ghost shrink-0">
          Module ansehen →
        </Link>
      </div>
    </div>
  );
}
