import { deckMeta } from '../js/data/decks/meta.js';
import { enrichDecksWithTranslations } from './translator.js';
import { getCurrentUser } from './auth.js';

const STATS_PREFIX = 'lingualearn_stats_';

const defaultStats = {
  successRate: 0,
  learnedWords: 0,
  totalCorrect: 0,
  totalAnswered: 0,
  totalSessions: 0,
  activeDays: 1,
  lastSessionDate: null,
};

function statsKey() {
  const user = getCurrentUser();
  return user ? `${STATS_PREFIX}${user}` : null;
}

function loadStats() {
  const key = statsKey();
  if (!key) return { ...defaultStats };
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...defaultStats, ...JSON.parse(raw) } : { ...defaultStats };
  } catch {
    return { ...defaultStats };
  }
}

function persistStats(stats) {
  const key = statsKey();
  if (!key) return;
  try {
    localStorage.setItem(key, JSON.stringify(stats));
  } catch { /* storage full — ignore */ }
}

let currentSession = null;
let userStats = loadStats();

// Build live decks map from metadata — cards start as null until loaded on demand.
const liveDecks = {};
for (const m of deckMeta) {
  liveDecks[m.id] = { name: m.name, language: m.language, count: m.count, cards: null };
}

// Vom Nutzer importierte Decks überleben den Reload via localStorage.
const IMPORTED_KEY = 'lingualearn_imported_decks';

function loadImportedDecks() {
  try {
    return JSON.parse(localStorage.getItem(IMPORTED_KEY) || '{}');
  } catch {
    return {};
  }
}

for (const [id, d] of Object.entries(loadImportedDecks())) {
  if (d?.name && Array.isArray(d.cards)) {
    liveDecks[id] = {
      name: d.name,
      language: d.language,
      count: d.cards.length,
      cards: JSON.parse(JSON.stringify(d.cards)),
    };
  }
}

export function addImportedDeck(deckId, deckData) {
  liveDecks[deckId] = {
    name: deckData.name,
    language: deckData.language,
    count: deckData.cards.length,
    cards: deckData.cards,
  };
  const all = loadImportedDecks();
  all[deckId] = deckData;
  try {
    localStorage.setItem(IMPORTED_KEY, JSON.stringify(all));
  } catch { /* storage voll — Deck bleibt für diese Sitzung nutzbar */ }
}

// In-flight load promises — prevents double-fetching the same deck.
const loadingPromises = {};

export async function loadDeck(deckId) {
  const entry = liveDecks[deckId];
  if (!entry) return null;
  if (entry.cards !== null) return entry;
  if (loadingPromises[deckId]) return loadingPromises[deckId];

  loadingPromises[deckId] = (async () => {
    const { language } = entry;
    const { cards } = await import(`../js/data/decks/${language}.js`);
    entry.cards = JSON.parse(JSON.stringify(cards));
    // Enrich example sentences in the background — non-blocking.
    enrichDecksWithTranslations({ [deckId]: entry }).catch(() => {});
    return entry;
  })();

  return loadingPromises[deckId];
}

export function getDecks() { return liveDecks; }

export function getCurrentSession() { return currentSession; }
export function setCurrentSession(session) { currentSession = session; }

export function getUserStats() { return userStats; }

export function setUserStats(stats) {
  userStats = { ...stats };
  persistStats(userStats);
}

export function reinitUserStats() {
  userStats = loadStats();
}
