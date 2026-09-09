# CLAUDE.md — Projektregeln für Campo Academy

Diese Datei gibt Claude verbindliche Regeln für die Arbeit in diesem Repository. Struktur an das Regelwerk von `talent-catcher` angelehnt, Inhalte auf dieses Projekt zugeschnitten.

## 1. Projektüberblick

Campo Academy ist eine Lernplattform für Fußballer:innen aller Positionen, deren Eltern und Trainer:innen. **Den Anfang macht die Torwartposition** — sie ist die erste mit Inhalten, nicht die einzige Zielposition. Formulierungen in Navigation, Überschriften und Metadaten sprechen deshalb von Spieler:innen bzw. Fußball; „Torhüter" steht dort, wo es wirklich um die Position geht (Modulseiten, Fachinhalte). Kernidee: Lernmodule je Position (Vokabeln, Technik, Taktik, Athletik, Mental) plus Informationsbereiche für die beiden Bezugsgruppen des Kindes — Eltern und Trainer.

**Zielgruppen:** 1. Spieler:innen (Kinder/Jugendliche), 2. Eltern, 3. Trainer:innen im Jugendfußball.

**Marke (Vorgabe vom 9. September 2026):** Die Plattform heißt **Campo Academy**. „Academy" bleibt in allen Sprachen englisch, wird also auch im deutschen Text nie zu „Akademie". Farben: Dunkel `#121417`, Limettengrün `#9AE34D`, Schwarz `#111111` für Piktogramme, Hell `#F2F4EF` — **kein Türkis**. Schrift der Marke ist Inter — für Wortmarke, Überschriften und Fließtext, keine zweite Schrift daneben; die Wortmarke setzt CAMPO in 800 und ACADEMY in 500 gesperrt darunter. Das Zeichen sind **vier Ecken mit einem Fußball darin** (Issue #17, Entscheidung vom 9. September 2026): heller Ball mit dunklen Fünfeck-Flicken, kein Linien-Ball — mit Speichen statt Flicken sah es nach Felge aus. Die Ecken sind der einzige Bezug zu Talent Catcher. Das Zeichen steht **nur in der Kopfzeile und als App-Symbol**, nicht als Ornament auf Seiten. Das ursprüngliche Spielfeld-Zeichen (Mittellinie, Mittelkreis, Strafräume) wird nicht mehr verwendet. Ball-Geometrie liegt in `components/brand/ball.ts` und wird von Zeichen und Piktogramm geteilt. Die Oberfläche steht auf **hellem Grund**, passend zur Wortmarke in der Kopfzeile: Ecken in `pitch` (#4E8A1B), Linien und Schrift in `ink`. Limettengrün ist auf Hell zu schwach für Text und dient nur als Fläche mit dunkler Schrift (`pitch-bright`); Akzenttext nutzt `pitch-deep`.

Campo Academy und **Talent Catcher sind getrennte Projekte**. Der einzige zulässige Bezug ist die Form der Ecken im Zeichen — nie Farbe, Name, Daten oder Konten. Konkret: keine Talent-Catcher-Logos oder -Farben einbauen, und die Supabase- bzw. Vercel-Zugänge der beiden Projekte nicht vermischen.

**Monetarisierung (wichtig für Priorisierung):**
- **Phase 1 (jetzt erlaubt):** Affiliate-Links zu thematisch passenden Angeboten (z. B. Englischkurs), immer sichtbar als "Werbung"/"Affiliate-Link" gekennzeichnet (§ 5a UWG). Siehe `lib/affiliate/config.ts`.
- **Phase 2 (NICHT ohne ausdrückliche Freigabe umsetzen):** Torwarthandschuh-Marken mit Umsatzbeteiligung platzieren. Das betrifft eine Plattform mit Kindern/Jugendlichen als Teil der Zielgruppe — hier gilt besondere Sorgfalt bei Kennzeichnung, Produktauswahl (keine offensiv beworbenen Produkte gegenüber Minderjährigen) und Placement (z. B. nicht in Lernmodulen selbst, sondern klar getrennt). Claude soll Vorschläge/Entwürfe machen dürfen, aber keine Partnerbindung oder Produktplatzierung live schalten, ohne dass der Projektverantwortliche das explizit bestätigt.

Wenn eine Aufgabe implizit in Richtung Phase 2 geht (z. B. "bau eine Produktempfehlung für Handschuhe ein"), soll Claude das **explizit benennen** und nachfragen, statt es einfach umzusetzen.

## 2. Tech-Stack (bitte einhalten, nicht wechseln)

- **Next.js 14** mit App Router — kein Pages Router verwenden
- **React 18**, **TypeScript** — kein plain JavaScript für neue Dateien
- **Supabase** für Datenbank, Auth und Row-Level-Security (`@supabase/ssr`, `@supabase/supabase-js`) — aktuell nur als Grundgerüst vorhanden (`lib/supabase/`), noch kein Modul nutzt es aktiv
- **Tailwind CSS** fürs Styling, Design-Tokens in `tailwind.config.ts` (Farben: `ink`/`paper`/`surface`/`pitch`/`amber`/`brick`/`line`/`muted`/`bar`/`pictogram`) — keine Inline-Styles oder neue Farbwerte außerhalb dieser Tokens
- **Marken-Assets**: Zeichen und Wortmarke als Komponenten unter `components/brand/`, die exportierbaren Dateifassungen (SVG für Social Media, Presse, Favicon) unter `public/marke/`. Den Markennamen nicht als Literal in Seiten schreiben, sondern `SITE_NAME` aus `lib/brand/config.ts` verwenden bzw. bei Seitentiteln die Titel-Vorlage aus `app/layout.tsx` greifen lassen
- Lernmodule liegen je Position unter `app/<position>/<modulname>/` (aktuell `app/torhueter/…`), mit zugehöriger Client-Komponente unter `components/<modulname>/`. Neue Positionen bekommen eine eigene Route und einen Eintrag auf `/spieler`
- **Piktogramme statt Emojis**: Symbole in Karten und Listen kommen aus `components/brand/Piktogramm.tsx` (72er-Raster, Strich 5, runde Kappen, schwarz auf grünem Kreis). Neue Symbole dort ergänzen, keine Emojis oder fremden Icon-Sets einbauen

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
