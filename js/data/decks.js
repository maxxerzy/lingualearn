// Vocabulary decks. Each language lives in its own module under ./decks/
// and is aggregated here into the `decks` map used throughout the app.
import { daDeck } from './decks/da.js';
import { elDeck } from './decks/el.js';
import { frDeck } from './decks/fr.js';
import { esDeck } from './decks/es.js';
import { laDeck } from './decks/la.js';
import { ruDeck } from './decks/ru.js';

export const decks = {
  'basic-da': daDeck,
  'basic-el': elDeck,
  'basic-fr': frDeck,
  'basic-es': esDeck,
  'basic-la': laDeck,
  'basic-ru': ruDeck,
};
