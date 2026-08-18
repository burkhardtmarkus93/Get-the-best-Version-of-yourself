# Supabase-Setup

Wird aktiv genutzt für Accounts (`/konto`) und geräteübergreifenden
Vokabeltrainer-Fortschritt (`vocab_progress`, siehe `migrations/`). Ohne
gesetzte Env-Vars (`.env.local`) läuft der Vokabeltrainer weiterhin
eigenständig mit lokalem Fortschritt — Supabase ist optional, kein
Hard-Dependency für die Kernfunktion.

- Neue Migration als eigene, additive Datei unter `migrations/`
  anlegen (Namensschema: `YYYYMMDDHHMMSS_beschreibung.sql`, wie bei
  [`talent-catcher`](https://github.com/burkhardtmarkus93/talent-catcher))
- Bestehende Migrationen nicht nachträglich verändern
- Jede neue Tabelle mit Personenbezug bekommt von Anfang an Row-Level-
  Security — siehe `CLAUDE.md`
