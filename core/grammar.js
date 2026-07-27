import { createUserStore } from './userStore.js';

// Grammatik-Kapitel für den Lernkurs: pro Sprache eine Datei unter
// js/data/grammar/<code>.js mit Kapiteln, die vor bestimmten Lektionen
// eingeschoben werden (beforeLesson). Gelesene Kapitel werden pro Konto
// und Deck gemerkt und nicht erneut gezeigt — in der Grammatik-Übersicht
// bleiben sie jederzeit nachlesbar.

const store = createUserStore('lingualearn_grammar_');   // deckId -> [Kapitel-IDs]
const cache = {};

export function reinitGrammar() { store.reinit(); }

export async function loadGrammar(lang) {
  if (cache[lang]) return cache[lang];
  try {
    const mod = await import(`../js/data/grammar/${lang}.js`);
    cache[lang] = mod.grammar || [];
  } catch {
    cache[lang] = [];
  }
  return cache[lang];
}

export function readChapters(deckId) { return store.get()[deckId] || []; }

export function markChapterRead(deckId, chapterId) {
  const map = store.get();
  const arr = new Set(map[deckId] || []);
  arr.add(chapterId);
  map[deckId] = [...arr];
  store.save(map);
}

export function resetGrammar(deckId) {
  const map = store.get();
  if (map[deckId]) { delete map[deckId]; store.save(map); }
}

// Nächstes ungelesenes Kapitel, das (spätestens) vor dieser Lektion dran ist.
export async function pendingChapter(deckId, lang, lessonNum) {
  const chapters = await loadGrammar(lang);
  const read = new Set(readChapters(deckId));
  return chapters.find(ch => ch.beforeLesson <= lessonNum && !read.has(ch.id)) || null;
}
