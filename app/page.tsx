import Link from "next/link";
import { Mark } from "@/components/brand/Mark";
import { Piktogramm, type PiktogrammName } from "@/components/brand/Piktogramm";
import { SITE_NAME } from "@/lib/brand/config";

const audiences: {
  href: string;
  piktogramm: PiktogrammName;
  title: string;
  description: string;
  cta: string;
}[] = [
  {
    href: "/spieler",
    piktogramm: "ball",
    title: "Für Spieler",
    description:
      "Lernmodule je Position, zum eigenen Tempo. Den Anfang macht der Torhüter: Fachvokabular, Technik, Taktik, Athletik & Ernährung, Mentale Stärke.",
    cta: "Positionen ansehen",
  },
  {
    href: "/eltern",
    piktogramm: "eltern",
    title: "Für Eltern",
    description:
      "Was Eltern über die Fußballausbildung ihres Kindes wissen sollten — Werdegang, Ausrüstung, Unterstützung im Alltag.",
    cta: "Infos für Eltern",
  },
  {
    href: "/trainer",
    piktogramm: "trainer",
    title: "Für Trainer",
    description:
      "Für Trainer:innen im Jugendfußball — Grundlagen und Materialien für die eigene Trainingsarbeit, zunächst mit Schwerpunkt Torwart.",
    cta: "Trainerbereich",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="flex items-start justify-between gap-8">
        <div className="max-w-2xl">
          <span className="badge">Lernplattform</span>
          <h1 className="mt-4 text-4xl font-extrabold text-ink sm:text-5xl">
            {SITE_NAME}
          </h1>
          <p className="mt-4 text-lg text-muted">
            Alles rund ums Fußballspiel an einem Ort — für Spieler:innen
            selbst, ihre Eltern und Trainer:innen. Wir fangen bei der
            Torwartposition an, weitere Positionen folgen.
          </p>
        </div>
        {/* Das Zeichen in der Vollfassung als ruhiges Ornament neben dem
            Namen — groß genug für Strafräume und Anstoßpunkt, erst ab
            mittlerer Breite, damit es auf dem Handy keinen Platz nimmt. */}
        <Mark
          size={144}
          className="hidden shrink-0 opacity-70 md:block"
        />
      </div>

      <div data-tour-id="tour-home-audiences" className="mt-12 grid gap-5 sm:grid-cols-3">
        {audiences.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="card flex flex-col gap-3 transition-colors hover:border-pitch/50"
          >
            <Piktogramm name={a.piktogramm} />
            <h2 className="text-lg text-ink">{a.title}</h2>
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
