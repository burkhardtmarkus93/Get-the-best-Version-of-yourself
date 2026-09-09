// Piktogramme im Stil des Zeichens: gleiches 72er-Raster, Strichstärke 5,
// runde Kappen und Ecken, keine Füllungen. Sie stehen — wie die
// Kleinfassung auf dem Instagram-Highlight — schwarz (`pictogram`) auf
// einem Kreis in Limettengrün. So ersetzen sie die Emojis, die je nach
// Betriebssystem anders aussahen und nichts mit der Marke zu tun hatten.
//
// Neue Piktogramme bitte im selben Raster anlegen: sichtbare Zeichnung
// zwischen 10 und 62, damit alle gleich schwer wirken.

import { useId } from "react";
import { BALL } from "./ball";

export type PiktogrammName =
  | "ball"
  | "tor"
  | "abwehr"
  | "mittelfeld"
  | "sturm"
  | "eltern"
  | "trainer"
  | "sprache"
  | "handschuh"
  | "taktik"
  | "athletik"
  | "mental";

// Jeder Eintrag: Pfade (d-Attribute) und optionale Kreise.
const ZEICHNUNGEN: Record<
  Exclude<PiktogrammName, "ball">,
  { pfade: string[]; kreise?: [number, number, number][] }
> = {
  // Tor von vorn: Pfosten, Latte, wenig Netz — mehr Linien und es wird
  // bei 30 px zum Kamm.
  tor: {
    pfade: ["M12 56 V20 H60 V56", "M28 20 V56 M44 20 V56", "M12 38 H60"],
  },
  // Abwehr: Schild.
  abwehr: {
    pfade: ["M36 12 L56 20 V36 C56 48 46 56 36 61 C26 56 16 48 16 36 V20 Z"],
  },
  // Mittelfeld: Mittellinie und Mittelkreis — das Herz des eigenen Zeichens.
  mittelfeld: {
    kreise: [[36, 36, 11]],
    pfade: ["M12 36 H25 M47 36 H60"],
  },
  // Sturm: Pfeil aufs Tor.
  sturm: {
    pfade: ["M14 36 H54", "M42 24 L54 36 L42 48"],
  },
  // Eltern: große und kleine Figur.
  eltern: {
    kreise: [
      [26, 22, 7],
      [49, 32, 5.5],
    ],
    pfade: ["M12 56 C12 44 18 40 26 40 C34 40 40 44 40 56", "M40 58 C40 50 44 47 49 47 C54 47 59 50 59 58"],
  },
  // Trainer: Klemmbrett mit Notizen.
  trainer: {
    pfade: ["M18 16 H54 V60 H18 Z", "M29 16 V11 H43 V16", "M27 32 H45 M27 42 H39"],
  },
  // Sprache: Sprechblase mit zwei Zeilen.
  sprache: {
    pfade: ["M14 16 H58 V44 H34 L24 54 V44 H14 Z", "M26 26 H46 M26 34 H40"],
  },
  // Fangen: Ball über offenen Händen. Ein einzelner Handschuh war bei
  // 30 px nicht zu erkennen.
  handschuh: {
    kreise: [[36, 27, 10]],
    pfade: ["M14 44 C16 57 26 62 36 62 C46 62 56 57 58 44", "M14 44 V37 M58 44 V37"],
  },
  // Taktik: Laufweg mit Pfeilspitze.
  taktik: {
    pfade: ["M14 52 L30 34 L42 44 L58 22", "M48 22 H58 V32"],
  },
  // Athletik: Hantel.
  athletik: {
    pfade: ["M18 26 V46 M26 20 V52 M46 20 V52 M54 26 V46", "M26 36 H46", "M10 36 H18 M54 36 H62"],
  },
  // Mentale Stärke: Glühbirne.
  mental: {
    kreise: [[36, 28, 13]],
    pfade: ["M30 41 V50 H42 V41", "M32 58 H40"],
  },
};

export interface PiktogrammProps {
  name: PiktogrammName;
  className?: string;
}

export function Piktogramm({ name, className }: PiktogrammProps) {
  const clipId = useId();
  return (
    <span
      className={
        "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pitch-bright " +
        (className ?? "")
      }
    >
      <svg
        viewBox="0 0 72 72"
        width={30}
        height={30}
        aria-hidden="true"
        focusable="false"
        className="stroke-pictogram"
        fill="none"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {name === "ball" ? (
          // Derselbe Ball wie im Zeichen, nur als Flächen: Flicken und
          // Umriss schwarz, die Ballfläche bleibt das Grün des Kreises.
          // Im Zeichen sitzt der Ball zwischen den Ecken (Radius 16), hier
          // füllt er das Raster wie die anderen Piktogramme (Radius 25).
          <g transform="translate(36 36) scale(1.55) translate(-36 -36)">
            <clipPath id={clipId}>
              <circle cx={BALL.cx} cy={BALL.cy} r={BALL.r} />
            </clipPath>
            <g clipPath={`url(#${clipId})`}>
              <path d={BALL.flicken} className="fill-pictogram" stroke="none" />
            </g>
            <path d={BALL.naehte} strokeWidth={BALL.strich * 0.6} />
            <circle cx={BALL.cx} cy={BALL.cy} r={BALL.r} strokeWidth={BALL.strich} />
          </g>
        ) : (
          <>
            {ZEICHNUNGEN[name].kreise?.map(([cx, cy, r]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
            ))}
            {ZEICHNUNGEN[name].pfade.map((d) => (
              <path key={d} d={d} />
            ))}
          </>
        )}
      </svg>
    </span>
  );
}
