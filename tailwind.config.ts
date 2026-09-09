import type { Config } from "tailwindcss";

// Design-System "Campo Academy". Die Palette folgt der Markenvorgabe vom
// 9. September 2026: Dunkel #121417, Limettengrün #9AE34D, Schwarz
// #111111 für Piktogramme, Hell #F2F4EF. Kein Türkis.
//
// Die Struktur (Text-/Flächen-/Akzent-Token, Ampelfarben als
// Soft-Tint-Paar) bleibt wie gehabt, nur die Werte sind auf die
// Markenfarben umgestellt. Alles, was nicht direkt in der Vorgabe steht
// (Zwischenflächen, Trennlinien, Sekundärtext), ist aus den vier
// Markenfarben abgeleitet und unten einzeln vermerkt.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#F2F4EF",        // Haupttext auf dunklem Grund — Marke "Hell"
        paper: "#121417",      // Seitenhintergrund — Marke "Dunkel"
        surface: "#191C20",    // Karten-/Panelflächen, aus Dunkel aufgehellt
        surface2: "#232830",   // Karten-Flächen, zweite Ebene
        pitch: {
          DEFAULT: "#9AE34D",  // Primärakzent: Limettengrün der Marke
          dark: "#4E8A1B",     // Grünton für hellen Grund (Vorgabe)
          dim: "#222D1E",      // dunkler Soft-Tint (Badges, Hover)
        },
        amber: {
          DEFAULT: "#D98C1B",
          dim: "#332617",
        },
        brick: {
          DEFAULT: "#E5626B",
          dim: "#331D1F",
        },
        line: "#2A2F36",       // Trennlinien, Card-Border
        muted: "#9AA3AE",      // Sekundärtext
        pictogram: "#111111",  // Piktogramme (Vorgabe)
        // Helle Balken für Kopf- und Fußzeile. Der Inhaltsbereich bleibt
        // dunkel; oben und unten rahmt die helle Markenfarbe, auf der die
        // Wortmarke in ihrer Hell-Grund-Fassung steht.
        bar: {
          DEFAULT: "#F2F4EF",  // Fläche der Kopf-/Fußzeile — Marke "Hell"
          ink: "#121417",      // Haupttext darauf — Marke "Dunkel"
          muted: "#5A6169",    // Sekundärtext darauf
          line: "#DCE0D8",     // Trennlinie zum dunklen Inhaltsbereich
          hover: "#E7EBE2",    // Hover-Fläche für Navigationslinks
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
