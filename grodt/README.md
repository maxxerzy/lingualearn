# GRODT — Get Rich Or Die Trying 📈

Trading-/Marktanalyse-PWA für **iPhone und Mac** (und jeden Browser): Kurse von US- und deutschen Börsen, Kerzencharts mit Indikatoren, Fundamentaldaten, News, Watchlists mit **Kursalarmen & Stop-Loss inkl. Push-Mitteilungen**, Paper-Trading-Depot und Geräte-Sync — gehostet auf Cloudflare Workers (Free-Tier reicht).

**Features**

- 🕯️ Kerzenchart (OHLC) mit Volumen, SMA 20/50/200, EMA 20, Bollinger, RSI, MACD · Timeframes 1 Tag bis Max · log/linear · Vollbild
- 🔍 Symbolsuche über alle US- und deutschen Börsen (XETRA `.DE`, Frankfurt `.F`, …) mit Börsenplatz-Auswahl
- 📊 Kennzahlen je Aktie: KGV, Dividendenrendite, Marktkapitalisierung, EPS, 52-Wochen-Spanne, Beta, Quartalszahlen (Ist vs. Schätzung), Analysten-Ratings, Unternehmensprofil
- 📰 News-Feed je Aktie + Markt-News-Tab
- ⭐️ Mehrere Watchlists mit Live-Kursen und Sparklines
- 🔔 Alarme: Kurs über/unter, Stop-Loss (rote Linie im Chart), Tagesbewegung ±% — serverseitig alle 5 Min. geprüft, **Web Push aufs iPhone/Mac auch bei geschlossener App**
- 💼 Paper-Trading-Depot: Käufe/Verkäufe, Einstand, G/V offen & realisiert, Cash, Depotverlauf
- 🌐 Marktübersicht: DAX/MDAX/TecDAX/EuroStoxx/S&P 500/Nasdaq/Dow/VIX, Top-Gewinner/-Verlierer, Sektor-Heatmap
- 📈 Vergleichsmodus: bis zu 6 Titel normiert in % übereinander
- 🔄 **Geräte-Sync** über einen geheimen Sync-Code (ohne Konto): Watchlists, Alarme, Depot, Einstellungen
- ⚡ Optional: Finnhub-API-Key für Realtime-US-Streaming per WebSocket
- 📱 PWA: offline-fähig, „Zum Home-Bildschirm", Dark-/Light-Theme

**Datenquellen & Grenzen:** Kurse/Fundamentals/News via Yahoo Finance (inoffiziell; US quasi live, XETRA/Frankfurt ca. 15 Min. verzögert). Alle Angaben ohne Gewähr — **keine Anlageberatung**. Das Depot ist reines Paper-Trading.

---

## Deployment (einmalig, ~10 Minuten)

Voraussetzungen: kostenloses [Cloudflare](https://dash.cloudflare.com)-Konto, Node ≥ 20.

```bash
npm install                 # Abhängigkeiten (wrangler, lightweight-charts, …)
npm run vendor              # kopiert lightweight-charts nach public/vendor
npm run icons               # erzeugt die App-Icons (falls nicht committet)
npx wrangler login          # Browser-Login bei Cloudflare
```

### 1. D1-Datenbank anlegen

```bash
npx wrangler d1 create grodt
```

Die ausgegebene `database_id` in `wrangler.jsonc` bei `d1_databases` eintragen, dann das Schema einspielen:

```bash
npm run db:schema           # wrangler d1 execute grodt --remote --file worker/schema.sql
```

### 2. Push-Mitteilungen konfigurieren (VAPID)

```bash
npm run vapid
```

Das Skript gibt drei `wrangler secret put`-Befehle aus — alle drei ausführen (`VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT` mit deiner Mailadresse). Ohne diese Secrets läuft die App trotzdem, nur ohne Push.

### 3. Deployen

```bash
npm run deploy              # wrangler deploy
```

Fertig — die App läuft unter `https://grodt.<dein-account>.workers.dev`. Updates: einfach erneut `npm run deploy` (vorher `CACHE_VERSION` in `public/sw.js` hochzählen, damit Clients die neuen Dateien laden).

> Alternativ Git-Anbindung: Repo im Cloudflare-Dashboard verbinden (Workers Builds), Deploy-Command `npx wrangler deploy`.

---

## Checkliste nach dem Deploy (iPhone & Mac)

1. **iPhone:** URL in Safari öffnen → Teilen → **„Zum Home-Bildschirm"** → App startet standalone (ohne Browserleiste), Safe-Areas passen, Chart im Querformat/Vollbild nutzbar.
2. **Mac:** gleiche URL im Browser → Sidebar-Layout, Crosshair mit OHLC-Anzeige über dem Chart.
3. **Echte Daten:** `SAP.DE` und `AAPL` suchen → Chart, Kennzahlen (KGV/Dividende = Crumb-Pfad!), News prüfen.
4. **Sync:** Mac → Mehr → „Neues Sync-Profil erstellen" → Code am iPhone unter „Code eingeben" eintragen → Watchlist-Eintrag am einen Gerät erscheint nach Fokuswechsel am anderen.
5. **Push (nur in der installierten PWA):** Mehr → „Mitteilungen aktivieren" → „Testmitteilung senden" → kommt auch bei geschlossener App an. Danach echten Alarm knapp über dem aktuellen Kurs anlegen → löst binnen ~5 Min. aus.
6. **Offline:** Flugmodus → App-Shell lädt weiter (Kurse natürlich nicht).

---

## Entwicklung

```bash
npm run db:schema:local     # D1-Schema in die lokale SQLite
npm run dev:fixtures        # Dev-Server mit Beispieldaten (ohne Yahoo-Zugriff)
npm run dev                 # Dev-Server mit echten Yahoo-Abrufen
npm test                    # Unit-Tests (Indikatoren, Merge, Alarm-Logik)
npm run test:ui             # Playwright-Smoke-Tests (nutzt dev:fixtures)
```

Der Fixture-Modus (`USE_FIXTURES`) liefert deterministische Beispieldaten für alle Endpunkte — nützlich in Umgebungen, die Yahoo nicht erreichen, und für stabile UI-Tests. Cron lokal testen: `curl -X POST http://127.0.0.1:8787/api/debug/run-alerts` (nur im Fixture-Modus freigeschaltet).

### Architektur

```
worker/                Cloudflare Worker (API unter /api/*)
  index.js             Router + scheduled() für den Alarm-Cron (*/5 Min.)
  yahoo.js             Yahoo-Zugriff inkl. Cookie+Crumb-Handling und Fallbacks
  cache.js             Edge-Caching (caches.default) mit TTL je Datentyp
  sync.js              Geräte-Sync: 4 Collections je Sync-Code, CAS-Writes (409 → Merge)
  alerts.js            Cron: Alarme prüfen (geteilte Logik mit dem Frontend) + Push
  push.js / webpush.js Web Push komplett mit WebCrypto (VAPID ES256 + RFC 8291)
  fixtures.js          Beispieldaten für lokale Entwicklung/Tests
  schema.sql           D1-Schema (users, blobs, push_subs, alert_state, meta)
public/                Frontend: PWA ohne Build-Schritt, plain ES-Module
  js/core/             Store, Sync-Engine, Merge, Quote-Poller, Finnhub-WS, Indikatoren
  js/views/            Märkte, Watchlist, Depot, News, Detail (Chart/Kennzahlen/News/Alarme), …
  js/chart/            lightweight-charts-v5-Wrapper (Panes, Overlays, Preislinien)
  vendor/              self-gehostetes lightweight-charts (kein CDN)
```

**Sync-Modell:** Vier JSON-Dokumente (`watchlists`, `alerts`, `portfolio`, `settings`) je Sync-Code in D1, jede mit Revisionszähler. Clients schreiben per Compare-and-Swap; bei Konflikt merged der Client (Union per id + `updatedAt`-LWW, Löschungen als Tombstones, Portfolio append-only) und schreibt erneut. Pull bei App-Start/Fokus/alle 60 s.

**Free-Tier-Hinweis:** Workers Free hat 10 ms CPU je Aufruf — bei sehr vielen Push-Subscriptions kann die Verschlüsselung im Cron knapp werden (der 5-$-Plan hebt das auf 30 s).
