export interface TourStep {
  id: string;
  title: string;
  body: string;
  /** data-tour-id of the element to spotlight; omit for a centered slide. */
  targetId?: string;
  /** Route to navigate to before spotlighting targetId, if not already there. */
  path?: string;
}

export const INTRO_TOUR_STEPS: TourStep[] = [
  {
    id: "welcome",
    title: "Willkommen bei der Torwart Akademie",
    body: "Ein kurzer Rundgang durch die wichtigsten Bereiche — jederzeit unten im Footer über „Erste-Schritte-Tour“ erneut startbar.",
  },
  {
    id: "audiences",
    title: "Drei Zielgruppen, ein Ort",
    body: "Torhüter, Eltern und Trainer:innen finden hier jeweils eigene Bereiche, passend zu dem, was sie gerade brauchen.",
    targetId: "tour-home-audiences",
    path: "/",
  },
  {
    id: "nav-torhueter",
    title: "Für Torhüter",
    body: "Fünf Lernmodule zum eigenen Tempo: Fachvokabular, Technik, Taktik, Athletik & Ernährung, Mentale Stärke.",
    targetId: "tour-nav-torhueter",
  },
  {
    id: "vokabeln",
    title: "Fußballwörter Trainer",
    body: "449 Fachbegriffe in vier Sprachen als Karteikarten oder Quiz — das am weitesten ausgebaute Modul, ideal zum Ausprobieren.",
    targetId: "tour-torhueter-vokabeln",
    path: "/torhueter",
  },
  {
    id: "nav-eltern",
    title: "Für Eltern",
    body: "Werdegang, Ausrüstung und Alltagsbegleitung — Orientierung für Eltern von Torhüter-Kindern.",
    targetId: "tour-nav-eltern",
  },
  {
    id: "nav-trainer",
    title: "Für Trainer",
    body: "Für Trainer:innen mit Interesse am Torwarttraining: Lizenzwege, Themenbereiche und Coaching-Prinzipien.",
    targetId: "tour-nav-trainer",
  },
  {
    id: "nav-konto",
    title: "Mein Konto",
    body: "Optional: mit Konto wird dein Lernfortschritt geräteübergreifend gespeichert statt nur lokal in diesem Browser.",
    targetId: "tour-nav-konto",
  },
  {
    id: "finish",
    title: "Bereit zum Loslegen",
    body: "Das war's! Du kannst die Tour jederzeit über „Erste-Schritte-Tour“ unten im Footer erneut starten.",
  },
];
