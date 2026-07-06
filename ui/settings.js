import { loadDeck, addImportedDeck } from '../core/state.js';
import { getGame, setDailyGoal, checkAchievements } from '../core/gamification.js';
import { renderLearnWidgets } from './gami.js';
import { showToast, toastAchievements } from './toast.js';

// Initialize settings
export function initSettings() {
  const importBtn = document.getElementById('importBtn');
  const exportBtn = document.getElementById('exportBtn');

  if (importBtn) importBtn.addEventListener('click', handleImport);
  if (exportBtn) exportBtn.addEventListener('click', handleExport);

  const goalInput = document.getElementById('dailyGoalInput');
  if (goalInput) {
    goalInput.value = getGame().dailyGoal;
    goalInput.addEventListener('change', () => {
      const g = setDailyGoal(Number(goalInput.value));
      goalInput.value = g.dailyGoal;
      renderLearnWidgets();
      showToast(`<i class="fas fa-bullseye toast__icon"></i><div class="toast__body"><b>Tagesziel gespeichert</b><span>${g.dailyGoal} Karten pro Tag</span></div>`);
      // Ein niedrigeres Ziel kann sofort erfüllt sein — Erfolge direkt prüfen.
      toastAchievements(checkAchievements());
    });
  }
}

// Validate deck structure
function validateDeckStructure(deckData) {
  if (!deckData || typeof deckData !== 'object') return false;
  if (!deckData.name || !deckData.language) return false;
  if (!Array.isArray(deckData.cards)) return false;
  if (deckData.cards.length === 0) return false;

  return deckData.cards.every(card =>
    card && typeof card === 'object' &&
    'front' in card && 'back' in card
  );
}

// Handle import
export function handleImport() {
  const fileInput = document.getElementById('importFile');
  const file = fileInput?.files?.[0];

  if (!file) {
    alert('Bitte wählen Sie eine JSON-Datei aus.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const deckData = JSON.parse(e.target.result);

      if (!validateDeckStructure(deckData)) {
        alert('Fehler: Deck hat ungültiges Format. Erforderlich: name, language, cards (Array mit front/back)');
        return;
      }

      const deckId = `imported-${Date.now()}`;
      addImportedDeck(deckId, deckData);
      document.dispatchEvent(new CustomEvent('lingua:decks-changed'));

      alert(`Deck "${deckData.name}" erfolgreich importiert! Du kannst es jetzt in der Lernen-Seite auswählen.`);
      fileInput.value = '';
    } catch (error) {
      alert('Fehler beim Importieren: Ungültiges JSON-Format.');
    }
  };
  reader.readAsText(file);
}

// Handle export — exportiert das aktuell ausgewählte Deck.
export async function handleExport() {
  const deckId = document.getElementById('deckSelect')?.value || 'basic-da';
  const deck = await loadDeck(deckId);

  if (!deck?.cards) {
    alert('Kein Deck zum Export gefunden.');
    return;
  }

  const payload = { name: deck.name, language: deck.language, cards: deck.cards };
  const dataStr = JSON.stringify(payload, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

  const exportFileDefaultName = `lingualearn_${deckId}.json`;

  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}
