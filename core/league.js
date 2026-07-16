import { createUserStore } from './userStore.js';

// Wöchentliche Liga mit simulierten Gegnern (lokal, ohne Server). Deine
// XP dieser Woche zählen; Top 3 steigen auf, die unteren 2 ab. Gegner sind
// pro Woche deterministisch (Namen + Wochen-Ziel-XP), ihr Stand wächst mit
// der verstrichenen Wochenzeit — so wirkt die Rangliste „lebendig".

export const DIVISIONS = [
  { id: 'bronze',   name: 'Bronze',   color: '#c07d3a', icon: 'fa-shield-halved' },
  { id: 'silber',   name: 'Silber',   color: '#8b98a5', icon: 'fa-shield-halved' },
  { id: 'gold',     name: 'Gold',     color: '#e0b93b', icon: 'fa-award' },
  { id: 'platin',   name: 'Platin',   color: '#35b0c4', icon: 'fa-medal' },
  { id: 'diamant',  name: 'Diamant',  color: '#5b8def', icon: 'fa-gem' },
  { id: 'obsidian', name: 'Obsidian', color: '#7b5cff', icon: 'fa-crown' },
];

const PROMOTE = 3;   // Top 3 steigen auf
const DEMOTE = 2;    // Untere 2 steigen ab
const GROUP = 10;    // du + 9 Gegner

const store = createUserStore('lingualearn_league_', {
  defaults: () => ({ weekId: null, division: 0, weekXp: 0, seed: 1, lastResult: null }),
});

function hash(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
  return h >>> 0;
}
function rng(seed) {
  let a = seed >>> 0;
  return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

function currentWeek(now = new Date()) {
  const d = new Date(now.getTime());
  const day = (d.getDay() + 6) % 7;   // Mo=0 … So=6
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - day);
  const start = d.getTime();
  const end = start + 7 * 86400000;
  const jan1 = new Date(d.getFullYear(), 0, 1).getTime();
  const wk = Math.floor((start - jan1) / (7 * 86400000));
  return { id: `${d.getFullYear()}-W${wk}`, start, end, now: now.getTime() };
}

const NAMES = ['Lena', 'Max', 'Sofia', 'Jonas', 'Emma', 'Luca', 'Mia', 'Ben', 'Nora', 'Finn',
  'Clara', 'Paul', 'Lea', 'Tom', 'Anna', 'Nico', 'Ida', 'Erik', 'Maja', 'Timo', 'Sara', 'Jan', 'Ella', 'Noah'];

function makeBots(weekId, division, seed) {
  const r = rng(hash(`${weekId}:${division}:${seed}`));
  const pool = [...NAMES];
  const strength = 1 + division * 0.4;     // höhere Liga → stärkere Gegner
  const bots = [];
  for (let i = 0; i < GROUP - 1; i++) {
    const name = pool.splice(Math.floor(r() * pool.length), 1)[0] || `Lerner ${i + 1}`;
    const target = Math.round((110 + r() * 540) * strength);
    bots.push({ name, target });
  }
  return bots;
}

function ensureWeek() {
  const st = store.get();
  const wk = currentWeek();
  if (st.weekId === wk.id) return st;

  if (st.weekId) {
    // Vorwoche abschließen: Endstände der Gegner (Ziel-XP) vs. deine XP.
    const finals = makeBots(st.weekId, st.division, st.seed).map(b => b.target);
    const rank = finals.filter(x => x > (st.weekXp || 0)).length + 1;
    let division = st.division, outcome = 'gehalten';
    if (rank <= PROMOTE && division < DIVISIONS.length - 1) { division++; outcome = 'aufgestiegen'; }
    else if (rank > GROUP - DEMOTE && division > 0) { division--; outcome = 'abgestiegen'; }
    st.division = division;
    st.lastResult = { rank, outcome, division, weekId: st.weekId };
  }
  st.weekId = wk.id;
  st.weekXp = 0;
  st.seed = (st.seed || 1) + 1;
  store.save(st);
  return st;
}

export function addLeagueXp(n) {
  if (!n) return;
  const st = ensureWeek();
  st.weekXp = (st.weekXp || 0) + n;
  store.save(st);
}

export function getLeague() {
  const st = ensureWeek();
  const wk = currentWeek();
  const frac = Math.min(1, Math.max(0, (wk.now - wk.start) / (wk.end - wk.start)));
  const rows = makeBots(st.weekId, st.division, st.seed)
    .map(b => ({ name: b.name, xp: Math.round(b.target * frac), you: false }));
  rows.push({ name: 'Du', xp: st.weekXp || 0, you: true });
  rows.sort((a, b) => (b.xp - a.xp) || (a.you ? 1 : 0) - (b.you ? 1 : 0));
  rows.forEach((r, i) => (r.rank = i + 1));
  return {
    division: DIVISIONS[st.division],
    divisionIndex: st.division,
    rows,
    you: rows.find(r => r.you),
    promoteCount: st.division < DIVISIONS.length - 1 ? PROMOTE : 0,
    demoteCount: st.division > 0 ? DEMOTE : 0,
    groupSize: GROUP,
    daysLeft: Math.max(0, Math.ceil((wk.end - wk.now) / 86400000)),
    lastResult: st.lastResult,
  };
}

export function reinitLeague() { store.reinit(); }
export function clearLastResult() {
  const st = store.get();
  if (st.lastResult) { st.lastResult = null; store.save(st); }
}
