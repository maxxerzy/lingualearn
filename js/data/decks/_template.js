// ════════════════════════════════════════════════════════════════
//  VORLAGE für ein eigenes Deck — zum Kopieren.
//
//  So fügst du ein neues Deck dauerhaft ins Projekt ein:
//   1. Diese Datei kopieren nach  js/data/decks/<sprachcode>.js
//      (der Dateiname MUSS dem Sprachcode entsprechen, z. B. en.js)
//   2. Die Karten unten durch deine ersetzen.
//   3. In  js/data/decks/meta.js  einen Eintrag ergänzen:
//        { id: 'basic-en', name: 'Englisch', language: 'en', count: <Anzahl> }
//   4. Für saubere Aussprache + Anzeigenamen in  core/session.js
//      die zwei Maps erweitern:
//        LANG_CODES: { ..., en: 'en-US' }   // Sprachcode fürs Vorlesen
//        LANG_NAMES: { ..., en: 'Englisch' } // angezeigter Sprachname
//
//  Ausführliche Doku (inkl. App-Import ohne Code): siehe DECKS.md
//
//  Diese Datei beginnt mit "_" und steht NICHT in meta.js →
//  sie wird von der App nicht geladen und dient nur als Vorlage.
// ════════════════════════════════════════════════════════════════

export const cards = [
  // Pflichtfelder: front (deutsches Wort), back (Übersetzung).
  // Empfohlen: example (Beispielsatz in der Zielsprache),
  //            exampleDE (deutsche Übersetzung des Satzes),
  //            ipa (Lautschrift des Wortes back, ohne Schrägstriche).
  // Nur bei nicht-lateinischer Schrift zusätzlich: roman (Umschrift).

  // Beispiel mit allen Feldern (lateinische Schrift):
  { front: 'Haus', back: 'house', example: 'The house is very big.', exampleDE: 'Das Haus ist sehr groß.', ipa: 'haʊs' },

  // Minimalbeispiel (nur Pflichtfelder — Tooltip & deutscher Satz
  // bleiben dann bei dieser Karte einfach leer):
  { front: 'Hund', back: 'dog' },

  // Beispiel mit Umschrift (nicht-lateinische Schrift, z. B. Griechisch):
  // { front: 'Haus', back: 'σπίτι', example: 'Το σπίτι είναι μεγάλο.', exampleDE: 'Das Haus ist groß.', ipa: 'ˈspiti', roman: 'spíti' },
];
