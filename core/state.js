import { decks } from '../js/data/decks.js';
import { enrichDecksWithTranslations } from './translator.js';
import { getCurrentUser } from './auth.js';

const STATS_PREFIX = 'lingualearn_stats_';

const defaultStats = {
  successRate: 0,
  learnedWords: 0,
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

// Live, mutable copy of the decks. We clone once so background translation
// can attach `exampleDE` without touching the source module.
const liveDecks = JSON.parse(JSON.stringify(decks));
enrichDecksWithTranslations(liveDecks).catch(() => {});

export function getDecks() { return liveDecks; }

export function getCurrentSession() { return currentSession; }
export function setCurrentSession(session) { currentSession = session; }

export function getUserStats() { return userStats; }

export function setUserStats(stats) {
  userStats = { ...stats };
  persistStats(userStats);
}

// Reload stats from localStorage for the currently logged-in user.
// Call this immediately after a successful login.
export function reinitUserStats() {
  userStats = loadStats();
}
