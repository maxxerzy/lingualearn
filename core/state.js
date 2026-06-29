import { decks } from '../js/data/decks.js';
import { enrichDecksWithTranslations } from './translator.js';

const STATS_KEY = 'lingualearn_stats';

const defaultStats = {
  successRate: 0,
  learnedWords: 0,
  totalCorrect: 0,
  totalAnswered: 0,
  totalSessions: 0,
  activeDays: 1,
  lastSessionDate: null,
};

function loadStats() {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    return raw ? { ...defaultStats, ...JSON.parse(raw) } : { ...defaultStats };
  } catch {
    return { ...defaultStats };
  }
}

function persistStats(stats) {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch { /* ignore */ }
}

// Application state
let currentSession = null;
let userStats = loadStats();

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
  persistStats(userStats);
}
