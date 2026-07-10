// Depot (Paper-Trading): Cash-Konto, Käufe/Verkäufe als append-only
// Transaktionen, Positionen mit Einstand und G/V, Depotverlauf.

import { getState, update, subscribe, localGet, localSet } from '../core/store.js';
import { upsertItem } from '../core/merge.js';
import { registerSymbols, unregisterSymbols } from '../core/quotes.js';
import { openModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';
import { fmtCurrency, fmtNumber, fmtPct, trendClass, fmtDate } from '../core/format.js';
import { escapeHtml } from './search.js';

let unsubQuotes = null;
let unsubPortfolio = null;
let chartInstance = null;

// --- Positionsberechnung aus Transaktionen -------------------------------
// tx: {id, kind: 'buy'|'sell'|'cash', symbol?, qty?, price?, fee?, amount?, time}

export function computePortfolio(items) {
  const positions = new Map();
  let cash = 0;
  const sorted = [...(items || [])].sort((a, b) => (a.time || 0) - (b.time || 0));
  for (const tx of sorted) {
    if (tx.kind === 'cash') {
      cash += tx.amount || 0;
      continue;
    }
    const qty = tx.qty || 0;
    const price = tx.price || 0;
    const fee = tx.fee || 0;
    const pos = positions.get(tx.symbol) || { symbol: tx.symbol, qty: 0, avgCost: 0, realized: 0 };
    if (tx.kind === 'buy') {
      const newQty = pos.qty + qty;
      pos.avgCost = newQty > 0 ? (pos.avgCost * pos.qty + price * qty + fee) / newQty : 0;
      pos.qty = newQty;
      cash -= price * qty + fee;
    } else if (tx.kind === 'sell') {
      const sellQty = Math.min(qty, pos.qty);
      pos.realized += (price - pos.avgCost) * sellQty - fee;
      pos.qty -= sellQty;
      cash += price * sellQty - fee;
      if (pos.qty <= 1e-9) {
        pos.qty = 0;
        pos.avgCost = 0;
      }
    }
    positions.set(tx.symbol, pos);
  }
  return {
    cash,
    positions: [...positions.values()].filter((p) => p.qty > 0),
    realized: [...positions.values()].reduce((s, p) => s + p.realized, 0),
  };
}

// --- View -----------------------------------------------------------------

export function mount(el) {
  render(el);
  unsubPortfolio = subscribe('portfolio', () => render(el));
  unsubQuotes = subscribe('quotes', () => updateValues(el));
}

export function unmount() {
  unregisterSymbols('portfolio');
  if (unsubQuotes) unsubQuotes();
  if (unsubPortfolio) unsubPortfolio();
  destroyChart();
}

function destroyChart() {
  if (chartInstance) {
    chartInstance.remove();
    chartInstance = null;
  }
}

function render(el) {
  const { positions } = computePortfolio(getState().portfolio.items);
  registerSymbols('portfolio', positions.map((p) => p.symbol));

  el.innerHTML = `
    <div class="card">
      <div style="display:flex; justify-content:space-between; align-items:baseline; flex-wrap:wrap; gap:8px">
        <div>
          <div class="dim" style="font-size:12px">Depotwert gesamt</div>
          <div style="font-size:26px; font-weight:800" id="pfTotal">–</div>
          <div id="pfPnl" style="font-size:13px"></div>
        </div>
        <div style="text-align:right">
          <div class="dim" style="font-size:12px">Cash</div>
          <div style="font-size:16px; font-weight:700" id="pfCash">–</div>
        </div>
      </div>
      <div class="chip-row" style="margin-top:12px">
        <button class="btn small primary" id="pfTrade">＋ Kauf / Verkauf</button>
        <button class="btn small" id="pfCashBtn">Ein-/Auszahlung</button>
      </div>
    </div>

    <div class="section-title">Depotverlauf</div>
    <div class="card"><div id="pfChart" style="height:180px"></div></div>

    <div class="section-title">Positionen</div>
    <div class="card table-scroll" id="pfPositions"></div>

    <div class="section-title">Transaktionen</div>
    <div class="card quote-list" id="pfTx"></div>
  `;

  el.querySelector('#pfTrade').addEventListener('click', () => openTradeModal());
  el.querySelector('#pfCashBtn').addEventListener('click', openCashModal);

  renderPositions(el);
  renderTransactions(el);
  updateValues(el);
  renderHistory(el);
}

function renderPositions(el) {
  const { positions } = computePortfolio(getState().portfolio.items);
  const box = el.querySelector('#pfPositions');
  if (!positions.length) {
    box.innerHTML = `<div class="empty-state"><div class="e-icon">💼</div>Keine Positionen.<br>Starte mit einer Einzahlung und einem Kauf — alles virtuell (Paper-Trading).</div>`;
    return;
  }
  box.innerHTML = `
    <table class="table">
      <thead><tr><th>Titel</th><th>Stück</th><th>Einstand</th><th>Kurs</th><th>Wert</th><th>G/V</th></tr></thead>
      <tbody>
        ${positions.map((p) => `
          <tr data-open="${escapeHtml(p.symbol)}" style="cursor:pointer">
            <td><strong>${escapeHtml(p.symbol)}</strong></td>
            <td>${fmtNumber(p.qty, p.qty % 1 ? 4 : 0)}</td>
            <td>${fmtNumber(p.avgCost)}</td>
            <td data-pos-price="${escapeHtml(p.symbol)}">–</td>
            <td data-pos-value="${escapeHtml(p.symbol)}">–</td>
            <td data-pos-pnl="${escapeHtml(p.symbol)}">–</td>
          </tr>`).join('')}
      </tbody>
    </table>`;
  box.querySelectorAll('[data-open]').forEach((row) => {
    row.addEventListener('click', () => { location.hash = `#/s/${encodeURIComponent(row.dataset.open)}`; });
  });
}

function renderTransactions(el) {
  const items = [...(getState().portfolio.items || [])].sort((a, b) => (b.time || 0) - (a.time || 0)).slice(0, 30);
  const box = el.querySelector('#pfTx');
  if (!items.length) {
    box.innerHTML = `<div class="dim" style="font-size:13px; padding:6px">Noch keine Transaktionen.</div>`;
    return;
  }
  box.innerHTML = items.map((tx) => {
    if (tx.kind === 'cash') {
      const isIn = (tx.amount || 0) >= 0;
      return `
        <div class="quote-row" style="cursor:default">
          <div class="q-main">
            <div class="q-sym">${isIn ? 'Einzahlung' : 'Auszahlung'}</div>
            <div class="q-name">${fmtDate(tx.time)}</div>
          </div>
          <span class="badge ${isIn ? 'up' : 'down'}">${fmtCurrency(tx.amount, 'EUR')}</span>
        </div>`;
    }
    return `
      <div class="quote-row" style="cursor:default">
        <div class="q-main">
          <div class="q-sym">${tx.kind === 'buy' ? 'Kauf' : 'Verkauf'} ${escapeHtml(tx.symbol)}</div>
          <div class="q-name">${fmtNumber(tx.qty, tx.qty % 1 ? 4 : 0)} × ${fmtNumber(tx.price)}${tx.fee ? ` + ${fmtNumber(tx.fee)} Gebühr` : ''} · ${fmtDate(tx.time)}</div>
        </div>
        <span class="badge ${tx.kind === 'buy' ? 'flat' : 'up'}">${fmtCurrency((tx.kind === 'buy' ? -1 : 1) * (tx.qty * tx.price), 'EUR')}</span>
      </div>`;
  }).join('');
}

function updateValues(el) {
  const quotes = getState().quotes;
  const { cash, positions, realized } = computePortfolio(getState().portfolio.items);

  let holdings = 0;
  let cost = 0;
  let complete = true;
  for (const p of positions) {
    const q = quotes[p.symbol];
    const priceCell = el.querySelector(`[data-pos-price="${CSS.escape(p.symbol)}"]`);
    const valueCell = el.querySelector(`[data-pos-value="${CSS.escape(p.symbol)}"]`);
    const pnlCell = el.querySelector(`[data-pos-pnl="${CSS.escape(p.symbol)}"]`);
    if (!q || q.price == null) {
      complete = false;
      continue;
    }
    const value = p.qty * q.price;
    const pnl = value - p.qty * p.avgCost;
    const pnlPct = p.avgCost ? (pnl / (p.qty * p.avgCost)) * 100 : 0;
    holdings += value;
    cost += p.qty * p.avgCost;
    if (priceCell) priceCell.textContent = fmtNumber(q.price);
    if (valueCell) valueCell.textContent = fmtNumber(value);
    if (pnlCell) pnlCell.innerHTML = `<span class="${trendClass(pnl)}">${fmtNumber(pnl)} (${fmtPct(pnlPct)})</span>`;
  }

  const total = cash + holdings;
  el.querySelector('#pfTotal').textContent = fmtCurrency(total, 'EUR');
  el.querySelector('#pfCash').textContent = fmtCurrency(cash, 'EUR');
  const unrealized = holdings - cost;
  el.querySelector('#pfPnl').innerHTML =
    `<span class="${trendClass(unrealized)}">Offen: ${fmtCurrency(unrealized, 'EUR')}</span>` +
    ` · <span class="${trendClass(realized)}">Realisiert: ${fmtCurrency(realized, 'EUR')}</span>`;

  // Tages-Snapshot für den Verlaufschart (ein Wert je Kalendertag).
  if (complete && positions.length) {
    const today = new Date().toISOString().slice(0, 10);
    const snapshots = localGet('pfSnapshots', {});
    if (snapshots[today] !== total) {
      snapshots[today] = total;
      localSet('pfSnapshots', snapshots);
    }
  }
}

async function renderHistory(el) {
  const box = el.querySelector('#pfChart');
  const snapshots = localGet('pfSnapshots', {});
  const entries = Object.entries(snapshots).sort(([a], [b]) => a.localeCompare(b));
  if (entries.length < 2) {
    box.innerHTML = `<div class="dim" style="font-size:13px; padding:16px">Der Verlauf entsteht mit der Zeit — je App-Besuch ein Tageswert.</div>`;
    return;
  }
  const { createChart, AreaSeries } = await import('../../vendor/lightweight-charts.standalone.production.mjs');
  destroyChart();
  chartInstance = createChart(box, {
    autoSize: true,
    layout: { background: { color: 'transparent' }, textColor: '#8b98a5', attributionLogo: false },
    grid: { vertLines: { visible: false }, horzLines: { color: '#2a344155' } },
    timeScale: { borderVisible: false },
    rightPriceScale: { borderVisible: false },
  });
  const series = chartInstance.addSeries(AreaSeries, {
    lineColor: '#4c8dff', topColor: 'rgba(76,141,255,0.3)', bottomColor: 'rgba(76,141,255,0.02)', lineWidth: 2,
  });
  series.setData(entries.map(([date, value]) => ({ time: date, value })));
  chartInstance.timeScale().fitContent();
}

// --- Modals -----------------------------------------------------------------

export function openTradeModal(prefillSymbol = '') {
  const { cash } = computePortfolio(getState().portfolio.items);
  openModal((modal, close) => {
    modal.innerHTML = `
      <h3>Kauf / Verkauf (Paper-Trading)</h3>
      <p class="dim" style="margin-top:-6px">Verfügbares Cash: ${fmtCurrency(cash, 'EUR')}</p>
      <div class="form-row">
        <div class="field">
          <label>Aktion</label>
          <select id="txKind"><option value="buy">Kauf</option><option value="sell">Verkauf</option></select>
        </div>
        <div class="field">
          <label>Symbol</label>
          <input id="txSymbol" value="${escapeHtml(prefillSymbol)}" placeholder="z. B. SAP.DE" autocapitalize="characters">
        </div>
      </div>
      <div class="form-row">
        <div class="field"><label>Stückzahl</label><input id="txQty" type="number" step="any" inputmode="decimal" min="0"></div>
        <div class="field"><label>Kurs</label><input id="txPrice" type="number" step="any" inputmode="decimal" min="0"></div>
      </div>
      <div class="field"><label>Gebühr (optional)</label><input id="txFee" type="number" step="any" inputmode="decimal" min="0" placeholder="0"></div>
      <div style="display:flex; gap:10px; justify-content:flex-end">
        <button class="btn ghost" data-cancel>Abbrechen</button>
        <button class="btn primary" data-ok>Buchen</button>
      </div>`;

    const symbolInput = modal.querySelector('#txSymbol');
    const priceInput = modal.querySelector('#txPrice');
    const prefillPrice = () => {
      const q = getState().quotes[symbolInput.value.trim().toUpperCase()];
      if (q?.price != null && !priceInput.value) priceInput.value = String(Math.round(q.price * 100) / 100);
    };
    prefillPrice();
    symbolInput.addEventListener('blur', prefillPrice);

    modal.querySelector('[data-cancel]').onclick = close;
    modal.querySelector('[data-ok]').onclick = () => {
      const symbol = symbolInput.value.trim().toUpperCase();
      const qty = parseFloat(modal.querySelector('#txQty').value.replace(',', '.'));
      const price = parseFloat(priceInput.value.replace(',', '.'));
      const fee = parseFloat(modal.querySelector('#txFee').value.replace(',', '.')) || 0;
      const kind = modal.querySelector('#txKind').value;
      if (!symbol || !Number.isFinite(qty) || qty <= 0 || !Number.isFinite(price) || price <= 0) {
        showToast('Bitte Symbol, Stückzahl und Kurs angeben.', 'error');
        return;
      }
      if (kind === 'sell') {
        const pos = computePortfolio(getState().portfolio.items).positions.find((p) => p.symbol === symbol);
        if (!pos || pos.qty < qty) {
          showToast(`Nicht genug Stücke von ${symbol} im Depot.`, 'error');
          return;
        }
      }
      update('portfolio', (d) => upsertItem(d, {
        id: crypto.randomUUID(), kind, symbol, qty, price, fee, time: Date.now(),
      }));
      showToast(`${kind === 'buy' ? 'Kauf' : 'Verkauf'} gebucht: ${qty} × ${symbol}`, 'success');
      close();
    };
  });
}

function openCashModal() {
  openModal((modal, close) => {
    modal.innerHTML = `
      <h3>Ein- / Auszahlung</h3>
      <div class="field">
        <label>Betrag in € (negativ = Auszahlung)</label>
        <input id="cashAmount" type="number" step="any" inputmode="decimal" placeholder="z. B. 10000">
      </div>
      <div style="display:flex; gap:10px; justify-content:flex-end">
        <button class="btn ghost" data-cancel>Abbrechen</button>
        <button class="btn primary" data-ok>Buchen</button>
      </div>`;
    modal.querySelector('[data-cancel]').onclick = close;
    modal.querySelector('[data-ok]').onclick = () => {
      const amount = parseFloat(modal.querySelector('#cashAmount').value.replace(',', '.'));
      if (!Number.isFinite(amount) || amount === 0) {
        showToast('Bitte einen Betrag eingeben.', 'error');
        return;
      }
      update('portfolio', (d) => upsertItem(d, {
        id: crypto.randomUUID(), kind: 'cash', amount, time: Date.now(),
      }));
      close();
    };
  });
}
