import { useId } from "react";
import { BALL } from "./ball";

// Das Zeichen der Marke: vier Ecken, darin ein Fußball. Die Ecken sind
// der einzige gestalterische Bezug zu Talent Catcher und bleiben; der
// Ball trägt den Fußball-Bezug (Entscheidung vom 9. September 2026,
// siehe Issue #17). Die Plattform verwendet das Zeichen nur in der
// Kopfzeile und als App-Symbol.
//
// Farben kommen aus den Design-Tokens (siehe `tailwind.config.ts`),
// nicht als Literale: Ecken in `pitch` (hell) bzw. `pitch-bright`
// (dunkel), Flicken und Umriss immer in `ink`, die Ballfläche in
// `surface` (hell) bzw. `paper` (dunkel) — ein heller Ball auf beiden
// Untergründen.

export interface MarkProps {
  /** Kantenlänge in Pixeln. */
  size: number;
  /** Untergrund, auf dem das Zeichen steht. */
  grund?: "hell" | "dunkel";
  className?: string;
}

export function Mark({ size, grund = "hell", className }: MarkProps) {
  // Der Beschnitt der Randflicken braucht eine clipPath-ID; useId hält
  // sie eindeutig, auch wenn das Zeichen mehrfach auf einer Seite steht.
  const clipId = useId();
  const ecken = grund === "hell" ? "stroke-pitch" : "stroke-pitch-bright";
  const kugel = grund === "hell" ? "fill-surface" : "fill-paper";

  return (
    <svg
      viewBox="0 0 72 72"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <g
        className={ecken}
        fill="none"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 24 V8 H24" />
        <path d="M48 8 H64 V24" />
        <path d="M64 48 V64 H48" />
        <path d="M24 64 H8 V48" />
      </g>
      <clipPath id={clipId}>
        <circle cx={BALL.cx} cy={BALL.cy} r={BALL.r} />
      </clipPath>
      <circle cx={BALL.cx} cy={BALL.cy} r={BALL.r} className={kugel} />
      <g clipPath={`url(#${clipId})`}>
        <path d={BALL.flicken} className="fill-ink" />
      </g>
      <path
        d={BALL.naehte}
        fill="none"
        className="stroke-ink"
        strokeWidth={BALL.strich * 0.6}
        strokeLinecap="round"
      />
      <circle
        cx={BALL.cx}
        cy={BALL.cy}
        r={BALL.r}
        fill="none"
        className="stroke-ink"
        strokeWidth={BALL.strich}
      />
    </svg>
  );
}
