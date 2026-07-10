// GRODT-Bootstrap: Service Worker, Theme, Router, Navigation, Quote-Feed,
// Sync-Engine, Finnhub-Stream.

import { renderTabbar, highlightTab } from './components/tabbar.js';
import { startQuoteFeed } from './core/quotes.js';
import { startSync, onSyncStatus, hasSyncProfile } from './core/sync.js';
import { startFinnhub, onFinnhubStatus } from './core/finnhub.js';
import { applyTheme } from './views/settings.js';
import { localGet, localSet } from './core/store.js';
import { openModal } from './components/modal.js';

import * as markets from './views/markets.js';
import * as watchlist from './views/watchlist.js';
import * as portfolio from './views/portfolio.js';
import * as news from './views/news.js';
import * as settings from './views/settings.js';
import * as search from './views/search.js';
import * as detail from './views/detail.js';
import * as compare from './views/compare.js';

const ROUTES = [
  { pattern: /^#\/maerkte$/, view: markets },
  { pattern: /^#\/watchlist$/, view: watchlist },
  { pattern: /^#\/depot$/, view: portfolio },
  { pattern: /^#\/news$/, view: news },
  { pattern: /^#\/mehr$/, view: settings },
  { pattern: /^#\/suche$/, view: search },
  { pattern: /^#\/s\/(.+)$/, view: detail },
  { pattern: /^#\/vergleich(?:\/(.+))?$/, view: compare },
];

let currentView = null;

function route() {
  const hash = location.hash || '#/maerkte';
  const match = ROUTES.find((r) => r.pattern.test(hash));
  const target = match || ROUTES[0];
  const params = hash.match(target.pattern)?.slice(1) || [];

  if (currentView?.unmount) {
    try {
      currentView.unmount();
    } catch (err) {
      console.error('View-Unmount-Fehler:', err);
    }
  }
  currentView = target.view;

  const view = document.getElementById('view');
  view.scrollTop = 0;
  window.scrollTo(0, 0);
  try {
    currentView.mount(view, params);
  } catch (err) {
    console.error('View-Mount-Fehler:', err);
    view.innerHTML = `<div class="empty-state">Ansicht konnte nicht geladen werden.<br><span class="dim">${err.message}</span></div>`;
  }
  highlightTab(hash);
}

function initHeader() {
  document.getElementById('searchBtn').addEventListener('click', () => {
    location.hash = '#/suche';
  });
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      location.hash = '#/suche';
    }
  });

  const dot = document.getElementById('liveDot');
  onFinnhubStatus((connected) => {
    dot.hidden = !connected;
    dot.classList.toggle('on', connected);
    dot.title = connected ? 'Finnhub-Livestream verbunden' : 'Datenverbindung';
  });
  onSyncStatus(() => { /* Status aktuell nur intern; UI in Einstellungen */ });
}

function firstRunSyncHint() {
  if (hasSyncProfile() || localGet('syncHintShown', false)) return;
  localSet('syncHintShown', true);
  setTimeout(() => {
    openModal((modal, close) => {
      modal.innerHTML = `
        <h3>Willkommen bei GRODT 👋</h3>
        <p style="line-height:1.5">Tipp: Aktiviere unter <strong>Mehr → Geräte-Sync</strong> ein Sync-Profil, um Watchlist, Alarme und Depot zwischen iPhone und Mac zu teilen — und Push-Mitteilungen für Kursalarme zu erhalten.</p>
        <div style="display:flex; gap:10px; justify-content:flex-end">
          <button class="btn ghost" data-later>Später</button>
          <button class="btn primary" data-go>Jetzt einrichten</button>
        </div>`;
      modal.querySelector('[data-later]').onclick = close;
      modal.querySelector('[data-go]').onclick = () => {
        close();
        location.hash = '#/mehr';
      };
    });
  }, 1200);
}

// --- Start ---

applyTheme();
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => applyTheme());

renderTabbar();
initHeader();
window.addEventListener('hashchange', route);
route();

startQuoteFeed();
startSync();
startFinnhub();
firstRunSyncHint();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch((err) => console.warn('SW-Registrierung fehlgeschlagen:', err));
  });
}
