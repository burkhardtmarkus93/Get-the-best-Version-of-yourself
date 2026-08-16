import Link from "next/link";

const modules = [
  {
    href: "/torhueter/vokabeln",
    emoji: "⚽",
    title: "Fußballwörter Trainer",
    description:
      "449 Fachbegriffe aus 13 Kategorien in Deutsch, Englisch, Portugiesisch und Spanisch — als Karteikarten oder Quiz.",
    status: "Verfügbar",
  },
  {
    href: null,
    emoji: "🥅",
    title: "Technik-Grundlagen",
    description:
      "Grundstellung, Fangen, Fallen, Hechten — Schritt für Schritt erklärt.",
    status: "In Planung",
  },
  {
    href: null,
    emoji: "🧠",
    title: "Mentale Stärke",
    description: "Umgang mit Fehlern, Drucksituationen und Rückschlägen.",
    status: "In Planung",
  },
];

export default function TorhueterPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-3xl font-semibold text-ink">Für Torhüter</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Lernmodule zum eigenen Tempo durcharbeiten. Neue Module kommen
        laufend dazu.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {modules.map((m) => {
          const content = (
            <>
              <div className="flex items-start justify-between gap-3">
                <span className="text-3xl">{m.emoji}</span>
                <span
                  className={
                    m.href
                      ? "badge"
                      : "inline-flex items-center rounded-full bg-surface2 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-muted"
                  }
                >
                  {m.status}
                </span>
              </div>
              <h2 className="mt-3 text-lg font-semibold text-ink">
                {m.title}
              </h2>
              <p className="mt-1 text-sm text-muted">{m.description}</p>
            </>
          );

          return m.href ? (
            <Link
              key={m.title}
              href={m.href}
              className="card transition-colors hover:border-pitch/50"
            >
              {content}
            </Link>
          ) : (
            <div key={m.title} className="card opacity-60">
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
