// Symbolsuche: debounced /api/search, Gruppierung nach Name mit
// Börsen-Auswahl (XETRA/Frankfurt/US …), zuletzt gesucht.

import { apiGet } from '../core/api.js';
import { localGet, localSet, getSetting } from '../core/store.js';

let debounceTimer = null;

export function mount(el) {
  el.innerHTML = `
    <div class="card">
      <div class="field" style="margin-bottom:0">
        <input id="searchInput" type="search" placeholder="Aktie, ETF oder Index suchen … (z. B. SAP, Apple)"
               autocomplete="off" autocapitalize="off" spellcheck="false">
      </div>
    </div>
    <div id="searchResults"></div>
  `;
  const input = el.querySelector('#searchInput');
  const results = el.querySelector('#searchResults');

  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    const q = input.value.trim();
    if (q.length < 2) {
      renderRecent(results);
      return;
    }
    debounceTimer = setTimeout(() => runSearch(q, results), 280);
  });

  renderRecent(results);
  setTimeout(() => input.focus(), 60);
}

export function unmount() {
  clearTimeout(debounceTimer);
}

async function runSearch(q, container) {
  container.innerHTML = `<div class="card"><div class="skeleton" style="height:52px"></div></div>`;
  let data;
  try {
    data = await apiGet('/api/search', { q });
  } catch (err) {
    container.innerHTML = `<div class="empty-state">Suche fehlgeschlagen: ${err.message}</div>`;
    return;
  }
  const groups = groupByName(data.results || []);
  if (!groups.length) {
    container.innerHTML = `<div class="empty-state"><div class="e-icon">🔍</div>Keine Treffer für „${escapeHtml(q)}"</div>`;
    return;
  }
  container.innerHTML = `<div class="card quote-list">${groups.map(renderGroup).join('')}</div>`;
  container.querySelectorAll('[data-symbol]').forEach((elBtn) => {
    elBtn.addEventListener('click', () => {
      rememberRecent(elBtn.dataset.symbol, elBtn.dataset.name);
      location.hash = `#/s/${encodeURIComponent(elBtn.dataset.symbol)}`;
    });
  });
}

/** Gleiche Titel auf mehreren Börsen zusammenfassen, XETRA bevorzugt. */
function groupByName(results) {
  const byName = new Map();
  for (const r of results) {
    const key = r.name.toLowerCase();
    if (!byName.has(key)) byName.set(key, []);
    byName.get(key).push(r);
  }
  const preferXetra = getSetting('preferXetra', true);
  const groups = [];
  for (const listings of byName.values()) {
    listings.sort((a, b) => rank(a) - rank(b));
    if (!preferXetra) listings.reverse();
    groups.push(listings);
  }
  return groups;
}

function rank(r) {
  if (r.symbol.endsWith('.DE')) return 0;
  if (r.symbol.endsWith('.F')) return 1;
  if (!r.symbol.includes('.')) return 2;
  return 3;
}

function renderGroup(listings) {
  const main = listings[0];
  const alternatives = listings.slice(1, 4);
  return `
    <div class="quote-row" data-symbol="${escapeHtml(main.symbol)}" data-name="${escapeHtml(main.name)}">
      <div class="q-main">
        <div class="q-sym">${escapeHtml(main.symbol)} <span class="dim" style="font-weight:400">· ${escapeHtml(main.exchDisp)}</span></div>
        <div class="q-name">${escapeHtml(main.name)}</div>
        ${alternatives.length ? `<div class="chip-row" style="margin-top:6px">${alternatives.map(
          (a) => `<button class="chip" data-symbol="${escapeHtml(a.symbol)}" data-name="${escapeHtml(a.name)}"
                    onclick="event.stopPropagation()">${escapeHtml(a.exchDisp || a.symbol)}</button>`
        ).join('')}</div>` : ''}
      </div>
      <span class="dim">›</span>
    </div>`;
}

function renderRecent(container) {
  const recent = localGet('recentSearches', []);
  if (!recent.length) {
    container.innerHTML = `<div class="empty-state"><div class="e-icon">🔍</div>Suche nach Namen, Symbol oder WKN-ähnlichem Ticker.<br>Deutsche Börsen: Suffix .DE (XETRA) / .F (Frankfurt).</div>`;
    return;
  }
  container.innerHTML = `
    <div class="section-title">Zuletzt gesucht</div>
    <div class="card quote-list">
      ${recent.map((r) => `
        <div class="quote-row" data-symbol="${escapeHtml(r.symbol)}" data-name="${escapeHtml(r.name)}">
          <div class="q-main">
            <div class="q-sym">${escapeHtml(r.symbol)}</div>
            <div class="q-name">${escapeHtml(r.name)}</div>
          </div>
          <span class="dim">›</span>
        </div>`).join('')}
    </div>`;
  container.querySelectorAll('[data-symbol]').forEach((row) => {
    row.addEventListener('click', () => {
      location.hash = `#/s/${encodeURIComponent(row.dataset.symbol)}`;
    });
  });
}

function rememberRecent(symbol, name) {
  const recent = localGet('recentSearches', []).filter((r) => r.symbol !== symbol);
  recent.unshift({ symbol, name });
  localSet('recentSearches', recent.slice(0, 8));
}

export function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}
