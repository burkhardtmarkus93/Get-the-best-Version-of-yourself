# Supabase-Setup

Noch ungenutzt. Der Vokabeltrainer speichert Fortschritt lokal im
Browser und braucht kein Backend. Sobald ein Modul Nutzerkonten oder
geräteübergreifenden Fortschritt braucht:

- Neue Migration als eigene, additive Datei unter `migrations/`
  anlegen (Namensschema: `YYYYMMDDHHMMSS_beschreibung.sql`, wie bei
  [`talent-catcher`](https://github.com/burkhardtmarkus93/talent-catcher))
- Bestehende Migrationen nicht nachträglich verändern
- Jede neue Tabelle mit Personenbezug bekommt von Anfang an Row-Level-
  Security — siehe `CLAUDE.md`
