// ui/dialogue.js
// Interaktiver Alltagsdialog- & Konversations-Simulator für LinguaLearn (v62).
// Unterstützt Multiple-Choice-Antworten und Sprachprüfung via Web Speech Recognition.

import { DIALOGUES } from '../js/data/dialogues.js';
import { getDecks } from '../core/state.js';
import { speak } from '../utils/speech.js';
import { playCorrect, playWrong } from '../utils/feedback.js';
import { comparePronunciation, mismatchHint } from '../utils/pronounce.js';
import { isDialogueCompleted, recordDialogueCompletion, getDialogueStats } from '../core/dialogues.js';
import { escHtml as esc } from '../utils/helpers.js';

let activeScenario = null;
let currentTurnIndex = 0;
let chatMessages = [];
let inputMode = 'choice'; // 'choice' | 'speech'
let isRecording = false;
let speechRecognizer = null;
let speechResult = null;

const SPEECH_LANG_CODES = {
  da: 'da-DK',
  el: 'el-GR',
  fr: 'fr-FR',
  es: 'es-ES',
  la: 'de-DE',
  ru: 'ru-RU',
  ja: 'ja-JP',
  zh: 'zh-CN',
  pt: 'pt-PT',
  ar: 'ar-SA',
  pl: 'pl-PL',
};

function getActiveLanguage() {
  const deckId = document.getElementById('deckSelect')?.value;
  return getDecks()[deckId]?.language || 'da';
}

function getActiveDeckName() {
  const deckId = document.getElementById('deckSelect')?.value;
  return getDecks()[deckId]?.name || 'Dänisch';
}

let selectedCategory = 'all';

const CATEGORIES = [
  { id: 'all', label: 'Alle Szenarien', icon: 'fa-globe' },
  { id: 'food', label: 'Essen & Trinken', icon: 'fa-utensils' },
  { id: 'travel', label: 'Reise & Unterwegs', icon: 'fa-plane-departure' },
  { id: 'health', label: 'Gesundheit & Alltag', icon: 'fa-kit-medical' },
];

// ── Übersicht aller Dialoge der aktuellen Sprache ────────────────────────
export function renderDialogOverview() {
  const container = document.getElementById('dialogContent');
  if (!container) return;

  activeScenario = null;
  const lang = getActiveLanguage();
  const deckName = getActiveDeckName();
  const list = DIALOGUES[lang] || [];
  const stats = getDialogueStats(lang, list.length);

  const filteredList = selectedCategory === 'all'
    ? list
    : list.filter(d => (d.category || 'travel') === selectedCategory);

  container.innerHTML = `
    <div class="dialog-overview">
      <div class="dialog-banner">
        <div class="dialog-banner__info">
          <h3><i class="fas fa-comments"></i> Alltagsdialoge · ${esc(deckName)}</h3>
          <p>Tauche in reale Alltagssituationen ein: Bestellen im Café, Bahnhof, Hotel-Check-in oder Apotheke. Wähle klug oder sprich frei ins Mikrofon!</p>
        </div>
        <div class="dialog-banner__progress">
          <div class="dialog-progress-badge">
            <span class="dpb-number">${stats.completed}/${stats.total}</span>
            <span class="dpb-label">gemeistert</span>
          </div>
        </div>
      </div>

      <div class="dialog-category-filter" id="dialogCategoryFilter">
        ${CATEGORIES.map(c => `
          <button type="button" class="dialog-filter-btn ${selectedCategory === c.id ? 'dialog-filter-btn--active' : ''}" data-category="${c.id}">
            <i class="fas ${c.icon}"></i> ${c.label}
          </button>
        `).join('')}
      </div>

      ${filteredList.length === 0 ? `
        <div class="dialog-empty-state">
          <i class="fas fa-filter"></i> Keine Szenarien in dieser Kategorie für ${esc(deckName)}.
        </div>
      ` : `
        <div class="dialog-grid">
          ${filteredList.map(d => {
            const done = isDialogueCompleted(d.id);
            return `
              <div class="dialog-card ${done ? 'dialog-card--done' : ''}" data-scenario-id="${esc(d.id)}">
                <div class="dialog-card__head">
                  <span class="dialog-card__icon"><i class="fas ${esc(d.icon || 'fa-comments')}"></i></span>
                  <span class="dialog-card__level">${esc(d.level || 'A1')}</span>
                </div>
                <h4 class="dialog-card__title">${esc(d.title)}</h4>
                <p class="dialog-card__desc">${esc(d.situation)}</p>
                <div class="dialog-card__footer">
                  <span class="dialog-card__npc">
                    <i class="fas fa-user"></i> ${esc(d.npcName)} (${esc(d.npcRole)})
                  </span>
                  <span class="dialog-card__status">
                    ${done ? '<i class="fas fa-circle-check"></i> Gemeistert' : 'Starten <i class="fas fa-chevron-right"></i>'}
                  </span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `}
    </div>
  `;
}

// ── Start eines Dialog-Szenarios ─────────────────────────────────────────
export function startDialogue(scenarioId) {
  const lang = getActiveLanguage();
  const list = DIALOGUES[lang] || [];
  const scenario = list.find(s => s.id === scenarioId);
  if (!scenario) return;

  activeScenario = scenario;
  currentTurnIndex = 0;
  chatMessages = [];
  inputMode = 'choice';
  speechResult = null;

  renderDialogueScreen();
  appendNpcTurn(0);
}

function renderDialogueScreen() {
  const container = document.getElementById('dialogContent');
  if (!container || !activeScenario) return;

  const lang = getActiveLanguage();
  const totalTurns = activeScenario.turns.length;

  container.innerHTML = `
    <div class="dialog-simulator" data-lang="${esc(lang)}">
      <div class="dialog-topbar">
        <button type="button" class="btn-back" id="dialogExitBtn">
          <i class="fas fa-arrow-left"></i> Übersicht
        </button>
        <div class="dialog-title-wrap">
          <h4>${esc(activeScenario.title)}</h4>
          <span class="dialog-subtitle">${esc(activeScenario.npcName)} · ${esc(activeScenario.npcRole)}</span>
        </div>
        <div class="dialog-turn-counter" id="dialogTurnCounter">
          Schritt ${currentTurnIndex + 1}/${totalTurns}
        </div>
      </div>

      <div class="dialog-chat" id="dialogChatStream"></div>

      <div class="dialog-input-dock" id="dialogInputDock">
        <!-- Wird dynamisch mit Multiple-Choice oder Audio-Eingabe befüllt -->
      </div>
    </div>
  `;

  document.getElementById('dialogExitBtn')?.addEventListener('click', renderDialogOverview);
}

function appendNpcTurn(turnIndex) {
  const turn = activeScenario.turns[turnIndex];
  if (!turn) return;

  const lang = getActiveLanguage();
  const stream = document.getElementById('dialogChatStream');
  if (!stream) return;

  // Nachricht im Chat ergänzen
  const msgHtml = `
    <div class="chat-msg chat-msg--npc" id="msg-turn-${turnIndex}">
      <div class="chat-avatar"><i class="fas fa-user-circle"></i></div>
      <div class="chat-bubble">
        <div class="chat-bubble__name">${esc(activeScenario.npcName)}</div>
        <div class="chat-bubble__text ${lang === 'ar' ? 'chat-bubble__text--ar' : ''}">${esc(turn.npc)}</div>
        ${turn.npcRoman ? `<div class="chat-bubble__roman">${esc(turn.npcRoman)}</div>` : ''}
        <div class="chat-bubble__actions">
          <button type="button" class="audio-btn chat-audio-btn" data-say="${esc(turn.npc)}" title="Normal anhören">
            <i class="fas fa-volume-up"></i>
          </button>
          <button type="button" class="audio-btn chat-audio-slow-btn" data-say="${esc(turn.npc)}" title="Langsam anhören (0.7×)">
            <i class="fas fa-turtle"></i>
          </button>
          <button type="button" class="chat-trans-toggle" data-target="trans-npc-${turnIndex}">
            <i class="fas fa-language"></i> Übersetzung
          </button>
        </div>
        <div class="chat-bubble__trans" id="trans-npc-${turnIndex}" hidden>${esc(turn.npcDe)}</div>
        ${turn.hint ? `<div class="chat-bubble__hint"><i class="fas fa-circle-info"></i> ${esc(turn.hint)}</div>` : ''}
      </div>
    </div>
  `;

  stream.insertAdjacentHTML('beforeend', msgHtml);
  stream.scrollTop = stream.scrollHeight;

  // Audio automatisch sprechen
  speak(turn.npc, lang);

  // Counter aktualisieren
  const counter = document.getElementById('dialogTurnCounter');
  if (counter) counter.textContent = `Schritt ${turnIndex + 1}/${activeScenario.turns.length}`;

  // Eingabebereich für den Nutzer aufbauen
  renderUserInputDock(turn);
}

function renderUserInputDock(turn) {
  const dock = document.getElementById('dialogInputDock');
  if (!dock) return;

  dock.innerHTML = `
    <div class="input-dock-header">
      <div class="input-dock-prompt">
        <i class="fas fa-bullseye"></i> <b>Deine Antwort:</b> ${esc(turn.prompt)}
      </div>
      <div class="input-dock-modes">
        <button type="button" class="dock-mode-btn ${inputMode === 'choice' ? 'dock-mode-btn--active' : ''}" data-mode="choice">
          <i class="fas fa-list-check"></i> Auswahl
        </button>
        <button type="button" class="dock-mode-btn ${inputMode === 'speech' ? 'dock-mode-btn--active' : ''}" data-mode="speech">
          <i class="fas fa-microphone"></i> Sprechen
        </button>
      </div>
    </div>

    <div class="input-dock-body" id="inputDockBody">
      ${inputMode === 'choice' ? renderChoiceOptions(turn) : renderSpeechRecorder(turn)}
    </div>
  `;

  // Mode toggles
  dock.querySelectorAll('.dock-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      inputMode = btn.dataset.mode;
      renderUserInputDock(turn);
    });
  });

  // Choice options click
  if (inputMode === 'choice') {
    dock.querySelectorAll('.dialog-choice-btn').forEach(btn => {
      btn.addEventListener('click', () => handleChoiceAnswer(btn, turn));
    });
  } else {
    setupSpeechRecorder(turn);
  }
}

function renderChoiceOptions(turn) {
  return `
    <div class="dialog-choices">
      ${turn.options.map((opt, i) => `
        <button type="button" class="dialog-choice-btn" data-correct="${opt.correct}">
          <span class="dcb-key">${i + 1}</span>
          <span class="dcb-content">
            <b class="dcb-target">${esc(opt.text)}</b>
            <span class="dcb-de">${esc(opt.de)}</span>
          </span>
          <span class="dcb-indicator"><i class="fas fa-arrow-right"></i></span>
        </button>
      `).join('')}
    </div>
  `;
}

function renderSpeechRecorder(turn) {
  const lang = getActiveLanguage();
  const hasRecognition = typeof window !== 'undefined' &&
    (window.SpeechRecognition || window.webkitSpeechRecognition);

  return `
    <div class="speech-dock">
      <div class="speech-target-box">
        <span class="stb-label">Sprich diesen Satz laut aus:</span>
        <div class="stb-text ${lang === 'ar' ? 'stb-text--ar' : ''}">${esc(turn.expected)}</div>
        ${turn.expectedRoman ? `<div class="stb-roman">${esc(turn.expectedRoman)}</div>` : ''}
        <div class="stb-de">${esc(turn.expectedDe)}</div>
      </div>

      <div class="speech-actions">
        <button type="button" class="audio-btn stb-listen-btn" id="stbListenBtn" title="Normal anhören">
          <i class="fas fa-volume-up"></i> Anhören
        </button>
        <button type="button" class="audio-btn stb-slow-btn" id="stbSlowBtn" title="Langsam anhören (0.7×)">
          <i class="fas fa-turtle"></i> Langsam
        </button>
        <button type="button" class="mic-record-btn" id="micRecordBtn">
          <i class="fas fa-microphone"></i>
          <span id="micRecordStatus">Aufnahme starten</span>
        </button>
      </div>

      <div class="speech-feedback" id="speechFeedback" hidden></div>
      ${!hasRecognition ? `
        <p class="settings-hint" style="text-align:center;margin-top:6px;">
          Hinweis: Web-Spracherkennung wird von diesem Browser nicht unterstützt. Du kannst den Satz nachsprechen und die Antwort direkt bestätigen oder auf Auswahl wechseln.
        </p>
        <button type="button" class="btn btn-secondary btn-full" id="speechManualConfirmBtn" style="margin-top:8px;">
          <i class="fas fa-check"></i> Als richtig bestätigen & weiter
        </button>
      ` : ''}
    </div>
  `;
}

function handleChoiceAnswer(button, turn) {
  const isCorrect = button.dataset.correct === 'true';

  if (isCorrect) {
    button.classList.add('dialog-choice-btn--correct');
    playCorrect();
    appendUserTurn(turn.expected, turn.expectedDe, () => {
      advanceDialogue();
    });
  } else {
    button.classList.add('dialog-choice-btn--wrong');
    playWrong();
    setTimeout(() => {
      button.classList.remove('dialog-choice-btn--wrong');
    }, 1200);
  }
}

function setupSpeechRecorder(turn) {
  const listenBtn = document.getElementById('stbListenBtn');
  const slowBtn = document.getElementById('stbSlowBtn');
  const micBtn = document.getElementById('micRecordBtn');
  const statusLbl = document.getElementById('micRecordStatus');
  const feedbackEl = document.getElementById('speechFeedback');
  const manualBtn = document.getElementById('speechManualConfirmBtn');
  const lang = getActiveLanguage();

  if (listenBtn) {
    listenBtn.addEventListener('click', () => speak(turn.expected, lang));
  }

  if (slowBtn) {
    slowBtn.addEventListener('click', () => speak(turn.expected, lang, 0.7));
  }

  if (manualBtn) {
    manualBtn.addEventListener('click', () => {
      appendUserTurn(turn.expected, turn.expectedDe, () => {
        advanceDialogue();
      });
    });
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!micBtn || !SpeechRecognition) return;

  micBtn.addEventListener('click', () => {
    if (isRecording) {
      speechRecognizer?.stop();
      return;
    }

    try {
      speechRecognizer = new SpeechRecognition();
      speechRecognizer.lang = SPEECH_LANG_CODES[lang] || 'da-DK';
      speechRecognizer.interimResults = false;
      speechRecognizer.maxAlternatives = 1;

      speechRecognizer.onstart = () => {
        isRecording = true;
        micBtn.classList.add('mic-record-btn--recording');
        if (statusLbl) statusLbl.textContent = 'Ich höre zu …';
      };

      speechRecognizer.onresult = event => {
        const spoken = event.results[0]?.[0]?.transcript || '';
        const evalRes = comparePronunciation(turn.expected, spoken, lang);

        if (feedbackEl) {
          feedbackEl.hidden = false;
          feedbackEl.innerHTML = `
            <div class="feedback-bubble ${evalRes.ok ? 'feedback-bubble--ok' : 'feedback-bubble--warn'}">
              <div class="fb-heard">Gehört: <b>„${esc(spoken)}"</b></div>
              <div class="fb-score">Übereinstimmung: ${Math.round(evalRes.score * 100)}%</div>
              ${mismatchHint(evalRes) ? `<div class="fb-hint">${esc(mismatchHint(evalRes))}</div>` : ''}
            </div>
          `;
        }

        if (evalRes.ok) {
          playCorrect();
          setTimeout(() => {
            appendUserTurn(turn.expected, turn.expectedDe, () => {
              advanceDialogue();
            });
          }, 800);
        } else {
          playWrong();
        }
      };

      speechRecognizer.onerror = () => {
        if (statusLbl) statusLbl.textContent = 'Erneut versuchen';
      };

      speechRecognizer.onend = () => {
        isRecording = false;
        micBtn.classList.remove('mic-record-btn--recording');
        if (statusLbl) statusLbl.textContent = 'Erneut aufnehmen';
      };

      speechRecognizer.start();
    } catch {
      isRecording = false;
    }
  });
}

function appendUserTurn(targetText, translation, callback) {
  const stream = document.getElementById('dialogChatStream');
  const dock = document.getElementById('dialogInputDock');
  if (dock) dock.innerHTML = '<div class="dialog-loading-dots"><span></span><span></span><span></span></div>';

  if (stream) {
    const lang = getActiveLanguage();
    const userMsg = `
      <div class="chat-msg chat-msg--user">
        <div class="chat-bubble chat-bubble--user">
          <div class="chat-bubble__name">Du</div>
          <div class="chat-bubble__text ${lang === 'ar' ? 'chat-bubble__text--ar' : ''}">${esc(targetText)}</div>
          <div class="chat-bubble__trans">${esc(translation)}</div>
        </div>
        <div class="chat-avatar"><i class="fas fa-user-circle"></i></div>
      </div>
    `;
    stream.insertAdjacentHTML('beforeend', userMsg);
    stream.scrollTop = stream.scrollHeight;
  }

  setTimeout(() => {
    callback?.();
  }, 700);
}

function advanceDialogue() {
  currentTurnIndex++;
  if (currentTurnIndex < activeScenario.turns.length) {
    appendNpcTurn(currentTurnIndex);
  } else {
    finishDialogue();
  }
}

function finishDialogue() {
  const lang = getActiveLanguage();
  const res = recordDialogueCompletion(activeScenario.id, lang, 100);
  const container = document.getElementById('dialogContent');
  if (!container) return;

  playCorrect();

  container.innerHTML = `
    <div class="dialog-success-screen">
      <div class="dss-card">
        <div class="dss-confetti">🎉</div>
        <h3>Fantastisch gemeistert!</h3>
        <p class="dss-subtitle">Du hast das Gespräch <b>„${esc(activeScenario.title)}"</b> erfolgreich abgeschlossen.</p>

        <div class="dss-rewards">
          <div class="dss-reward-chip">
            <i class="fas fa-bolt"></i> +${res.xpGained} XP
          </div>
          ${res.gemsGained > 0 ? `
            <div class="dss-reward-chip dss-reward-chip--gems">
              <i class="fas fa-gem"></i> +${res.gemsGained} Diamanten
            </div>
          ` : ''}
        </div>

        <div class="dss-actions">
          <button type="button" class="btn btn-secondary" id="dssReplayBtn">
            <i class="fas fa-rotate-left"></i> Nochmal üben
          </button>
          <button type="button" class="btn btn-primary" id="dssBackBtn">
            <i class="fas fa-list"></i> Weitere Dialoge
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('dssReplayBtn')?.addEventListener('click', () => startDialogue(activeScenario.id));
  document.getElementById('dssBackBtn')?.addEventListener('click', renderDialogOverview);
}

// ── Initialisierung Event Delegation ─────────────────────────────────────
export function initDialogue(activateView) {
  document.getElementById('dialogBackBtn')?.addEventListener('click', () => activateView?.('learn'));
  document.getElementById('dialogBtn')?.addEventListener('click', () => {
    activateView?.('dialog');
    renderDialogOverview();
  });

  const container = document.getElementById('dialogContent');
  if (!container) return;

  container.addEventListener('click', e => {
    // 1. Audio Button (Normal)
    const audioBtn = e.target.closest('.chat-audio-btn');
    if (audioBtn) {
      speak(audioBtn.dataset.say, getActiveLanguage());
      return;
    }

    // 1b. Audio Button (Langsam / 0.7x)
    const audioSlowBtn = e.target.closest('.chat-audio-slow-btn');
    if (audioSlowBtn) {
      speak(audioSlowBtn.dataset.say, getActiveLanguage(), 0.7);
      return;
    }

    // 1c. Kategorie-Filter-Chip
    const filterBtn = e.target.closest('.dialog-filter-btn');
    if (filterBtn && filterBtn.dataset.category) {
      selectedCategory = filterBtn.dataset.category;
      renderDialogOverview();
      return;
    }

    // 2. Übersetzungs-Toggle
    const transToggle = e.target.closest('.chat-trans-toggle');
    if (transToggle) {
      const targetId = transToggle.dataset.target;
      const el = document.getElementById(targetId);
      if (el) el.hidden = !el.hidden;
      return;
    }

    // 3. Szenario auswählen
    const card = e.target.closest('.dialog-card');
    if (card && card.dataset.scenarioId) {
      startDialogue(card.dataset.scenarioId);
    }
  });
}
