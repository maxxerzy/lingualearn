import { initNavigation } from '../ui/navigation.js';
import { initSettings, handleImport, handleExport } from '../ui/settings.js';
import { startSession, exitSession } from '../core/session.js';
import { updateStats } from '../core/stats.js';
import { getDecks, reinitUserStats, setCurrentSession } from '../core/state.js';
import { isLoggedIn, logout, getCurrentUser } from '../core/auth.js';
import { reinitCardProgress } from '../core/cardProgress.js';
import { reinitGame } from '../core/gamification.js';
import { reinitCourse } from '../core/course.js';
import { reinitCosmetics } from '../core/cosmetics.js';
import { renderGamiHeader, renderLearnWidgets, renderStatsExtras } from '../ui/gami.js';
import { applyCosmetics, initRewards, renderRewards } from '../ui/cosmetics.js';
import { reinitWotd, initWotdModal } from '../ui/wotd.js';
import { initCourseMap, openCourseMap } from '../ui/coursemap.js';
import { initArena, renderArena } from '../ui/hub.js';
import { reinitLeague } from '../core/league.js';
import { reinitQuests } from '../core/quests.js';
import { showToast } from '../ui/toast.js';

let appInitialized = false;

document.addEventListener('DOMContentLoaded', () => {
  if (isLoggedIn()) {
    reinitUser();
    showApp();
  }

  document.addEventListener('linguaauth:login', () => {
    reinitUser();
    showApp();
  });

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', doLogout);
});

// Nutzerspezifischen Zustand (Stats, Kartenlevel, Gamification) neu laden.
function reinitUser() {
  reinitUserStats();
  reinitCardProgress();
  reinitGame();
  reinitCourse();
  reinitCosmetics();
  reinitWotd();
  reinitLeague();
  reinitQuests();
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
    initCourseMap();
    initWotdModal();
    initArena();
    initRewards();
    setupModeTabs();
    setupFocusControls();
    setupDueToggle();
    document.getElementById('startBtn').addEventListener('click', startSession);
    window.handleImport = handleImport;
    window.handleExport = handleExport;

    const dropdown = document.getElementById('userDropdown');
    const chipBtn = document.getElementById('userChipBtn');
    const syncChip = () => {
      chipBtn.classList.toggle('open', !dropdown.hidden);
      chipBtn.setAttribute('aria-expanded', dropdown.hidden ? 'false' : 'true');
    };
    chipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.hidden = !dropdown.hidden;
      syncChip();
    });
    document.querySelectorAll('.user-dropdown__item[data-action]').forEach(item => {
      item.addEventListener('click', () => {
        activateView(item.dataset.action);
        if (item.dataset.action === 'stats') renderStatsExtras();
        if (item.dataset.action === 'rewards') renderRewards();
        if (item.dataset.action === 'arena') renderArena();
        dropdown.hidden = true;
        syncChip();
      });
    });
    document.addEventListener('click', () => { dropdown.hidden = true; syncChip(); });

    document.getElementById('statsBackBtn').addEventListener('click', () => activateView('learn'));
    document.getElementById('settingsBackBtn').addEventListener('click', () => activateView('learn'));
    document.getElementById('rewardsBackBtn').addEventListener('click', () => activateView('learn'));

    // Deck-Wechsel aktualisiert Fortschritt & Fällig-Zähler.
    // (Wort des Tages wird beim Öffnen des Overlays frisch gerendert.)
    document.getElementById('deckSelect').addEventListener('change', () => {
      renderLearnWidgets();
    });

    // Nach einem Import: Selector und Widgets auffrischen.
    document.addEventListener('lingua:decks-changed', () => {
      populateDeckSelect();
      renderLearnWidgets();
    });
  }

  // Fokus-Modus zurücksetzen (frischer Start / nach Kontowechsel).
  document.getElementById('view-learn')?.classList.remove('session-active');
  document.getElementById('sessionMapBtn')?.setAttribute('hidden', '');

  populateDeckSelect();
  updateStats();
  renderGamiHeader();
  renderLearnWidgets();
  applyCosmetics();
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
    opt.textContent = `${deck.name} (${deck.cards?.length ?? deck.count} Karten)`;
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
      // Start-Button-Label und Kurszeile an den Modus anpassen.
      renderLearnWidgets();
    });
  });
}

// „Nur fällige Karten": Icon-Schalter oben statt Checkbox. Blendet beim
// Umschalten oben eine Rückmeldung (An/Aus) ein und hält den versteckten
// #dueOnly-Zustand aktuell, den die Session ausliest.
function setupDueToggle() {
  const btn = document.getElementById('dueToggleBtn');
  const chk = document.getElementById('dueOnly');
  if (!btn || !chk) return;
  btn.addEventListener('click', () => {
    chk.checked = !chk.checked;
    btn.classList.toggle('active', chk.checked);
    btn.setAttribute('aria-pressed', chk.checked ? 'true' : 'false');
    // Fokus abgeben, damit nach dem Ausschalten kein Rahmen „hängen bleibt".
    btn.blur();
    const n = document.getElementById('dueCount')?.textContent || '0';
    showToast(chk.checked
      ? `<i class="fas fa-filter toast__icon"></i><div class="toast__body"><b>Nur fällige Karten · An</b><span>${n} fällige Karte(n) in dieser Session</span></div>`
      : `<i class="fas fa-layer-group toast__icon"></i><div class="toast__body"><b>Nur fällige Karten · Aus</b><span>Alle Karten des Decks</span></div>`);
  });
}

// Zurück-Button, Modus-Wechsel-Menü und Lernkarte in der Fokus-Leiste.
function setupFocusControls() {
  document.getElementById('sessionBackBtn')?.addEventListener('click', exitSession);
  document.getElementById('sessionMapBtn')?.addEventListener('click', openCourseMap);

  const modeBtn = document.getElementById('sessionModeBtn');
  const menu = document.getElementById('sessionModeMenu');
  const modeTabs = [...document.querySelectorAll('.mode-btn')];
  if (!modeBtn || !menu) return;

  // Menü aus den vorhandenen Modus-Tabs aufbauen (gleiche Beschriftung/Icons).
  menu.innerHTML = modeTabs.map(b => {
    const icon = b.querySelector('i')?.className || '';
    return `<button type="button" class="session-mode-item" data-mode="${b.dataset.mode}">
      <i class="${icon}"></i> ${b.textContent.trim()}
    </button>`;
  }).join('');

  modeBtn.addEventListener('click', e => {
    e.stopPropagation();
    // aktiven Modus markieren
    const active = document.querySelector('.mode-btn.active')?.dataset.mode;
    menu.querySelectorAll('.session-mode-item').forEach(it =>
      it.classList.toggle('session-mode-item--active', it.dataset.mode === active));
    menu.hidden = !menu.hidden;
  });

  menu.querySelectorAll('.session-mode-item').forEach(item => {
    item.addEventListener('click', () => {
      modeTabs.forEach(b => b.classList.toggle('active', b.dataset.mode === item.dataset.mode));
      menu.hidden = true;
      startSession();   // startet direkt im gewählten Modus (bleibt im Fokus)
    });
  });

  document.addEventListener('click', () => { menu.hidden = true; });
}
