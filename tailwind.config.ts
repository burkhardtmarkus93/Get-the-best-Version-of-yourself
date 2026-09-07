import type { Config } from "tailwindcss";

// Design-System "Talent Catcher Academy": Struktur (Text-/Fläche-/Akzent-Token,
// Ampelfarben als Soft-Tint-Paar) von Talent Catcher übernommen, Palette
// an das Dunkel-/Lime-Theme des bestehenden Vokabeltrainer-Moduls
// angeglichen statt eines neuen, unverwandten Farbschemas.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#EEF2EE",        // Haupttext auf dunklem Grund
        paper: "#0F1310",      // Seitenhintergrund
        surface: "#171D18",    // Karten-/Panelflächen
        surface2: "#1F2721",   // Karten-Flächen, zweite Ebene
        pitch: {
          DEFAULT: "#C6F24E",  // Primärakzent: Lime (aus dem Vokabeltrainer)
          dark: "#8FB52E",     // Hover-/Pressed-Ton
          dim: "#26311C",      // dunkler Soft-Tint-Hintergrund (Badges, Hover)
        },
        amber: {
          DEFAULT: "#D98C1B",
          dim: "#332617",
        },
        brick: {
          DEFAULT: "#E5626B",
          dim: "#331D1F",
        },
        line: "#2B352D",       // Trennlinien, Card-Border
        muted: "#9FB0A2",      // Sekundärtext
        // Helle Balken für Kopf- und Fußzeile. Der Inhaltsbereich bleibt
        // dunkel; oben und unten rahmt eine weiße Fläche, auf der das Logo
        // in seiner hellen Fassung steht. Eigene Tokens statt Inline-Werten,
        // damit alle Farben an einer Stelle liegen (siehe CLAUDE.md §2).
        bar: {
          DEFAULT: "#FFFFFF",  // Fläche der Kopf-/Fußzeile
          ink: "#1D2523",      // Haupttext darauf — entspricht der Logo-Schrift
          muted: "#5F6E69",    // Sekundärtext darauf
          line: "#DDE3E1",     // Trennlinie zum dunklen Inhaltsbereich
          hover: "#EEF2F0",    // Hover-Fläche für Navigationslinks
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
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
