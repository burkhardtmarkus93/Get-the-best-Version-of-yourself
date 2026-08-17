# CLAUDE.md — Projektregeln für Torwart Akademie

Diese Datei gibt Claude verbindliche Regeln für die Arbeit in diesem Repository. Struktur an das Regelwerk von `talent-catcher` angelehnt, Inhalte auf dieses Projekt zugeschnitten.

## 1. Projektüberblick

Torwart Akademie ist eine Lernplattform für Torhüter, deren Eltern und Trainer:innen mit Interesse am Torwarttraining. Kernidee: Lernmodule (Vokabeln, später Technik/Taktik/Mental) plus Informationsbereiche für die beiden Bezugsgruppen des Kindes — Eltern und Trainer.

**Zielgruppen:** 1. Torhüter (Kinder/Jugendliche), 2. Eltern, 3. Trainer:innen mit Interesse am Torwarttraining.

**Monetarisierung (wichtig für Priorisierung):**
- **Phase 1 (jetzt erlaubt):** Affiliate-Links zu thematisch passenden Angeboten (z. B. Englischkurs), immer sichtbar als "Werbung"/"Affiliate-Link" gekennzeichnet (§ 5a UWG). Siehe `lib/affiliate/config.ts`.
- **Phase 2 (NICHT ohne ausdrückliche Freigabe umsetzen):** Torwarthandschuh-Marken mit Umsatzbeteiligung platzieren. Das betrifft eine Plattform mit Kindern/Jugendlichen als Teil der Zielgruppe — hier gilt besondere Sorgfalt bei Kennzeichnung, Produktauswahl (keine offensiv beworbenen Produkte gegenüber Minderjährigen) und Placement (z. B. nicht in Lernmodulen selbst, sondern klar getrennt). Claude soll Vorschläge/Entwürfe machen dürfen, aber keine Partnerbindung oder Produktplatzierung live schalten, ohne dass der Projektverantwortliche das explizit bestätigt.

Wenn eine Aufgabe implizit in Richtung Phase 2 geht (z. B. "bau eine Produktempfehlung für Handschuhe ein"), soll Claude das **explizit benennen** und nachfragen, statt es einfach umzusetzen.

## 2. Tech-Stack (bitte einhalten, nicht wechseln)

- **Next.js 14** mit App Router — kein Pages Router verwenden
- **React 18**, **TypeScript** — kein plain JavaScript für neue Dateien
- **Supabase** für Datenbank, Auth und Row-Level-Security (`@supabase/ssr`, `@supabase/supabase-js`) — aktuell nur als Grundgerüst vorhanden (`lib/supabase/`), noch kein Modul nutzt es aktiv
- **Tailwind CSS** fürs Styling, Design-Tokens in `tailwind.config.ts` (Farben: `ink`/`paper`/`surface`/`pitch`/`amber`/`brick`/`line`/`muted`) — keine Inline-Styles oder neue Farbwerte außerhalb dieser Tokens
- Neue Lernmodule als eigene Route unter `app/torhueter/<modulname>/`, mit zugehöriger Client-Komponente unter `components/<modulname>/`

## 3. Grundprinzip: Zielgruppe enthält Minderjährige

- Inhalte, Sprache und Werbeeinblendungen so gestalten, dass sie auch für Kinder/Jugendliche angemessen sind — keine aggressive Kaufaufforderung, kein Kaufdruck
- Sobald ein Modul Nutzerkonten/personenbezogene Daten braucht (z. B. Fortschritt geräteübergreifend synchen): Row-Level-Security von Anfang an mitdenken, nicht "für später" offenlassen
- Aktuell speichert der Vokabeltrainer Fortschritt nur lokal im Browser (`localStorage`) — bewusste Entscheidung, um ohne Account/Datenerhebung auszukommen, solange kein Modul das zwingend braucht

## 4. Code- und Architekturkonventionen

- Bestehende Ordnerstruktur beibehalten (`app/`, `components/`, `lib/`), keine parallelen Verzeichnisstrukturen
- Lernmodul-Daten (Vokabeln etc.) als statische JSON-Dateien unter `lib/<modul>/data/`, zur Build-Zeit importiert — kein Client-seitiges `fetch()` für Inhalte, die zum Build-Zeitpunkt feststehen
- Affiliate-/Werbelinks ausschließlich über `lib/affiliate/config.ts` einbinden, nie direkt im UI-Code verdrahten
- Neue Server-Logik nach Möglichkeit als Server Components / Route Handlers im App-Router-Stil

## 5. Wie Pull Requests aussehen sollen

- Ein PR = eine klar abgegrenzte Aufgabe
- PR-Beschreibung enthält: Was wurde geändert, warum, was noch offen/zu prüfen ist
- Bei Unsicherheit über Produktentscheidungen (z. B. welches Modul als Nächstes, welche Affiliate-Partner) lieber im PR nachfragen statt eine Annahme zu treffen
- Claude committet nicht direkt in `main` — Änderungen laufen immer über einen Branch + Pull Request zur Freigabe

## 6. Was Claude bei Unklarheit tun soll

- Bei Monetarisierungsentscheidungen mit Minderjährigen-Bezug (siehe Kapitel 1, Phase 2) lieber zu vorsichtig als zu freizügig sein
- Größere Architekturentscheidungen (neues Modul mit Account-Zwang, Zahlungsanbindung) im Issue/PR zur Diskussion stellen, nicht direkt umsetzen
