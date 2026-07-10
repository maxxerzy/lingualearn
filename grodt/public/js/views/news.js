// Markt-News (globaler Tab) mit Pull-to-Refresh.

import { apiGet } from '../core/api.js';
import { attachPullToRefresh } from '../components/pullrefresh.js';
import { relTime } from '../core/format.js';
import { escapeHtml } from './search.js';

let detach = null;

export function mount(el) {
  el.innerHTML = `
    <div class="pull-hint" id="newsPullHint">Aktualisiere …</div>
    <div class="section-title">Marktnachrichten</div>
    <div class="card" id="newsList"><div class="skeleton" style="height:200px"></div></div>
  `;
  const list = el.querySelector('#newsList');
  load(list);
  detach = attachPullToRefresh(el, el.querySelector('#newsPullHint'), () => load(list, true));
}

export function unmount() {
  if (detach) detach();
}

async function load(list, fresh = false) {
  try {
    const data = await apiGet('/api/news', { scope: 'markt' }, { fresh });
    renderNews(list, data.items || []);
  } catch (err) {
    list.innerHTML = `<div class="empty-state">News derzeit nicht verfügbar (${escapeHtml(err.message)})</div>`;
  }
}

export function renderNews(container, items) {
  if (!items.length) {
    container.innerHTML = `<div class="empty-state"><div class="e-icon">📰</div>Keine aktuellen Meldungen.</div>`;
    return;
  }
  container.innerHTML = items.map((n) => `
    <a class="news-item" href="${escapeHtml(n.link)}" target="_blank" rel="noopener noreferrer">
      <div class="n-title">${escapeHtml(n.title)}</div>
      <div class="n-meta">${escapeHtml(n.publisher || '')} · ${relTime(n.time)}
        ${(n.relatedTickers || []).slice(0, 3).map((t) => `<span class="badge flat" style="margin-left:4px">${escapeHtml(t)}</span>`).join('')}
      </div>
    </a>`).join('');
}
