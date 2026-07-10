// Kennzahlen-Ansicht einer Aktie: Bewertung, Dividende, Profil,
// Quartalszahlen (Umsatz/Gewinn), EPS Ist vs. Schätzung, Analysten.

import { apiGet } from '../core/api.js';
import { fmtCurrency, fmtNumber, fmtPct, fmtCompact, fmtDate, trendClass } from '../core/format.js';
import { escapeHtml } from './search.js';

export async function renderFundamentals(container, symbol) {
  container.innerHTML = `<div class="skeleton" style="height:260px"></div>`;
  let f;
  try {
    f = await apiGet('/api/fundamentals', { symbol });
  } catch (err) {
    container.innerHTML = `<div class="empty-state">Fundamentaldaten nicht verfügbar (${escapeHtml(err.message)})</div>`;
    return;
  }
  const ccy = f.currency || 'EUR';
  const stat = (label, value) => `
    <div class="stat"><div class="s-label">${label}</div><div class="s-value">${value}</div></div>`;

  container.innerHTML = `
    ${f.stale ? `<div class="card" style="border-color:var(--warn)"><span class="dim">⚠️ Daten evtl. veraltet (Stand ${fmtDate(f.staleAt)}) — Yahoo derzeit nicht erreichbar.</span></div>` : ''}

    <div class="section-title">Bewertung</div>
    <div class="stat-grid">
      ${stat('Marktkapitalisierung', fmtCompact(f.marketCap) + (f.marketCap ? ` ${ccy}` : ''))}
      ${stat('KGV (aktuell)', fmtNumber(f.peTrailing, 1))}
      ${stat('KGV (erwartet)', fmtNumber(f.peForward, 1))}
      ${stat('Gewinn je Aktie (EPS)', f.eps != null ? fmtCurrency(f.eps, ccy) : '–')}
      ${stat('Kurs-Buchwert', fmtNumber(f.priceToBook, 1))}
      ${stat('Beta', fmtNumber(f.beta, 2))}
      ${stat('52-Wochen-Hoch', f.week52High != null ? fmtCurrency(f.week52High, ccy) : '–')}
      ${stat('52-Wochen-Tief', f.week52Low != null ? fmtCurrency(f.week52Low, ccy) : '–')}
    </div>

    <div class="section-title">Dividende</div>
    <div class="stat-grid">
      ${stat('Dividendenrendite', f.dividendYield != null ? fmtPct(f.dividendYield * 100, { signed: false }) : '–')}
      ${stat('Dividende je Aktie', f.dividendRate != null ? fmtCurrency(f.dividendRate, ccy) : '–')}
      ${stat('Ausschüttungsquote', f.payoutRatio != null ? fmtPct(f.payoutRatio * 100, { signed: false }) : '–')}
      ${stat('Ex-Dividende', f.exDividendDate ? fmtDate(f.exDividendDate) : '–')}
    </div>

    <div class="section-title">Rentabilität & Ziel</div>
    <div class="stat-grid">
      ${stat('Gewinnmarge', f.profitMargin != null ? fmtPct(f.profitMargin * 100, { signed: false }) : '–')}
      ${stat('Umsatzwachstum', f.revenueGrowth != null ? fmtPct(f.revenueGrowth * 100) : '–')}
      ${stat('Kursziel (Ø Analysten)', f.targetMeanPrice != null ? fmtCurrency(f.targetMeanPrice, ccy) : '–')}
      ${stat('Nächste Zahlen', f.nextEarningsDate ? fmtDate(f.nextEarningsDate) : '–')}
    </div>

    ${renderQuarters(f, ccy)}
    ${renderEpsHistory(f, ccy)}
    ${renderRecommendations(f)}
    ${renderProfile(f)}
  `;
}

function renderQuarters(f, ccy) {
  const quarters = f.quarters || [];
  if (!quarters.length) return '';
  const max = Math.max(...quarters.map((q) => Math.abs(q.revenue || 0)), 1);
  return `
    <div class="section-title">Quartalszahlen (Umsatz & Gewinn)</div>
    <div class="card">
      ${quarters.map((q) => {
        const revW = Math.max(2, (Math.abs(q.revenue || 0) / max) * 100);
        const earnW = Math.max(2, (Math.abs(q.earnings || 0) / max) * 100);
        const earnNeg = (q.earnings || 0) < 0;
        return `
        <div style="margin-bottom:12px">
          <div style="display:flex; justify-content:space-between; font-size:12.5px; margin-bottom:4px">
            <strong>${escapeHtml(String(q.quarter))}</strong>
            <span class="dim">Umsatz ${fmtCompact(q.revenue)} ${ccy} · Gewinn <span class="${earnNeg ? 'down' : ''}">${fmtCompact(q.earnings)} ${ccy}</span></span>
          </div>
          <div style="height:8px; border-radius:4px; background:var(--bg-elev2); overflow:hidden; margin-bottom:3px">
            <div style="height:100%; width:${revW}%; background:var(--accent)"></div>
          </div>
          <div style="height:8px; border-radius:4px; background:var(--bg-elev2); overflow:hidden">
            <div style="height:100%; width:${earnW}%; background:${earnNeg ? 'var(--down)' : 'var(--up)'}"></div>
          </div>
        </div>`;
      }).join('')}
      <div class="dim" style="font-size:11.5px">Blau = Umsatz, Grün/Rot = Gewinn (gleiche Skala)</div>
    </div>`;
}

function renderEpsHistory(f, ccy) {
  const history = f.epsHistory || [];
  if (!history.length) return '';
  return `
    <div class="section-title">EPS: Ist vs. Schätzung</div>
    <div class="card table-scroll">
      <table class="table">
        <thead><tr><th>Quartal</th><th>Schätzung</th><th>Ist</th><th>Überraschung</th></tr></thead>
        <tbody>
          ${history.map((h) => `
            <tr>
              <td>${h.date ? fmtDate(h.date) : escapeHtml(String(h.quarter))}</td>
              <td>${h.epsEstimate != null ? fmtNumber(h.epsEstimate) : '–'}</td>
              <td>${h.epsActual != null ? fmtNumber(h.epsActual) : '–'}</td>
              <td class="${trendClass((h.surprisePct || 0) * 100)}">${h.surprisePct != null ? fmtPct(h.surprisePct * 100) : '–'}</td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

function renderRecommendations(f) {
  const rec = (f.recommendations || [])[0];
  if (!rec) return '';
  const total = rec.strongBuy + rec.buy + rec.hold + rec.sell + rec.strongSell || 1;
  const seg = (n, color) => n ? `<div style="flex:${n}; background:${color}" title="${n}"></div>` : '';
  return `
    <div class="section-title">Analysten-Empfehlungen (${total})</div>
    <div class="card">
      <div style="display:flex; height:14px; border-radius:7px; overflow:hidden; gap:1px">
        ${seg(rec.strongBuy, '#1d7f53')}${seg(rec.buy, '#30a46c')}${seg(rec.hold, '#8b98a5')}${seg(rec.sell, '#e5484d')}${seg(rec.strongSell, '#b02a2f')}
      </div>
      <div style="display:flex; justify-content:space-between; font-size:11.5px; margin-top:6px" class="dim">
        <span>Strong Buy ${rec.strongBuy}</span><span>Buy ${rec.buy}</span><span>Hold ${rec.hold}</span><span>Sell ${rec.sell + rec.strongSell}</span>
      </div>
    </div>`;
}

function renderProfile(f) {
  if (!f.sector && !f.summary) return '';
  return `
    <div class="section-title">Unternehmen</div>
    <div class="card">
      <div class="stat-grid" style="margin-bottom:10px">
        ${f.sector ? `<div class="stat"><div class="s-label">Sektor</div><div class="s-value" style="font-size:13px">${escapeHtml(f.sector)}</div></div>` : ''}
        ${f.industry ? `<div class="stat"><div class="s-label">Branche</div><div class="s-value" style="font-size:13px">${escapeHtml(f.industry)}</div></div>` : ''}
        ${f.country ? `<div class="stat"><div class="s-label">Land</div><div class="s-value" style="font-size:13px">${escapeHtml(f.country)}</div></div>` : ''}
        ${f.employees ? `<div class="stat"><div class="s-label">Mitarbeiter</div><div class="s-value" style="font-size:13px">${fmtNumber(f.employees, 0)}</div></div>` : ''}
      </div>
      ${f.summary ? `<p class="dim" style="font-size:13px; line-height:1.5; margin:0">${escapeHtml(f.summary.slice(0, 600))}${f.summary.length > 600 ? '…' : ''}</p>` : ''}
      ${f.website ? `<p style="margin:8px 0 0"><a href="${escapeHtml(f.website)}" target="_blank" rel="noopener noreferrer">Website ↗</a></p>` : ''}
    </div>`;
}
