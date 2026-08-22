import { getCurrentUser } from './auth.js';
import { getSyncKey } from './sync.js';
import { getLeague, getCurrentWeekId } from './league.js';

// Freundesliga: eine ECHTE Rangliste statt simulierter Gegner. Eine
// Gruppe ist ein selbstgewählter Code (kein eigenes Konto) — wer ihn
// kennt, kann beitreten. Geteilt wird nur, was die Liga ohnehin schon
// zeigt: Name, Wochen-XP, Division. Genutzt wird derselbe Worker und
// KV-Speicher wie beim Geräte-Abgleich (`core/sync.js`), auch derselbe
// Konto-Schlüssel — eine Identität, die mit jedem Push automatisch die
// eigene Zeile in der Gruppe schützt (niemand sonst kann sie überschreiben).
//
// Ohne Gruppe bleibt die simulierte Wochenliga (`core/league.js`)
// unverändert bestehen — sie ist der Fallback für alle, die (noch)
// niemanden zum Mitlernen haben.

const GROUP_KEY = 'lingualearn_friendgroup_';
const ROSTER_KEY = 'lingualearn_friendroster_';
// Ohne O/0, I/1/L — beim Vorlesen/Abtippen leicht zu verwechseln.
const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

function groupKey(user) { return user ? GROUP_KEY + user : null; }
function rosterKey(user) { return user ? ROSTER_KEY + user : null; }

export function getFriendGroup(user = getCurrentUser()) {
  const key = groupKey(user);
  if (!key) return null;
  try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; }
}

function setFriendGroup(group, user = getCurrentUser()) {
  const key = groupKey(user);
  if (!key) return;
  try {
    if (group) localStorage.setItem(key, JSON.stringify(group));
    else localStorage.removeItem(key);
  } catch { /* Speicher voll — Gruppe bleibt für diese Sitzung im Speicher */ }
}

function cacheRoster(members, user = getCurrentUser()) {
  const key = rosterKey(user);
  if (!key) return;
  try { localStorage.setItem(key, JSON.stringify({ members: members || {}, cachedAt: Date.now() })); }
  catch { /* egal — die Liste bleibt beim nächsten Pull aktuell */ }
}

export function getCachedRoster(user = getCurrentUser()) {
  const key = rosterKey(user);
  if (!key) return null;
  try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; }
}

export function generateFriendCode(len = 6) {
  const bytes = new Uint8Array(len);
  try { crypto.getRandomValues(bytes); } catch { for (let i = 0; i < len; i++) bytes[i] = Math.floor(Math.random() * 256); }
  let out = '';
  for (let i = 0; i < len; i++) out += CODE_ALPHABET[bytes[i] % CODE_ALPHABET.length];
  return out;
}

export function isValidFriendCode(code) {
  return typeof code === 'string' && /^[A-Za-z0-9]{4,10}$/.test(code.trim());
}

async function api(path, payload) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });
  let body = null;
  try { body = await res.json(); } catch { /* kein JSON (z. B. 405) */ }
  return { status: res.status, body };
}

// ── Beitreten / Erstellen / Verlassen ─────────────────────────────

// Beitreten und Erstellen sind serverseitig dasselbe: der erste Push
// unter einem Code registriert die Gruppe UND dich als Mitglied.
export async function joinFriendGroup(code, name) {
  const user = getCurrentUser();
  if (!user) return { ok: false, reason: 'no-user' };
  if (!isValidFriendCode(code)) return { ok: false, reason: 'bad-code' };
  const displayName = (name || user).trim().slice(0, 24) || user;
  setFriendGroup({ code: code.trim().toUpperCase(), name: displayName }, user);
  const res = await pushFriendXp();
  if (!res.ok) setFriendGroup(null, user);   // fehlgeschlagen → nicht halb beigetreten bleiben
  return res;
}

export function createFriendGroup(name) {
  return joinFriendGroup(generateFriendCode(), name);
}

export async function leaveFriendGroup() {
  const user = getCurrentUser();
  const group = getFriendGroup(user);
  if (!user || !group) return { ok: true };
  const token = await getSyncKey(user);
  setFriendGroup(null, user);
  cacheRoster(null, user);
  if (!token || !navigator.onLine) return { ok: true, server: 'skipped' };
  try {
    const res = await api('/api/league/leave', { user, token, code: group.code });
    return { ok: true, server: res.status === 200 ? 'left' : 'failed' };
  } catch {
    return { ok: true, server: 'failed' };   // lokal ist die Gruppe in jedem Fall verlassen
  }
}

// ── Push / Pull ────────────────────────────────────────────────────

export async function pushFriendXp() {
  const user = getCurrentUser();
  const group = getFriendGroup(user);
  if (!user || !group) return { ok: false, reason: 'no-group' };
  if (!navigator.onLine) return { ok: false, reason: 'offline' };
  const token = await getSyncKey(user);
  if (!token) return { ok: false, reason: 'no-token' };
  const L = getLeague();
  try {
    const res = await api('/api/league/push', {
      user, token, code: group.code, name: group.name,
      xp: L.you.xp, weekId: getCurrentWeekId(), division: L.divisionIndex,
    });
    if (res.status === 503) return { ok: false, reason: 'not-configured' };
    if (res.status !== 200 || !res.body?.ok) return { ok: false, reason: res.body?.error || 'server' };
    cacheRoster(res.body.members, user);
    return { ok: true, members: res.body.members };
  } catch {
    return { ok: false, reason: 'network' };
  }
}

export async function pullFriendGroup() {
  const user = getCurrentUser();
  const group = getFriendGroup(user);
  if (!user || !group) return { ok: false, reason: 'no-group' };
  if (!navigator.onLine) return { ok: false, reason: 'offline' };
  const token = await getSyncKey(user);
  if (!token) return { ok: false, reason: 'no-token' };
  try {
    const res = await api('/api/league/pull', { user, token, code: group.code });
    if (res.status === 503) return { ok: false, reason: 'not-configured' };
    if (res.status !== 200 || !res.body?.ok) return { ok: false, reason: 'server' };
    cacheRoster(res.body.members, user);
    return { ok: true, members: res.body.members };
  } catch {
    return { ok: false, reason: 'network' };
  }
}

// Nach jeder XP-Änderung nicht sofort funken, sondern gebündelt —
// derselbe Rhythmus wie `core/sync.js` → `syncSoon`.
let pending = null;
export function friendXpSoon(delay = 3000) {
  if (pending) clearTimeout(pending);
  pending = setTimeout(() => { pending = null; pushFriendXp().catch(() => {}); }, delay);
}

// ── Rangliste für die Oberfläche ──────────────────────────────────
// Kombiniert den zuletzt gepullten Stand mit dem eigenen LIVE-Wert (der
// Push kann etwas hinterherhinken) und zeigt nur Mitglieder der
// AKTUELLEN Woche — wer letzte Woche zuletzt gepusht hat, verschwindet
// sonst nicht rechtzeitig aus der Liste.
export function friendLeaderboard() {
  const user = getCurrentUser();
  const group = getFriendGroup(user);
  if (!user || !group) return null;

  const cached = getCachedRoster(user);
  const members = { ...(cached?.members || {}) };
  const L = getLeague();
  const weekId = getCurrentWeekId();
  members[user] = { name: group.name, xp: L.you.xp, weekId, division: L.divisionIndex, updatedAt: Date.now() };

  const rows = Object.entries(members)
    .filter(([, m]) => m && m.weekId === weekId)
    .map(([u, m]) => ({ user: u, name: m.name || u, xp: Number(m.xp) || 0, you: u === user }))
    .sort((a, b) => b.xp - a.xp);
  rows.forEach((r, i) => { r.rank = i + 1; });

  return {
    code: group.code,
    name: group.name,
    rows,
    memberCount: rows.length,
    // Kein Server-Stand seit über 10 Minuten? Dann als „nicht ganz frisch"
    // kennzeichnen, statt so zu tun, als wäre alles aktuell.
    stale: !cached || (Date.now() - (cached.cachedAt || 0)) > 10 * 60 * 1000,
  };
}
