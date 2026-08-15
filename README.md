# ⚽ Fußballwörter Trainer

Ein Lern-Tool für mehrsprachige Fußball-Vokabeln (Deutsch, Englisch, Portugiesisch,
Spanisch), gebaut aus einer Sammlung von 449 Fachbegriffen aus 13 Kategorien
(Spielfeld, Spieler, Technik, Taktik, Torwart, u.v.m.).

Läuft komplett im Browser, ohne Build-Schritt, ohne Server-Backend. Der
Lernfortschritt wird lokal im `localStorage` des Browsers gespeichert.

## Öffnen

Einfach `index.html` im Browser öffnen, oder lokal servieren:

```bash
python3 -m http.server 8000
# dann http://localhost:8000 öffnen
```

## Funktionen

- **Karteikarten** – Karteikarten-Modus mit Leitner-System (5 Boxen).
  Richtig beantwortete Karten wandern in höhere Boxen und werden seltener
  abgefragt, falsch beantwortete fallen zurück auf Box 1.
- **Quiz** – Multiple-Choice-Runden mit 4 Antwortoptionen, Distraktoren
  bevorzugt aus derselben Kategorie. Ergebnisse fließen ebenfalls ins
  Leitner-System ein.
- **Statistik** – Fortschritt je Box (für die aktuell gewählte
  Sprachrichtung) und Fortschritt je Kategorie.
- **Torwarttrainer** – Referenzseite mit dem 19-Jahre-Werdegang vom
  Bambini-Kicker zum Bundesliga-Torspieler und dem vollständigen
  Themenplan für Torspieler-Trainer (Lizenzen, Philosophie, Trainingstheorie
  und -praxis, Analysen) von Markus Burkhardt (Goalplayer Coach).

Sprachrichtung (von/nach) und Kategorien lassen sich oben in der Filterleiste
frei kombinieren; die Auswahl gilt für Karteikarten, Quiz und Statistik
gleichermaßen und wird ebenfalls lokal gespeichert.

## Struktur

```
index.html               Hauptseite mit allen vier Tabs
assets/style.css          Styling
assets/app.js             App-Logik (Karteikarten, Quiz, Statistik, Leitner-System)
assets/reference-data.js  Werdegang-Timeline & Themenplan-Daten
data/vocab-manifest.json  Liste der Vokabel-Dateien je Kategorie
data/vocab/*.json         Vokabeldaten je Kategorie (per fetch geladen)
```
