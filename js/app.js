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
import { initPath, showPath } from '../ui/coursemap.js';
import { initArena, renderArena } from '../ui/hub.js';
import { reinitLeague } from '../core/league.js';
import { reinitQuests } from '../core/quests.js';
import { getGame } from '../core/gamification.js';
import { initDictionary, renderDictionary } from '../ui/dictionary.js';
import { initOnboarding, maybeShowOnboarding } from '../ui/onboarding.js';
import { reinitErrorLog } from '../core/errorLog.js';
import { reinitGold, reinitThemeBadges } from '../core/session.js';
import { reinitGrammar } from '../core/grammar.js';
import { initGrammar } from '../ui/grammar.js';
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
  reinitErrorLog();
  reinitGold();
  reinitThemeBadges();
  reinitGrammar();
}

function showApp() {
  document.getElementById('login-screen').hidden = true;
  document.getElementById('app').hidden = false;
  window.scrollTo(0, 0);
  document.getElementById('userName').textContent = getCurrentUser();
  const nameChip = document.getElementById('userNameChip');
  if (nameChip) nameChip.textContent = getCurrentUser();

  if (!appInitialized) {
    appInitialized = true;
    const activateView = initNavigation();
    initSettings();
    initPath(activateView, startSession);
    initGrammar(activateView);
    document.getElementById('coursemapBtn')?.addEventListener('click', showPath);
    initWotdModal();
    initArena(activateView);
    initDictionary(activateView);
    initOnboarding();
    initRewards();
    setupModeTabs();
    setupFocusControls();
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
        if (item.dataset.action === 'dict') {
          const q = document.getElementById('dictSearch');
          if (q) q.value = '';
          renderDictionary();
        }
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

  // Erster Login? → Onboarding (Sprache, Ziel, Motivation → Lektion 1).
  maybeShowOnboarding(() => startSession());

  // Lokale Serien-Erinnerung: gestern gelernt, heute noch nicht → Hinweis.
  const g = getGame();
  const yest = (() => { const d = new Date(); d.setDate(d.getDate() - 1); return d.toISOString().slice(0, 10); })();
  if (g.streak.current > 0 && g.streak.lastDate === yest) {
    showToast(`<i class="fas fa-fire toast__icon"></i><div class="toast__body"><b>Deine Serie: ${g.streak.current} ${g.streak.current === 1 ? 'Tag' : 'Tage'} 🔥</b><span>Lern heute eine Runde, um sie zu halten!</span></div>`, { duration: 5000 });
  }
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


// Zurück-Button, Modus-Wechsel-Menü und Lernkarte in der Fokus-Leiste.
function setupFocusControls() {
  document.getElementById('sessionBackBtn')?.addEventListener('click', exitSession);
  document.getElementById('sessionMapBtn')?.addEventListener('click', showPath);

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
