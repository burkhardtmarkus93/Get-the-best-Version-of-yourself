# 🧤 Torwart Akademie

Lernplattform für Torhüter, ihre Eltern und Trainer:innen mit Interesse
am Torwarttraining. Tech-Stack und Projektstruktur an
[`talent-catcher`](https://github.com/burkhardtmarkus93/talent-catcher)
angelehnt.

## Lokal starten

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Ohne Supabase-Setup funktioniert die Seite trotzdem — der Vokabeltrainer
speichert dann einfach nur lokal im Browser. Für geräteübergreifenden
Fortschritt (`/konto`) braucht es ein eigenes Supabase-Projekt: Werte aus
den Projekteinstellungen (`Project URL`, `anon`/`publishable` Key) in
`.env.local` eintragen und die Migration `vocab_progress` anwenden
(Tabelle + RLS-Policies, siehe `supabase/migrations` bzw. MCP-Tooling).

## Bereiche

- **`/torhueter`** — Fünf Lernmodule für Torhüter selbst: Fußballwörter
  Trainer (449 Begriffe, 4 Sprachen, Leitner-System + Quiz),
  Technik-Grundlagen, Taktik-Grundlagen, Athletik & Ernährung, Mentale
  Stärke.
- **`/eltern`** — Orientierung für Eltern: Werdegang vom Bambini zum
  Torhüter im Herrenbereich, sechs Themen von Ausrüstung bis
  Spieltag-Begleitung.
- **`/trainer`** — Für Trainer:innen mit Interesse am Torwarttraining:
  Lizenzwege, Themenbereiche, Coaching-Prinzipien und
  Trainingssteuerung.

## Struktur

```
app/                      Next.js App Router Seiten
  torhueter/vokabeln/      Vokabeltrainer-Modul
  torhueter/technik/       Technik-Grundlagen-Modul
  torhueter/taktik/        Taktik-Grundlagen-Modul
  torhueter/athletik/      Athletik & Ernährung-Modul
  torhueter/mental/        Mentale-Stärke-Modul
  eltern/                  Elternbereich
  trainer/                 Trainerbereich
components/
  vocab/VocabTrainer.tsx   Karteikarten/Quiz/Statistik-Logik
  content/                 Wiederverwendbare Bausteine für Modul-Inhalte
  affiliate/               Werbe-/Affiliate-Komponenten
  auth/                    Login/Signup-Formular
  tour/ProductTour.tsx     Erste-Schritte-Tour (Spotlight, kein Login nötig)
  layout/                  Header/Footer
lib/
  vocab/                   Vokabeldaten + Loader
  career/                  Werdegang- und Trainer-Themendaten
  affiliate/config.ts      Zentrale Stelle für Affiliate-Links
  tour/steps.ts            Schritte der Erste-Schritte-Tour
  supabase/                Client/Server-Setup für Accounts (`/konto`)
```

## Erste-Schritte-Tour

Startet automatisch beim ersten Besuch (Spotlight auf echte UI-Elemente,
`lib/tour/steps.ts`), merkt sich „gesehen" nur lokal im Browser — kein
Login nötig. Jederzeit über den Link „Erste-Schritte-Tour" im Footer
erneut startbar.

## Monetarisierung

- **Aktiv:** Affiliate-Link zu einem Englischkurs (`AFFILIATE_ENGLISH_COURSE_URL`
  in `.env.local`), klar als Werbung gekennzeichnet.
- **Geplant (Phase 2, siehe `CLAUDE.md`):** Torwarthandschuh-Marken mit
  Umsatzbeteiligung — bewusst noch nicht umgesetzt, da die Zielgruppe
  Minderjährige umfasst und das besondere Sorgfalt bei Auswahl,
  Kennzeichnung und Platzierung braucht.
