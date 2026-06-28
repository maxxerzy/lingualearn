import { decks } from '../js/data/decks.js';
import { enrichDecksWithTranslations } from './translator.js';

// Application state
let currentSession = null;
let userStats = {
  learnedWords: 0,
  activeDays: 1,
  successRate: 0
};

// Live, mutable copy of the decks. We clone once so the background
// translation can attach `exampleDE` without touching the source module.
const liveDecks = JSON.parse(JSON.stringify(decks));

// Kick off translation enrichment in the BACKGROUND. This does NOT block
// deck selection — cards gain `exampleDE` over time as translations arrive,
// and the app works fully without them. Any cached translations are applied
// synchronously on the first pass, so they show up immediately.
enrichDecksWithTranslations(liveDecks).catch(() => {});

// Data access helpers — synchronous, returns instantly.
export function getDecks() {
  return liveDecks;
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
