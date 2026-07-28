# LinguaLearn — Arbeitsregeln für Claude

## Pull-Request-Regel (WICHTIG, Nutzer-Vorgabe)
**Jede Arbeitswelle bekommt IMMER einen eigenen, neuen Pull Request** —
niemals weitere Commits auf einen bereits offenen PR stapeln.
- Vor jeder neuen Aufgabe: `git fetch origin main` und den Arbeitsbranch
  frisch von `origin/main` aufsetzen.
- Ist der vorherige PR noch offen (nicht gemerged), einen **neuen Branch
  mit Suffix** anlegen (z. B. `claude/code-review-website-deploy-ip7u1x-2`,
  `-3`, …) und den PR von dort eröffnen. Diese Ausnahme vom festen
  Branch-Namen ist vom Nutzer ausdrücklich erlaubt („immer einen neuen
  PR erstellen").
- PR-Titel/-Beschreibung auf Deutsch; Beschreibung endet mit dem
  Claude-Code-Footer + Session-Link.

## Release-Konventionen
- Bei JEDEM Release `CACHE_VERSION` in `sw.js` UND `APP_VERSION` in
  `index.html` gemeinsam erhöhen (vNN) — das loggt alle Nutzer einmalig
  aus (Konten bleiben erhalten). Neue Dateien in die PRECACHE-Liste.
- Merge auf `main` deployt automatisch via Cloudflare Pages.

## Architektur-Kurzüberblick
- Statische PWA ohne Build-Schritt, ES-Module: `core/` (Logik, Stores),
  `ui/` (Ansichten), `js/data/` (Decks, Themen, Grammatik), `utils/`.
- Alles Nutzerdaten liegen im localStorage pro Gerät (kein Server, kein
  Sync); pro Konto über `core/userStore.js`-Präfixe.
- Nur ZWEI Modi: geführter **Lernkurs** (Grammatik-Kapitel → 2er-Häppchen
  kennenlernen → Hören → Üben (MC/Vergleich) → Sprechen → Schreiben →
  Sätze (Lücke/Satzbau/Bedeutung)) und **Karteikarten** (SRS). Alle
  weiteren Übungsformen existieren nur als Kurs-Phasen.
- Latein wird überall in Prüfungsrichtung gelernt (Latein → Deutsch,
  `isReverse` in `core/session.js`) mit klassischer Aussprache über
  `utils/speech.js` (c→k, ae→ei, oe→eu, v→w, y→ü).
- Layout-Garantie: KEIN Seiten-Scrollen in Konfiguration und allen
  Kurs-Schritten auf allen Geräteprofilen; lange Inhalte scrollen
  innerhalb ihrer Karte.

## Tests (vor jedem Push ausführen)
```
(python3 -m http.server 4173 &)          # aus der Repo-Wurzel
node tests/features_smoke.mjs            # Funktions-Regression
node tests/compat_audit.mjs <gerät>      # je: se iph14 iph14pm ipadmini
                                         #     ipad11 ipad11l ipad13l mac13 mac16
```
Alle Smoke-Checks und 9/9 Geräte müssen PASS sein. Neue Features immer
mit Checks in `tests/features_smoke.mjs` absichern; Zähler-Erwartungen
(Kataloge, Erfolge) beim Erweitern mitziehen.
