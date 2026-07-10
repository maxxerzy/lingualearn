// Watchlist: mehrere Listen, Live-Kurse, Sparklines, Bearbeiten-Modus mit
// Verschieben/Löschen, Alarm-Übersicht je Titel.

import { getState, update, subscribe, localGet, localSet } from '../core/store.js';
import { upsertItem, removeItem } from '../core/merge.js';
import { registerSymbols, unregisterSymbols } from '../core/quotes.js';
import { apiGet } from '../core/api.js';
import { drawSparkline } from '../components/sparkline.js';
import { openModal, confirmModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';
import { fmtCurrency, fmtPct, trendClass } from '../core/format.js';
import { escapeHtml } from './search.js';

let unsubQuotes = null;
let unsubLists = null;
let editMode = false;
const sparkCache = new Map(); // symbol → closes[]

export function ensureDefaultList() {
  const doc = getState().watchlists;
  if (doc.items.length) return doc.items[0];
  const list = { id: crypto.randomUUID(), name: 'Meine Watchlist', symbols: [], order: 0 };
  update('watchlists', (d) => upsertItem(d, list));
  return list;
}

export function addToWatchlist(symbol, listId = null) {
  ensureDefaultList();
  const doc = getState().watchlists;
  const list = doc.items.find((l) => l.id === listId) || doc.items[0];
  if (list.symbols.includes(symbol)) {
    showToast(`${symbol} ist bereits auf „${list.name}".`);
    return;
  }
  update('watchlists', (d) => upsertItem(d, { ...list, symbols: [...list.symbols, symbol] }));
  showToast(`${symbol} zu „${list.name}" hinzugefügt.`, 'success');
}

export function removeFromWatchlist(symbol, listId) {
  const doc = getState().watchlists;
  const list = doc.items.find((l) => l.id === listId);
  if (!list) return;
  update('watchlists', (d) => upsertItem(d, { ...list, symbols: list.symbols.filter((s) => s !== symbol) }));
}

export function isWatched(symbol) {
  return getState().watchlists.items.some((l) => l.symbols.includes(symbol));
}

export function mount(el) {
  ensureDefaultList();
  render(el);
  unsubLists = subscribe('watchlists', () => render(el));
  unsubQuotes = subscribe('quotes', () => updatePrices(el));
}

export function unmount() {
  unregisterSymbols('watchlist');
  if (unsubQuotes) unsubQuotes();
  if (unsubLists) unsubLists();
  editMode = false;
}

function activeListId() {
  return localGet('activeWatchlist', null);
}

function render(el) {
  const doc = getState().watchlists;
  const lists = doc.items;
  const active = lists.find((l) => l.id === activeListId()) || lists[0];
  if (!active) return;

  registerSymbols('watchlist', active.symbols);

  el.innerHTML = `
    <div class="chip-row" style="margin-bottom:12px">
      ${lists.map((l) => `<button class="chip ${l.id === active.id ? 'active' : ''}" data-list="${l.id}">${escapeHtml(l.name)}</button>`).join('')}
      <button class="chip" data-newlist title="Neue Liste">＋</button>
      <span style="flex:1"></span>
      <button class="chip ${editMode ? 'active' : ''}" data-edit>${editMode ? 'Fertig' : 'Bearbeiten'}</button>
    </div>
    <div class="card quote-list" id="wlRows">
      ${active.symbols.length ? active.symbols.map((s) => rowHtml(s, active.id)).join('')
        : `<div class="empty-state"><div class="e-icon">⭐️</div>Noch keine Titel.<br>Über die Suche (🔍 oben) Aktien hinzufügen.</div>`}
    </div>
    ${editMode && lists.length >= 1 ? `
      <button class="btn danger small" data-dellist style="margin-top:4px">Liste „${escapeHtml(active.name)}" löschen</button>` : ''}
  `;

  el.querySelectorAll('[data-list]').forEach((chip) => {
    chip.addEventListener('click', () => {
      localSet('activeWatchlist', chip.dataset.list);
      render(el);
    });
  });
  el.querySelector('[data-newlist]')?.addEventListener('click', () => newListDialog(el));
  el.querySelector('[data-edit]')?.addEventListener('click', () => {
    editMode = !editMode;
    render(el);
  });
  el.querySelector('[data-dellist]')?.addEventListener('click', async () => {
    if (getState().watchlists.items.length <= 1) {
      showToast('Die letzte Liste kann nicht gelöscht werden.');
      return;
    }
    if (await confirmModal('Liste löschen?', `„${active.name}" und ihre Einträge werden von allen Geräten entfernt.`)) {
      update('watchlists', (d) => removeItem(d, active.id));
      localSet('activeWatchlist', null);
    }
  });

  bindRows(el, active);
  updatePrices(el);
  loadSparklines(el, active.symbols);
}

function rowHtml(symbol, listId) {
  return `
    <div class="quote-row" data-symbol="${escapeHtml(symbol)}">
      ${editMode ? `
        <div style="display:flex; flex-direction:column; gap:2px">
          <button class="icon-btn" style="width:30px;height:22px" data-up="${escapeHtml(symbol)}" aria-label="nach oben">▲</button>
          <button class="icon-btn" style="width:30px;height:22px" data-down="${escapeHtml(symbol)}" aria-label="nach unten">▼</button>
        </div>` : ''}
      <div class="q-main">
        <div class="q-sym">${escapeHtml(symbol)}</div>
        <div class="q-name" data-name="${escapeHtml(symbol)}"></div>
      </div>
      ${!editMode ? `<canvas class="q-spark" data-spark="${escapeHtml(symbol)}"></canvas>` : ''}
      <div class="q-price" data-price="${escapeHtml(symbol)}"><span class="dim">–</span></div>
      ${editMode ? `<button class="icon-btn" data-remove="${escapeHtml(symbol)}" data-listid="${listId}" aria-label="entfernen" style="color:var(--down)">✕</button>` : ''}
    </div>`;
}

function bindRows(el, active) {
  el.querySelectorAll('.quote-row[data-symbol]').forEach((row) => {
    row.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      location.hash = `#/s/${encodeURIComponent(row.dataset.symbol)}`;
    });
  });
  el.querySelectorAll('[data-remove]').forEach((btn) => {
    btn.addEventListener('click', () => removeFromWatchlist(btn.dataset.remove, btn.dataset.listid));
  });
  const move = (symbol, dir) => {
    const idx = active.symbols.indexOf(symbol);
    const target = idx + dir;
    if (idx < 0 || target < 0 || target >= active.symbols.length) return;
    const symbols = [...active.symbols];
    [symbols[idx], symbols[target]] = [symbols[target], symbols[idx]];
    update('watchlists', (d) => upsertItem(d, { ...active, symbols }));
  };
  el.querySelectorAll('[data-up]').forEach((btn) => btn.addEventListener('click', () => move(btn.dataset.up, -1)));
  el.querySelectorAll('[data-down]').forEach((btn) => btn.addEventListener('click', () => move(btn.dataset.down, 1)));
}

function updatePrices(el) {
  const quotes = getState().quotes;
  el.querySelectorAll('[data-price]').forEach((cell) => {
    const q = quotes[cell.dataset.price];
    if (!q || q.price == null) return;
    cell.innerHTML = `
      <div class="q-last">${fmtCurrency(q.price, q.currency)}</div>
      <span class="badge ${trendClass(q.changePct)}">${fmtPct(q.changePct)}</span>`;
  });
  el.querySelectorAll('[data-name]').forEach((cell) => {
    const q = quotes[cell.dataset.name];
    if (q?.name && !cell.textContent) cell.textContent = q.name;
  });
}

async function loadSparklines(el, symbols) {
  for (const symbol of symbols) {
    let closes = sparkCache.get(symbol);
    if (!closes) {
      try {
        const data = await apiGet('/api/chart', { symbol, interval: '1h', range: '5d' }, { ttl: 300000 });
        closes = (data.candles || []).map((k) => k.c);
        sparkCache.set(symbol, closes);
      } catch {
        continue;
      }
    }
    const canvas = el.querySelector(`[data-spark="${CSS.escape(symbol)}"]`);
    if (canvas) drawSparkline(canvas, closes);
  }
}

function newListDialog(el) {
  openModal((modal, close) => {
    modal.innerHTML = `
      <h3>Neue Watchlist</h3>
      <div class="field"><label>Name</label><input id="nlName" placeholder="z. B. Tech-Aktien" maxlength="40"></div>
      <div style="display:flex; gap:10px; justify-content:flex-end">
        <button class="btn ghost" data-cancel>Abbrechen</button>
        <button class="btn primary" data-ok>Anlegen</button>
      </div>`;
    modal.querySelector('[data-cancel]').onclick = close;
    modal.querySelector('[data-ok]').onclick = () => {
      const name = modal.querySelector('#nlName').value.trim();
      if (!name) return;
      const order = getState().watchlists.items.length;
      const list = { id: crypto.randomUUID(), name, symbols: [], order };
      update('watchlists', (d) => upsertItem(d, list));
      localSet('activeWatchlist', list.id);
      close();
      render(el);
    };
    setTimeout(() => modal.querySelector('#nlName').focus(), 50);
  });
}
