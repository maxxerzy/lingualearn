// Quote-Feed: pollt die sichtbaren Symbole gebündelt über /api/quotes,
// pausiert bei verstecktem Tab und prüft nach jedem Tick die Alarme in-App.

import { apiGet } from './api.js';
import { getState, update, subscribe } from './store.js';
import { evaluateAlert } from './alertEval.js';
import { upsertItem } from './merge.js';
import { showToast } from '../components/toast.js';

const POLL_MARKET_OPEN_MS = 15000;
const POLL_MARKET_CLOSED_MS = 60000;

const visible = new Set();
let timer = null;
let running = false;
const notifiedThisSession = new Map(); // alertId → ts (Toast-Doppler vermeiden)

function isLikelyMarketHours() {
  const now = new Date();
  const day = now.getDay();
  if (day === 0 || day === 6) return false;
  const hour = now.getHours();
  return hour >= 8 && hour <= 22; // grob: XETRA-Morgen bis US-Close (MEZ)
}

export function registerSymbols(key, symbols) {
  // Jede View registriert ihre Symbole unter einem Schlüssel.
  for (const existing of [...visible]) {
    if (existing.key === key) visible.delete(existing);
  }
  visible.add({ key, symbols: symbols.filter(Boolean) });
  pollSoon();
}

export function unregisterSymbols(key) {
  for (const existing of [...visible]) {
    if (existing.key === key) visible.delete(existing);
  }
}

function allSymbols() {
  const set = new Set();
  for (const entry of visible) for (const s of entry.symbols) set.add(s);
  // Symbole aktiver Alarme immer mitpollen, damit die In-App-Prüfung greift.
  for (const alert of getState().alerts.items || []) {
    if (alert.active !== false) set.add(alert.symbol);
  }
  return [...set].slice(0, 50);
}

let pollScheduled = false;
function pollSoon() {
  if (pollScheduled || !running) return;
  pollScheduled = true;
  setTimeout(() => {
    pollScheduled = false;
    poll();
  }, 50);
}

async function poll() {
  if (!running || document.hidden) return;
  const symbols = allSymbols();
  if (symbols.length) {
    try {
      const data = await apiGet('/api/quotes', { symbols: symbols.sort().join(',') }, { fresh: true, ttl: 5000 });
      if (data?.quotes) {
        update('quotes', (q) => ({ ...q, ...data.quotes }));
        checkAlertsInApp(data.quotes);
      }
    } catch (err) {
      console.warn('Quote-Poll fehlgeschlagen:', err.message);
    }
  }
  clearTimeout(timer);
  timer = setTimeout(poll, isLikelyMarketHours() ? POLL_MARKET_OPEN_MS : POLL_MARKET_CLOSED_MS);
}

function checkAlertsInApp(quotes) {
  const doc = getState().alerts;
  let changed = null;
  for (const alert of doc.items || []) {
    if (alert.active === false) continue;
    const quote = quotes[alert.symbol];
    if (!quote) continue;
    const hit = evaluateAlert(alert, quote);
    if (!hit) continue;
    const last = notifiedThisSession.get(alert.id);
    if (last && Date.now() - last < 30 * 60 * 1000) continue;
    notifiedThisSession.set(alert.id, Date.now());
    showToast(`${hit.title} — ${hit.body}`, alert.type === 'stop_loss' ? 'error' : 'success', 8000);
    if (alert.oneShot !== false) {
      changed = upsertItem(changed || doc, { ...alert, active: false, triggeredAt: Date.now() });
    }
  }
  if (changed) update('alerts', () => changed);
}

export function startQuoteFeed() {
  if (running) return;
  running = true;
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) pollSoon();
  });
  subscribe('alerts', () => pollSoon());
  poll();
}

/** Einzelnes Quote aus dem Store (oder null). */
export function getQuote(symbol) {
  return getState().quotes[symbol] || null;
}
