# End-to-End-Tests (Playwright)

Voraussetzungen: Chromium + Playwright (Pfad im Skript anpassen: `executablePath`
und der Playwright-Import). Statischen Server starten:

    python3 -m http.server 4173

Dann:

    node tests/compat_audit.mjs iph14     # Geräte: se, iph14, iph14pm, ipadmini, ipad11, ipad11l, mac13, mac16
    node tests/features_smoke.mjs         # Funktions-Regression (iPhone-14-Viewport)

`compat_audit.mjs` prüft pro Gerät: kein Scrollen im Konfig-Screen und in allen
9 Modi, keine überlappenden Header-Elemente, Icon-Karten unbeschnitten, alle
Zurück-Knöpfe, Modus-Starts. `features_smoke.mjs` deckt die Kernfeatures ab
(Fällig-Schalter, WOTD, Lernpfad, Tippen/Satzbau/Story, Arena, Truhen/Level-Up,
Fehler-Training, Update-Logout).
