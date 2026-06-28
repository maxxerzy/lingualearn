import { initNavigation } from '../ui/navigation.js';
import { initSettings, handleImport, handleExport } from '../ui/settings.js';
import { startSession } from '../core/session.js';
import { updateStats } from '../core/stats.js';
import { getDecks } from '../core/state.js';
import './integrations/react-bits-explorer.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  populateDeckSelect();
  updateStats();
  initSettings();

  const startButton = document.getElementById('startBtn');
  if (startButton) {
    startButton.addEventListener('click', startSession);
  }

  window.handleImport = handleImport;
  window.handleExport = handleExport;
});

function populateDeckSelect() {
  const deckSelect = document.getElementById('deckSelect');
  if (!deckSelect) {
    return;
  }

  const decks = getDecks();
  const previousSelection = deckSelect.value;
  const fragment = document.createDocumentFragment();
  const sortedDecks = Object.entries(decks).sort(([, a], [, b]) =>
    a.name.localeCompare(b.name, 'de')
  );

  sortedDecks.forEach(([id, deck]) => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = deck.name;
    fragment.appendChild(option);
  });

  deckSelect.replaceChildren(fragment);

  if (previousSelection && decks[previousSelection]) {
    deckSelect.value = previousSelection;
  } else {
    const firstDeckId = sortedDecks[0]?.[0];
    if (firstDeckId) {
      deckSelect.value = firstDeckId;
    }
  }
}
