import { createUserStore } from './userStore.js';
import { getGame, addGems, addBonusXp, noteQuestDone } from './gamification.js';

// Tagesquests: 3 wechselnde Aufgaben pro Tag (deterministisch aus dem Datum).
// Fortschritt kommt aus den Tageszählern (game.daily); erfüllte Quests geben
// Diamanten + etwas XP, sobald man sie einsammelt.

const POOL = [
  { id: 'xp30',  type: 'xp',      goal: 30, gem: 10, xp: 10, icon: 'fa-bolt',            name: '30 XP verdienen' },
  { id: 'xp60',  type: 'xp',      goal: 60, gem: 15, xp: 15, icon: 'fa-bolt',            name: '60 XP verdienen' },
  { id: 'cor15', type: 'correct', goal: 15, gem: 10, xp: 10, icon: 'fa-check',           name: '15 richtige Antworten' },
  { id: 'cor25', type: 'correct', goal: 25, gem: 15, xp: 15, icon: 'fa-check',           name: '25 richtige Antworten' },
  { id: 'les2',  type: 'lessons', goal: 2,  gem: 10, xp: 10, icon: 'fa-flag-checkered',  name: '2 Sessions abschließen' },
  { id: 'les3',  type: 'lessons', goal: 3,  gem: 15, xp: 15, icon: 'fa-flag-checkered',  name: '3 Sessions abschließen' },
  { id: 'goal',  type: 'goal',    goal: 1,  gem: 15, xp: 10, icon: 'fa-bullseye',        name: 'Tagesziel erreichen' },
  { id: 'perf',  type: 'perfect', goal: 1,  gem: 20, xp: 20, icon: 'fa-star',            name: 'Perfekte Session (≥5 Karten)' },
  { id: 'blitz', type: 'blitz',   goal: 1,  gem: 15, xp: 10, icon: 'fa-bolt',            name: 'Eine Blitzrunde spielen' },
];

const store = createUserStore('lingualearn_quests_', {
  defaults: () => ({ date: null, picks: [], claimed: [] }),
});

function todayStr() { return new Date().toISOString().slice(0, 10); }
function hash(s) { let h = 2166136261 >>> 0; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h >>> 0; }
function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

function pick3(dateStr) {
  const r = rng(hash(dateStr));
  const pool = [...POOL];
  const picks = [];
  while (picks.length < 3 && pool.length) {
    const q = pool.splice(Math.floor(r() * pool.length), 1)[0];
    if (!picks.some(p => p.type === q.type)) picks.push(q);   // je Typ höchstens eine
  }
  return picks.map(q => q.id);
}

function ensureToday() {
  const today = todayStr();
  let st = store.get();
  if (st.date !== today) { st = { date: today, picks: pick3(today), claimed: [] }; store.save(st); }
  return st;
}

export function getDailyQuests() {
  const st = ensureToday();
  const g = getGame();
  const prog = {
    xp: g.daily.xp || 0,
    correct: g.daily.correct || 0,
    lessons: g.daily.lessons || 0,
    goal: g.daily.goalHit ? 1 : 0,
    perfect: g.daily.perfect || 0,
    blitz: g.daily.blitz || 0,
  };
  return st.picks.map(id => {
    const t = POOL.find(q => q.id === id);
    const p = Math.min(prog[t.type] || 0, t.goal);
    return { ...t, progress: p, done: p >= t.goal, claimed: st.claimed.includes(id) };
  });
}

export function claimQuest(id) {
  const st = ensureToday();
  const q = getDailyQuests().find(x => x.id === id);
  if (!q || !q.done || q.claimed) return null;
  st.claimed.push(id);
  store.save(st);
  addGems(q.gem);
  if (q.xp) addBonusXp(q.xp);
  noteQuestDone();
  return q;
}

export function pendingQuestClaims() {
  return getDailyQuests().filter(q => q.done && !q.claimed);
}

export function reinitQuests() { store.reinit(); }
