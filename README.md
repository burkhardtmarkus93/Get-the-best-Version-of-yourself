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

Für den Vokabeltrainer reicht das bereits aus (kein Supabase-Setup nötig,
Fortschritt liegt lokal im Browser). Supabase ist als Grundgerüst für
künftige Module vorbereitet, aber noch nicht aktiv genutzt.

## Bereiche

- **`/torhueter`** — Lernmodule für Torhüter selbst. Aktuell: der
  Fußballwörter-Vokabeltrainer (449 Begriffe, 4 Sprachen, Leitner-System
  + Quiz). Weitere Module (Technik, Mentale Stärke) sind vorgemerkt.
- **`/eltern`** — Orientierung für Eltern: Werdegang vom Bambini zum
  Torhüter im Herrenbereich, Themen wie Ausrüstung und Alltag.
- **`/trainer`** — Für Trainer:innen mit Interesse am Torwarttraining:
  Lizenzwege und Themenbereiche.

## Struktur

```
app/                      Next.js App Router Seiten
  torhueter/vokabeln/      Vokabeltrainer-Modul
  eltern/                  Elternbereich
  trainer/                 Trainerbereich
components/
  vocab/VocabTrainer.tsx   Karteikarten/Quiz/Statistik-Logik
  affiliate/               Werbe-/Affiliate-Komponenten
  layout/                  Header/Footer
lib/
  vocab/                   Vokabeldaten + Loader
  career/                  Werdegang- und Trainer-Themendaten
  affiliate/config.ts      Zentrale Stelle für Affiliate-Links
  supabase/                Client/Server-Setup (noch ungenutzt)
```

## Monetarisierung

- **Aktiv:** Affiliate-Link zu einem Englischkurs (`AFFILIATE_ENGLISH_COURSE_URL`
  in `.env.local`), klar als Werbung gekennzeichnet.
- **Geplant (Phase 2, siehe `CLAUDE.md`):** Torwarthandschuh-Marken mit
  Umsatzbeteiligung — bewusst noch nicht umgesetzt, da die Zielgruppe
  Minderjährige umfasst und das besondere Sorgfalt bei Auswahl,
  Kennzeichnung und Platzierung braucht.
