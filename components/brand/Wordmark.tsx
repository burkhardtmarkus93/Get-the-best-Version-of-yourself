import { Mark } from "./Mark";

// Wortmarke: Zeichen, daneben CAMPO in 800 und darunter ACADEMY in 500
// gesperrt. Der Schriftzug ist echter Text in Inter statt einer Grafik —
// dadurch bleibt er bei jeder Auflösung scharf, ist vorlesbar und die
// Sperrung lässt sich in em angeben statt in festen Pixeln.
//
// Die Größenverhältnisse stammen aus `public/marke/wortmarke.svg`
// (Zeichen 72, CAMPO 32, Sperrung 2.5 — also 0.44 bzw. 0.078em), hier
// umgerechnet auf ein 44 px hohes Zeichen. Einzige Abweichung: ACADEMY
// stünde nach der Dateifassung bei rund 7 px und wäre damit zu klein zum
// Lesen; in der Kopfzeile steht es deshalb auf 9 px.

const ZEICHEN_GROESSE = 44;

export interface WordmarkProps {
  /** Untergrund, auf dem die Wortmarke steht. */
  grund?: "hell" | "dunkel";
  className?: string;
}

export function Wordmark({ grund = "hell", className }: WordmarkProps) {
  const campo = grund === "hell" ? "text-ink" : "text-paper";
  const academy = grund === "hell" ? "text-pitch" : "text-pitch-bright";

  return (
    <span className={"inline-flex items-center gap-3 " + (className ?? "")}>
      <Mark size={ZEICHEN_GROESSE} grund={grund} />
      {/* leading-none, damit die beiden Zeilen so eng stehen wie in der
          Dateifassung der Wortmarke. */}
      <span className="flex flex-col leading-none">
        <span
          className={`font-sans text-xl font-extrabold tracking-[0.078em] ${campo}`}
        >
          CAMPO
        </span>
        <span
          className={`mt-[0.3em] font-sans text-[9px] font-medium tracking-[0.26em] ${academy}`}
        >
          ACADEMY
        </span>
      </span>
    </span>
  );
}
