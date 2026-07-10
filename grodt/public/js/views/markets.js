// Marktübersicht: Indizes, Top-Gewinner/-Verlierer (DE/US), Sektor-Heatmap.

import { apiGet } from '../core/api.js';
import { subscribe, getState } from '../core/store.js';
import { registerSymbols, unregisterSymbols } from '../core/quotes.js';
import { INDICES } from '../data/indices.js';
import { constituents } from '../data/constituents.js';
import { fmtNumber, fmtPct, trendClass } from '../core/format.js';
import { escapeHtml } from './search.js';

let unsub = null;
let region = 'DE';

export function mount(el) {
  el.innerHTML = `
    <div class="section-title">Indizes</div>
    <div class="card quote-list" id="indexList">${INDICES.map((ix) => rowSkeleton(ix.symbol, ix.name)).join('')}</div>

    <div class="section-title" style="display:flex; justify-content:space-between; align-items:center">
      <span>Gewinner & Verlierer</span>
      <span class="chip-row">
        <button class="chip ${region === 'DE' ? 'active' : ''}" data-region="DE">🇩🇪 DE</button>
        <button class="chip ${region === 'US' ? 'active' : ''}" data-region="US">🇺🇸 US</button>
      </span>
    </div>
    <div class="card" id="moversBox"><div class="skeleton" style="height:120px"></div></div>

    <div class="section-title">Sektor-Heatmap <span class="dim" id="heatmapRegionLabel">(${region === 'DE' ? 'DAX' : 'S&P 100'})</span></div>
    <div class="card"><div class="heatmap" id="heatmap"><div class="skeleton" style="height:80px; grid-column: 1/-1"></div></div></div>
  `;

  registerSymbols('markets', INDICES.map((ix) => ix.symbol));
  unsub = subscribe('quotes', () => renderIndices(el));
  renderIndices(el);
  loadMovers(el);
  loadHeatmap(el);

  el.querySelectorAll('[data-region]').forEach((btn) => {
    btn.addEventListener('click', () => {
      region = btn.dataset.region;
      el.querySelectorAll('[data-region]').forEach((b) => b.classList.toggle('active', b === btn));
      el.querySelector('#heatmapRegionLabel').textContent = region === 'DE' ? '(DAX)' : '(S&P 100)';
      loadMovers(el);
      loadHeatmap(el);
    });
  });
}

export function unmount() {
  unregisterSymbols('markets');
  if (unsub) unsub();
}

function rowSkeleton(symbol, name) {
  return `
    <div class="quote-row" data-open="${escapeHtml(symbol)}">
      <div class="q-main">
        <div class="q-sym">${escapeHtml(name)}</div>
        <div class="q-name">${escapeHtml(symbol)}</div>
      </div>
      <div class="q-price" data-price="${escapeHtml(symbol)}"><span class="dim">–</span></div>
    </div>`;
}

function renderIndices(el) {
  const quotes = getState().quotes;
  for (const ix of INDICES) {
    const cell = el.querySelector(`[data-price="${CSS.escape(ix.symbol)}"]`);
    const q = quotes[ix.symbol];
    if (!cell || !q) continue;
    cell.innerHTML = `
      <div class="q-last">${fmtNumber(q.price)}</div>
      <span class="badge ${trendClass(q.changePct)}">${fmtPct(q.changePct)}</span>`;
  }
  el.querySelectorAll('[data-open]').forEach((row) => {
    row.onclick = () => { location.hash = `#/s/${encodeURIComponent(row.dataset.open)}`; };
  });
}

async function loadMovers(el) {
  const box = el.querySelector('#moversBox');
  box.innerHTML = `<div class="skeleton" style="height:120px"></div>`;
  try {
    const data = await apiGet('/api/movers', { region });
    box.innerHTML = `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px">
        <div>
          <h3 class="up" style="margin:0 0 6px; font-size:13px">▲ Gewinner</h3>
          <div class="quote-list">${(data.gainers || []).slice(0, 5).map(moverRow).join('') || emptyNote()}</div>
        </div>
        <div>
          <h3 class="down" style="margin:0 0 6px; font-size:13px">▼ Verlierer</h3>
          <div class="quote-list">${(data.losers || []).slice(0, 5).map(moverRow).join('') || emptyNote()}</div>
        </div>
      </div>`;
    box.querySelectorAll('[data-open]').forEach((row) => {
      row.onclick = () => { location.hash = `#/s/${encodeURIComponent(row.dataset.open)}`; };
    });
  } catch (err) {
    box.innerHTML = `<div class="empty-state">Movers derzeit nicht verfügbar (${escapeHtml(err.message)})</div>`;
  }
}

function moverRow(q) {
  return `
    <div class="quote-row" data-open="${escapeHtml(q.symbol)}" style="padding:7px 0">
      <div class="q-main">
        <div class="q-sym" style="font-size:13px">${escapeHtml(q.symbol)}</div>
        <div class="q-name">${escapeHtml(q.name || '')}</div>
      </div>
      <span class="badge ${trendClass(q.changePct)}">${fmtPct(q.changePct)}</span>
    </div>`;
}

function emptyNote() {
  return `<div class="dim" style="font-size:13px">Keine Daten</div>`;
}

async function loadHeatmap(el) {
  const grid = el.querySelector('#heatmap');
  grid.innerHTML = `<div class="skeleton" style="height:80px; grid-column:1/-1"></div>`;
  const members = constituents(region);
  try {
    const symbols = members.map((m) => m.symbol).slice(0, 50).sort().join(',');
    const data = await apiGet('/api/quotes', { symbols }, { ttl: 60000 });
    const quotes = data.quotes || {};

    // Nach Sektor gruppieren, mittlere Bewegung berechnen.
    const sectors = new Map();
    for (const m of members) {
      const q = quotes[m.symbol];
      if (!q || q.changePct == null) continue;
      if (!sectors.has(m.sector)) sectors.set(m.sector, []);
      sectors.get(m.sector).push({ ...m, changePct: q.changePct });
    }

    grid.innerHTML = [...sectors.entries()]
      .map(([sector, list]) => {
        const avg = list.reduce((s, x) => s + x.changePct, 0) / list.length;
        return { sector, avg, list };
      })
      .sort((a, b) => b.avg - a.avg)
      .map(({ sector, avg }) => `
        <div class="heat-cell" style="background:${heatColor(avg)}" title="${escapeHtml(sector)}">
          <div class="h-sym">${escapeHtml(sector)}</div>
          <div class="h-pct">${fmtPct(avg)}</div>
        </div>`)
      .join('') || `<div class="dim" style="grid-column:1/-1">Keine Daten</div>`;
  } catch (err) {
    grid.innerHTML = `<div class="dim" style="grid-column:1/-1">Heatmap nicht verfügbar (${escapeHtml(err.message)})</div>`;
  }
}

function heatColor(pct) {
  const clamped = Math.max(-3, Math.min(3, pct));
  const intensity = Math.abs(clamped) / 3;
  if (clamped >= 0) return `rgba(48, 164, 108, ${0.25 + intensity * 0.6})`;
  return `rgba(229, 72, 77, ${0.25 + intensity * 0.6})`;
}
