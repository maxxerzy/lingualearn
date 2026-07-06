# LinguaLearn

Vokabeltrainer für **Dänisch, Griechisch, Französisch, Spanisch, Latein und Russisch** — als reine statische Web-App ohne Server, Build-Schritt oder externe Dienste.

**Features:** Karteikarten mit IPA-Aussprache-Tooltips und deutschen Beispielsatz-Übersetzungen · Multiple Choice · Vergleichsmodus · Spaced-Repetition-Levelsystem (fällige Karten) · XP, Level & Tages-Streaks · Erfolge & Aktivitäts-Heatmap · Deck-Import/-Export · mehrere lokale Nutzerkonten · **offline nutzbar (PWA)**.

Alle Daten (Konten, Lernstand, Statistiken) bleiben im `localStorage` des Browsers — nichts verlässt das Gerät.

## Deployment auf Cloudflare Pages (Free)

Die App ist vollständig selbst-tragend (keine CDN- oder API-Abhängigkeiten). Es genügt, den Projektordner hochzuladen — **kein Build nötig**.

### Weg A: Drag & Drop (ohne Terminal)

1. Bei [dash.cloudflare.com](https://dash.cloudflare.com) anmelden (kostenloses Konto reicht)
2. **Workers & Pages → Create → Pages → Upload assets**
3. Projektnamen wählen (z. B. `lingualearn`) und den kompletten Projektordner per Drag & Drop hochladen
4. Fertig — die App läuft unter `https://<name>.pages.dev`

Für Updates: denselben Ordner einfach erneut hochladen (im Projekt unter **Create new deployment**).

### Weg B: Kommandozeile (wrangler)

```bash
npx wrangler login                                        # einmalig
npx wrangler pages deploy . --project-name lingualearn    # bei jedem Update
```

### Weg C: Git-Integration (Workers Builds)

Im Cloudflare-Dashboard das Repository anbinden und als Deploy-Command `npx wrangler deploy` setzen (Build-Command leer lassen). Die committete `wrangler.jsonc` liefert die Konfiguration; `.assetsignore` hält `node_modules`, `.git` & Co. aus dem Asset-Upload heraus.

*Hinweis:* Weg C nutzt GitHub als Deploy-Trigger — wer vollständig GitHub-unabhängig bleiben will, nimmt Weg A oder B.

### Eigene Domain

Im Pages-Projekt unter **Custom domains** lässt sich jede eigene Domain anbinden (Zertifikat kommt automatisch).

## Andere Hosting-Optionen

Jeder statische Host funktioniert — Voraussetzung ist nur Auslieferung über **HTTP(S)** (ES-Module laufen nicht per Doppelklick auf `index.html`):

- **Eigener Webspace:** alle Dateien per FTP/SFTP hochladen
- **Eigener Server:** z. B. nginx mit `root /pfad/zum/projekt;` — keine weitere Konfiguration nötig
- Lokal testen: `npm run serve` (startet `python3 -m http.server 4173`)

Die Datei `_headers` enthält Cache-Regeln im Cloudflare-Pages-Format; andere Hosts ignorieren sie einfach.

## Offline / PWA

Nach dem ersten Besuch cached ein Service Worker (`sw.js`) die komplette App inklusive aller Vokabeldecks — sie funktioniert dann auch ohne Internet und lässt sich am Handy „Zum Startbildschirm hinzufügen".

Beim Veröffentlichen einer neuen Version die Konstante `CACHE_VERSION` in `sw.js` erhöhen, damit Clients die aktualisierten Dateien laden.

## Projektstruktur

```
index.html              App-Shell, Login, Views
core/                   Logik: Auth, Session, Lernstand, Gamification
ui/                     Widgets: Navigation, Einstellungen, Toasts, Gamification-UI
js/app.js               Bootstrap
js/data/decks/          Vokabeldecks (eine Datei pro Sprache, lazy geladen)
styles/                 CSS (Basis, Animationen, Gamification)
assets/fontawesome/     Icons (self-hosted, kein CDN)
sw.js                   Service Worker (Offline-Cache)
manifest.webmanifest    PWA-Manifest
_headers                Cache-Regeln für Cloudflare Pages
```

## Deck-Format (Import/Export)

```json
{
  "name": "Deck-Name",
  "language": "da",
  "cards": [
    { "front": "Haus", "back": "hus", "example": "Det er et smukt hus." }
  ]
}
```
