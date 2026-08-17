import Link from "next/link";

const audiences = [
  {
    href: "/torhueter",
    emoji: "🧤",
    title: "Für Torhüter",
    description:
      "Lernmodule rund ums Torwartspiel — von Fachvokabular bis (bald) Technik und Taktik.",
    cta: "Module ansehen",
  },
  {
    href: "/eltern",
    emoji: "👨‍👩‍👧",
    title: "Für Eltern",
    description:
      "Was Eltern über die Torwartausbildung ihres Kindes wissen sollten — Werdegang, Ausrüstung, Unterstützung im Alltag.",
    cta: "Infos für Eltern",
  },
  {
    href: "/trainer",
    emoji: "📋",
    title: "Für Trainer",
    description:
      "Für Trainer:innen mit Interesse am Torwarttraining — Grundlagen und Materialien für die eigene Trainingsarbeit.",
    cta: "Trainerbereich",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="max-w-2xl">
        <span className="badge">Lernplattform</span>
        <h1 className="mt-4 text-4xl font-semibold text-ink">
          Torwart Akademie
        </h1>
        <p className="mt-4 text-lg text-muted">
          Alles rund ums Torwartspiel an einem Ort — für Torhüter selbst,
          ihre Eltern und Trainer:innen, die sich fürs Torwarttraining
          interessieren.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {audiences.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="card flex flex-col gap-3 transition-colors hover:border-pitch/50"
          >
            <span className="text-3xl">{a.emoji}</span>
            <h2 className="text-lg font-semibold text-ink">{a.title}</h2>
            <p className="flex-1 text-sm text-muted">{a.description}</p>
            <span className="text-sm font-medium text-pitch">
              {a.cta} →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
