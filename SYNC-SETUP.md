# Geräte-Sync aktivieren — Schritt für Schritt

Damit dein Konto auf Handy, iPad und Mac denselben Stand hat, braucht die App
einen kleinen Speicher bei Cloudflare („KV"). Den legst du **einmal** an; danach
läuft alles automatisch. Dauer: ca. 2 Minuten.

Solange dieser Schritt fehlt, funktioniert die App ganz normal — nur eben pro
Gerät getrennt. Es kann also nichts kaputtgehen.

---

## Schritt 1 — Bei Cloudflare anmelden

Öffne <https://dash.cloudflare.com> und melde dich mit dem Konto an, unter dem
LinguaLearn läuft (dasselbe Konto, das die Seite deployt).

## Schritt 2 — Den Speicher anlegen

1. In der linken Seitenleiste auf **Storage & Databases** klicken.
   *(Je nach Sprache/Version heißt der Punkt auch „Speicher & Datenbanken";
   in älteren Oberflächen findest du KV unter **Workers & Pages → KV**.)*
2. Dort **KV** auswählen.
3. Rechts oben den Knopf **Create a namespace** (bzw. „Namespace erstellen")
   klicken.
4. Als Namen eingeben:

   ```
   lingualearn-sync
   ```

   Der Name ist frei wählbar, er dient nur der Übersicht.
5. Mit **Add** / **Create** bestätigen.

## Schritt 3 — Die ID kopieren

Nach dem Anlegen erscheint der Namespace in der Liste. Daneben steht die
**Namespace ID** — eine lange Zeichenfolge aus Ziffern und Buchstaben, etwa:

```
8f4c2a19d7b4419e93c05e6b1a2f7d3c
```

Klicke auf das Kopier-Symbol daneben (oder markiere die Zeichenfolge und
kopiere sie).

> **Nur diese ID brauche ich.** Sie ist kein Passwort und gibt niemandem Zugriff
> auf dein Cloudflare-Konto — sie benennt lediglich den Speicherplatz.

## Schritt 4 — ID schicken

Schick mir die kopierte ID im Chat. Ich trage sie an der bereits vorbereiteten
Stelle in `wrangler.jsonc` ein:

```jsonc
"kv_namespaces": [
  { "binding": "SYNC", "id": "<DEINE-ID>" }
]
```

Danach prüfe ich noch einmal die komplette Gerätematrix und öffne einen neuen
Pull Request. Sobald der auf `main` gemergt ist, deployt Cloudflare automatisch
und der Sync ist scharf.

## Schritt 5 — Auf allen Geräten anmelden

Melde dich auf **jedem** Gerät mit **denselben Zugangsdaten** an
(gleicher Benutzername **und** gleiches Passwort — daraus wird der Schlüssel
abgeleitet, mit dem sich die Geräte wiederfinden).

- Hast du auf dem Handy bisher ein anderes Konto benutzt, registriere dort
  einfach das Konto vom Mac (gleicher Name + gleiches Passwort). Die App legt
  es lokal an, erkennt beim ersten Abgleich den vorhandenen Stand und führt
  beides zusammen.
- Der erste Abgleich passiert direkt nach dem Login. Danach automatisch: nach
  jeder Lektion, beim Schließen der App und sobald du wieder online bist.
- In **Einstellungen → Geräte-Synchronisation** siehst du den Status und kannst
  den Abgleich jederzeit von Hand anstoßen.

---

## Was beim Abgleich passiert

Es gewinnt **nicht** das zuletzt benutzte Gerät — beide Stände werden
**zusammengeführt**, damit nichts verloren geht:

| Bereich | Regel |
|---|---|
| XP, Level, Diamanten, Bestwerte | höherer Wert |
| Kartenfortschritt (SRS) | pro Vokabel der stärkere Stand |
| Kursfortschritt | die weiter fortgeschrittene Lektion |
| Erfolge, Truhen, Gold-Lektionen, Abzeichen, Grammatik | vereinigt |
| Aktivität pro Tag | höherer Wert je Datum |
| Serie (Streak) | längste Serie, jüngstes Lerndatum |

## Kostet das etwas?

Nein. Cloudflare KV hat ein kostenloses Kontingent von 100.000 Lesevorgängen
und 1.000 Schreibvorgängen pro Tag. Ein Konto mit drei Geräten liegt
weit darunter.

## Wenn etwas nicht klappt

In den Einstellungen zeigt der Sync-Bereich, woran es liegt:

| Anzeige | Bedeutung |
|---|---|
| „Server-Sync noch nicht eingerichtet" | Die ID fehlt noch (Schritt 2–4). |
| „Zugang abgelehnt — Passwort weicht ab" | Auf den Geräten sind unterschiedliche Passwörter hinterlegt. Auf einem Gerät mit dem Passwort des anderen neu registrieren. |
| „Offline — wird nachgeholt" | Keine Verbindung; der Abgleich passiert automatisch, sobald du wieder online bist. |
| „Synchron · 14:32" | Alles in Ordnung. |
