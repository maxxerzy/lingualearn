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

// ── Konto-Schlüssel ──────────────────────────────────────────────
// Der Schlüssel identifiziert das Konto gegenüber dem Server. Er ist
// bewusst ein EIGENSTÄNDIGES Geheimnis und nicht dauerhaft ans Passwort
// gebunden — sonst würde jede Passwortänderung den Zugang zum
// Cloud-Stand kappen.
//
// Erstkontakt: Gibt es lokal noch keinen Schlüssel, wird er aus Konto +
// Passwort abgeleitet. Dadurch finden sich Geräte mit denselben
// Zugangsdaten weiterhin von allein — und bestehende Stände bleiben
// erreichbar. Ab dann ist der Schlüssel gespeichert und überlebt jeden
// Passwortwechsel. Auf einem Gerät mit abweichendem Passwort kann man
// ihn stattdessen von Hand eintragen.
const KEY_STORE = 'lingualearn_synckey_';

export function readSyncKey(user = getCurrentUser()) {
  try { return localStorage.getItem(KEY_STORE + user) || null; } catch { return null; }
}

export function isValidSyncKey(key) {
  return typeof key === 'string' && /^[a-f0-9]{64}$/i.test(key.trim());
}

export function setSyncKey(key, user = getCurrentUser()) {
  if (!user || !isValidSyncKey(key)) return false;
  try { localStorage.setItem(KEY_STORE + user, key.trim().toLowerCase()); } catch { return false; }
  return true;
}

// Schlüssel besorgen: gespeicherten nehmen, sonst einmalig aus den
// Zugangsdaten ableiten und ab dann festschreiben.
export async function getSyncKey(user = getCurrentUser()) {
  if (!user) return null;
  const stored = readSyncKey(user);
  if (stored) return stored;
  const derived = await deriveToken(user);
  if (derived) setSyncKey(derived, user);
  return derived;
}

// Aus Nutzername + gespeichertem Passwort-Hash abgeleiteter Schlüssel.
// Das Passwort selbst verlässt das Gerät nie.
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

// ── Konten auf DIESEM Gerät zusammenführen ───────────────────────
// Für den Fall, dass auf zwei Geräten unterschiedliche Kontonamen
// benutzt wurden: Der Fortschritt eines anderen lokalen Kontos wird in
// das aktuelle Konto eingeschmolzen — nach denselben Regeln wie beim
// Geräte-Abgleich (höheres Level, stärkere Karten, vereinigte Erfolge).
// Das Quellkonto bleibt dabei unverändert erhalten.
export function listLocalAccounts(exceptUser = getCurrentUser()) {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    return Object.keys(users).filter(u => u !== exceptUser);
  } catch { return []; }
}

// Hat ein Konto überhaupt Lerndaten? (Leere Konten lohnen die Übernahme nicht.)
export function accountHasData(user) {
  return PREFIXES.some(p => {
    const v = readJson(p + user);
    if (v === undefined || v === null) return false;
    if (typeof v === 'object') return Object.keys(v).length > 0;
    return true;
  });
}

export function mergeLocalAccount(fromUser, toUser = getCurrentUser()) {
  if (!fromUser || !toUser || fromUser === toUser) return { ok: false, reason: 'bad-args' };
  const users = (() => {
    try { return JSON.parse(localStorage.getItem(USERS_KEY) || '{}'); } catch { return {}; }
  })();
  if (!users[fromUser]) return { ok: false, reason: 'unknown-account' };

  const target = collectSnapshot(toUser);
  const source = collectSnapshot(fromUser);
  // Das aktuelle Konto gilt als das jüngere: Bei Einstellungen, die sich
  // nicht verrechnen lassen (ausgerüstete Cosmetics, Tagesziel), behält
  // es die Oberhand; Zählwerte werden zusammengeführt.
  const merged = mergeSnapshots({ ...target, updatedAt: Date.now() },
                                { ...source, updatedAt: Date.now() - 1 });
  applySnapshot(toUser, merged);
  return { ok: true, from: fromUser, to: toUser };
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
function setLastSync(user, data) {
  try {
    localStorage.setItem(LAST_SYNC_KEY + user, String(Date.now()));
    if (data !== undefined) localStorage.setItem(SIG_KEY + user, signature(data));
  } catch { /* egal */ }
}

// Kurze Signatur des lokalen Stands. Damit erkennt der Abgleich, ob sich
// seit dem letzten Mal überhaupt etwas geändert hat — sonst wird bei
// jedem App-Wechsel unnötig gefunkt.
const SIG_KEY = 'lingualearn_syncsig_';
function signature(data) {
  const s = JSON.stringify(data);
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return `${s.length}:${h}`;
}
const QUIET_MS = 5 * 60 * 1000;   // so lange gilt ein unveränderter Stand als frisch

// Vollständiger Abgleich: holen → zusammenführen → anwenden → hochladen.
// Gibt einen Status zurück, den die Oberfläche anzeigen kann.
export async function syncNow({ user = getCurrentUser(), force = false } = {}) {
  if (!user) return { ok: false, reason: 'no-user' };
  if (!navigator.onLine) return { ok: false, reason: 'offline' };
  const token = await getSyncKey(user);
  if (!token) return { ok: false, reason: 'no-token' };

  // Nichts gelernt und gerade eben erst abgeglichen? Dann gar nicht erst
  // funken. Beim App-Start (force) wird immer geholt, damit der Stand
  // anderer Geräte ankommt.
  const sigNow = signature(collectSnapshot(user).data);
  if (!force && Date.now() - getLastSync(user) < QUIET_MS) {
    let lastSig = null;
    try { lastSig = localStorage.getItem(SIG_KEY + user); } catch { /* egal */ }
    if (lastSig === sigNow) return { ok: true, changed: false, uploaded: false, skipped: true };
  }

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
  let remote = pulled.body?.snapshot || null;
  let merged = mergeSnapshots(local, remote);
  const changed = remote ? JSON.stringify(merged.data) !== JSON.stringify(local.data) : false;
  if (changed) applySnapshot(user, merged);

  // Hat der Server bereits genau diesen Stand, wird nicht hochgeladen.
  // Sonst würde jeder App-Wechsel einen überflüssigen Schreibvorgang
  // auslösen (Datenvolumen, KV-Kontingent).
  if (remote && JSON.stringify(merged.data) === JSON.stringify(remote.data)) {
    setLastSync(user, merged.data);
    return { ok: true, changed, hadRemote: true, uploaded: false };
  }

  // Optimistisches Sperren: Der Push nennt die Revision, auf der das
  // Zusammenführen beruht. Kommt 409 zurück, hat ein anderes Gerät
  // dazwischengefunkt — wir führen mit dessen Stand neu zusammen und
  // versuchen es einmal erneut.
  let baseRev = Number(remote?.rev) || 0;
  for (let attempt = 0; attempt < 2; attempt++) {
    let pushed;
    try {
      pushed = await api('/api/sync/push', {
        user, token, baseRev,
        snapshot: { data: merged.data, device: navigator.platform || '' },
      });
    } catch {
      return { ok: false, reason: 'network', changed };
    }
    if (pushed.status === 200) {
      setLastSync(user, merged.data);
      return { ok: true, changed, hadRemote: !!remote, uploaded: true };
    }
    if (pushed.status !== 409 || attempt === 1) return { ok: false, reason: 'server', changed };

    remote = pushed.body?.snapshot || null;
    baseRev = Number(pushed.body?.rev) || Number(remote?.rev) || 0;
    merged = mergeSnapshots(merged, remote);
    applySnapshot(user, merged);
  }
  return { ok: false, reason: 'conflict', changed };
}

// ── Sicherung & Konto-Löschung ───────────────────────────────────
// Der komplette Fortschritt eines Kontos als Datei — zum Aufheben, zum
// Umziehen auf ein Gerät ohne Netz und als Rettungsanker vor dem Löschen.
export function exportProgress(user = getCurrentUser()) {
  const snap = collectSnapshot(user);
  return {
    app: 'lingualearn',
    kind: 'progress',
    version: 1,
    user,
    exportedAt: new Date().toISOString(),
    data: snap.data,
  };
}

// Eine Sicherung einspielen: sie wird mit dem aktuellen Stand
// ZUSAMMENGEFÜHRT, nicht darübergebügelt — so kann ein Einspielen
// niemals Fortschritt vernichten.
export function importProgress(payload, user = getCurrentUser()) {
  if (!user) return { ok: false, reason: 'no-user' };
  if (!payload || payload.app !== 'lingualearn' || typeof payload.data !== 'object' || !payload.data) {
    return { ok: false, reason: 'bad-file' };
  }
  const local = collectSnapshot(user);
  const merged = mergeSnapshots(local, { version: 1, updatedAt: 0, data: payload.data });
  applySnapshot(user, merged);
  return { ok: true, from: payload.user || null };
}

// Konto vollständig entfernen: lokale Daten, Konto-Schlüssel und — wenn
// erreichbar — der Stand auf dem Server.
export async function deleteAccount(user = getCurrentUser()) {
  if (!user) return { ok: false, reason: 'no-user' };

  let server = 'skipped';
  const token = readSyncKey(user) || await deriveToken(user);
  if (token && navigator.onLine) {
    try {
      const res = await api('/api/sync/delete', { user, token });
      server = res.status === 200 ? 'deleted' : 'failed';
    } catch { server = 'failed'; }
  }

  for (const p of PREFIXES) {
    try { localStorage.removeItem(p + user); } catch { /* egal */ }
  }
  for (const k of [KEY_STORE, LAST_SYNC_KEY, SIG_KEY]) {
    try { localStorage.removeItem(k + user); } catch { /* egal */ }
  }
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    delete users[user];
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch { /* egal */ }

  return { ok: true, server };
}

// Nach einer Lektion nicht sofort funken, sondern gebündelt.
let pending = null;
export function syncSoon(delay = 2500) {
  if (pending) clearTimeout(pending);
  pending = setTimeout(() => { pending = null; syncNow().catch(() => {}); }, delay);
}
