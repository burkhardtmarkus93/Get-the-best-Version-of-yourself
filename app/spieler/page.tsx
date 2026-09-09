import Link from "next/link";
import { Piktogramm, type PiktogrammName } from "@/components/brand/Piktogramm";

export const metadata = { title: "Für Spieler" };

// Die Plattform ist für Fußballer:innen aller Positionen gedacht. Den
// Anfang macht der Torhüter — die übrigen Positionen stehen hier schon,
// damit klar ist, wohin die Reise geht, sind aber noch ohne Inhalte.
const positions: {
  href?: string;
  piktogramm: PiktogrammName;
  title: string;
  description: string;
  status: string;
}[] = [
  {
    href: "/torhueter",
    piktogramm: "tor",
    title: "Torhüter",
    description:
      "Fünf Lernmodule: Fußballwörter Trainer, Technik, Taktik, Athletik & Ernährung, Mentale Stärke.",
    status: "Verfügbar",
  },
  {
    piktogramm: "abwehr",
    title: "Abwehr",
    description:
      "Zweikampf, Stellungsspiel in der Kette, Spieleröffnung aus der Abwehr.",
    status: "In Vorbereitung",
  },
  {
    piktogramm: "mittelfeld",
    title: "Mittelfeld",
    description:
      "Ballbehauptung, Raumaufteilung, Umschalten in beide Richtungen.",
    status: "In Vorbereitung",
  },
  {
    piktogramm: "sturm",
    title: "Sturm",
    description: "Laufwege, Abschluss, Pressing als erste Verteidigungslinie.",
    status: "In Vorbereitung",
  },
];

export default function SpielerPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-3xl text-ink">Für Spieler</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Such dir deine Position aus. Die Module sind zum eigenen Tempo
        gedacht — kein Zeitdruck, kein Vergleich mit anderen. Wir fangen
        beim Torhüter an, die anderen Positionen kommen nach und nach dazu.
      </p>

      <div data-tour-id="tour-spieler-positionen" className="mt-10 grid gap-5 sm:grid-cols-2">
        {positions.map((p) => {
          const content = (
            <>
              <div className="flex items-start justify-between gap-3">
                <Piktogramm name={p.piktogramm} />
                <span className={p.href ? "badge" : "badge-muted"}>
                  {p.status}
                </span>
              </div>
              <h2 className="mt-4 text-lg text-ink">{p.title}</h2>
              <p className="mt-1 text-sm text-muted">{p.description}</p>
            </>
          );

          return p.href ? (
            <Link
              key={p.title}
              href={p.href}
              data-tour-id="tour-spieler-torhueter"
              className="card transition-colors hover:border-pitch/50"
            >
              {content}
            </Link>
          ) : (
            <div key={p.title} className="card opacity-60">
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
