import Link from "next/link";
import { Piktogramm, type PiktogrammName } from "@/components/brand/Piktogramm";

export const metadata = { title: "Torhüter" };

const modules: {
  href?: string;
  piktogramm: PiktogrammName;
  title: string;
  description: string;
  status: string;
}[] = [
  {
    href: "/torhueter/vokabeln",
    piktogramm: "sprache",
    title: "Fußballwörter Trainer",
    description:
      "449 Fachbegriffe aus 13 Kategorien in Deutsch, Englisch, Portugiesisch und Spanisch — als Karteikarten oder Quiz.",
    status: "Verfügbar",
  },
  {
    href: "/torhueter/technik",
    piktogramm: "handschuh",
    title: "Technik-Grundlagen",
    description:
      "Grundstellung, Fangen, Fallen, Hechten, Spieleröffnung — Schritt für Schritt erklärt.",
    status: "Verfügbar",
  },
  {
    href: "/torhueter/taktik",
    piktogramm: "taktik",
    title: "Taktik-Grundlagen",
    description:
      "Stellungsspiel, Ballgewinnspiel, Spielaufbau und Standardsituationen.",
    status: "Verfügbar",
  },
  {
    href: "/torhueter/athletik",
    piktogramm: "athletik",
    title: "Athletik & Ernährung",
    description:
      "Beweglichkeit, Kraft, Schnelligkeit — plus Ernährung und Regeneration rund ums Spiel.",
    status: "Verfügbar",
  },
  {
    href: "/torhueter/mental",
    piktogramm: "mental",
    title: "Mentale Stärke",
    description: "Umgang mit Fehlern, Drucksituationen und Rückschlägen.",
    status: "Verfügbar",
  },
];

export default function TorhueterPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <Link
        href="/spieler"
        className="text-sm text-muted underline-offset-2 hover:text-ink hover:underline"
      >
        ← Alle Positionen
      </Link>
      <div className="mt-4 flex items-center gap-4">
        <Piktogramm name="tor" />
        <h1 className="text-3xl text-ink">Torhüter</h1>
      </div>
      <p className="mt-3 max-w-2xl text-muted">
        Lernmodule zum eigenen Tempo durcharbeiten. Neue Module kommen
        laufend dazu.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {modules.map((m) => {
          const content = (
            <>
              <div className="flex items-start justify-between gap-3">
                <Piktogramm name={m.piktogramm} />
                <span className={m.href ? "badge" : "badge-muted"}>
                  {m.status}
                </span>
              </div>
              <h2 className="mt-4 text-lg text-ink">{m.title}</h2>
              <p className="mt-1 text-sm text-muted">{m.description}</p>
            </>
          );

          return m.href ? (
            <Link
              key={m.title}
              href={m.href}
              data-tour-id={m.href === "/torhueter/vokabeln" ? "tour-torhueter-vokabeln" : undefined}
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
