import { getCurrentUser } from './auth.js';
import { getUserStats } from './state.js';
import { countMasteredAll } from './cardProgress.js';

const KEY_PREFIX = 'lingualearn_game_';

const DEFAULTS = {
  xp: 0,
  dailyGoal: 20,
  daily: { date: null, count: 0, goalHit: false },
  goalHitEver: false,
  streak: { current: 0, longest: 0, lastDate: null },
  achievements: {},   // id -> Datum der Freischaltung
  activity: {},       // 'YYYY-MM-DD' -> beantwortete Karten
  langsPlayed: [],    // Sprachcodes abgeschlossener Sessions
  perfectSessions: 0,
};

export const XP = { correct: 10, wrong: 2, session: 50, perfect: 100 };

let game = null;
let gameKey = null;

function storageKey() {
  const user = getCurrentUser();
  return user ? KEY_PREFIX + user : null;
}

function load() {
  const key = storageKey();
  if (!key) return structuredClone(DEFAULTS);
  if (game && gameKey === key) return game;
  let raw = {};
  try { raw = JSON.parse(localStorage.getItem(key) || '{}'); } catch { raw = {}; }
  game = { ...structuredClone(DEFAULTS), ...raw };
  game.daily = { ...DEFAULTS.daily, ...(raw.daily || {}) };
  game.streak = { ...DEFAULTS.streak, ...(raw.streak || {}) };
  gameKey = key;
  return game;
}

function persist() {
  const key = storageKey();
  if (!key || !game) return;
  try { localStorage.setItem(key, JSON.stringify(game)); } catch { /* ignorieren */ }
}

export function reinitGame() { game = null; gameKey = null; }
export function getGame() { return load(); }

function todayStr() { return new Date().toISOString().slice(0, 10); }
function yesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

// Level-Schwellen: Gesamt-XP für Level n = 50·n·(n−1)
// L1=0, L2=100, L3=300, L4=600, L5=1000, …
export function levelInfo(xp) {
  let level = 1;
  while (50 * (level + 1) * level <= xp) level++;
  const base = 50 * level * (level - 1);
  const nextAt = 50 * (level + 1) * level;
  return {
    level, xp, base, nextAt,
    progress: Math.min(1, (xp - base) / (nextAt - base)),
    rank: rankName(level),
  };
}

function rankName(level) {
  if (level >= 15) return 'Diamant';
  if (level >= 10) return 'Platin';
  if (level >= 6) return 'Gold';
  if (level >= 3) return 'Silber';
  return 'Bronze';
}

// Streak & Tageszähler beim ersten Lernereignis des Tages fortschreiben.
function touchDay(g) {
  const today = todayStr();
  if (g.daily.date !== today) {
    g.daily = { date: today, count: 0, goalHit: false };
  }
  if (g.streak.lastDate !== today) {
    g.streak.current = g.streak.lastDate === yesterdayStr() ? g.streak.current + 1 : 1;
    g.streak.lastDate = today;
    g.streak.longest = Math.max(g.streak.longest, g.streak.current);
  }
}

export function recordGameAnswer(correct) {
  const g = load();
  touchDay(g);
  g.xp += correct ? XP.correct : XP.wrong;
  g.daily.count++;
  const today = todayStr();
  g.activity[today] = (g.activity[today] || 0) + 1;
  if (!g.daily.goalHit && g.daily.count >= g.dailyGoal) {
    g.daily.goalHit = true;
    g.goalHitEver = true;
  }
  persist();
  return g;
}

export function recordSessionEnd({ language, correct, total }) {
  const g = load();
  touchDay(g);
  let xpEarned = XP.session;
  const perfect = total >= 5 && correct === total;
  if (perfect) {
    xpEarned += XP.perfect;
    g.perfectSessions++;
  }
  g.xp += xpEarned;
  if (language && !g.langsPlayed.includes(language)) g.langsPlayed.push(language);
  persist();
  return { xpEarned, perfect, game: g };
}

export function setDailyGoal(n) {
  const g = load();
  g.dailyGoal = Math.max(1, Math.min(500, Math.round(n) || 20));
  if (g.daily.date === todayStr() && !g.daily.goalHit && g.daily.count >= g.dailyGoal) {
    g.daily.goalHit = true;
    g.goalHitEver = true;
  }
  persist();
  return g;
}

export const ACHIEVEMENTS = [
  { id: 'erste-session', icon: 'fa-flag-checkered', name: 'Erste Schritte',  desc: 'Erste Session abgeschlossen',            test: c => c.sessions >= 1 },
  { id: 'richtig-100',   icon: 'fa-check-double',   name: 'Hundert!',        desc: '100 richtige Antworten',                  test: c => c.totalCorrect >= 100 },
  { id: 'richtig-500',   icon: 'fa-bolt',           name: 'Auf der Überholspur', desc: '500 richtige Antworten',              test: c => c.totalCorrect >= 500 },
  { id: 'meister-10',    icon: 'fa-seedling',       name: 'Erste Ernte',     desc: '10 Vokabeln gemeistert',                  test: c => c.mastered >= 10 },
  { id: 'meister-50',    icon: 'fa-graduation-cap', name: 'Vokabelprofi',    desc: '50 Vokabeln gemeistert',                  test: c => c.mastered >= 50 },
  { id: 'meister-100',   icon: 'fa-crown',          name: 'Wortschatz-König', desc: '100 Vokabeln gemeistert',                test: c => c.mastered >= 100 },
  { id: 'serie-3',       icon: 'fa-fire',           name: 'Warmgelaufen',    desc: '3 Tage in Serie gelernt',                 test: c => c.streak >= 3 },
  { id: 'serie-7',       icon: 'fa-fire-alt',       name: 'Eine ganze Woche', desc: '7 Tage in Serie gelernt',                test: c => c.streak >= 7 },
  { id: 'serie-30',      icon: 'fa-meteor',         name: 'Unaufhaltsam',    desc: '30 Tage in Serie gelernt',                test: c => c.streak >= 30 },
  { id: 'perfekt',       icon: 'fa-star',           name: 'Perfekt!',        desc: 'Session ohne Fehler (mind. 5 Karten)',    test: c => c.perfectSessions >= 1 },
  { id: 'polyglott',     icon: 'fa-globe',          name: 'Polyglott',       desc: 'In allen 6 Sprachen eine Session beendet', test: c => c.langCount >= 6 },
  { id: 'tagesziel',     icon: 'fa-bullseye',       name: 'Ziel erreicht',   desc: 'Tagesziel zum ersten Mal geschafft',      test: c => c.goalHitEver },
  { id: 'level-5',       icon: 'fa-trophy',         name: 'Aufsteiger',      desc: 'Level 5 erreicht',                        test: c => c.level >= 5 },
];

// Prüft alle Bedingungen und schaltet neue Erfolge frei.
// Gibt die frisch freigeschalteten Erfolge zurück (für Toasts).
export function checkAchievements() {
  const g = load();
  const stats = getUserStats();
  const ctx = {
    sessions: stats.totalSessions || 0,
    totalCorrect: stats.totalCorrect || 0,
    mastered: countMasteredAll(),
    streak: g.streak.current,
    perfectSessions: g.perfectSessions,
    langCount: g.langsPlayed.length,
    goalHitEver: g.goalHitEver,
    level: levelInfo(g.xp).level,
  };
  const fresh = [];
  for (const a of ACHIEVEMENTS) {
    if (!g.achievements[a.id] && a.test(ctx)) {
      g.achievements[a.id] = todayStr();
      fresh.push(a);
    }
  }
  if (fresh.length) persist();
  return fresh;
}
