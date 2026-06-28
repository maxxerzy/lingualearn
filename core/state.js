import { decks } from '../js/data/decks.js';
import { enrichDecksWithTranslations } from './translator.js';

// Application state
let currentSession = null;
let userStats = {
  learnedWords: 0,
  activeDays: 1,
  successRate: 0
};

// Enrich decks with translations on load (non-blocking)
enrichDecksWithTranslations(decks);

// Data access helpers
export function getDecks() {
  return decks;
}

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
