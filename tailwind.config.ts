import type { Config } from "tailwindcss";

// Design-System "Campo Academy". Die Palette folgt der Markenvorgabe vom
// 9. September 2026: Dunkel #121417, Limettengrün #9AE34D, Schwarz
// #111111 für Piktogramme, Hell #F2F4EF. Kein Türkis.
//
// Die Oberfläche steht auf hellem Grund — so wie die Wortmarke in der
// Kopfzeile: Ecken in Grün, Linien und Schrift in Dunkel. Das
// Limettengrün ist auf Hell zu schwach für Text und dient deshalb nur als
// Fläche mit dunkler Schrift darauf (Buttons, Piktogramm-Kreise); für
// Akzenttext gibt es den dunkleren Grünton der Vorgabe.
//
// Alles, was nicht direkt in der Vorgabe steht (Zwischenflächen,
// Trennlinien, Sekundärtext), ist aus den vier Markenfarben abgeleitet
// und unten einzeln vermerkt.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#121417",        // Haupttext — Marke "Dunkel"
        paper: "#F2F4EF",      // Seitenhintergrund — Marke "Hell"
        surface: "#FFFFFF",    // Karten-/Panelflächen
        surface2: "#E7EBE2",   // zweite Ebene: Felder, graue Badges
        pitch: {
          DEFAULT: "#4E8A1B",  // Grün auf hellem Grund (Vorgabe): Ecken, Rahmen, Symbole
          deep: "#3F7414",     // Akzenttext und Links — 5:1 auf Hell
          bright: "#9AE34D",   // Limettengrün als Fläche, dunkle Schrift darauf
          dim: "#E3F3D0",      // heller Grün-Tint: Badges, Hover
        },
        amber: {
          DEFAULT: "#8A5306",  // Hinweistext — 5:1 auf dem Tint
          dim: "#F7EBD3",
        },
        brick: {
          DEFAULT: "#B8323C",  // Fehlertext — 4,7:1 auf dem Tint
          dim: "#F9E0E2",
        },
        line: "#D5DAD2",       // Trennlinien, Card-Border
        muted: "#5A6169",      // Sekundärtext — 5,6:1 auf Hell
        pictogram: "#111111",  // Piktogramme (Vorgabe)
        // Kopf- und Fußzeile: reines Weiß, damit sie sich vom Hell des
        // Seitenhintergrunds noch abheben.
        bar: {
          DEFAULT: "#FFFFFF",
          ink: "#121417",
          muted: "#5A6169",
          line: "#D5DAD2",
          hover: "#EEF2EA",
        },
      },
      // Markenvorgabe: Schrift ist Inter — auch für Überschriften. `display`
      // bleibt als Token bestehen, damit die Aufrufstellen nicht wissen
      // müssen, ob Überschriften und Fließtext dieselbe Schrift nutzen.
      fontFamily: {
        display: ["var(--font-inter)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      borderRadius: {
        sm: "4px",
        md: "6px",
      },
    },
  },
  plugins: [],
};

export default config;
