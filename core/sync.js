import { getCurrentUser } from './auth.js';

// Geräte-Synchronisation: Der komplette Lernstand eines Kontos wird als
// Schnappschuss mit dem Server abgeglichen, sodass Handy, iPad und Mac
// denselben Stand haben.
//
// Kernidee: Es gewinnt NICHT einfach das zuletzt gespeicherte Gerät —
// beide Stände werden ZUSAMMENGEFÜHRT (höheres Level, mehr gemeisterte
// Karten, vereinigte Erfolge …). Dadurch geht nichts verloren, wenn auf
// zwei Geräten parallel gelernt wurde.

const PREFIXES = [
  'lingualearn_game_', 'lingualearn_cards_', 'lingualearn_course_',
  'lingualearn_cosmetics_', 'lingualearn_league_', 'lingualearn_quests_',
  'lingualearn_errors_', 'lingualearn_gold_', 'lingualearn_themequiz_',
  'lingualearn_grammar_', 'lingualearn_wotd_', 'lingualearn_stats_',
  'lingualearn_fx_', 'lingualearn_onboard_', 'lingualearn_why_',
];

const USERS_KEY = 'lingualearn_users';
const LAST_SYNC_KEY = 'lingualearn_lastsync_';

function readJson(key) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return undefined;
    try { return JSON.parse(raw); } catch { return raw; }   // Rohwerte (z. B. „off")
  } catch { return undefined; }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
  } catch { /* Speicher voll — lokal weiterarbeiten */ }
}

// ── Zugangstoken ─────────────────────────────────────────────────
// Wird aus Nutzername + gespeichertem Passwort-Hash abgeleitet. Damit
// erhält dasselbe Konto auf jedem Gerät denselben Schlüssel, ohne dass
// das Passwort das Gerät verlässt.
export async function deriveToken(user) {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    const hash = users?.[user]?.passwordHash;
    if (!hash || !globalThis.crypto?.subtle) return null;
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${user}:${hash}`));
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  } catch { return null; }
}

// ── Schnappschuss einsammeln / anwenden ──────────────────────────
export function collectSnapshot(user) {
  const data = {};
  for (const p of PREFIXES) {
    const v = readJson(p + user);
    if (v !== undefined) data[p] = v;
  }
  return { version: 1, updatedAt: Date.now(), data };
}

export function applySnapshot(user, snap) {
  if (!snap?.data) return false;
  for (const [prefix, value] of Object.entries(snap.data)) {
    if (!PREFIXES.includes(prefix) || value === undefined || value === null) continue;
    writeJson(prefix + user, value);
  }
  return true;
}

// ── Zusammenführen ───────────────────────────────────────────────
const maxNum = (a, b) => Math.max(Number(a) || 0, Number(b) || 0);
const union = (a, b) => [...new Set([...(Array.isArray(a) ? a : []), ...(Array.isArray(b) ? b : [])])];
// Datums-Map (id -> 'YYYY-MM-DD'): alles behalten, frühestes Datum gewinnt.
function mergeDateMap(a = {}, b = {}) {
  const out = { ...(a || {}) };
  for (const [k, v] of Object.entries(b || {})) {
    out[k] = out[k] ? (String(out[k]) < String(v) ? out[k] : v) : v;
  }
  return out;
}
const newer = (a, b, aNew) => (aNew ? (a === undefined ? b : a) : (b === undefined ? a : b));

function mergeGame(a = {}, b = {}, aNew) {
  const out = { ...b, ...a };                     // Grundgerüst, Felder unten präzisiert
  out.xp = maxNum(a.xp, b.xp);
  out.gems = maxNum(a.gems, b.gems);
  out.gemsEarned = maxNum(a.gemsEarned, b.gemsEarned);
  out.questsDone = maxNum(a.questsDone, b.questsDone);
  out.bestCombo = maxNum(a.bestCombo, b.bestCombo);
  out.bestBlitz = maxNum(a.bestBlitz, b.bestBlitz);
  out.perfectSessions = maxNum(a.perfectSessions, b.perfectSessions);
  out.goalHitEver = !!(a.goalHitEver || b.goalHitEver);
  out.dailyGoal = newer(a.dailyGoal, b.dailyGoal, aNew) || 20;
  out.langsPlayed = union(a.langsPlayed, b.langsPlayed);
  out.achievements = mergeDateMap(a.achievements, b.achievements);
  out.chests = mergeDateMap(a.chests, b.chests);
  out.inventory = {};
  for (const k of new Set([...Object.keys(a.inventory || {}), ...Object.keys(b.inventory || {})])) {
    out.inventory[k] = maxNum(a.inventory?.[k], b.inventory?.[k]);
  }
  // Aktivität: pro Tag die höhere Kartenzahl.
  out.activity = { ...(b.activity || {}) };
  for (const [day, n] of Object.entries(a.activity || {})) out.activity[day] = maxNum(out.activity[day], n);
  // Serie: längste Werte behalten, jüngstes Lerndatum gewinnt.
  const as = a.streak || {}, bs = b.streak || {};
  out.streak = {
    current: (String(as.lastDate || '') >= String(bs.lastDate || '')) ? (as.current || 0) : (bs.current || 0),
    longest: maxNum(as.longest, bs.longest),
    lastDate: String(as.lastDate || '') >= String(bs.lastDate || '') ? (as.lastDate || null) : (bs.lastDate || null),
  };
  out.streak.current = Math.max(out.streak.current, 0);
  // Tageszähler: gleicher Tag → Maximum, sonst der jüngere Tag.
  const ad = a.daily || {}, bd = b.daily || {};
  if (ad.date && ad.date === bd.date) {
    out.daily = { ...bd, ...ad };
    for (const k of ['count', 'correct', 'lessons', 'xp', 'perfect', 'combo', 'blitz']) {
      out.daily[k] = maxNum(ad[k], bd[k]);
    }
    out.daily.goalHit = !!(ad.goalHit || bd.goalHit);
  } else {
    out.daily = String(ad.date || '') >= String(bd.date || '') ? ad : bd;
  }
  return out;
}

// Kartenfortschritt (SRS): pro Karte der stärkere Stand.
function mergeCards(a = {}, b = {}) {
  const out = { ...(b || {}) };
  for (const [key, av] of Object.entries(a || {})) {
    const bv = out[key];
    if (!bv) { out[key] = av; continue; }
    const aScore = (Number(av.level) || 0) * 1000 + (Number(av.correct) || 0);
    const bScore = (Number(bv.level) || 0) * 1000 + (Number(bv.correct) || 0);
    out[key] = aScore >= bScore ? av : bv;
  }
  return out;
}

function mergeCourse(a = {}, b = {}) {
  const out = {};
  for (const deck of new Set([...Object.keys(a || {}), ...Object.keys(b || {})])) {
    const av = a?.[deck] || {}, bv = b?.[deck] || {};
    out[deck] = {
      introduced: maxNum(av.introduced, bv.introduced),
      sentencesDone: union(av.sentencesDone, bv.sentencesDone),
    };
  }
  return out;
}

// {deckId: [...]} → je Deck vereinigen (Gold-Lektionen, Grammatik, Fehler).
function mergeDeckLists(a = {}, b = {}) {
  const out = {};
  for (const deck of new Set([...Object.keys(a || {}), ...Object.keys(b || {})])) {
    out[deck] = union(a?.[deck], b?.[deck]);
  }
  return out;
}

// {deckId: {thema: datum}} → je Deck Datums-Map zusammenführen.
function mergeDeckDateMaps(a = {}, b = {}) {
  const out = {};
  for (const deck of new Set([...Object.keys(a || {}), ...Object.keys(b || {})])) {
    out[deck] = mergeDateMap(a?.[deck], b?.[deck]);
  }
  return out;
}

function mergeCosmetics(a = {}, b = {}, aNew) {
  return {
    equipped: { ...(aNew ? b.equipped : a.equipped), ...(aNew ? a.equipped : b.equipped) },
    seen: union(a.seen, b.seen),
  };
}

function mergeStats(a = {}, b = {}) {
  const out = { ...b, ...a };
  for (const k of ['totalSessions', 'totalCorrect', 'totalAnswered', 'learnedWords', 'activeDays']) {
    out[k] = maxNum(a[k], b[k]);
  }
  out.lastSessionDate = String(a.lastSessionDate || '') >= String(b.lastSessionDate || '')
    ? a.lastSessionDate : b.lastSessionDate;
  if (out.totalAnswered) out.successRate = Math.round(((out.totalCorrect || 0) / out.totalAnswered) * 100);
  return out;
}

// Führt zwei Schnappschüsse zusammen. `local` und `remote` dürfen leer sein.
export function mergeSnapshots(local, remote) {
  if (!remote?.data) return local;
  if (!local?.data) return remote;
  const localNewer = (local.updatedAt || 0) >= (remote.updatedAt || 0);
  const a = local.data, b = remote.data;
  const data = {};
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const key of keys) {
    const av = a[key], bv = b[key];
    if (av === undefined) { data[key] = bv; continue; }
    if (bv === undefined) { data[key] = av; continue; }
    switch (key) {
      case 'lingualearn_game_':      data[key] = mergeGame(av, bv, localNewer); break;
      case 'lingualearn_cards_':     data[key] = mergeCards(av, bv); break;
      case 'lingualearn_course_':    data[key] = mergeCourse(av, bv); break;
      case 'lingualearn_cosmetics_': data[key] = mergeCosmetics(av, bv, localNewer); break;
      case 'lingualearn_stats_':     data[key] = mergeStats(av, bv); break;
      case 'lingualearn_gold_':
      case 'lingualearn_grammar_':
      case 'lingualearn_errors_':    data[key] = mergeDeckLists(av, bv); break;
      case 'lingualearn_themequiz_': data[key] = mergeDeckDateMaps(av, bv); break;
      default:                       data[key] = localNewer ? av : bv;   // Tagesdaten, Liga, Einstellungen
    }
  }
  return { version: 1, updatedAt: Math.max(local.updatedAt || 0, remote.updatedAt || 0), data };
}

// ── Server-Kommunikation ─────────────────────────────────────────
async function api(path, payload) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });
  let body = null;
  try { body = await res.json(); } catch { /* kein JSON */ }
  return { status: res.status, body };
}

export function getLastSync(user) {
  try { return Number(localStorage.getItem(LAST_SYNC_KEY + user)) || 0; } catch { return 0; }
}
function setLastSync(user) {
  try { localStorage.setItem(LAST_SYNC_KEY + user, String(Date.now())); } catch { /* egal */ }
}

// Vollständiger Abgleich: holen → zusammenführen → anwenden → hochladen.
// Gibt einen Status zurück, den die Oberfläche anzeigen kann.
export async function syncNow({ user = getCurrentUser() } = {}) {
  if (!user) return { ok: false, reason: 'no-user' };
  if (!navigator.onLine) return { ok: false, reason: 'offline' };
  const token = await deriveToken(user);
  if (!token) return { ok: false, reason: 'no-token' };

  let pulled;
  try {
    pulled = await api('/api/sync/pull', { user, token });
  } catch {
    return { ok: false, reason: 'network' };
  }
  if (pulled.status === 503) return { ok: false, reason: 'not-configured' };
  if (pulled.status === 403) return { ok: false, reason: 'forbidden' };
  if (pulled.status !== 200) return { ok: false, reason: 'server' };

  const local = collectSnapshot(user);
  const remote = pulled.body?.snapshot || null;
  const merged = mergeSnapshots(local, remote);
  const changed = remote ? JSON.stringify(merged.data) !== JSON.stringify(local.data) : false;
  if (changed) applySnapshot(user, merged);

  let pushed;
  try {
    pushed = await api('/api/sync/push', {
      user, token,
      snapshot: { data: merged.data, device: navigator.platform || '' },
    });
  } catch {
    return { ok: false, reason: 'network', changed };
  }
  if (pushed.status !== 200) return { ok: false, reason: 'server', changed };

  setLastSync(user);
  return { ok: true, changed, hadRemote: !!remote };
}

// Nach einer Lektion nicht sofort funken, sondern gebündelt.
let pending = null;
export function syncSoon(delay = 2500) {
  if (pending) clearTimeout(pending);
  pending = setTimeout(() => { pending = null; syncNow().catch(() => {}); }, delay);
}
