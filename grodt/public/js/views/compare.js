// Vergleichsmodus: mehrere Titel normiert auf %-Performance in einem Chart.

import { apiGet } from '../core/api.js';
import { getState, localGet, localSet } from '../core/store.js';
import { normalizePct } from '../core/indicators.js';
import { showToast } from '../components/toast.js';
import { escapeHtml } from './search.js';

const COLORS = ['#4c8dff', '#f5a524', '#30a46c', '#e5484d', '#b085f5', '#2dd4bf'];
const RANGES = [
  { label: '1M', range: '1mo', interval: '1d' },
  { label: '6M', range: '6mo', interval: '1d' },
  { label: 'YTD', range: 'ytd', interval: '1d' },
  { label: '1J', range: '1y', interval: '1d' },
  { label: '5J', range: '5y', interval: '1wk' },
];

let chart = null;
let symbols = [];
let range = RANGES[3];

export function mount(el, params) {
  symbols = localGet('compareSymbols', []);
  const fromRoute = params[0] ? decodeURIComponent(params[0]) : null;
  if (fromRoute && !symbols.includes(fromRoute)) symbols.unshift(fromRoute);
  symbols = symbols.slice(0, 6);

  el.innerHTML = `
    <div class="section-title">Aktien vergleichen <span class="dim">(Performance in %)</span></div>
    <div class="card">
      <div class="chip-row" id="cmpSymbols"></div>
      <div class="form-row" style="margin-top:10px">
        <div class="field" style="margin-bottom:0">
          <input id="cmpAdd" placeholder="Symbol hinzufügen (z. B. AAPL, SAP.DE)" autocapitalize="characters">
        </div>
        <button class="btn" id="cmpAddBtn" style="align-self:stretch">＋</button>
      </div>
    </div>
    <div class="chip-row" style="margin-bottom:10px" id="cmpRanges">
      ${RANGES.map((r) => `<button class="chip ${r === range ? 'active' : ''}" data-range="${r.label}">${r.label}</button>`).join('')}
    </div>
    <div class="card"><div id="cmpChart" style="height:380px"></div><div id="cmpLegend" class="chip-row" style="margin-top:8px"></div></div>
  `;

  el.querySelector('#cmpAddBtn').addEventListener('click', () => addSymbol(el));
  el.querySelector('#cmpAdd').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addSymbol(el);
  });
  el.querySelectorAll('[data-range]').forEach((chip) => {
    chip.addEventListener('click', () => {
      range = RANGES.find((r) => r.label === chip.dataset.range);
      el.querySelectorAll('[data-range]').forEach((c) => c.classList.toggle('active', c === chip));
      draw(el);
    });
  });

  renderChips(el);
  draw(el);
}

export function unmount() {
  destroyChart();
}

function destroyChart() {
  if (chart) {
    chart.remove();
    chart = null;
  }
}

function addSymbol(el) {
  const input = el.querySelector('#cmpAdd');
  const sym = input.value.trim().toUpperCase();
  if (!sym) return;
  if (symbols.includes(sym)) {
    showToast(`${sym} ist schon im Vergleich.`);
    return;
  }
  if (symbols.length >= 6) {
    showToast('Maximal 6 Titel gleichzeitig.', 'error');
    return;
  }
  symbols.push(sym);
  input.value = '';
  persist();
  renderChips(el);
  draw(el);
}

function persist() {
  localSet('compareSymbols', symbols);
}

function renderChips(el) {
  const box = el.querySelector('#cmpSymbols');
  const watchlistSyms = [...new Set(getState().watchlists.items.flatMap((l) => l.symbols))]
    .filter((s) => !symbols.includes(s)).slice(0, 6);
  box.innerHTML = `
    ${symbols.map((s, i) => `
      <button class="chip active" data-del="${escapeHtml(s)}" style="border-color:${COLORS[i % COLORS.length]}; color:${COLORS[i % COLORS.length]}">
        ${escapeHtml(s)} ✕
      </button>`).join('')}
    ${watchlistSyms.map((s) => `<button class="chip" data-quickadd="${escapeHtml(s)}">＋ ${escapeHtml(s)}</button>`).join('')}
  `;
  box.querySelectorAll('[data-del]').forEach((chip) => {
    chip.addEventListener('click', () => {
      symbols = symbols.filter((s) => s !== chip.dataset.del);
      persist();
      renderChips(el);
      draw(el);
    });
  });
  box.querySelectorAll('[data-quickadd]').forEach((chip) => {
    chip.addEventListener('click', () => {
      symbols.push(chip.dataset.quickadd);
      persist();
      renderChips(el);
      draw(el);
    });
  });
}

async function draw(el) {
  const box = el.querySelector('#cmpChart');
  const legend = el.querySelector('#cmpLegend');
  destroyChart();
  if (!symbols.length) {
    box.innerHTML = `<div class="empty-state"><div class="e-icon">📊</div>Füge Titel hinzu, um ihre Performance zu vergleichen.</div>`;
    legend.innerHTML = '';
    return;
  }
  box.innerHTML = '';

  const { createChart, LineSeries } = await import('../../vendor/lightweight-charts.standalone.production.mjs');
  chart = createChart(box, {
    autoSize: true,
    layout: { background: { color: 'transparent' }, textColor: '#8b98a5', attributionLogo: false },
    grid: { vertLines: { visible: false }, horzLines: { color: '#2a344155' } },
    rightPriceScale: { borderVisible: false },
    timeScale: { borderVisible: false },
    localization: { locale: 'de-DE', priceFormatter: (v) => `${v.toFixed(1)} %` },
  });

  const results = await Promise.allSettled(
    symbols.map((s) => apiGet('/api/chart', { symbol: s, interval: range.interval, range: range.range }))
  );

  legend.innerHTML = '';
  results.forEach((res, i) => {
    const color = COLORS[i % COLORS.length];
    if (res.status !== 'fulfilled' || !res.value.candles?.length) {
      legend.innerHTML += `<span class="chip" style="opacity:0.5">${escapeHtml(symbols[i])}: keine Daten</span>`;
      return;
    }
    const data = normalizePct(res.value.candles);
    const series = chart.addSeries(LineSeries, { color, lineWidth: 2, priceLineVisible: false });
    series.setData(data);
    const last = data[data.length - 1]?.value ?? 0;
    legend.innerHTML += `<span class="chip" style="border-color:${color}; color:${color}">${escapeHtml(symbols[i])}: ${last >= 0 ? '+' : ''}${last.toFixed(1)} %</span>`;
  });
  chart.timeScale().fitContent();
}
