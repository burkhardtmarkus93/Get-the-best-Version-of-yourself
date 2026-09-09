// Das Zeichen der Marke: das Spielfeld. Vier Ecken, Mittellinie,
// Mittelkreis, Anstoßpunkt, zwei Strafräume.
//
// Die Markenvorgabe schreibt ab 48 px abwärts die Kleinfassung vor —
// nur Ecken, Mittellinie, Mittelkreis. Diese Regel steckt hier in der
// Komponente, damit sie nicht an jeder Aufrufstelle neu bedacht werden
// muss: wer `size` unter 48 setzt, bekommt automatisch die Kleinfassung.
//
// Farben kommen aus den Design-Tokens (siehe `tailwind.config.ts`),
// nicht als Literale: auf dunklem Grund Ecken in `pitch` und Linien in
// `ink`, auf hellem Grund Ecken in `pitch-dark` und Linien in `bar-ink`.

const GRENZE_KLEINFASSUNG = 48;

export interface MarkProps {
  /** Kantenlänge in Pixeln. Unter 48 px greift die Kleinfassung. */
  size: number;
  /** Untergrund, auf dem das Zeichen steht. */
  grund?: "hell" | "dunkel";
  /** Kleinfassung erzwingen, unabhängig von der Größe. */
  klein?: boolean;
  className?: string;
}

export function Mark({
  size,
  grund = "dunkel",
  klein,
  className,
}: MarkProps) {
  const kleinfassung = klein ?? size < GRENZE_KLEINFASSUNG;
  const ecken = grund === "hell" ? "stroke-pitch-dark" : "stroke-pitch";
  const linien = grund === "hell" ? "stroke-bar-ink" : "stroke-ink";
  const punkt = grund === "hell" ? "fill-bar-ink" : "fill-ink";

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
      <g
        className={linien}
        fill="none"
        strokeWidth={kleinfassung ? 4.5 : 3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 36 H50" />
        <circle cx="36" cy="36" r={kleinfassung ? 8 : 7.5} />
        {!kleinfassung && (
          <>
            <path d="M27 8 V17 H45 V8" />
            <path d="M27 64 V55 H45 V64" />
          </>
        )}
      </g>
      {!kleinfassung && (
        <circle cx="36" cy="36" r="2" className={punkt} />
      )}
    </svg>
  );
}
