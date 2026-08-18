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
import { syncNow, getLastSync, listLocalAccounts, accountHasData, mergeLocalAccount,
         getSyncKey, readSyncKey, setSyncKey, isValidSyncKey,
         exportProgress, importProgress, deleteAccount } from '../core/sync.js';
import { getCurrentUser } from '../core/auth.js';
import { getSpeechRate, setSpeechRate, rateLabel, speak } from '../utils/speech.js';
import { getReminder, setReminder, notificationsSupported,
         requestNotificationPermission } from '../core/reminder.js';
import { offlineDecks, offlineSupported, savedDeckIds, saveDeckOffline,
         removeDeckOffline, formatBytes } from '../core/offline.js';

// Freitext (Deck- und Kontonamen) darf nie ungeprüft in innerHTML landen —
// importierte Decks bringen einen frei wählbaren Namen mit.
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

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

// Auswahl der weiteren Konten auf diesem Gerät füllen (nur Konten mit
// Lerndaten — leere Konten bringen bei einer Übernahme nichts).
export function renderMergeAccounts() {
  const group = document.getElementById('mergeGroup');
  const select = document.getElementById('mergeAccount');
  if (!group || !select) return;
  const others = listLocalAccounts().filter(accountHasData);
  if (!others.length) { group.hidden = true; return; }
  group.hidden = false;
  select.innerHTML = others.map(u =>
    `<option value="${esc(u)}">${esc(u)}</option>`).join('');
}

// ── Offline verfügbar: je Deck ein Schalter mit Größenangabe ─────
// Die App-Hülle liegt komplett im Precache; nur die Wortlisten kommen
// erst beim Öffnen dazu. Wer sie vorab sichert, kann eine Sprache auch
// starten, die er auf diesem Gerät noch nie geöffnet hat.
export async function renderOfflineDecks() {
  const list = document.getElementById('offlineList');
  const group = document.getElementById('offlineGroup');
  if (!list || !group) return;
  if (!offlineSupported()) { group.hidden = true; return; }
  group.hidden = false;

  const decks = offlineDecks();
  const saved = new Set(await savedDeckIds());
  const savedBytes = decks.filter(d => saved.has(d.id)).reduce((n, d) => n + d.bytes, 0);

  list.innerHTML = decks.map(d => `
    <label class="offline-row">
      <input type="checkbox" data-offline-deck="${esc(d.id)}"${saved.has(d.id) ? ' checked' : ''}>
      <span class="offline-row__main">
        <b>${esc(d.name)}</b>
        <span>${d.count} Karten · ${formatBytes(d.bytes)}</span>
      </span>
      <span class="offline-row__state">${saved.has(d.id) ? '<i class="fas fa-check"></i> gesichert' : 'nicht gesichert'}</span>
    </label>`).join('');

  const total = document.getElementById('offlineTotal');
  if (total) {
    total.textContent = saved.size
      ? `${saved.size} von ${decks.length} Sprachen gesichert · ${formatBytes(savedBytes)}`
      : 'Noch keine Sprache gesichert';
  }

  list.querySelectorAll('[data-offline-deck]').forEach(box =>
    box.addEventListener('change', async () => {
      const deckId = box.dataset.offlineDeck;
      box.disabled = true;
      const ok = box.checked ? await saveDeckOffline(deckId) : await removeDeckOffline(deckId);
      box.disabled = false;
      if (box.checked && !ok) {
        // Ohne Netz lässt sich nichts nachladen — Schalter ehrlich zurückdrehen.
        box.checked = false;
        showToast('<i class="fas fa-circle-exclamation toast__icon"></i><div class="toast__body"><b>Sicherung nicht möglich</b><span>Dafür braucht es einmal eine Verbindung.</span></div>', { variant: 'warn' });
      }
      renderOfflineDecks();
    }));
}

// Konto-Schlüssel anzeigen (standardmäßig verdeckt — er ist das
// Zugangsgeheimnis zum Cloud-Stand).
let keyVisible = false;
export async function renderSyncKey() {
  const field = document.getElementById('syncKeyField');
  if (!field) return;
  const key = readSyncKey() || await getSyncKey();
  field.value = !key ? '' : keyVisible ? key : key.slice(0, 6) + '••••••••••••••••••••' + key.slice(-4);
  field.dataset.key = key || '';
}

// Initialize settings
export function initSettings() {
  // ── Konto-Schlüssel: anzeigen, kopieren, von anderem Gerät übernehmen ──
  renderSyncKey();
  document.getElementById('syncKeyToggle')?.addEventListener('click', () => {
    keyVisible = !keyVisible;
    const icon = document.querySelector('#syncKeyToggle i');
    if (icon) icon.className = keyVisible ? 'fas fa-eye-slash' : 'fas fa-eye';
    renderSyncKey();
  });
  document.getElementById('syncKeyCopy')?.addEventListener('click', async () => {
    const key = document.getElementById('syncKeyField')?.dataset.key;
    if (!key) return;
    try {
      await navigator.clipboard.writeText(key);
      showToast('<i class="fas fa-copy toast__icon"></i><div class="toast__body"><b>Schlüssel kopiert</b><span>Auf dem anderen Gerät einfügen.</span></div>');
    } catch {
      // Zwischenablage gesperrt → Schlüssel sichtbar machen zum Abschreiben.
      keyVisible = true;
      renderSyncKey();
      showToast('<i class="fas fa-circle-info toast__icon"></i><div class="toast__body"><b>Kopieren nicht möglich</b><span>Schlüssel ist jetzt sichtbar.</span></div>', { variant: 'warn' });
    }
  });
  document.getElementById('syncKeyApply')?.addEventListener('click', async () => {
    const input = document.getElementById('syncKeyInput');
    const val = (input?.value || '').trim();
    if (!isValidSyncKey(val)) {
      showToast('<i class="fas fa-circle-exclamation toast__icon"></i><div class="toast__body"><b>Ungültiger Schlüssel</b><span>Er besteht aus 64 Zeichen (0–9, a–f).</span></div>', { variant: 'warn' });
      return;
    }
    if (!confirm('Dieses Gerät mit dem eingegebenen Konto verbinden?\n\n'
      + 'Dein aktueller Fortschritt bleibt erhalten und wird beim nächsten Abgleich zusammengeführt.')) return;
    setSyncKey(val);
    if (input) input.value = '';
    renderSyncKey();
    const res = await syncNow({ force: true });   // neu verbunden → immer holen
    renderSyncState(res);
    if (res.ok) {
      showToast('<i class="fas fa-link toast__icon"></i><div class="toast__body"><b>Gerät verbunden</b><span>Stand abgeglichen.</span></div>');
      document.dispatchEvent(new CustomEvent('lingua:synced'));
    } else {
      showToast('<i class="fas fa-circle-exclamation toast__icon"></i><div class="toast__body"><b>Abgleich fehlgeschlagen</b><span>Schlüssel prüfen.</span></div>', { variant: 'warn' });
    }
  });

  // ── Passwort ändern (Konto-Schlüssel bleibt bestehen) ──
  document.getElementById('pwSaveBtn')?.addEventListener('click', async () => {
    const oldEl = document.getElementById('pwOld');
    const newEl = document.getElementById('pwNew');
    const new2El = document.getElementById('pwNew2');
    const warn = msg => showToast(`<i class="fas fa-circle-exclamation toast__icon"></i><div class="toast__body"><b>${msg}</b></div>`, { variant: 'warn' });
    if ((newEl?.value || '') !== (new2El?.value || '')) { warn('Die neuen Passwörter stimmen nicht überein.'); return; }
    // Schlüssel festschreiben, BEVOR sich der Passwort-Hash ändert —
    // sonst ließe er sich später nicht mehr ableiten.
    await getSyncKey();
    const res = window.LinguaAuth?.changePassword(oldEl?.value, newEl?.value);
    if (!res?.ok) { warn(res?.err || 'Änderung nicht möglich.'); return; }
    [oldEl, newEl, new2El].forEach(el => { if (el) el.value = ''; });
    showToast('<i class="fas fa-key toast__icon"></i><div class="toast__body"><b>Passwort geändert</b><span>Deine Geräte bleiben verbunden.</span></div>');
  });

  // Fortschritt eines anderen lokalen Kontos übernehmen.
  renderMergeAccounts();
  document.getElementById('mergeBtn')?.addEventListener('click', async () => {
    const from = document.getElementById('mergeAccount')?.value;
    const to = getCurrentUser();
    if (!from || !to) return;
    if (!confirm(`Fortschritt von „${from}" in dein Konto „${to}" übernehmen?\n\n`
      + 'Beide Stände werden zusammengeführt — es geht nichts verloren, '
      + `und „${from}" bleibt als Konto erhalten.`)) return;
    const res = mergeLocalAccount(from, to);
    if (!res.ok) {
      showToast('<i class="fas fa-circle-exclamation toast__icon"></i><div class="toast__body"><b>Übernahme nicht möglich</b></div>', { variant: 'warn' });
      return;
    }
    showToast(`<i class="fas fa-code-merge toast__icon"></i><div class="toast__body"><b>Fortschritt übernommen</b><span>„${esc(from)}" ist jetzt Teil von „${esc(to)}".</span></div>`);
    // Stores neu laden, Oberfläche auffrischen und auf die anderen Geräte spiegeln.
    document.dispatchEvent(new CustomEvent('lingua:synced'));
    renderMergeAccounts();
  });

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
    showToast(`<i class="fas fa-rotate-left toast__icon"></i><div class="toast__body"><b>Zurückgesetzt</b><span>„${esc(deck.name)}" startet wieder bei Lektion 1.</span></div>`);
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

  // Tägliche Erinnerung: Schalter + Uhrzeit.
  const rem = document.getElementById('reminderToggle');
  const remRow = document.getElementById('reminderTimeRow');
  const remHour = document.getElementById('reminderHour');
  if (rem && remHour) {
    remHour.innerHTML = Array.from({ length: 24 }, (_, h) =>
      `<option value="${h}">${String(h).padStart(2, '0')}:00</option>`).join('');
    const st = getReminder();
    rem.checked = st.enabled;
    remHour.value = String(st.hour);
    if (remRow) remRow.hidden = !st.enabled;
    if (!notificationsSupported()) {
      rem.disabled = true;
      const hint = document.getElementById('reminderHint');
      if (hint) hint.textContent = 'Dieses Gerät unterstützt keine System-Benachrichtigungen. '
        + 'Tipp: Auf dem iPhone/iPad funktioniert es, wenn du LinguaLearn über „Zum Home-Bildschirm" installierst.';
    }
    rem.addEventListener('change', async () => {
      if (rem.checked) {
        const perm = await requestNotificationPermission();
        if (perm !== 'granted') {
          rem.checked = false;
          showToast('<i class="fas fa-bell-slash toast__icon"></i><div class="toast__body"><b>Keine Erlaubnis</b><span>Benachrichtigungen sind für diese Seite blockiert.</span></div>', { variant: 'warn' });
          return;
        }
      }
      setReminder({ enabled: rem.checked });
      if (remRow) remRow.hidden = !rem.checked;
    });
    remHour.addEventListener('change', () => setReminder({ hour: Number(remHour.value) }));
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

  // ── Kompletten Fortschritt sichern / einspielen ──
  document.getElementById('dataExportBtn')?.addEventListener('click', () => {
    const user = getCurrentUser();
    const payload = exportProgress(user);
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lingualearn-fortschritt-${user}-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast('<i class="fas fa-download toast__icon"></i><div class="toast__body"><b>Sicherung erstellt</b><span>Datei liegt in deinen Downloads.</span></div>');
  });

  const importFile = document.getElementById('dataImportFile');
  document.getElementById('dataImportBtn')?.addEventListener('click', () => importFile?.click());
  importFile?.addEventListener('change', async () => {
    const file = importFile.files?.[0];
    if (!file) return;
    importFile.value = '';
    let payload = null;
    try { payload = JSON.parse(await file.text()); } catch { /* unten abgefangen */ }
    const res = importProgress(payload);
    if (!res.ok) {
      showToast('<i class="fas fa-circle-exclamation toast__icon"></i><div class="toast__body"><b>Sicherung nicht lesbar</b><span>Bitte eine LinguaLearn-Fortschrittsdatei wählen.</span></div>', { variant: 'warn' });
      return;
    }
    showToast('<i class="fas fa-upload toast__icon"></i><div class="toast__body"><b>Sicherung eingespielt</b><span>Beide Stände wurden zusammengeführt.</span></div>');
    document.dispatchEvent(new CustomEvent('lingua:synced'));
  });

  // ── Konto löschen (unwiderruflich) ──
  document.getElementById('accountDeleteBtn')?.addEventListener('click', async () => {
    const user = getCurrentUser();
    if (!user) return;
    if (!confirm(`Konto „${user}" mit allem Fortschritt löschen?\n\n`
      + 'Level, XP, Kartenlevel, Kursstand und Erfolge werden auf diesem Gerät '
      + 'und auf dem Server entfernt. Das lässt sich nicht rückgängig machen.')) return;
    const typed = prompt(`Zur Sicherheit: Tippe deinen Kontonamen „${user}" ein.`);
    if (typed?.trim() !== user) {
      showToast('<i class="fas fa-circle-info toast__icon"></i><div class="toast__body"><b>Abgebrochen</b><span>Name stimmte nicht überein.</span></div>');
      return;
    }
    const res = await deleteAccount(user);
    if (!res.ok) {
      showToast('<i class="fas fa-circle-exclamation toast__icon"></i><div class="toast__body"><b>Löschen nicht möglich</b></div>', { variant: 'warn' });
      return;
    }
    if (res.server === 'failed') {
      alert('Die lokalen Daten wurden gelöscht, der Server war aber nicht erreichbar. '
        + 'Melde dich später noch einmal an und wiederhole das Löschen, um auch den '
        + 'Server-Stand zu entfernen.');
    }
    window.LinguaAuth?.clearUser?.();
    window.LinguaAuth?.showLoginScreen?.();
  });

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
