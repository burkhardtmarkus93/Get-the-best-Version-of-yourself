// Das Zeichen der Marke: vier Ecken, Mittellinie, Mittelkreis — die
// Kleinfassung aus der Markenvorgabe. Sie ist die einzige Fassung, die
// die Plattform verwendet (Entscheidung vom 9. September 2026: die
// Vollfassung mit Strafräumen und Anstoßpunkt bleibt in der Schublade).
//
// Farben kommen aus den Design-Tokens (siehe `tailwind.config.ts`),
// nicht als Literale: auf hellem Grund Ecken in `pitch` und Linien in
// `ink`, auf dunklem Grund Ecken in `pitch-bright` und Linien in `paper`.

export interface MarkProps {
  /** Kantenlänge in Pixeln. */
  size: number;
  /** Untergrund, auf dem das Zeichen steht. */
  grund?: "hell" | "dunkel";
  className?: string;
}

export function Mark({ size, grund = "hell", className }: MarkProps) {
  const ecken = grund === "hell" ? "stroke-pitch" : "stroke-pitch-bright";
  const linien = grund === "hell" ? "stroke-ink" : "stroke-paper";

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
      <g className={linien} fill="none" strokeWidth={4.5} strokeLinecap="round">
        <path d="M22 36 H50" />
        <circle cx="36" cy="36" r="8" />
      </g>
    </svg>
  );
}
