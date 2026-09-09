// Der Fußball im 72er-Raster, Mittelpunkt 36/36, Radius 16 — geteilt von
// Zeichen (`Mark`) und Piktogramm (`Piktogramm`), damit beide denselben
// Ball zeigen.
//
// Klassisches Muster: heller Ball, dunkle Fünfeck-Flicken. Eines in der
// Mitte, fünf angeschnittene am Rand, dazwischen dünne Nähte. Die Flicken
// tragen die Erkennbarkeit — mit Speichen statt Flicken sah es bei jeder
// Größe nach Felge aus. Die Randflicken werden auf den Kreis beschnitten.

export const BALL = {
  cx: 36,
  cy: 36,
  r: 16,
  /** Sechs Fünfecke; die fünf äußeren ragen über den Kreis hinaus. */
  flicken:
    "M36 30.24 L41.48 34.22 L39.39 40.66 L32.61 40.66 L30.52 34.22 Z M36 25.6 L30.98 21.95 L32.9 16.05 L39.1 16.05 L41.02 21.95 Z M45.89 32.79 L47.81 26.88 L54.02 26.88 L55.93 32.79 L50.91 36.43 Z M42.11 44.41 L48.32 44.41 L50.24 50.32 L45.22 53.97 L40.19 50.32 Z M29.89 44.41 L31.81 50.32 L26.78 53.97 L21.76 50.32 L23.68 44.41 Z M26.11 32.79 L21.09 36.43 L16.07 32.79 L17.98 26.88 L24.19 26.88 Z",
  /** Nähte von den Ecken des mittleren Fünfecks zu den Randflicken. */
  naehte:
    "M36 30.24 L36 25.6 M41.48 34.22 L45.89 32.79 M39.39 40.66 L42.11 44.41 M32.61 40.66 L29.89 44.41 M30.52 34.22 L26.11 32.79",
  /** Strichstärke des Umrisses; Nähte sind 60 % davon. */
  strich: 1.76,
} as const;
