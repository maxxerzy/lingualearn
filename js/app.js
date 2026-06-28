import { initNavigation } from '../ui/navigation.js';
import { initSettings, handleImport, handleExport } from '../ui/settings.js';
import { startSession } from '../core/session.js';
import { updateStats } from '../core/stats.js';
import { getDecks } from '../core/state.js';
import './integrations/react-bits-explorer.js';

document.addEventListener('DOMContentLoaded', async () => {
  initNavigation();
  await populateDeckSelect();
  updateStats();
  initSettings();
  setupModeTabs();

  const startBtn = document.getElementById('startBtn');
  if (startBtn) startBtn.addEventListener('click', startSession);

  window.handleImport = handleImport;
  window.handleExport = handleExport;
});

async function populateDeckSelect() {
  const deckSelect = document.getElementById('deckSelect');
  if (!deckSelect) return;

  const decks = await getDecks();
  const prev  = deckSelect.value;
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
