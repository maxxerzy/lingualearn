import { initNavigation } from '../ui/navigation.js';
import { initSettings, handleImport, handleExport } from '../ui/settings.js';
import { startSession } from '../core/session.js';
import { updateStats } from '../core/stats.js';
import { getDecks, reinitUserStats, setCurrentSession } from '../core/state.js';
import { isLoggedIn, loginOrRegister, logout, getCurrentUser } from '../core/auth.js';

let appInitialized = false;

document.addEventListener('DOMContentLoaded', () => {
  if (isLoggedIn()) {
    showApp();
  } else {
    showLogin();
  }

  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const errorEl  = document.getElementById('loginError');
    const btn      = document.getElementById('loginBtn');

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Wird geprüft…';
    errorEl.hidden = true;

    const result = await loginOrRegister(username, password);

    if (result.success) {
      reinitUserStats();
      showApp();
    } else {
      errorEl.textContent = result.error;
      errorEl.hidden = false;
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Einloggen / Registrieren';
    }
  });

  document.getElementById('logoutBtn').addEventListener('click', doLogout);
  document.getElementById('mobileLogoutBtn').addEventListener('click', doLogout);
});

function showLogin() {
  document.getElementById('login-screen').hidden = false;
  document.getElementById('app').hidden = true;
  document.getElementById('loginUsername').focus();
}

function showApp() {
  document.getElementById('login-screen').hidden = true;
  document.getElementById('app').hidden = false;
  document.getElementById('userName').textContent = getCurrentUser();

  if (!appInitialized) {
    appInitialized = true;
    initNavigation();
    initSettings();
    setupModeTabs();
    document.getElementById('startBtn').addEventListener('click', startSession);
    window.handleImport = handleImport;
    window.handleExport = handleExport;
  }

  populateDeckSelect();
  updateStats();
}

function doLogout() {
  setCurrentSession(null);
  logout();
  document.getElementById('loginUsername').value = '';
  document.getElementById('loginPassword').value = '';
  document.getElementById('loginError').hidden = true;
  showLogin();
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
