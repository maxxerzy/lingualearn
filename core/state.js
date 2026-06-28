import { decks } from '../js/data/decks.js';
import { enrichDecksWithTranslations } from './translator.js';

// Application state
let currentSession = null;
let enrichedDecks = null;
let userStats = {
  learnedWords: 0,
  activeDays: 1,
  successRate: 0
};

// Auto-enrich decks with translations on first access
async function initializeDecks() {
  if (!enrichedDecks) {
    enrichedDecks = await enrichDecksWithTranslations(JSON.parse(JSON.stringify(decks)));
  }
  return enrichedDecks;
}

initializeDecks();

// Data access helpers
export async function getDecks() {
  if (!enrichedDecks) {
    enrichedDecks = await initializeDecks();
  }
  return enrichedDecks;
}

// Export state for other modules
export function getCurrentSession() {
  return currentSession;
}

export function setCurrentSession(session) {
  currentSession = session;
}

export function getUserStats() {
  return userStats;
}

export function setUserStats(stats) {
  userStats = { ...stats };
}
