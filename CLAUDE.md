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
- Grammatik deckt den GANZEN Kurs ab: `js/data/grammar/<lang>.js`, je
  Sprache so viele Kapitel, dass zwischen zwei Kapiteln nie mehr als 12
  Lektionen liegen. Die Prüfung dazu steht in `tests/features_smoke.mjs`
  (`AUSGEBAUT` + `MAX_GAP`) — neue Kapitel immer an den inhaltlich
  passenden Lektionsblock hängen.
- Jedes Kapitel bringt `drills` mit (≥4 Aufgaben: `q` mit `____`,
  `options`, `answer`, `why`). Nach der letzten Seite fragt die Phase
  `drill` sie ab; erst danach gilt das Kapitel als gelesen. Geprüft über
  `MIT_UEBUNGEN` in `tests/features_smoke.mjs`.
- Statische PWA ohne Build-Schritt, ES-Module: `core/` (Logik, Stores),
  `ui/` (Ansichten), `js/data/` (Decks, Themen, Grammatik), `utils/`.
- Reine Rechenlogik gehört in DOM-freie Module (`utils/sentence.js`,
  `core/weakness.js`, `core/cardProgress.js`) — nur die lassen sich in
  `tests/unit.mjs` ohne Browser prüfen.
- Nutzerdaten liegen im localStorage pro Konto (`core/userStore.js`-Präfixe)
  und werden über `core/sync.js` + `worker.js` (Cloudflare KV) zwischen
  Geräten abgeglichen. Der Abgleich FÜHRT ZUSAMMEN (höheres Level, mehr
  gemeisterte Karten, vereinigte Erfolge) — kein „letztes Gerät gewinnt".
  Ohne KV-Binding läuft die App unverändert lokal weiter.
- Offline: Die App-Hülle liegt komplett in der PRECACHE-Liste von `sw.js`,
  die Deck-Dateien (~900 KB) bewusst NICHT. `core/offline.js` legt sie
  über den Schalter „Für offline sichern" (Einstellungen) in denselben
  Cache; das aktive Deck sichert sich nach der ersten abgeschlossenen
  Lektion selbst. Der Cache-Name wird beim Service Worker erfragt, nicht
  in der App gespiegelt. `tests/offline_lesson.mjs` prüft beides —
  inklusive der Frage, ob PRECACHE noch jede App-Datei enthält.
- Das Schwächen-Profil (`core/weakness.js`) ist eine reine AUSWERTUNG des
  Karten-Zustands (`core/cardProgress.js`: richtig/falsch + die letzten
  fünf Antworten je Karte) — es speichert und synchronisiert nichts
  Eigenes. Daraus entstehen Themen-Trefferquoten, die Statistik-Liste
  „Deine schwächsten Themen" (ein Tippen startet die Runde) und die
  „Für dich"-Empfehlung.
- Einstufung (`core/placement.js`): optionaler letzter Onboarding-Schritt.
  Intervallhalbierung über die Deck-Reihenfolge, zwei Fragen je Schritt
  (~20 insgesamt). Das Ergebnis rastet auf eine LEKTIONSGRENZE ein
  (`lessonBoundaryAtOrBefore`) und legt über `seedCardStates` Kartenlevel
  mit gestreuten Fälligkeiten an — bestehende Karten werden dabei nie
  überschrieben. Abbruch mittendrin ändert nichts.
- Sprechen hat drei Ausbaustufen (`renderCourseSpeak` + `utils/pronounce.js`):
  mit Spracherkennung Wort-für-Wort-Abgleich mit markierter Abweichung
  („listen"), ohne Erkennung aber mit Mikrofon der Vergleich der eigenen
  Aufnahme mit der Referenzstimme („compare", iOS Safari), sonst
  Selbsteinschätzung („self"). Fällt die Erkennung zur Laufzeit aus,
  schaltet der Schritt selbst auf „compare" um.
- Nur ZWEI Modi: geführter **Lernkurs** (Grammatik-Kapitel → 2er-Häppchen
  kennenlernen → Hören → Üben (MC/Vergleich) → Paare verbinden →
  Sprechen → Schreiben (NUR Bausteine — nie ein Tastatur-Eingabefeld,
  da Zielsprachen-Tastaturen auf den Geräten fehlen) → Konversation →
  Dialog (Antwort wählen) → Satz hören → Sätze (Lücke/Satzbau/Bedeutung)) und
  **Karteikarten** (SRS). Alle weiteren Übungsformen existieren nur
  als Kurs-Phasen.
- Latein wird überall in Prüfungsrichtung gelernt (Latein → Deutsch,
  `isReverse` in `core/session.js`) mit klassischer Aussprache über
  `utils/speech.js` (c→k, ae→ei, oe→eu, v→w, y→ü).
- Layout-Garantie: KEIN Seiten-Scrollen in Konfiguration und allen
  Kurs-Schritten auf allen Geräteprofilen; lange Inhalte scrollen
  innerhalb ihrer Karte.

## Geräte-Kompatibilität (WICHTIGSTE Regel, Nutzer-Vorgabe)
**JEDE einzelne Änderung — auch reine Text-, Logik- oder Datenänderungen —
wird vor dem Push auf ALLEN 11 Geräteprofilen geprüft.** UI, GUI und
Overlays müssen auf iPhone, iPad und macOS gleichermaßen funktionieren:
- kein Seiten-Scrollen (Konfiguration UND jeder einzelne Kursschritt),
- keine Überlappungen (Kopfzeile/Logo/Profil-Chip, Fokus-Leiste),
- kein Inhalt außerhalb des Sichtbereichs, alle Knöpfe erreichbar,
- gleiche Garantien im Dark Mode.
`tests/compat_audit.mjs` spielt dafür eine komplette Kurslektion durch
und vermisst JEDEN Schritt einzeln (Grammatik-Reader, Kennenlernen,
Hören, MC, Vergleich, Sprechen, Schreiben, Sätze). Ein neues UI-Element
ohne bestandene 11/11-Matrix wird nicht gepusht. Reicht die Höhe nicht,
gilt: erst verdichten (Fokus-Modus-Regeln), sonst innerhalb der Karte
scrollen lassen — niemals die Seite.

## Tests (vor jedem Push ausführen)
```
node tests/unit.mjs                      # Kernlogik, reines Node (<1 s)
(python3 -m http.server 4173 &)          # aus der Repo-Wurzel
node tests/features_smoke.mjs            # Funktions-Regression
node tests/worker_sync.mjs               # Sync-Server (ohne Browser/Cloudflare)
node tests/offline_lesson.mjs            # Offline-Garantie (eigener Server
                                         #   auf Port 4199, wird dafür beendet)
node tests/compat_audit.mjs <gerät>      # je: se iph14 iph14pm ipadmini
                                         #     ipad11 ipad11l ipad13l mac13
                                         #     mac16 mac21 mac27
```
`tests/unit.mjs` läuft ohne Browser (localStorage-Ersatz) und deckt
SRS (`core/cardProgress.js`), die Sync-Zusammenführung (`mergeSnapshots`),
die Satzlogik (`utils/sentence.js`) und das Schwächen-Profil ab — erst
danach lohnt der teure Browser-Durchlauf.
Alle Smoke-Checks und 11/11 Geräte müssen PASS sein. Neue Features immer
mit Checks in `tests/features_smoke.mjs` absichern; Zähler-Erwartungen
(Kataloge, Erfolge) beim Erweitern mitziehen.
