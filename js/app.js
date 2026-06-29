import { initNavigation } from '../ui/navigation.js';
import { initSettings, handleImport, handleExport } from '../ui/settings.js';
import { startSession } from '../core/session.js';
import { updateStats } from '../core/stats.js';
import { getDecks, reinitUserStats, setCurrentSession } from '../core/state.js';
import { isLoggedIn, login, register, logout, getCurrentUser } from '../core/auth.js';

let appInitialized = false;
let loginMode = 'login'; // 'login' | 'register'

document.addEventListener('DOMContentLoaded', () => {
  if (isLoggedIn()) {
    showApp();
  } else {
    showLogin();
  }

  // Tab switching
  document.getElementById('tabLogin').addEventListener('click', () => setLoginMode('login'));
  document.getElementById('tabRegister').addEventListener('click', () => setLoginMode('register'));

  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const errorEl  = document.getElementById('loginError');
    const btn      = document.getElementById('loginBtn');

    btn.disabled = true;
    btn.textContent = 'Wird geprüft…';
    errorEl.hidden = true;

    const result = loginMode === 'login'
      ? await login(username, password)
      : await register(username, password);

    if (result.success) {
      reinitUserStats();
      showApp();
    } else {
      errorEl.textContent = result.error;
      errorEl.hidden = false;
      btn.disabled = false;
      btn.textContent = loginMode === 'login' ? 'Einloggen' : 'Registrieren';
    }
  });

  document.getElementById('logoutBtn').addEventListener('click', doLogout);
});

function setLoginMode(mode) {
  loginMode = mode;
  document.getElementById('tabLogin').classList.toggle('active', mode === 'login');
  document.getElementById('tabRegister').classList.toggle('active', mode === 'register');
  document.getElementById('loginBtn').textContent = mode === 'login' ? 'Einloggen' : 'Registrieren';
  document.getElementById('loginError').hidden = true;
}

function showLogin() {
  document.getElementById('login-screen').hidden = false;
  document.getElementById('app').hidden = true;
  setLoginMode('login');
  document.getElementById('loginUsername').value = '';
  document.getElementById('loginPassword').value = '';
  window.scrollTo(0, 0);
  document.getElementById('loginUsername').focus();
}

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

    // User chip dropdown
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

    // Back buttons in Stats and Settings views
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
