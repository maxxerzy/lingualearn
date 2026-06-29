import { initNavigation } from '../ui/navigation.js';
import { initSettings, handleImport, handleExport } from '../ui/settings.js';
import { startSession } from '../core/session.js';
import { updateStats } from '../core/stats.js';
import { getDecks, reinitUserStats, setCurrentSession } from '../core/state.js';
import { isLoggedIn, logout, getCurrentUser } from '../core/auth.js';

let appInitialized = false;

document.addEventListener('DOMContentLoaded', () => {
  if (isLoggedIn()) {
    reinitUserStats();
    showApp();
  }

  document.addEventListener('linguaauth:login', () => {
    reinitUserStats();
    showApp();
  });

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', doLogout);
});

function showApp() {
  document.getElementById('login-screen').hidden = true;
  document.getElementById('app').hidden = false;
  window.scrollTo(0, 0);
  document.getElementById('userName').textContent = getCurrentUser();

  if (!appInitialized) {
    appInitialized = true;
    const activateView = initNavigation();
    initSettings();
    setupModeTabs();
    document.getElementById('startBtn').addEventListener('click', startSession);
    window.handleImport = handleImport;
    window.handleExport = handleExport;

    const dropdown = document.getElementById('userDropdown');
    document.getElementById('userChipBtn').addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.hidden = !dropdown.hidden;
    });
    document.querySelectorAll('.user-dropdown__item[data-action]').forEach(item => {
      item.addEventListener('click', () => {
        activateView(item.dataset.action);
        dropdown.hidden = true;
      });
    });
    document.addEventListener('click', () => { dropdown.hidden = true; });

    document.getElementById('statsBackBtn').addEventListener('click', () => activateView('learn'));
    document.getElementById('settingsBackBtn').addEventListener('click', () => activateView('learn'));
  }

  populateDeckSelect();
  updateStats();
}

function doLogout() {
  setCurrentSession(null);
  logout();
  document.getElementById('userDropdown').hidden = true;
  window.LinguaAuth.showLoginScreen();
}

function populateDeckSelect() {
  const deckSelect = document.getElementById('deckSelect');
  if (!deckSelect) return;

  const decks  = getDecks();
  const prev   = deckSelect.value;
  const sorted = Object.entries(decks).sort(([, a], [, b]) =>
    a.name.localeCompare(b.name, 'de')
  );

  const frag = document.createDocumentFragment();
  sorted.forEach(([id, deck]) => {
    const opt = document.createElement('option');
    opt.value = id;
    opt.textContent = `${deck.name} (${deck.cards.length} Karten)`;
    frag.appendChild(opt);
  });

  deckSelect.replaceChildren(frag);
  deckSelect.value = (prev && decks[prev]) ? prev : (sorted[0]?.[0] ?? '');
}

function setupModeTabs() {
  const btns = document.querySelectorAll('.mode-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}
