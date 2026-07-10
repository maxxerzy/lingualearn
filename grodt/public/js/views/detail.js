// Detail-Ansicht einer Aktie: Live-Header + Subtabs
// Chart | Kennzahlen | News | Alarme.

import { apiGet } from '../core/api.js';
import { getState, update, subscribe } from '../core/store.js';
import { upsertItem, removeItem } from '../core/merge.js';
import { registerSymbols, unregisterSymbols } from '../core/quotes.js';
import { setStreamSymbols } from '../core/finnhub.js';
import { ChartController } from '../chart/chartController.js';
import { renderFundamentals } from './fundamentals.js';
import { renderNews } from './news.js';
import { addToWatchlist, removeFromWatchlist, isWatched } from './watchlist.js';
import { openTradeModal } from './portfolio.js';
import { openModal, confirmModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';
import { fmtCurrency, fmtNumber, fmtPct, fmtTime, trendClass } from '../core/format.js';
import { ALERT_TYPES } from '../core/alertEval.js';
import { escapeHtml } from './search.js';

const RANGES = [
  { label: '1T', range: '1d', interval: '5m' },
  { label: '5T', range: '5d', interval: '15m' },
  { label: '1M', range: '1mo', interval: '1h' },
  { label: '6M', range: '6mo', interval: '1d' },
  { label: 'YTD', range: 'ytd', interval: '1d' },
  { label: '1J', range: '1y', interval: '1d' },
  { label: '5J', range: '5y', interval: '1wk' },
  { label: 'Max', range: 'max', interval: '1mo' },
];

const INDICATOR_CHIPS = [
  { key: 'vol', label: 'Vol' },
  { key: 'sma20', label: 'SMA 20' },
  { key: 'sma50', label: 'SMA 50' },
  { key: 'sma200', label: 'SMA 200' },
  { key: 'ema20', label: 'EMA 20' },
  { key: 'bb', label: 'Bollinger' },
  { key: 'rsi', label: 'RSI' },
  { key: 'macd', label: 'MACD' },
];

let symbol = null;
let chart = null;
let unsubQuotes = null;
let unsubAlerts = null;
let currentRange = RANGES[5]; // 1J
let logScale = false;
let currency = 'EUR';
let currentTab = 'chart';

export function mount(el, params) {
  symbol = decodeURIComponent(params[0] || '');
  if (!symbol) {
    location.hash = '#/maerkte';
    return;
  }
  currentTab = 'chart';

  el.innerHTML = `
    <div class="detail-header">
      <div>
        <div style="display:flex; align-items:center; gap:8px">
          <h1 style="margin:0; font-size:19px" id="dName">${escapeHtml(symbol)}</h1>
          <button class="icon-btn" id="starBtn" aria-label="Zur Watchlist" style="font-size:20px">☆</button>
        </div>
        <div class="dim" style="font-size:12.5px" id="dMeta"></div>
      </div>
      <div style="margin-left:auto; text-align:right">
        <div class="d-price" id="dPrice">–</div>
        <div id="dChange"></div>
      </div>
    </div>
    <div class="chip-row" style="margin:6px 0 10px">
      <button class="btn small primary" id="buyBtn">Kaufen / Verkaufen</button>
      <a class="btn small ghost" href="#/vergleich/${encodeURIComponent(symbol)}">Vergleichen</a>
    </div>

    <div class="subtabs" id="subtabs">
      <button data-tab="chart" class="active">Chart</button>
      <button data-tab="fundamentals">Kennzahlen</button>
      <button data-tab="news">News</button>
      <button data-tab="alerts">Alarme</button>
    </div>
    <div id="tabContent"></div>
  `;

  registerSymbols(`detail:${symbol}`, [symbol]);
  setStreamSymbols([symbol]);
  unsubQuotes = subscribe('quotes', () => renderHeader(el));
  renderHeader(el);

  el.querySelector('#starBtn').addEventListener('click', () => {
    if (isWatched(symbol)) {
      const list = getState().watchlists.items.find((l) => l.symbols.includes(symbol));
      if (list) removeFromWatchlist(symbol, list.id);
      showToast(`${symbol} von der Watchlist entfernt.`);
    } else {
      addToWatchlist(symbol);
    }
    renderStar(el);
  });
  el.querySelector('#buyBtn').addEventListener('click', () => openTradeModal(symbol));

  el.querySelectorAll('#subtabs button').forEach((btn) => {
    btn.addEventListener('click', () => {
      el.querySelectorAll('#subtabs button').forEach((b) => b.classList.toggle('active', b === btn));
      currentTab = btn.dataset.tab;
      renderTab(el);
    });
  });

  renderStar(el);
  renderTab(el);
}

export function unmount() {
  unregisterSymbols(`detail:${symbol}`);
  setStreamSymbols([]);
  if (unsubQuotes) unsubQuotes();
  if (unsubAlerts) unsubAlerts();
  unsubAlerts = null;
  destroyChart();
  symbol = null;
}

function destroyChart() {
  if (chart) {
    chart.destroy();
    chart = null;
  }
}

function renderStar(el) {
  const btn = el.querySelector('#starBtn');
  if (btn) btn.textContent = isWatched(symbol) ? '★' : '☆';
}

function renderHeader(el) {
  const q = getState().quotes[symbol];
  if (!q) return;
  currency = q.currency || currency;
  const name = el.querySelector('#dName');
  if (q.name && name.textContent === symbol) name.textContent = q.name;
  el.querySelector('#dMeta').textContent =
    `${symbol}${q.exchange ? ` · ${q.exchange}` : ''}${q.time ? ` · ${fmtTime(q.time)} Uhr` : ''}${q.streamed ? ' · ⚡ live' : ''}`;
  el.querySelector('#dPrice').textContent = fmtCurrency(q.price, q.currency);
  el.querySelector('#dChange').innerHTML =
    `<span class="badge ${trendClass(q.changePct)}">${q.change != null ? fmtNumber(q.change) : ''} · ${fmtPct(q.changePct)}</span>`;
}

function renderTab(el) {
  const box = el.querySelector('#tabContent');
  if (currentTab !== 'chart') destroyChart();
  if (unsubAlerts) {
    unsubAlerts();
    unsubAlerts = null;
  }

  switch (currentTab) {
    case 'chart': return renderChartTab(box);
    case 'fundamentals': return renderFundamentals(box, symbol);
    case 'news': return renderNewsTab(box);
    case 'alerts': return renderAlertsTab(box);
  }
}

// ------------------------------------------------------------- Chart-Tab ---

function renderChartTab(box) {
  box.innerHTML = `
    <div class="chart-toolbar">
      <span class="chip-row" id="rangeChips">
        ${RANGES.map((r) => `<button class="chip ${r === currentRange ? 'active' : ''}" data-range="${r.label}">${r.label}</button>`).join('')}
      </span>
      <span style="flex:1"></span>
      <button class="chip ${logScale ? 'active' : ''}" id="logBtn" title="Logarithmische Skala">log</button>
      <button class="chip" id="fsBtn" title="Vollbild">⛶</button>
    </div>
    <div class="chart-wrap" id="chartWrap">
      <div class="ohlc-readout" id="ohlc"></div>
      <div class="chart-container" id="chartContainer"></div>
    </div>
    <div class="chip-row" style="margin-top:10px" id="indicatorChips">
      ${INDICATOR_CHIPS.map((c) => `<button class="chip" data-ind="${c.key}">${c.label}</button>`).join('')}
    </div>
    <div class="dim" id="chartStatus" style="font-size:12px; margin-top:8px"></div>
  `;

  const container = box.querySelector('#chartContainer');
  const ohlc = box.querySelector('#ohlc');
  destroyChart();
  chart = new ChartController(container, {
    onCrosshair: (bar) => {
      if (!bar) {
        ohlc.innerHTML = '';
        return;
      }
      const cls = bar.close >= bar.open ? 'up' : 'down';
      ohlc.innerHTML =
        `<span>O <b class="${cls}">${fmtNumber(bar.open)}</b></span>` +
        `<span>H <b class="${cls}">${fmtNumber(bar.high)}</b></span>` +
        `<span>L <b class="${cls}">${fmtNumber(bar.low)}</b></span>` +
        `<span>C <b class="${cls}">${fmtNumber(bar.close)}</b></span>`;
    },
  });
  chart.setLogScale(logScale);
  syncIndicatorChips(box);
  loadCandles(box);

  box.querySelectorAll('[data-range]').forEach((chipEl) => {
    chipEl.addEventListener('click', () => {
      currentRange = RANGES.find((r) => r.label === chipEl.dataset.range);
      box.querySelectorAll('[data-range]').forEach((c) => c.classList.toggle('active', c === chipEl));
      loadCandles(box);
    });
  });
  box.querySelectorAll('[data-ind]').forEach((chipEl) => {
    chipEl.addEventListener('click', () => {
      chart.toggleIndicator(chipEl.dataset.ind);
      syncIndicatorChips(box);
    });
  });
  box.querySelector('#logBtn').addEventListener('click', (e) => {
    logScale = !logScale;
    e.target.classList.toggle('active', logScale);
    chart.setLogScale(logScale);
  });
  box.querySelector('#fsBtn').addEventListener('click', async () => {
    const wrap = box.querySelector('#chartWrap');
    const on = wrap.classList.toggle('fullscreen');
    if (on && screen.orientation?.lock) {
      try { await screen.orientation.lock('landscape'); } catch { /* nicht überall erlaubt */ }
    } else if (!on && screen.orientation?.unlock) {
      screen.orientation.unlock();
    }
  });

  // Alarm-Linien live halten.
  applyAlertLines();
  unsubAlerts = subscribe('alerts', applyAlertLines);
}

function syncIndicatorChips(box) {
  box.querySelectorAll('[data-ind]').forEach((chipEl) => {
    chipEl.classList.toggle('active', chart.isActive(chipEl.dataset.ind));
  });
}

async function loadCandles(box) {
  const status = box.querySelector('#chartStatus');
  status.textContent = 'Lade Kursdaten …';
  try {
    const data = await apiGet('/api/chart', {
      symbol, interval: currentRange.interval, range: currentRange.range,
    });
    currency = data.currency || currency;
    if (!chart) return;
    chart.setCandles(data.candles || [], currentRange.interval);
    status.textContent = data.candles?.length
      ? `${data.candles.length} Kerzen · ${escapeHtml(data.exchange || '')}${data.fixture ? ' · Beispieldaten' : ''}`
      : 'Keine Kursdaten verfügbar.';
  } catch (err) {
    status.textContent = `Chart konnte nicht geladen werden: ${err.message}`;
  }
}

function applyAlertLines() {
  if (!chart) return;
  const lines = (getState().alerts.items || [])
    .filter((a) => a.symbol === symbol && a.active !== false && (a.type === 'price_above' || a.type === 'price_below' || a.type === 'stop_loss'))
    .map((a) => ({
      price: Number(a.value),
      color: a.type === 'stop_loss' ? '#e5484d' : a.type === 'price_above' ? '#30a46c' : '#f5a524',
      title: a.type === 'stop_loss' ? 'Stop-Loss' : 'Alarm',
    }));
  chart.setPriceLines(lines);
}

// -------------------------------------------------------------- News-Tab ---

async function renderNewsTab(box) {
  box.innerHTML = `<div class="card" id="symNews"><div class="skeleton" style="height:180px"></div></div>`;
  try {
    const data = await apiGet('/api/news', { symbol });
    renderNews(box.querySelector('#symNews'), data.items || []);
  } catch (err) {
    box.querySelector('#symNews').innerHTML = `<div class="empty-state">News nicht verfügbar (${escapeHtml(err.message)})</div>`;
  }
}

// ------------------------------------------------------------ Alarme-Tab ---

function renderAlertsTab(box) {
  const renderList = () => {
    const alerts = (getState().alerts.items || []).filter((a) => a.symbol === symbol);
    box.innerHTML = `
      <button class="btn primary" id="newAlert" style="margin-bottom:12px">＋ Neuer Alarm für ${escapeHtml(symbol)}</button>
      <div class="card quote-list">
        ${alerts.length ? alerts.map(alertRow).join('')
          : `<div class="empty-state"><div class="e-icon">🔔</div>Noch keine Alarme.<br>Lege Kursalarme oder einen Stop-Loss an — sie werden auch bei geschlossener App geprüft (Push).</div>`}
      </div>`;
    box.querySelector('#newAlert').addEventListener('click', () => openAlertModal(symbol, renderList));
    box.querySelectorAll('[data-delalert]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        if (await confirmModal('Alarm löschen?', 'Der Alarm wird von allen Geräten entfernt.')) {
          update('alerts', (d) => removeItem(d, btn.dataset.delalert));
          renderList();
        }
      });
    });
    box.querySelectorAll('[data-togglealert]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const alert = getState().alerts.items.find((a) => a.id === btn.dataset.togglealert);
        if (alert) update('alerts', (d) => upsertItem(d, { ...alert, active: alert.active === false }));
        renderList();
      });
    });
  };
  renderList();
}

function alertRow(a) {
  const inactive = a.active === false;
  return `
    <div class="quote-row" style="cursor:default">
      <div class="q-main">
        <div class="q-sym" style="${inactive ? 'opacity:0.5' : ''}">${ALERT_TYPES[a.type] || a.type} ${a.type === 'pct_move' ? `${fmtNumber(a.value)} %` : fmtCurrency(Number(a.value), currency)}</div>
        <div class="q-name">${a.oneShot === false ? 'dauerhaft' : 'einmalig'}${inactive ? ` · ${a.triggeredAt ? 'ausgelöst' : 'pausiert'}` : ''}${a.note ? ` · ${escapeHtml(a.note)}` : ''}</div>
      </div>
      <button class="btn small ghost" data-togglealert="${a.id}">${inactive ? 'Aktivieren' : 'Pausieren'}</button>
      <button class="icon-btn" data-delalert="${a.id}" style="color:var(--down)">✕</button>
    </div>`;
}

export function openAlertModal(sym, onDone) {
  const q = getState().quotes[sym];
  openModal((modal, close) => {
    modal.innerHTML = `
      <h3>Alarm für ${escapeHtml(sym)}</h3>
      ${q?.price != null ? `<p class="dim" style="margin-top:-6px">Aktueller Kurs: ${fmtCurrency(q.price, q.currency)}</p>` : ''}
      <div class="field">
        <label>Typ</label>
        <select id="alType">
          <option value="price_above">Kurs über …</option>
          <option value="price_below">Kurs unter …</option>
          <option value="stop_loss">Stop-Loss (Kurs unter …)</option>
          <option value="pct_move">Tagesbewegung über ± … %</option>
        </select>
      </div>
      <div class="field">
        <label id="alValueLabel">Schwelle</label>
        <input id="alValue" type="number" step="any" inputmode="decimal" placeholder="${q?.price != null ? String(Math.round(q.price * 100) / 100) : 'z. B. 190'}">
      </div>
      <div class="field">
        <label>Notiz (optional)</label>
        <input id="alNote" maxlength="60" placeholder="z. B. Nachkaufen">
      </div>
      <div class="field" style="display:flex; align-items:center; gap:8px">
        <input id="alRepeat" type="checkbox" style="width:auto">
        <label for="alRepeat" style="margin:0">Dauerhaft (löst mehrfach aus, max. alle 6 Std.)</label>
      </div>
      <div style="display:flex; gap:10px; justify-content:flex-end">
        <button class="btn ghost" data-cancel>Abbrechen</button>
        <button class="btn primary" data-ok>Alarm anlegen</button>
      </div>`;
    modal.querySelector('[data-cancel]').onclick = close;
    modal.querySelector('[data-ok]').onclick = () => {
      const value = parseFloat(modal.querySelector('#alValue').value.replace(',', '.'));
      if (!Number.isFinite(value) || value <= 0) {
        showToast('Bitte eine gültige Schwelle eingeben.', 'error');
        return;
      }
      const alert = {
        id: crypto.randomUUID(),
        symbol: sym,
        type: modal.querySelector('#alType').value,
        value,
        note: modal.querySelector('#alNote').value.trim(),
        active: true,
        oneShot: !modal.querySelector('#alRepeat').checked,
        createdAt: Date.now(),
      };
      update('alerts', (d) => upsertItem(d, alert));
      showToast('Alarm angelegt. Tipp: Push-Mitteilungen in „Mehr" aktivieren.', 'success');
      close();
      if (onDone) onDone();
    };
  });
}
