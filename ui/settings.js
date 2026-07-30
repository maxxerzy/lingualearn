import { loadDeck, addImportedDeck } from '../core/state.js';
import { getGame, setDailyGoal, checkAchievements } from '../core/gamification.js';
import { renderLearnWidgets } from './gami.js';
import { showToast, toastAchievements } from './toast.js';
import { fxEnabled, setFxEnabled } from '../utils/feedback.js';
import { resetDeckProgress } from '../core/cardProgress.js';
import { resetCourse } from '../core/course.js';
import { resetGoldLessons, resetThemeBadges } from '../core/session.js';
import { resetGrammar } from '../core/grammar.js';
import { clearErrors } from '../core/errorLog.js';
import { getDecks } from '../core/state.js';
import { syncNow, getLastSync } from '../core/sync.js';
import { getCurrentUser } from '../core/auth.js';
import { getSpeechRate, setSpeechRate, rateLabel, speak } from '../utils/speech.js';

// Hörprobe im aktuell gewählten Deck — so hört man das Tempo dort,
// wo man es später braucht.
function speakSample() {
  const deckId = document.getElementById('deckSelect')?.value;
  const deck = getDecks()[deckId];
  const lang = deck?.language || 'da';
  const card = deck?.cards?.find(c => c.example) || deck?.cards?.[0];
  speak(card?.example || card?.back || 'Hallo', lang);
}

// Status der Geräte-Synchronisation anzeigen.
const SYNC_TEXT = {
  offline: ['fa-plug-circle-xmark', 'Offline — wird nachgeholt'],
  'not-configured': ['fa-circle-info', 'Server-Sync noch nicht eingerichtet'],
  forbidden: ['fa-triangle-exclamation', 'Zugang abgelehnt — Passwort weicht ab'],
  network: ['fa-plug-circle-xmark', 'Server nicht erreichbar'],
  server: ['fa-triangle-exclamation', 'Server-Fehler'],
  'no-token': ['fa-circle-info', 'Kein Konto-Schlüssel gefunden'],
  'no-user': ['fa-circle-info', 'Nicht angemeldet'],
};

export function renderSyncState(res) {
  const el = document.getElementById('syncState');
  if (!el) return;
  if (res?.ok) {
    const when = new Date(getLastSync(getCurrentUser())).toLocaleTimeString('de-DE',
      { hour: '2-digit', minute: '2-digit' });
    el.className = 'sync-box__state sync-box__state--ok';
    el.innerHTML = `<i class="fas fa-circle-check"></i> Synchron${when ? ` · ${when}` : ''}`;
    return;
  }
  const [icon, text] = SYNC_TEXT[res?.reason] || ['fa-rotate', 'Noch nicht synchronisiert'];
  el.className = 'sync-box__state';
  el.innerHTML = `<i class="fas ${icon}"></i> ${text}`;
}

// Initialize settings
export function initSettings() {
  // Geräte-Sync: Status zeigen und manuell auslösen.
  const syncBtn = document.getElementById('syncNowBtn');
  if (syncBtn) {
    syncBtn.addEventListener('click', async () => {
      syncBtn.disabled = true;
      const el = document.getElementById('syncState');
      if (el) el.innerHTML = '<i class="fas fa-rotate fa-spin"></i> Synchronisiere …';
      const res = await syncNow();
      renderSyncState(res);
      syncBtn.disabled = false;
      if (res.ok && res.changed) {
        showToast('<i class="fas fa-cloud-arrow-down toast__icon"></i><div class="toast__body"><b>Stand zusammengeführt</b><span>Fortschritt der anderen Geräte übernommen.</span></div>');
        document.dispatchEvent(new CustomEvent('lingua:synced'));
      } else if (res.ok) {
        showToast('<i class="fas fa-circle-check toast__icon"></i><div class="toast__body"><b>Alles synchron</b><span>Alle Geräte auf demselben Stand.</span></div>');
      } else if (res.reason === 'not-configured') {
        showToast('<i class="fas fa-circle-info toast__icon"></i><div class="toast__body"><b>Sync noch nicht aktiv</b><span>Der Server-Speicher ist noch nicht eingerichtet.</span></div>', { variant: 'warn' });
      }
    });
  }
  // Töne & Vibration pro Konto an/aus.
  // Deck-Fortschritt zurücksetzen (mit Bestätigung).
  document.getElementById('deckResetBtn')?.addEventListener('click', () => {
    const deckId = document.getElementById('deckSelect')?.value;
    const deck = getDecks()[deckId];
    if (!deckId || !deck) return;
    if (!confirm(`Fortschritt für „${deck.name}" wirklich zurücksetzen? Kartenlevel, Kursstand, Gold-Lektionen, Themen-Abzeichen und gemerkte Fehler dieses Decks werden gelöscht.`)) return;
    resetDeckProgress(deckId);
    resetCourse(deckId);
    resetGoldLessons(deckId);
    resetThemeBadges(deckId);
    resetGrammar(deckId);
    clearErrors(deckId);
    renderLearnWidgets();
    showToast(`<i class="fas fa-rotate-left toast__icon"></i><div class="toast__body"><b>Zurückgesetzt</b><span>„${deck.name}" startet wieder bei Lektion 1.</span></div>`);
  });

  // Sprechtempo: Regler + Hörprobe (pro Konto gespeichert).
  const rate = document.getElementById('speechRate');
  const rateLbl = document.getElementById('speechRateLabel');
  if (rate) {
    const paint = v => { if (rateLbl) rateLbl.textContent = `${rateLabel(v)} (${v.toFixed(2)}×)`; };
    rate.value = String(getSpeechRate());
    paint(getSpeechRate());
    rate.addEventListener('input', () => paint(Number(rate.value)));
    rate.addEventListener('change', () => {
      const v = setSpeechRate(rate.value);
      rate.value = String(v);
      paint(v);
      speakSample();
    });
    document.getElementById('speechRateTest')?.addEventListener('click', speakSample);
  }

  const fx = document.getElementById('fxToggle');
  if (fx) {
    fx.checked = fxEnabled();
    fx.addEventListener('change', () => setFxEnabled(fx.checked));
  }

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
