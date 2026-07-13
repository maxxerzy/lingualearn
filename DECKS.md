# Eigene Vokabeldecks erstellen

LinguaLearn kennt zwei Wege, Karten hinzuzufügen: den **App-Import** (JSON, ganz ohne Code) und **Deck-Dateien im Projekt** (dauerhaft, mit allen Funktionen). Beide nutzen dasselbe Kartenformat.

---

## Das Kartenformat

Eine Karte ist ein Objekt mit diesen Feldern:

| Feld | Pflicht | Bedeutung |
|------|:------:|-----------|
| `front` | ✅ | Das deutsche Wort (Vorderseite) |
| `back` | ✅ | Die Übersetzung in der Zielsprache |
| `example` | empfohlen | Beispielsatz in der Zielsprache |
| `exampleDE` | empfohlen | Deutsche Übersetzung des Beispielsatzes |
| `ipa` | empfohlen | Lautschrift **des Wortes `back`** (IPA, **ohne** Schrägstriche) |
| `roman` | nur nicht-latein | Lateinische Umschrift von `back` (z. B. Griechisch/Russisch) |

**Wichtig:**
- `front`-Werte müssen **innerhalb eines Decks eindeutig** sein (keine zwei Karten mit demselben deutschen Wort). Bei Homonymen disambiguieren, z. B. `Fisch (Tier)` und `Fisch (Speise)`.
- Fehlt `example`/`exampleDE`, wird bei dieser Karte einfach kein Beispiel/keine Übersetzung angezeigt.
- Fehlt `ipa`, erscheint kein Aussprache-Tooltip.
- Die **Reihenfolge der Karten** ist die Reihenfolge im **Lernkurs** (Lektion 1 = erste 8 Karten usw.). Also: Grundwortschatz nach oben, Selteneres nach unten. Damit im Lernkurs früh ganze Sätze freigeschaltet werden, sollten frühe Beispielsätze möglichst nur andere frühe Wörter verwenden.

---

## Weg 1: App-Import (JSON, ohne Code)

Am schnellsten für eigene Wortlisten. Nichts am Projekt ändern.

1. Eine JSON-Datei mit dieser Struktur anlegen:

```json
{
  "name": "Mein Italienisch-Deck",
  "language": "it",
  "cards": [
    { "front": "Haus", "back": "casa", "example": "La casa è grande.", "exampleDE": "Das Haus ist groß.", "ipa": "ˈkaza" },
    { "front": "Hund", "back": "cane" }
  ]
}
```

2. In der App: **Nutzer-Menü → Einstellungen → Deck importieren** → Datei wählen → **Importieren**.

Das Deck erscheint sofort in der Deck-Auswahl und **bleibt gespeichert** (im Browser, pro Gerät). Mindestanforderung des Imports: `name`, `language` und ein `cards`-Array, in dem jede Karte `front` und `back` hat. Die übrigen Felder sind optional.

> Hinweis: Beim Import bestimmt `language` den Sprachcode. Ist es ein Code, den die App noch nicht kennt (siehe unten), funktioniert das Deck trotzdem — nur Aussprache-Stimme und angezeigter Sprachname fallen dann auf den rohen Code zurück.

---

## Weg 2: Deck-Datei im Projekt (dauerhaft)

Für Decks, die fest zur App gehören sollen (werden mitausgeliefert, sind Teil des Lernkurses, lazy geladen).

### a) Deck-Datei anlegen

Kopiere `js/data/decks/_template.js` nach `js/data/decks/<sprachcode>.js`.
**Der Dateiname muss dem Sprachcode entsprechen** — die App lädt das Deck über `import('./decks/<language>.js')`. Beispiel für Englisch → `js/data/decks/en.js`:

```js
export const cards = [
  { front: 'Haus', back: 'house', example: 'The house is big.', exampleDE: 'Das Haus ist groß.', ipa: 'haʊs' },
  // … weitere Karten …
];
```

### b) Deck registrieren

In `js/data/decks/meta.js` einen Eintrag ergänzen:

```js
export const deckMeta = [
  // … bestehende …
  { id: 'basic-en', name: 'Englisch', language: 'en', count: 500 },
];
```

- `id`: eindeutige Kennung (Konvention `basic-<code>`)
- `name`: der in der App angezeigte Deck-Name
- `language`: der Sprachcode = Dateiname ohne `.js`
- `count`: Kartenanzahl (nur für die Anzeige „(N Karten)")

### c) Aussprache + Sprachname (bei neuer Sprache)

Damit Vorlesen und Anzeige stimmen, in `core/session.js` die zwei Maps erweitern:

```js
const LANG_CODES = { …, en: 'en-US' };   // BCP-47-Code fürs Text-to-Speech
const LANG_NAMES  = { …, en: 'Englisch' }; // angezeigter Name über der Karte
```

Fehlt der Eintrag, nutzt die Sprachausgabe den rohen Code und der Name fällt auf den Code zurück — die App funktioniert trotzdem.

### d) Prüfen

```bash
node --check js/data/decks/en.js   # Syntax
npm run serve                      # lokal testen: http://localhost:4173
```

Nach dem Hinzufügen empfiehlt sich, in `sw.js` die `CACHE_VERSION` zu erhöhen (damit bestehende PWA-Installationen die neuen Dateien laden) und die neue Deck-Datei in die `PRECACHE`-Liste aufzunehmen, wenn sie offline verfügbar sein soll.

---

## Kurz gefasst

- **Nur schnell eigene Wörter lernen?** → Weg 1 (JSON-Import).
- **Ein Deck, das fest zur App gehört?** → Weg 2 (Datei + `meta.js`, bei neuer Sprache zusätzlich die zwei Maps).
- Vorlage zum Kopieren: `js/data/decks/_template.js`.
