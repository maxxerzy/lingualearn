import { loadDeck, getCurrentSession, setCurrentSession, getUserStats, setUserStats } from './state.js';
import { updateProgress } from './progress.js';
import { updateStats } from './stats.js';
import { shuffleArray } from '../utils/helpers.js';
import { isCognate } from '../utils/cognate.js';
import { recordCardAnswer, getDueFronts, getCardState } from './cardProgress.js';
import { recordGameAnswer, recordSessionEnd, checkAchievements, consumeXpBoost, consumeCelebrations, noteCombo, noteBlitz, addBonusXp, getGame, XP } from './gamification.js';
import { pendingChapter, markChapterRead } from './grammar.js';
import { renderGamiHeader, renderLearnWidgets } from '../ui/gami.js';
import { showToast, toastAchievements, toastCosmetics, confettiBurst } from '../ui/toast.js';
import { checkNewCosmetics } from './cosmetics.js';
import { pendingQuestClaims } from './quests.js';
import { saveErrors, clearErrors } from './errorLog.js';
import { playCorrect, playWrong } from '../utils/feedback.js';
import { speak, latinPron } from '../utils/speech.js';
import { syncSoon } from './sync.js';
import { createUserStore } from './userStore.js';

// Vergoldete (nach Abschluss wiederholte) Lektionen pro Deck.
const goldStore = createUserStore('lingualearn_gold_');
export function reinitGold() { goldStore.reinit(); }
export function getGoldLessons(deckId) { return goldStore.get()[deckId] || []; }
export function resetGoldLessons(deckId) {
  const map = goldStore.get();
  if (map[deckId]) { delete map[deckId]; goldStore.save(map); }
}
function markGoldLesson(deckId, lessonIdx) {
  const map = goldStore.get();
  const arr = new Set(map[deckId] || []);
  arr.add(lessonIdx);
  map[deckId] = [...arr];
  goldStore.save(map);
}

// Themen-Abzeichen: bestandene Themen-Quizze pro Deck (Thema → Datum).
const quizStore = createUserStore('lingualearn_themequiz_');
export function reinitThemeBadges() { quizStore.reinit(); }
export function getThemeBadges(deckId) { return quizStore.get()[deckId] || {}; }
export function resetThemeBadges(deckId) {
  const map = quizStore.get();
  if (map[deckId]) { delete map[deckId]; quizStore.save(map); }
}
function awardThemeBadge(deckId, theme) {
  const map = quizStore.get();
  const badges = map[deckId] || {};
  badges[theme] = new Date().toISOString().slice(0, 10);
  map[deckId] = badges;
  quizStore.save(map);
}
import { nextLessonCards, lessonNumber, advanceCourse, getCourseState, getSentencesDone, markSentencesDone } from './course.js';

// Erfolge prüfen + einblenden, danach dadurch freigeschaltete Cosmetics.
function announceUnlocks() {
  toastAchievements(checkAchievements());
  toastCosmetics(checkNewCosmetics());
}

// Combo-Anzeige (aufeinanderfolgende richtige Antworten).
function showCombo(combo, bonus) {
  let el = document.getElementById('comboFloat');
  if (!el) { el = document.createElement('div'); el.id = 'comboFloat'; el.className = 'combo-float'; document.body.appendChild(el); }
  if (combo >= 3) {
    el.innerHTML = `<i class="fas fa-fire"></i> Combo ×${combo}${bonus ? ` <span>+${bonus}</span>` : ''}`;
    el.classList.remove('combo-float--show');
    void el.offsetWidth;   // Reflow → Animation neu starten
    el.classList.add('combo-float--show');
  } else {
    el.classList.remove('combo-float--show');
  }
}

// Zusatz-Belohnungen am Sessionende: Diamanten-Pille, XP-Boost-Hinweis,
// Streak-Freeze- und Quest-Meldungen.
function rewardExtras(gemsEarned, boosted) {
  return `${gemsEarned ? `<span class="reward-pill reward-pill--gems"><i class="fas fa-gem"></i> +${gemsEarned}</span>` : ''}${boosted ? '<span class="reward-pill reward-pill--boost"><i class="fas fa-bolt"></i> 2× XP</span>' : ''}`;
}
function celebrateSessionEnd() {
  announceCelebrations();
  const g = getGame();
  if (g.streakFrozeToday) {
    showToast('<i class="fas fa-snowflake toast__icon"></i><div class="toast__body"><b>Streak-Freeze eingesetzt</b><span>Deine Serie ist geschützt geblieben.</span></div>');
  }
  const pend = pendingQuestClaims();
  if (pend.length) {
    showToast(`<i class="fas fa-bullseye toast__icon"></i><div class="toast__body"><b>${pend.length} Quest${pend.length > 1 ? 's' : ''} erledigt!</b><span>In der Arena abholen (+Diamanten).</span></div>`);
  }
}

const LANG_CODES = { da: 'da-DK', el: 'el-GR', fr: 'fr-FR', es: 'es-ES', la: 'la', ru: 'ru-RU', ja: 'ja-JP', zh: 'zh-CN' };
const LANG_NAMES  = { da: 'Dänisch', el: 'Griechisch', fr: 'Französisch', es: 'Spanisch', la: 'Latein', ru: 'Russisch', ja: 'Japanisch', zh: 'Chinesisch' };

function getLangCode(lang) {
  return LANG_CODES[lang] || lang;
}

function getLangName(lang) {
  return LANG_NAMES[lang] || lang;
}

function speakWord(text, lang) {
  speak(text, lang);
}

// ── Abfragerichtung ──────────────────────────────────────────────
// Latein wird in Prüfungsrichtung gelernt: die Abfrage zeigt das
// LATEINISCHE Wort, geantwortet wird auf Deutsch (wie im Unterricht).
// Alle anderen Sprachen fragen weiterhin Deutsch → Fremdsprache ab.
function isReverse(deck) { return deck?.language === 'la'; }
function promptText(session, card) { return isReverse(session.deck) ? card.back : card.front; }
function answerText(session, card) { return isReverse(session.deck) ? card.front : card.back; }
function promptLabel(session) { return isReverse(session.deck) ? getLangName(session.deck.language) : 'Deutsch'; }
function answerLabel(session) { return isReverse(session.deck) ? 'Deutsch' : getLangName(session.deck.language); }
// Aussprache-Knopf neben dem fremdsprachigen Abfragewort (nur umgekehrte Richtung).
function promptAudioBtn(session) {
  return isReverse(session.deck)
    ? '<button type="button" class="audio-btn" id="promptAudioBtn" title="Aussprache anhören"><i class="fas fa-volume-up"></i></button>'
    : '';
}
function wirePromptAudio(session, card) {
  document.getElementById('promptAudioBtn')?.addEventListener('click', () =>
    speakWord(card.back, session.deck.language));
}

export function getSelectedMode() {
  const btn = document.querySelector('.mode-btn.active');
  return btn ? btn.dataset.mode : 'flashcard';
}

// Fokus-Modus: blendet (mobil) die Konfiguration aus und zeigt nur den
// Lernbereich mit Zurück-/Modus-Leiste. Die Lernkarte gibt's im Kurs.
function enterFocus(mode) {
  setTimeout(fitLearnArea, 0);   // nach dem Umschalten des Layouts messen
  document.getElementById('view-learn')?.classList.add('session-active');
  const mapBtn = document.getElementById('sessionMapBtn');
  if (mapBtn) mapBtn.hidden = mode !== 'course';
  const menu = document.getElementById('sessionModeMenu');
  if (menu) menu.hidden = true;
  // Modus-Knopf zeigt das Icon des aktuellen Modus (+ Pfeil aus dem CSS).
  const icon = document.getElementById('sessionModeIcon');
  const srcIcon = document.querySelector(`.mode-btn[data-mode="${mode}"] i`);
  if (icon && srcIcon) icon.className = srcIcon.className;
}

// Blitzrunden-Timer + Quiz-Weiterschalt-Timeout (Modul-weit, damit
// Verlassen/Neustart sie stoppt).
let blitzTimer = null;
let quizTimeout = null;
function clearBlitzTimer() {
  if (blitzTimer) { clearInterval(blitzTimer); blitzTimer = null; }
  if (quizTimeout) { clearTimeout(quizTimeout); quizTimeout = null; }
}

// Session verlassen → zurück zur Konfiguration.
export function exitSession() {
  clearBlitzTimer();
  setCurrentSession(null);
  document.getElementById('view-learn')?.classList.remove('session-active');
  const menu = document.getElementById('sessionModeMenu');
  if (menu) menu.hidden = true;
  const title = document.getElementById('session-title');
  if (title) title.textContent = 'Bereit zum Lernen';
  const area = document.getElementById('learnArea');
  if (area) area.innerHTML = `
    <div class="learn-empty">
      <div class="learn-empty__icon"><i class="fas fa-graduation-cap"></i></div>
      <h3 class="learn-empty__title">Bereit zum Lernen</h3>
      <p>Wähle ein Deck und einen Modus, dann starte die Session.</p>
    </div>`;
  const t = document.getElementById('progress-text');
  if (t) t.textContent = '0/0 Karten';
  const b = document.getElementById('progress-bar');
  if (b) b.style.width = '0%';
  renderLearnWidgets();
}

// Scrollt die Karte INNERHALB des Lernbereichs so, dass der Weiter-Knopf
// sichtbar ist. Nötig auf kleinen Geräten, wenn Aufgabe + Rückmeldung
// zusammen höher werden als der Bildschirm (z. B. langer Lückensatz mit
// Schriftzeichen). Ein einziger Beobachter deckt alle Kurs-Phasen ab.
// No-Scroll-Garantie, exakt gemessen statt geschätzt: Passt der Inhalt
// nicht in den Bildschirm, bekommt NUR der Lernbereich einen Deckel und
// scrollt intern — die Seite selbst nie. Ohne Überlauf bleibt alles
// ungedeckelt (kein Deckel „auf Verdacht", der Knöpfe verstecken würde).
function fitLearnArea() {
  const area = document.getElementById('learnArea');
  if (!area) return;
  area.style.maxHeight = '';
  area.style.overflowY = '';
  if (!document.getElementById('view-learn')?.classList.contains('session-active')) return;
  const over = document.documentElement.scrollHeight - window.innerHeight;
  if (over <= 2) return;
  const h = area.getBoundingClientRect().height;
  area.style.maxHeight = `${Math.max(180, Math.floor(h - over - 4))}px`;
  area.style.overflowY = 'auto';
}

if (typeof MutationObserver !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const area = document.getElementById('learnArea');
    if (!area) return;
    window.addEventListener('resize', fitLearnArea);
    window.addEventListener('orientationchange', fitLearnArea);
    // Style-Änderungen lösen den Beobachter nicht aus (nur childList),
    // deshalb kann fitLearnArea hier gefahrlos die Höhe setzen.
    new MutationObserver(() => {
      fitLearnArea();
      // Ist der Weiter-Knopf unter den sichtbaren Rand gerutscht, die
      // Karte (nicht die Seite!) so weit scrollen, dass er erscheint.
      // #gramNext gehört dazu: In der Grammatik-Übung steht der
      // Weiter-Knopf unter Frage, Antworten, Rückmeldung und Begründung
      // — auf einem iPhone SE landet er sonst unter dem Rand.
      const btn = area.querySelector('#courseNext, #mcNext, #gramNext');
      if (!btn) return;
      const areaBox = area.getBoundingClientRect();
      if (btn.getBoundingClientRect().bottom > areaBox.bottom - 4) {
        btn.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }).observe(area, { childList: true, subtree: true });
  });
}

// ── Tastatur-Steuerung (Mac/iPad mit Tastatur) ───────────────────
// 1–4 bzw. A–D wählen eine Antwort, Leertaste spielt die Aussprache,
// Enter drückt den hervorgehobenen Weiter-/Prüfen-Knopf. In Textfeldern
// greift nichts davon — dort tippt man ja gerade seine Antwort.
document.addEventListener('keydown', e => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  if (!document.getElementById('view-learn')?.classList.contains('session-active')) return;
  const area = document.getElementById('learnArea');
  if (!area) return;
  const t = e.target;
  if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;

  const key = e.key.toLowerCase();
  const idx = /^[1-9]$/.test(key) ? Number(key) - 1 : 'abcd'.indexOf(key);
  if (idx >= 0) {
    const opts = [...area.querySelectorAll('.mc-option')].filter(b => !b.disabled);
    if (opts[idx]) { e.preventDefault(); opts[idx].click(); }
    return;
  }

  if (e.key === ' ' || e.code === 'Space') {
    const audio = area.querySelector('.listen-play, .audio-btn');
    if (audio) { e.preventDefault(); audio.click(); }
    return;
  }

  if (e.key === 'Enter') {
    const btn = [...area.querySelectorAll('.btn-primary')].find(b => !b.disabled);
    if (btn) { e.preventDefault(); btn.click(); }
  }
});

// Beispielsatz mit Aussprache-Knopf rechts daneben. Der Knopf trägt den
// Satz als data-Attribut; ein einziger Listener im Lernbereich spricht ihn.
function exampleLine(sentence, { strong = true } = {}) {
  const text = escHtml(sentence);
  const inner = strong ? `<strong>${text}</strong>` : text;
  return `<span class="ex-line">${inner}
    <button type="button" class="audio-btn ex-audio" data-say="${text}" title="Satz anhören" aria-label="Satz anhören">
      <i class="fas fa-volume-up"></i>
    </button></span>`;
}

// Einmal pro Render aktivieren: alle Satz-Knöpfe im Lernbereich verdrahten.
function wireExampleAudio(lang) {
  document.querySelectorAll('#learnArea .ex-audio').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      speakWord(btn.dataset.say, lang);
    });
  });
}

// Kognat-Hinweis: verwandte Wörter merkt man sich leichter.
function cognateChip(card) {
  if (!isCognate(card.front, card.back, card.roman)) return '';
  return `<div class="cognate-chip" title="Dieses Wort ist mit dem deutschen „${escHtml(card.front)}" verwandt — leichter zu merken!">
    <i class="fas fa-link"></i> verwandt mit „${escHtml(card.front)}"
  </div>`;
}

export async function startSession() {
  clearBlitzTimer();
  const deckId = document.getElementById('deckSelect').value;
  const startBtn = document.getElementById('startBtn');
  if (startBtn) startBtn.disabled = true;

  const deck = await loadDeck(deckId);

  if (startBtn) startBtn.disabled = false;

  if (!deck?.cards?.length) {
    alert('Bitte wähle ein gültiges Deck aus.');
    return;
  }

  // Fällig-Modus (Einmal-Filter der „Für dich"-Leiste): nur Karten lernen,
  // deren Wiederholungsdatum erreicht ist; danach wird der Filter gelöst.
  let sessionCards = deck.cards;
  const dueChk = document.getElementById('dueOnly');
  if (dueChk?.checked) {
    dueChk.checked = false;
    const dueFronts = new Set(getDueFronts(deckId));
    const dueCards = deck.cards.filter(c => dueFronts.has(c.front));
    if (dueCards.length === 0) {
      alert('Keine fälligen Karten in diesem Deck — starte eine normale Session, um neue Karten zu lernen.');
      return;
    }
    sessionCards = dueCards;
  }

  const mode = getSelectedMode();

  enterFocus(mode);

  if (mode === 'course') {
    // Grammatik zuerst: steht vor dieser Lektion ein ungelesenes Kapitel
    // an (z. B. „So funktioniert Dänisch" vor Lektion 1), kommt es vor
    // die Vokabeln — Sprache lernen heißt auch Grammatik lernen.
    if (await maybeStartGrammar(deck, deckId)) return;
    startCourseLesson(deck, deckId);
    return;
  }

  const shuffled = shuffleArray([...sessionCards]);

  const session = {
    deck,
    deckId,
    cards: shuffled,
    mode,
    currentIndex: 0,
    correctAnswers: 0,
    totalCards: shuffled.length,
    currentPrompt: null,
    combo: 0,
    boosted: consumeXpBoost(),   // XP-Boost aus dem Shop einlösen
    // flashcard
    queue: [...shuffled],
    reviewQueue: [],
    reviewRound: 1
  };

  setCurrentSession(session);
  document.getElementById('session-title').textContent = `${deck.name}`;
  updateProgress();

  // Außerhalb des Lernkurses gibt es nur noch die Karteikarten; die
  // Multiple-Choice-Ansicht bleibt für Lektions-Wiederholungen erhalten.
  if (mode === 'multiplechoice') showMultipleChoice();
  else showFlashcard();
}

// ── FLASHCARD MODE ───────────────────────────────────────────────

function showFlashcard() {
  const session = getCurrentSession();
  if (!session || session.queue.length === 0) {
    endSession();
    return;
  }

  const card = session.queue[0];
  const learnArea = document.getElementById('learnArea');

  learnArea.innerHTML = `
    <div class="flashcard-front">
      <p class="fc-label">${promptLabel(session)}</p>
      <div class="fc-word">${escHtml(promptText(session, card))} ${promptAudioBtn(session)}</div>
      <div class="actions">
        <button type="button" class="btn btn-primary" id="showAnswer">
          <i class="fas fa-eye"></i> Antwort zeigen
        </button>
      </div>
      <div class="fc-queue-info">
        ${session.reviewRound > 1
          ? `<span class="review-badge"><i class="fas fa-redo"></i> Wiederholung ${session.reviewRound}</span>`
          : ''}
      </div>
    </div>
  `;

  wirePromptAudio(session, card);
  if (isReverse(session.deck)) speakWord(card.back, session.deck.language);
  document.getElementById('showAnswer').addEventListener('click', () => showFlashcardBack(card));
  updateProgress();
}

function showFlashcardBack(card) {
  const session = getCurrentSession();
  const lang = session.deck.language;
  const learnArea = document.getElementById('learnArea');

  // Pronunciation of the target word: IPA (+ romanization for non-Latin scripts).
  const ipaParts = [];
  if (card.ipa)   ipaParts.push(`<span class="fc-ipa-tip__ipa">/${escHtml(card.ipa)}/</span>`);
  if (card.roman) ipaParts.push(`<span class="fc-ipa-tip__roman">${escHtml(card.roman)}</span>`);
  // Latein: zusätzlich die klassische Aussprache in deutscher Umschrift.
  if (lang === 'la') ipaParts.push(`<span class="fc-ipa-tip__roman">gesprochen: „${escHtml(latinPron(card.back))}"</span>`);
  const ipaMarkup = ipaParts.join('');
  const pron = ipaParts.length > 0;

  // Der Aussprache-Knopf gehört immer zum fremdsprachigen Wort — bei
  // umgekehrter Richtung (Latein) steht das oben als Abfrage.
  const audioBtnHtml = `
        <button type="button" class="audio-btn" id="audioBtn" title="Aussprache anhören">
          <i class="fas fa-volume-up"></i>
        </button>`;
  learnArea.innerHTML = `
    <div class="flashcard-back">
      <p class="fc-label">${promptLabel(session)}</p>
      <div class="fc-word fc-word-source">${escHtml(promptText(session, card))}${isReverse(session.deck) ? audioBtnHtml : ''}</div>
      <div class="fc-arrow"><i class="fas fa-arrow-down"></i></div>
      <p class="fc-label">${answerLabel(session)}</p>
      <div class="fc-word fc-word-target">
        ${escHtml(answerText(session, card))}${isReverse(session.deck) ? '' : audioBtnHtml}
      </div>
      ${cognateChip(card)}
      ${card.example ? `
        <div class="fc-example-block">
          <p class="fc-example${pron ? ' has-ipa' : ''}"${pron ? ' tabindex="0"' : ''}>
            ${exampleLine(card.example)}
            ${pron ? `<span class="fc-ipa-tip" role="tooltip">
              <span class="fc-ipa-tip__word">${escHtml(card.back)}</span>${ipaMarkup}
            </span>` : ''}
          </p>
          ${card.exampleDE ? `<p class="fc-example-de">${escHtml(card.exampleDE)}</p>` : ''}
        </div>
      ` : ''}
      <div class="fc-rating">
        <p class="fc-rating-label">Wie gut wusstest du das?</p>
        <div class="actions">
          <button type="button" class="btn btn-easy" data-rating="easy">
            <i class="fas fa-star"></i> Einfach
          </button>
          <button type="button" class="btn btn-good" data-rating="good">Gut</button>
          <button type="button" class="btn btn-hard" data-rating="hard">Schwer</button>
          <button type="button" class="btn btn-again" data-rating="again">
            <i class="fas fa-redo"></i> Nochmal
          </button>
        </div>
      </div>
    </div>
  `;

  // Auto-play pronunciation
  speakWord(card.back, lang);

  document.getElementById('audioBtn').addEventListener('click', () => speakWord(card.back, lang));
  wireExampleAudio(lang);

  // Touch devices have no hover — let a tap toggle the pronunciation tooltip.
  const exampleEl = learnArea.querySelector('.fc-example.has-ipa');
  if (exampleEl) {
    exampleEl.addEventListener('click', () => exampleEl.classList.toggle('show-ipa'));
  }

  document.querySelectorAll('[data-rating]').forEach(btn => {
    btn.addEventListener('click', () => rateFlashcard(card, btn.dataset.rating));
  });
}

function rateFlashcard(card, rating) {
  const session = getCurrentSession();
  const userStats = getUserStats();

  session.queue.shift();
  session.currentIndex++;

  // „Nochmal" legt die Karte in die Wiederholungsrunde dieser Session.
  if (rating === 'again') {
    session.reviewQueue.push(card);
  }

  const isCorrect = rating !== 'again' && rating !== 'hard';
  if (isCorrect) {
    session.correctAnswers++;
    userStats.learnedWords = (userStats.learnedWords || 0) + 1;
    userStats.totalCorrect = (userStats.totalCorrect || 0) + 1;
  }
  userStats.totalAnswered = (userStats.totalAnswered || 0) + 1;
  userStats.successRate = Math.round((session.correctAnswers / session.currentIndex) * 100);
  setUserStats(userStats);
  updateStats();

  recordAnswerEffects(session, card, isCorrect, rating);

  if (session.queue.length === 0) {
    if (session.reviewQueue.length > 0) {
      session.queue = shuffleArray([...session.reviewQueue]);
      session.reviewQueue = [];
      session.reviewRound++;
      session.currentIndex = 0;
      session.correctAnswers = 0;
    } else {
      setCurrentSession(session);
      endSession();
      return;
    }
  }

  setCurrentSession(session);
  updateProgress();
  showFlashcard();
}

// ── MULTIPLE CHOICE MODE ─────────────────────────────────────────

function showMultipleChoice() {
  const session = getCurrentSession();
  if (!session || session.currentIndex >= session.cards.length) {
    endSession();
    return;
  }

  const card = session.cards[session.currentIndex];
  const lang = session.deck.language;
  const options = buildMCOptions(card, session.cards);

  const learnArea = document.getElementById('learnArea');
  learnArea.innerHTML = `
    <div class="mc-card">
      <p class="fc-label">${promptLabel(session)}</p>
      <div class="fc-word mc-question">${escHtml(promptText(session, card))} ${promptAudioBtn(session)}</div>
      <p class="prompt">${answerLabel(session)} — welche Übersetzung stimmt?</p>
      ${mcOptionsMarkup(options, { withAudio: !isReverse(session.deck), textOf: o => answerText(session, o) })}
    </div>
  `;

  session.currentIndex++;
  session.currentPrompt = { card, options };
  setCurrentSession(session);
  updateProgress();
  wirePromptAudio(session, card);
  if (isReverse(session.deck)) speakWord(card.back, lang);

  learnArea.querySelectorAll('.mc-audio').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      speakWord(btn.dataset.text, lang);
    });
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        speakWord(btn.dataset.text, lang);
      }
    });
  });

  learnArea.querySelectorAll('.mc-option').forEach(btn => {
    btn.addEventListener('click', () => checkMCAnswer(Number(btn.dataset.idx)));
  });
}

function buildMCOptions(card, cards) {
  // Distraktoren müssen sich auf BEIDEN Seiten unterscheiden — sonst
  // gäbe es bei umgekehrter Richtung doppelte Antworttexte.
  const wrongs = shuffleArray(cards.filter(c => c.back !== card.back && c.front !== card.front)).slice(0, 3);
  return shuffleArray([card, ...wrongs]);
}

// Gemeinsames Markup der Antwort-Optionen (A–D) + Feedback-Container.
// withAudio blendet je Option einen Aussprache-Knopf ein (nur MC-Modus).
// textOf bestimmt die angezeigte Seite (Standard: Fremdsprache/back).
function mcOptionsMarkup(options, { withAudio = false, textOf = o => o.back } = {}) {
  return `
      <div class="mc-options" role="group" aria-label="Antwortmöglichkeiten">
        ${options.map((opt, i) => `
          <button type="button" class="btn mc-option" data-idx="${i}"
            aria-keyshortcuts="${i + 1} ${'abcd'[i]}">
            <span class="mc-key" aria-hidden="true">${'ABCD'[i]}</span>
            <span class="mc-text">${escHtml(textOf(opt))}${withAudio ? `
              <span class="audio-btn mc-audio" role="button" tabindex="0" data-text="${escHtml(textOf(opt))}" title="Aussprache">
                <i class="fas fa-volume-up"></i>
              </span>` : ''}</span>
          </button>
        `).join('')}
      </div>
      <div id="mc-fb"></div>`;
}

// Deaktiviert die Optionen und markiert richtig/falsch. Gibt Auswertung zurück.
function markMcAnswer(options, chosenIdx, card) {
  const correctIdx = options.findIndex(o => o.back === card.back);
  const isCorrect = options[chosenIdx].back === card.back;
  document.querySelectorAll('.mc-option').forEach((b, i) => {
    b.disabled = true;
    if (i === correctIdx) b.classList.add('mc-correct');
    else if (i === chosenIdx && !isCorrect) b.classList.add('mc-wrong');
  });
  return { isCorrect, correctIdx };
}

// Gemeinsamer Abschluss jeder Antwort: SRS-Level, XP, Header/Widgets, Erfolge.
// ratingOrBool geht an das SRS (Flashcard: 'easy'|'good'|'hard'|'again';
// die MC/Vergleich/Kurs-Pfade übergeben einfach isCorrect).
function recordAnswerEffects(session, card, isCorrect, ratingOrBool) {
  recordCardAnswer(session.deckId, card.front, ratingOrBool);
  // Combo: Serie richtiger Antworten gibt Bonus-XP (bis +10).
  session.combo = isCorrect ? (session.combo || 0) + 1 : 0;
  if (isCorrect) noteCombo(session.combo);
  const comboBonus = isCorrect && session.combo >= 2 ? Math.min(session.combo - 1, 5) * 2 : 0;
  const { gained } = recordGameAnswer(isCorrect, { bonus: comboBonus, boost: !!session.boosted });
  session.xpFromAnswers = (session.xpFromAnswers || 0) + gained;
  // Falsche Antworten fürs anschließende Fehler-Training merken.
  if (!isCorrect) {
    session.wrongCards = session.wrongCards || [];
    if (!session.wrongCards.some(c => c.front === card.front)) session.wrongCards.push(card);
  }
  renderGamiHeader();
  renderLearnWidgets();
  announceUnlocks();
  announceCelebrations();
  showCombo(session.combo, comboBonus);
  if (isCorrect) playCorrect(); else playWrong();
}

// Level-Up- und Streak-Truhen-Feiern (Toast + Konfetti).
function announceCelebrations() {
  const c = consumeCelebrations();
  if (c.levelUp) {
    confettiBurst();
    showToast(`<i class="fas fa-trophy toast__icon"></i><div class="toast__body"><b>Level ${c.levelUp} erreicht! 🎉</b><span>+${c.gemBonus} Diamanten als Bonus</span></div>`);
  }
  if (c.chest) {
    confettiBurst();
    showToast(`<i class="fas fa-box-open toast__icon"></i><div class="toast__body"><b>${c.chest.days}-Tage-Truhe geöffnet! 🎁</b><span>+${c.chest.gems} Diamanten für deine Serie</span></div>`);
  }
  if (c.wager) {
    if (c.wager.won) { confettiBurst(); showToast('<i class="fas fa-dice toast__icon"></i><div class="toast__body"><b>Wette gewonnen! 🎲</b><span>Doppelt oder nichts: +100 Diamanten</span></div>'); }
    else showToast('<i class="fas fa-dice toast__icon"></i><div class="toast__body"><b>Wette verloren</b><span>Die Serie ist gerissen — versuch es neu!</span></div>', { variant: 'warn' });
  }
}

// Tages-Rückblick: kleine Bilanz des heutigen Lernens für die Endkarte.
function dailyRecapHtml() {
  const g = getGame();
  const d = g.daily.date === new Date().toISOString().slice(0, 10) ? g.daily : {};
  return `
    <div class="day-recap">
      <span class="day-recap__title"><i class="fas fa-sun"></i> Heute</span>
      <span class="day-recap__stat"><b>${d.xp || 0}</b> XP</span>
      <span class="day-recap__stat"><b>${d.correct || 0}</b> richtig</span>
      <span class="day-recap__stat"><b>×${d.combo || 0}</b> Combo</span>
      <span class="day-recap__stat"><b>${g.streak.current}</b> 🔥</span>
    </div>`;
}

function checkMCAnswer(selectedIdx) {
  const session = getCurrentSession();
  const userStats = getUserStats();
  const { card, options } = session.currentPrompt;
  const lang = session.deck.language;

  const { isCorrect } = markMcAnswer(options, selectedIdx, card);

  if (isCorrect) {
    session.correctAnswers++;
    userStats.learnedWords = (userStats.learnedWords || 0) + 1;
    userStats.totalCorrect = (userStats.totalCorrect || 0) + 1;
    speakWord(card.back, lang);
  }
  userStats.totalAnswered = (userStats.totalAnswered || 0) + 1;
  userStats.successRate = Math.round((session.correctAnswers / session.currentIndex) * 100);
  setUserStats(userStats);
  updateStats();
  session.currentPrompt = null;
  setCurrentSession(session);

  recordAnswerEffects(session, card, isCorrect, isCorrect);

  const fb = document.getElementById('mc-fb');
  fb.innerHTML = isCorrect
    ? `<div class="correct" style="margin-top:14px"><p>✅ Richtig!</p></div>`
    : `<div class="incorrect" style="margin-top:14px">
         <p>❌ Falsch — richtig: <b>${escHtml(answerText(session, card))}</b></p>
       </div>`;

  fb.innerHTML += `
    <div class="actions" style="margin-top:14px">
      <button type="button" class="btn btn-primary" id="mcNext">Weiter</button>
    </div>
  `;

  document.getElementById('mcNext').addEventListener('click', showMultipleChoice);
}

// ── TYPING MODE (freies Abrufen) ─────────────────────────────────
// Die Übersetzung selbst eintippen — tolerant gegenüber Groß-/Klein-
// schreibung, Satzzeichen und Sonderbuchstaben (æ→ae, ø→o …); für
// nicht-lateinische Schriften (ru/ja) zählt auch die Umschrift (roman).
const TYPO_MAP = { 'æ': 'ae', 'ø': 'o', 'å': 'a', 'ß': 'ss', 'œ': 'oe', 'ð': 'd', 'þ': 'th' };
function normAnswer(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[.,!?;:„“”"'’«»()¿¡]/g, '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[æøåßœðþ]/g, ch => TYPO_MAP[ch] || ch)
    .replace(/\s+/g, ' ')
    .trim();
}

// Spracherkennung (Sprechen-Schritt im Kurs). Wo sie fehlt (z. B. iOS),
// weicht der Kurs auf Referenz-Audio + Selbsteinschätzung aus.
function speechRecognitionCtor() {
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

// ── SESSION-ENDE ─────────────────────────────────────────────────

function endSession() {
  const session = getCurrentSession();
  const userStats = getUserStats();

  // Count completed session and track active days
  userStats.totalSessions = (userStats.totalSessions || 0) + 1;
  const today = new Date().toISOString().slice(0, 10);
  if (userStats.lastSessionDate !== today) {
    userStats.activeDays = (userStats.activeDays || 0) + 1;
    userStats.lastSessionDate = today;
  }
  setUserStats(userStats);
  updateStats();

  const total = session?.totalCards || session?.cards?.length || 0;
  const correct = session?.correctAnswers || 0;
  const rate = total > 0 ? Math.round((correct / total) * 100) : 0;

  const { xpEarned, perfect, gemsEarned, game } = recordSessionEnd({
    language: session?.deck?.language,
    correct,
    total,
    boost: !!session?.boosted,
  });
  // Gesamte Session-XP: Antworten + Abschluss-Bonus (+ Perfekt-Bonus).
  const xpTotal = (session?.xpFromAnswers || 0) + xpEarned;
  showCombo(0);
  renderGamiHeader();
  renderLearnWidgets();
  const freshAchievements = checkAchievements();

  // Fehler für „Für dich"/Fehler-Training über Neustarts hinweg merken.
  if (session?.wrongCards?.length) saveErrors(session.deckId, session.wrongCards.map(c => c.front));
  // Wiederholung einer abgeschlossenen Lektion → Knoten vergolden.
  if (session?.reviewLesson) {
    markGoldLesson(session.reviewLesson.deckId, session.reviewLesson.index);
    showToast('<i class="fas fa-medal toast__icon"></i><div class="toast__body"><b>Lektion vergoldet! ✨</b><span>Wiederholung abgeschlossen</span></div>');
  }

  document.getElementById('learnArea').innerHTML = `
    <h3 style="font-size:1.6rem;margin-bottom:12px">🎉 Session beendet!</h3>
    <p style="color:var(--gray);margin-bottom:6px">${correct} von ${total} Karten richtig</p>
    <p style="font-size:1.4rem;font-weight:700;color:var(--primary);margin-bottom:14px">${rate}%</p>
    <div class="session-rewards">
      <span class="reward-pill reward-pill--xp"><i class="fas fa-bolt"></i> +${xpTotal} XP</span>
      ${rewardExtras(gemsEarned, session?.boosted)}
      ${perfect ? '<span class="reward-pill reward-pill--perfect"><i class="fas fa-star"></i> Perfekte Session!</span>' : ''}
      <span class="reward-pill reward-pill--streak"><i class="fas fa-fire"></i> Serie: ${game.streak.current} ${game.streak.current === 1 ? 'Tag' : 'Tage'}</span>
    </div>
    ${dailyRecapHtml()}
    <div class="actions" style="margin-top:20px">
      ${session?.wrongCards?.length ? `
        <button type="button" class="btn btn-error-review" id="reviewErrorsBtn">
          <i class="fas fa-rotate-left"></i> Fehler üben (${session.wrongCards.length})
        </button>` : ''}
      <button type="button" class="btn btn-primary" id="restartSession">
        <i class="fas fa-redo"></i> Noch einmal
      </button>
    </div>
  `;

  toastAchievements(freshAchievements);
  toastCosmetics(checkNewCosmetics());
  celebrateSessionEnd();
  syncSoon();                       // Fortschritt auf die anderen Geräte spiegeln
  document.getElementById('restartSession').addEventListener('click', startSession);
  const wrong = session?.wrongCards || [];
  document.getElementById('reviewErrorsBtn')?.addEventListener('click', () =>
    startErrorReview(session.deck, session.deckId, wrong));
  setCurrentSession(null);

  // Fortschrittsbalken auf den Endstand bringen.
  const textEl = document.getElementById('progress-text');
  const barEl  = document.getElementById('progress-bar');
  if (textEl) textEl.textContent = `${total}/${total} Karten`;
  if (barEl)  barEl.style.width = '100%';
}

// Fehler-Training: die falsch beantworteten Karten der letzten Session
// noch einmal als Karteikarten durchgehen.
export function startErrorReview(deck, deckId, cards) {
  if (!cards?.length) return;
  const shuffled = shuffleArray([...cards]);
  const session = {
    deck,
    deckId,
    cards: shuffled,
    mode: 'flashcard',
    currentIndex: 0,
    correctAnswers: 0,
    totalCards: shuffled.length,
    currentPrompt: null,
    combo: 0,
    boosted: false,
    queue: [...shuffled],
    reviewQueue: [],
    reviewRound: 1,
  };
  setCurrentSession(session);
  document.getElementById('session-title').textContent = `${deck.name} — Fehler-Training`;
  updateProgress();
  showFlashcard();
}

// ── GRAMMATIK IM LERNKURS ────────────────────────────────────────
// Vor bestimmten Lektionen wird ein Grammatik-Kapitel eingeschoben
// (Konjugation, Satzbau, wie die Sprache funktioniert). Mehrseitiger
// Reader; die letzte Seite führt direkt in die Lektion. Der Text
// scrollt INNERHALB der Karte — der Bildschirm selbst scrollt nie.
async function maybeStartGrammar(deck, deckId) {
  const chapter = await pendingChapter(deckId, deck.language, lessonNumber(deckId));
  if (!chapter) return false;

  const session = {
    deck,
    deckId,
    mode: 'course',
    phase: 'grammar',
    chapter,
    pageIdx: 0,
    cards: [],
    queue: [],
    drillsRight: 0,
    currentPrompt: null,
    currentIndex: 0,
    // Seiten + Übungen ergeben zusammen die Schritte des Kapitels.
    totalCards: chapter.pages.length + (chapter.drills?.length || 0),
    correctAnswers: 0,
    combo: 0,
    boosted: false,
  };
  setCurrentSession(session);
  enterFocus('course');
  document.getElementById('session-title').textContent =
    `${deck.name} — Lektion ${lessonNumber(deckId)}`;
  renderGrammarPage();
  return true;
}

function renderGrammarPage() {
  const session = getCurrentSession();
  if (!session || session.phase !== 'grammar') return;
  const ch = session.chapter;
  const page = ch.pages[session.pageIdx];
  const last = session.pageIdx >= ch.pages.length - 1;

  document.getElementById('learnArea').innerHTML = `
    <div class="grammar-card">
      ${courseBadge(`<i class="fas ${ch.icon || 'fa-book-open'}"></i> Grammatik · ${escHtml(ch.title)}`)}
      <h3 class="grammar-head">${escHtml(page.heading)}</h3>
      <div class="grammar-body">${page.html}</div>
      <div class="actions grammar-actions">
        ${session.pageIdx > 0 ? '<button type="button" class="btn" id="gramPrev"><i class="fas fa-arrow-left"></i> Zurück</button>' : ''}
        <button type="button" class="btn btn-primary" id="gramNext">
          ${last ? 'Zur Lektion <i class="fas fa-arrow-right"></i>' : 'Weiter <i class="fas fa-arrow-right"></i>'}
        </button>
      </div>
    </div>
  `;

  const steps = session.totalCards || ch.pages.length;
  const t = document.getElementById('progress-text');
  if (t) t.textContent = `Seite ${session.pageIdx + 1}/${ch.pages.length}`;
  const b = document.getElementById('progress-bar');
  if (b) b.style.width = `${Math.round(((session.pageIdx + 1) / steps) * 100)}%`;

  document.getElementById('gramPrev')?.addEventListener('click', () => {
    session.pageIdx--;
    setCurrentSession(session);
    renderGrammarPage();
  });
  document.getElementById('gramNext').addEventListener('click', () => {
    if (!last) {
      session.pageIdx++;
      setCurrentSession(session);
      renderGrammarPage();
      return;
    }
    // Gelesen ist nicht gekonnt: Bringt das Kapitel Übungen mit, wird
    // erst abgefragt — und erst danach als gelesen abgehakt.
    if (ch.drills?.length) {
      session.phase = 'drill';
      session.queue = [...ch.drills];
      setCurrentSession(session);
      renderGrammarDrill();
      return;
    }
    finishChapter(session);
  });
}

// Kapitel abschließen: merken, XP geben, weiter zur Lektion (oder zum
// nächsten fälligen Kapitel).
function finishChapter(session) {
  const ch = session.chapter;
  markChapterRead(session.deckId, ch.id);
  const bonus = 10 + (session.drillsRight || 0) * 2;
  addBonusXp(bonus);
  renderGamiHeader();
  const done = ch.drills?.length
    ? `${session.drillsRight}/${ch.drills.length} Übungen auf Anhieb richtig`
    : 'jetzt anwenden!';
  showToast(`<i class="fas fa-book-open toast__icon"></i><div class="toast__body"><b>Kapitel geschafft: ${escHtml(ch.title)}</b><span>+${bonus} XP — ${done}</span></div>`);
  const { deck, deckId } = session;
  maybeStartGrammar(deck, deckId).then(started => {
    if (!started) startCourseLesson(deck, deckId);
  });
}

// Phase „Formen": Die Regel des Kapitels sofort anwenden. Falsch
// Beantwortetes kommt hinten wieder in die Reihe — das Kapitel ist
// erst durch, wenn jede Aufgabe einmal gesessen hat.
function renderGrammarDrill() {
  const session = getCurrentSession();
  if (!session || session.phase !== 'drill') return;
  const ch = session.chapter;
  const drill = session.queue[0];
  const total = ch.drills.length;
  const options = drill.options.map((text, i) => ({ text, correct: i === drill.answer }));
  const order = shuffleArray(options.map((_, i) => i));

  document.getElementById('learnArea').innerHTML = `
    <div class="mc-card drill-card">
      ${courseBadge(`<i class="fas fa-pen-ruler"></i> Formen üben — noch ${session.queue.length}`)}
      <p class="drill-topic">${escHtml(ch.title)}</p>
      <div class="drill-question">${escHtml(drill.q).replace(/____/g, '<span class="drill-gap">____</span>')}</div>
      <p class="prompt">Was gehört hier hin?</p>
      <div class="mc-options" role="group" aria-label="Antwortmöglichkeiten">
        ${order.map((oi, i) => `
          <button type="button" class="mc-option" data-oi="${oi}" aria-keyshortcuts="${i + 1} ${'abcd'[i]}">
            <span class="mc-key" aria-hidden="true">${'ABCD'[i]}</span>
            <span class="mc-text">${escHtml(options[oi].text)}</span>
          </button>`).join('')}
      </div>
      <div id="mc-fb"></div>
    </div>
  `;

  session.currentPrompt = { drill, correctOi: drill.answer };
  setCurrentSession(session);

  const done = total - session.queue.length;
  const t = document.getElementById('progress-text');
  if (t) t.textContent = `Übung ${done + 1}/${total}`;
  const b = document.getElementById('progress-bar');
  if (b) b.style.width = `${Math.round(((ch.pages.length + done + 1) / session.totalCards) * 100)}%`;

  document.querySelectorAll('.mc-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const oi = Number(btn.dataset.oi);
      const isCorrect = oi === drill.answer;
      document.querySelectorAll('.mc-option').forEach(b2 => {
        b2.disabled = true;
        const i = Number(b2.dataset.oi);
        if (i === drill.answer) b2.classList.add('mc-correct');
        else if (i === oi) b2.classList.add('mc-wrong');
      });
      if (isCorrect) playCorrect(); else playWrong();
      session.currentPrompt = null;
      if (isCorrect) {
        if (!drill.__missed) session.drillsRight = (session.drillsRight || 0) + 1;
        session.queue.shift();
      } else {
        drill.__missed = true;              // zählt nicht mehr als „auf Anhieb"
        session.queue.push(session.queue.shift());
      }
      setCurrentSession(session);

      document.getElementById('mc-fb').innerHTML = `
        ${isCorrect
          ? '<div class="correct" style="margin-top:14px"><p>✅ Richtig!</p></div>'
          : `<div class="incorrect" style="margin-top:14px"><p>❌ Richtig wäre: <b>${escHtml(drill.options[drill.answer])}</b></p></div>`}
        ${drill.why ? `<p class="drill-why"><i class="fas fa-lightbulb"></i> ${escHtml(drill.why)}</p>` : ''}
        <div class="actions" style="margin-top:12px">
          <button type="button" class="btn btn-primary" id="gramNext">Weiter</button>
        </div>
      `;
      document.getElementById('gramNext').addEventListener('click', () => {
        const st = getCurrentSession();
        if (!st) return;
        if (st.queue.length === 0) finishChapter(st);
        else renderGrammarDrill();
      });
    });
  });
}

// ── LERNKURS-MODUS (Basic101) ────────────────────────────────────
// Wirklich Schritt für Schritt: Die Lektion wird in 2er-HÄPPCHEN
// eingeführt — kennenlernen → HÖREN → üben, dann erst das nächste
// Häppchen. Am Ende eine SPRECH-Runde über alle neuen Wörter und die
// Satz-Phase. Hören und Sprechen sind damit fest in jeder Lektion.
// Der Fortschritt wird pro Account in core/course.js gespeichert.

// Konversations-Bausteine der Sprache (js/data/phrases/<code>.js).
const phraseCache = {};
async function loadPhrases(lang) {
  if (phraseCache[lang]) return phraseCache[lang];
  try {
    const mod = await import(`../js/data/phrases/${lang}.js`);
    phraseCache[lang] = mod.phrases || [];
  } catch {
    phraseCache[lang] = [];
  }
  return phraseCache[lang];
}

// Zwei Bausteine je Lektion, fortlaufend durch die Liste — so kommt man
// vom ersten Tag an ins Sprechen und wiederholt später von vorn.
function pickPhrases(list, lessonNum) {
  if (!list.length) return [];
  const per = 3;
  const start = ((lessonNum - 1) * per) % list.length;
  const out = [];
  for (let i = 0; i < Math.min(per, list.length); i++) out.push(list[(start + i) % list.length]);
  return out;
}

const COURSE_CHUNK = 2;
function chunkLesson(cards) {
  const chunks = [];
  for (let i = 0; i < cards.length; i += COURSE_CHUNK) chunks.push(cards.slice(i, i + COURSE_CHUNK));
  // Kein einsames Einzelwort am Schluss — ans vorige Häppchen anhängen.
  if (chunks.length > 1 && chunks[chunks.length - 1].length === 1) {
    const last = chunks.pop();
    chunks[chunks.length - 1] = [...chunks[chunks.length - 1], ...last];
  }
  return chunks;
}

// Wiederholung zu Beginn jeder Lektion: bis zu drei fällige Karten aus
// FRÜHEREN Lektionen. So bleibt Gelerntes im Umlauf, ohne dass man daran
// denken muss — der Kern von verteiltem Lernen.
const COURSE_REVIEW_MAX = 3;
function collectDueReview(deck, deckId, introducedStart) {
  if (introducedStart <= 0) return [];
  const due = new Set(getDueFronts(deckId));
  if (!due.size) return [];
  const earlier = deck.cards.slice(0, introducedStart);
  // Älteste zuerst — die liegen am längsten zurück.
  return earlier.filter(c => due.has(c.front)).slice(0, COURSE_REVIEW_MAX);
}

// ── ENDLOS-RUNDEN (nach dem letzten Lektionsknoten) ──────────────
// Ist ein Deck komplett durchgelernt, endete der Kurs bisher in einer
// Sackgasse. Stattdessen läuft er endlos weiter: jede Runde bündelt die
// dringendsten Wörter — zuerst fällige, dann die schwächsten, zuletzt
// die am längsten nicht geübten. Der Kursfortschritt (`introduced`)
// wächst dabei nicht mehr, die Wörter bleiben aber im SRS-Kreislauf.
const ENDLESS_SIZE = 8;
let endlessRound = 0;

function pickEndlessCards(deck, deckId) {
  const due = new Set(getDueFronts(deckId));
  const scored = deck.cards.map((c, i) => {
    const st = getCardState(deckId, c.front);
    return {
      card: c,
      due: due.has(c.front) ? 0 : 1,          // fällige zuerst
      level: st ? st.level : 0,               // dann die schwächsten
      order: i,
    };
  });
  scored.sort((a, b) => a.due - b.due || a.level - b.level || a.order - b.order);
  return shuffleArray(scored.slice(0, ENDLESS_SIZE).map(s => s.card));
}

async function startEndlessRound(deck, deckId) {
  const cards = pickEndlessCards(deck, deckId);
  if (!cards.length) return;
  endlessRound++;

  const phrasePool = await loadPhrases(deck.language);
  const talkCards = pickPhrases(phrasePool, lessonNumber(deckId) + endlessRound);

  const session = {
    deck,
    deckId,
    mode: 'course',
    endless: true,
    lesson: lessonNumber(deckId),
    lessonCards: cards,
    knownCards: deck.cards,                  // alles ist gelernt → alle Sätze offen
    talkCards,
    phrasePool,
    reviewCards: [],
    phase: 'teach',                          // wird sofort übersprungen (endless)
    chunks: chunkLesson(cards),
    chunkIdx: 0,
    teachPos: 0,
    queue: [],
    sentencesCompleted: [],
    currentPrompt: null,
    currentIndex: 0,
    totalCards: 0,                           // unten über courseBaseSteps
    correctAnswers: 0,
    gradedAnswers: 0,
    combo: 0,
    boosted: consumeXpBoost(),
  };

  session.totalCards = courseBaseSteps(session);
  setCurrentSession(session);
  document.getElementById('session-title').textContent = `${deck.name} — Endlos-Runde ${endlessRound}`;
  updateProgress();
  showCourseStep();
}

// Feste Schritte einer Lektion: 4 je Wort (kennenlernen, hören, üben,
// sprechen) + Auffrischung + Konversation + ggf. das Paare-Brett.
// Schreib- und Satz-Schritte kommen dazu, sobald ihr Umfang feststeht —
// WICHTIG: immer über diese Basis rechnen, sonst „vergisst" der
// Fortschrittsbalken bereits erledigte Phasen und springt zurück.
function courseBaseSteps(session) {
  return session.lessonCards.length * 4
    + (session.reviewCards?.length || 0)
    + (session.talkCards?.length || 0)
    + (session.talkCards || []).filter(p => p.reply).length   // Dialog-Runde
    + (session.lessonCards.length >= 4 ? 1 : 0)               // Paare-Brett
    + Math.min(COURSE_HEARING, hearingPool(session).length);  // Satz-Hören
}

// Satz-Hören: Karten der Lektion, die einen Beispielsatz mitbringen.
// Anders als die Satz-Phase verlangt das KEIN vollständig bekanntes
// Vokabular — beim Hören darf man aus dem Zusammenhang schließen, genau
// wie im echten Gespräch.
const COURSE_HEARING = 2;
function hearingPool(session) {
  return session.lessonCards.filter(c => c.example && c.exampleDE);
}


async function startCourseLesson(deck, deckId) {
  const lessonCards = nextLessonCards(deckId, deck.cards);

  // Deck durchgelernt? Dann läuft der Kurs endlos weiter — jede Runde
  // nimmt die schwächsten/fälligen Wörter, damit man nie vor einer
  // Sackgasse steht.
  if (lessonCards.length === 0) {
    startEndlessRound(deck, deckId);
    return;
  }

  // Bereits gelernter Wortschatz (bisherige Lektionen + die dieser Lektion).
  const introducedStart = getCourseState(deckId).introduced;
  const knownCards = deck.cards.slice(0, introducedStart + lessonCards.length);
  // Konversations-Bausteine dieser Lektion (schnell ins Sprechen kommen).
  const phrasePool = await loadPhrases(deck.language);
  const talkCards = pickPhrases(phrasePool, lessonNumber(deckId));
  // Fällige Wiederholungen aus früheren Lektionen (Auffrischung vorweg).
  const reviewCards = collectDueReview(deck, deckId, introducedStart);

  const session = {
    deck,
    deckId,
    mode: 'course',
    lesson: lessonNumber(deckId),
    lessonCards,
    knownCards,
    talkCards,
    phrasePool,
    reviewCards,
    phase: reviewCards.length ? 'review' : 'teach',          // je Häppchen: teach → listen → words; dann speak → sentences
    chunks: chunkLesson(lessonCards),
    chunkIdx: 0,
    teachPos: 0,
    queue: reviewCards.length ? [...reviewCards] : [],
    sentencesCompleted: [],
    currentPrompt: null,
    currentIndex: 0,                       // erledigte Schritte (für Fortschrittsbalken)
    totalCards: 0,                         // wird unten über courseBaseSteps gesetzt
    correctAnswers: 0,
    gradedAnswers: 0,
    combo: 0,
    boosted: consumeXpBoost(),             // XP-Boost aus dem Shop einlösen
  };

  session.totalCards = courseBaseSteps(session);
  setCurrentSession(session);
  document.getElementById('session-title').textContent = `${deck.name} — Lektion ${session.lesson}`;
  updateProgress();
  showCourseStep();
}

function showCourseStep() {
  const session = getCurrentSession();
  if (!session) return;

  // Auffrischung: fällige Karten früherer Lektionen, bevor Neues kommt.
  if (session.phase === 'review') {
    if (session.queue.length === 0) {
      session.phase = 'teach';
      setCurrentSession(session);
    } else {
      renderCourseReview(session);
      return;
    }
  }

  // Häppchen-Schleife: 2 Wörter kennenlernen → hören → üben.
  if (session.phase === 'teach') {
    const chunk = session.chunks[session.chunkIdx];
    // Endlos-Runden wiederholen bekannte Wörter — Kennenlernen entfällt.
    if (session.endless || session.teachPos >= chunk.length) {
      session.phase = 'listen';
      session.queue = shuffleArray([...chunk]);
      setCurrentSession(session);
    } else {
      renderCourseTeach(session);
      return;
    }
  }

  if (session.phase === 'listen') {
    if (session.queue.length === 0) {
      session.phase = 'words';
      session.queue = shuffleArray([...session.chunks[session.chunkIdx]]);
      setCurrentSession(session);
    } else {
      renderCourseListen(session);
      return;
    }
  }

  if (session.phase === 'words') {
    if (session.queue.length === 0) {
      if (session.chunkIdx < session.chunks.length - 1) {
        // Nächstes 2er-Häppchen kennenlernen.
        session.chunkIdx++;
        session.teachPos = 0;
        session.phase = 'teach';
        setCurrentSession(session);
        showCourseStep();
        return;
      }
      // Alle Häppchen durch → Paare verbinden über die ganze Lektion.
      session.phase = 'match';
      setCurrentSession(session);
    } else {
      // Abwechslung im Üben: mal Multiple Choice, mal Vergleich (Passt?).
      if (session.queue.length % 2 === 0) renderCourseCompare(session);
      else renderCourseWordMC(session);
      return;
    }
  }

  // Paare verbinden: alle Wörter der Lektion auf einem Brett zuordnen —
  // ein schneller, spielerischer Abruf, bevor das Sprechen beginnt.
  if (session.phase === 'match') {
    if (session.matchDone || session.lessonCards.length < 4) {
      session.phase = 'speak';
      session.queue = shuffleArray([...session.lessonCards]);
      setCurrentSession(session);
    } else {
      renderCourseMatch(session);
      return;
    }
  }

  if (session.phase === 'speak') {
    if (session.queue.length === 0) {
      // Schreib-Runde: ein paar Wörter der Lektion selbst tippen — jedes
      // zweite (geeignete) Wort als Buchstaben-Bausteine statt Tastatur.
      session.phase = 'write';
      session.queue = shuffleArray([...session.lessonCards]).slice(0, 3);
      session.writeCount = session.queue.length;
      session.totalCards = courseBaseSteps(session) + session.writeCount;
      setCurrentSession(session);
      updateProgress();
    } else {
      renderCourseSpeak(session);
      return;
    }
  }

  if (session.phase === 'write') {
    if (session.queue.length === 0) {
      // Konversation: echte Alltagswendungen hören und nachsprechen.
      session.phase = 'talk';
      session.queue = [...(session.talkCards || [])];
      setCurrentSession(session);
    } else {
      renderCourseWrite(session);
      return;
    }
  }

  if (session.phase === 'talk') {
    if (session.queue.length === 0) {
      // Dialog-Runde: die eben gehörten Wendungen jetzt aktiv einsetzen —
      // auf die Frage die passende Antwort wählen.
      session.phase = 'dialog';
      session.queue = (session.talkCards || []).filter(p => p.reply);
      setCurrentSession(session);
    } else {
      renderCourseTalk(session);
      return;
    }
  }

  if (session.phase === 'dialog') {
    if (session.queue.length === 0) {
      // Satz-Hören: ganze Sätze verstehen, nicht nur einzelne Wörter.
      session.phase = 'hearing';
      const pool = shuffleArray(hearingPool(session)).slice(0, COURSE_HEARING);
      session.queue = pool;
      // Variante pro Karte vorab festlegen — bei falscher Antwort wandert
      // die Karte nach hinten, ein Index-basierter Wechsel würde springen.
      session.hearVariants = {};
      pool.forEach((c, i) => { session.hearVariants[c.front] = i % 2 === 0 ? 'meaning' : 'gap'; });
      setCurrentSession(session);
    } else {
      renderCourseDialog(session);
      return;
    }
  }

  if (session.phase === 'hearing') {
    if (session.queue.length === 0) {
      // Übergang zur Satz-Phase: nur Sätze aufnehmen, deren Wörter ALLE
      // schon gelernt sind (echtes Basic 101 — keine unbekannten Wörter).
      session.phase = 'sentences';
      session.queue = collectUnlockedSentences(session);
      session.sentOrder = session.queue.map(c => c.front);
      session.totalCards = courseBaseSteps(session) + (session.writeCount || 0)
        + session.queue.length;
      setCurrentSession(session);
      updateProgress();
    } else {
      renderCourseHearing(session);
      return;
    }
  }

  if (session.phase === 'sentences') {
    if (session.queue.length === 0) {
      endCourseLesson(session);
      return;
    }
    // Abwechslung: Lückentext, Satzbau oder „Was bedeutet dieser Satz?"
    const variant = sentenceVariant(session, session.queue[0]);
    if (variant === 'build') renderCourseBuild(session);
    else if (variant === 'meaning') renderCourseMeaning(session);
    else renderCourseGapFill(session);
  }
}

// Stabile Übungs-Variante je Satz (bleibt bei Wiederholung gleich);
// fällt auf den Lückentext zurück, wenn Satzbau/Bedeutung nicht passen.
function sentenceVariant(session, card) {
  const i = (session.sentOrder || []).indexOf(card.front);
  const v = ['gap', 'build', 'meaning'][(i < 0 ? 0 : i) % 3];
  if (v === 'build') {
    const lang = session.deck.language;
    const rev = isReverse(session.deck);
    const target = rev ? card.exampleDE : card.example;
    // Ohne Leerzeichen (zh/ja) werden Zeichen sortiert — dann passen auch
    // etwas längere Sätze; Deutsch bleibt wortweise.
    const n = splitSentence(target, rev ? 'de' : lang).length;
    if (n < 3 || n > (isSpaceless(rev ? 'de' : lang) ? 14 : 12)) return 'gap';
  }
  if (v === 'meaning') {
    const alts = session.knownCards.filter(c => c.exampleDE && c.exampleDE !== card.exampleDE);
    if (alts.length < 3) return 'gap';
  }
  return v;
}

// Wortabgleich mit Toleranz für Beugung: exakt / solider Teilstring /
// gemeinsames Präfix ≥5. Kurze Funktionswörter matchen dadurch nicht.
// Chinesisch und Japanisch schreiben OHNE Leerzeichen. Alle Satz-Übungen
// (Lücke, Satzbau, Freischalten) trennten bisher an Leerzeichen und
// behandelten deshalb einen ganzen Satz als ein einziges Wort — die
// Lücke verschluckte den kompletten Satz. Für diese Sprachen wird
// zeichenweise gearbeitet.
function isSpaceless(lang) { return lang === 'zh' || lang === 'ja'; }
function splitSentence(text, lang) {
  return isSpaceless(lang) ? [...String(text || '').trim()] : String(text || '').trim().split(/\s+/);
}
function joinSentence(parts, lang) { return parts.join(isSpaceless(lang) ? '' : ' '); }

function backMatchScore(word, back) {
  if (word === back) return 100;
  const short = Math.min(word.length, back.length);
  if (short >= 4 && (word.includes(back) || back.includes(word))) return 80;
  let p = 0;
  while (p < word.length && p < back.length && word[p] === back[p]) p++;
  if (p >= 5) return 60;
  return 0;
}

// Ist der Beispielsatz vollständig aus bekannten Wörtern gebildet?
// Tokens, die zu keinem Deck-Wort passen, gelten als Funktionswörter.
function sentenceIsKnown(example, knownBackSet, knownBackList, deckBackList, lang) {
  // Ohne Leerzeichen: prüfen, ob im Satz ein Deck-Wort steckt, das noch
  // nicht gelernt ist. Zeichen, die zu keinem Deck-Wort gehören, sind
  // Funktionswörter (的, は …) und stören nicht.
  if (isSpaceless(lang)) {
    return !deckBackList.some(b => b && example.includes(b) && !knownBackSet.has(b));
  }
  const tokens = example.toLowerCase().split(/[\s.,!?;:„“"»«()¿¡'’-]+/).filter(Boolean);
  for (const t of tokens) {
    if (knownBackSet.has(t)) continue;                    // exakt bekannt
    if (knownBackList.some(b => backMatchScore(t, b) >= 60)) continue; // bekannt (gebeugt)
    if (deckBackList.some(b => backMatchScore(t, b) >= 60)) return false; // Deck-Wort, aber noch nicht gelernt
    // sonst: Funktionswort → ignorieren
  }
  return true;
}

// Sammelt bis zu 6 freischaltbare Lückensätze (neueste Wörter zuerst),
// die noch nicht geübt wurden.
function collectUnlockedSentences(session) {
  const { knownCards, deck } = session;
  const lang = deck.language;
  const done = new Set(getSentencesDone(session.deckId));
  const knownBackList = knownCards.map(c => c.back.toLowerCase());
  const knownBackSet = new Set(knownBackList);
  const deckBackList = deck.cards.map(c => c.back.toLowerCase());

  const eligible = [];
  for (let i = knownCards.length - 1; i >= 0 && eligible.length < 6; i--) {
    const card = knownCards[i];
    if (done.has(card.front) || !card.example) continue;
    if (!findGapSentence(card.example, card.back, lang)) continue;
    if (sentenceIsKnown(card.example, knownBackSet, knownBackList, deckBackList, lang)) {
      eligible.push(card);
    }
  }
  return eligible;
}

function courseBadge(text) {
  return `<div class="course-phase-badge">${text}</div>`;
}

// Phase 1: Neues Wort vorstellen — ohne Abfrage, nur kennenlernen.
function renderCourseTeach(session) {
  const chunk = session.chunks[session.chunkIdx];
  const card = chunk[session.teachPos];
  let wordsBefore = 0;
  for (let k = 0; k < session.chunkIdx; k++) wordsBefore += session.chunks[k].length;
  const wordNum = wordsBefore + session.teachPos + 1;
  const lang = session.deck.language;
  const learnArea = document.getElementById('learnArea');

  const ipaParts = [];
  if (card.ipa)   ipaParts.push(`<span class="course-ipa">/${escHtml(card.ipa)}/</span>`);
  if (card.roman) ipaParts.push(`<span class="course-roman">${escHtml(card.roman)}</span>`);
  if (lang === 'la') ipaParts.push(`<span class="course-roman">gesprochen: „${escHtml(latinPron(card.back))}"</span>`);

  // Bei Latein steht das lateinische Wort oben (Abfragerichtung La→De).
  const audioBtnHtml = `
        <button type="button" class="audio-btn" id="audioBtn" title="Aussprache anhören">
          <i class="fas fa-volume-up"></i>
        </button>`;
  learnArea.innerHTML = `
    <div class="course-teach">
      ${courseBadge(`<i class="fas fa-lightbulb"></i> Neues Wort ${wordNum}/${session.lessonCards.length}`)}
      <p class="fc-label">${promptLabel(session)}</p>
      <div class="fc-word fc-word-source">${escHtml(promptText(session, card))}${isReverse(session.deck) ? audioBtnHtml : ''}</div>
      <div class="fc-arrow"><i class="fas fa-arrow-down"></i></div>
      <p class="fc-label">${answerLabel(session)}</p>
      <div class="fc-word fc-word-target">
        ${escHtml(answerText(session, card))}${isReverse(session.deck) ? '' : audioBtnHtml}
      </div>
      ${ipaParts.length ? `<div class="course-pron">${ipaParts.join(' · ')}</div>` : ''}
      ${cognateChip(card)}
      ${card.example ? `
        <div class="fc-example-block">
          <p class="fc-example">${exampleLine(card.example)}</p>
          ${card.exampleDE ? `<p class="fc-example-de">${escHtml(card.exampleDE)}</p>` : ''}
        </div>
      ` : ''}
      <div class="actions" style="margin-top:18px">
        <button type="button" class="btn btn-primary" id="courseNext">
          Weiter <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  `;

  speakWord(card.back, lang);
  document.getElementById('audioBtn').addEventListener('click', () => speakWord(card.back, lang));
  wireExampleAudio(lang);
  document.getElementById('courseNext').addEventListener('click', () => {
    session.teachPos++;
    session.currentIndex++;
    setCurrentSession(session);
    updateProgress();
    showCourseStep();
  });
}

// Phase 2 (je Häppchen): HÖREN — das gehörte Wort seiner deutschen
// Bedeutung zuordnen. Autoplay + Wiederholen auf Knopfdruck.
function renderCourseListen(session) {
  const card = session.queue[0];
  const lang = session.deck.language;
  const options = buildMCOptions(card, session.knownCards);
  const learnArea = document.getElementById('learnArea');

  learnArea.innerHTML = `
    <div class="mc-card listen-card">
      ${courseBadge(`<i class="fas fa-headphones"></i> Hören — noch ${session.queue.length}`)}
      <button type="button" class="listen-play" id="listenPlay" title="Nochmal abspielen">
        <i class="fas fa-volume-up"></i>
      </button>
      <p class="prompt">Was bedeutet das gehörte Wort?</p>
      ${mcOptionsMarkup(options, { textOf: o => o.front })}
    </div>
  `;

  speakWord(card.back, lang);
  document.getElementById('listenPlay').addEventListener('click', () => speakWord(card.back, lang));

  learnArea.querySelectorAll('.mc-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const { isCorrect } = markMcAnswer(options, Number(btn.dataset.idx), card);
      courseGrade(session, card, isCorrect);
      document.getElementById('mc-fb').innerHTML = `
        ${courseFeedbackHtml(isCorrect, card, `<p class="listen-reveal">${escHtml(card.back)} — <b>${escHtml(card.front)}</b></p>`, card.front)}
        <div class="actions" style="margin-top:14px">
          <button type="button" class="btn btn-primary" id="courseNext">Weiter</button>
        </div>
      `;
      document.getElementById('courseNext').addEventListener('click', showCourseStep);
    });
  });
}

// Phase 4: SPRECHEN — jedes neue Wort einmal laut aussprechen. Mit
// Web-Speech-Erkennung, wo verfügbar; sonst Referenz-Audio + ehrliche
// Selbsteinschätzung (z. B. auf iOS).
function renderCourseSpeak(session) {
  const card = session.queue[0];
  const lang = session.deck.language;
  const SR = speechRecognitionCtor();
  const pron = [];
  if (card.roman) pron.push(escHtml(card.roman));
  if (card.ipa) pron.push('/' + escHtml(card.ipa) + '/');
  if (lang === 'la') pron.push(`gesprochen: „${escHtml(latinPron(card.back))}"`);
  const learnArea = document.getElementById('learnArea');

  learnArea.innerHTML = `
    <div class="mc-card speak-card">
      ${courseBadge(`<i class="fas fa-microphone"></i> Sprechen — noch ${session.queue.length}`)}
      <div class="fc-word fc-word-target">
        ${escHtml(card.back)}
        <button type="button" class="audio-btn" id="speakListen" title="Anhören"><i class="fas fa-volume-up"></i></button>
      </div>
      <p class="fc-example-de" style="margin:2px 0 6px">${escHtml(card.front)}</p>
      ${pron.length ? `<p class="course-pron">${pron.join(' · ')}</p>` : ''}
      <p class="prompt">Hör zu und sprich das Wort laut nach${SR ? ' — ich höre zu' : ''}:</p>
      ${SR ? `<div class="actions">
        <button type="button" class="btn btn-primary" id="courseSpeakRec"><i class="fas fa-microphone"></i> Aufnehmen</button>
      </div>` : ''}
      <div class="actions" style="margin-top:8px">
        <button type="button" class="btn ${SR ? '' : 'btn-good'}" id="courseSpeakOk"><i class="fas fa-check"></i> Hat geklappt</button>
        <button type="button" class="btn" id="courseSpeakRetry"><i class="fas fa-rotate-left"></i> Nochmal üben</button>
      </div>
      <div id="mc-fb"></div>
    </div>
  `;

  speakWord(card.back, lang);
  document.getElementById('speakListen').addEventListener('click', () => speakWord(card.back, lang));

  // Genau EIN Abschluss pro Karte — egal ob per Knopf oder Erkennung.
  // Ohne diesen Riegel könnte ein Klick während des Auto-Weiter-Fensters
  // dieselbe Karte doppelt werten und die nächste ungeübt überspringen.
  let settled = false;
  let activeRec = null;
  const finish = ok => {
    if (settled) return;
    settled = true;
    if (quizTimeout) { clearTimeout(quizTimeout); quizTimeout = null; }
    try { activeRec?.abort(); } catch { /* Erkennung lief nicht mehr */ }
    const st = getCurrentSession();
    if (!st || st.mode !== 'course' || st.phase !== 'speak') return;
    courseGrade(session, card, ok);
    showCourseStep();
  };
  document.getElementById('courseSpeakOk').addEventListener('click', () => finish(true));
  document.getElementById('courseSpeakRetry').addEventListener('click', () => finish(false));

  if (SR) {
    document.getElementById('courseSpeakRec').addEventListener('click', () => {
      if (settled) return;
      const btn = document.getElementById('courseSpeakRec');
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-microphone-lines"></i> Ich höre …';
      let done = false;
      const rec = new SR();
      activeRec = rec;
      rec.lang = lang === 'la' ? 'de-DE' : getLangCode(lang);
      rec.interimResults = false;
      rec.maxAlternatives = 3;
      const finishRec = (ok, heard) => {
        if (done || settled) return;
        done = true;
        const fb = document.getElementById('mc-fb');
        if (fb) fb.innerHTML = ok
          ? `<div class="correct" style="margin-top:10px"><p>✅ Klang gut${heard ? ` — gehört: „${escHtml(heard)}"` : ''}!</p></div>`
          : `<div class="incorrect" style="margin-top:10px"><p>🎤 ${heard ? `Gehört: „${escHtml(heard)}" — ` : ''}probier es gleich nochmal.</p></div>`;
        quizTimeout = setTimeout(() => { quizTimeout = null; finish(ok); }, ok ? 700 : 1200);
      };
      rec.onresult = e => {
        const alts = [...(e.results[0] || [])].map(a => a.transcript || '');
        const target = normAnswer(lang === 'la' ? latinPron(card.back) : card.back);
        const ok = alts.some(t => {
          const h = normAnswer(t);
          return h === target || h.includes(target) || (target.includes(h) && h.length >= 3);
        });
        finishRec(ok, alts[0] || '');
      };
      rec.onerror = () => { if (!done) { done = true; btn.disabled = false; btn.innerHTML = '<i class="fas fa-microphone"></i> Aufnehmen'; } };
      rec.onend = () => { if (!done) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-microphone"></i> Aufnehmen'; } };
      try { rec.start(); } catch { if (!done) { done = true; btn.disabled = false; } }
    });
  }
}

// Gemeinsame Auswertung für beide Übungsphasen.
// Richtig → Karte fertig (Schritt zählt), falsch → hinten wieder einreihen.
function courseGrade(session, card, isCorrect) {
  session.gradedAnswers++;
  if (isCorrect) {
    session.queue.shift();
    session.currentIndex++;
    session.correctAnswers++;
    // Gemeisterten Lückensatz merken → wird nicht erneut abgefragt.
    if (session.phase === 'sentences') session.sentencesCompleted.push(card.front);
  } else {
    session.queue.push(session.queue.shift());
  }

  const userStats = getUserStats();
  if (isCorrect) {
    userStats.learnedWords = (userStats.learnedWords || 0) + 1;
    userStats.totalCorrect = (userStats.totalCorrect || 0) + 1;
  }
  userStats.totalAnswered = (userStats.totalAnswered || 0) + 1;
  setUserStats(userStats);
  updateStats();

  setCurrentSession(session);
  recordAnswerEffects(session, card, isCorrect, isCorrect);
  updateProgress();
}

// Phase 2: Wörter üben (Multiple Choice Deutsch → Zielsprache).
function renderCourseWordMC(session) {
  const card = session.queue[0];
  const lang = session.deck.language;
  // Distraktoren nur aus bereits gelernten Wörtern.
  const options = buildMCOptions(card, session.knownCards);
  const learnArea = document.getElementById('learnArea');

  learnArea.innerHTML = `
    <div class="mc-card">
      ${courseBadge(`<i class="fas fa-dumbbell"></i> Wörter üben — noch ${session.queue.length}`)}
      <p class="fc-label">${promptLabel(session)}</p>
      <div class="fc-word mc-question">${escHtml(promptText(session, card))} ${promptAudioBtn(session)}</div>
      <p class="prompt">${answerLabel(session)} — welche Übersetzung stimmt?</p>
      ${mcOptionsMarkup(options, { textOf: o => answerText(session, o) })}
    </div>
  `;

  wirePromptAudio(session, card);
  if (isReverse(session.deck)) speakWord(card.back, lang);
  learnArea.querySelectorAll('.mc-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const { isCorrect } = markMcAnswer(options, Number(btn.dataset.idx), card);
      if (isCorrect) speakWord(card.back, lang);

      courseGrade(session, card, isCorrect);

      document.getElementById('mc-fb').innerHTML = `
        ${courseFeedbackHtml(isCorrect, card, '', answerText(session, card))}
        <div class="actions" style="margin-top:14px">
          <button type="button" class="btn btn-primary" id="courseNext">Weiter</button>
        </div>
      `;
      document.getElementById('courseNext').addEventListener('click', showCourseStep);
    });
  });
}

// Phase „Paare verbinden": 4 Wörter der Lektion und ihre Übersetzungen
// gemischt auf einem Brett — links antippen, rechts das Gegenstück.
// Ein Paar ohne Fehlversuch zählt als richtige Antwort für dieses Wort.
function renderCourseMatch(session) {
  const lang = session.deck.language;
  const pairs = shuffleArray([...session.lessonCards]).slice(0, 4);
  const left = shuffleArray(pairs.map((c, i) => ({ c, i })));
  const right = shuffleArray(pairs.map((c, i) => ({ c, i })));
  const learnArea = document.getElementById('learnArea');

  learnArea.innerHTML = `
    <div class="mc-card match-card">
      ${courseBadge('<i class="fas fa-link"></i> Paare verbinden')}
      <p class="prompt">Tippe ein Wort und dann seine Übersetzung:</p>
      <div class="match-grid" id="matchGrid">
        <div class="match-col">
          ${left.map(({ c, i }) => `<button type="button" class="btn match-btn" data-side="l" data-i="${i}">${escHtml(promptText(session, c))}</button>`).join('')}
        </div>
        <div class="match-col">
          ${right.map(({ c, i }) => `<button type="button" class="btn match-btn" data-side="r" data-i="${i}">${escHtml(answerText(session, c))}</button>`).join('')}
        </div>
      </div>
      <div id="mc-fb"></div>
    </div>
  `;

  session.currentPrompt = { pairs: pairs.map(c => c.front) };
  setCurrentSession(session);

  const grid = document.getElementById('matchGrid');
  const missed = new Set();     // Paare mit Fehlversuch
  let selected = null;          // aktuell gewählter Knopf
  let solved = 0;

  grid.addEventListener('click', e => {
    const btn = e.target.closest('.match-btn');
    if (!btn || btn.disabled) return;

    if (!selected) {
      selected = btn;
      btn.classList.add('match-btn--selected');
      return;
    }
    if (btn === selected) {           // Abwahl
      btn.classList.remove('match-btn--selected');
      selected = null;
      return;
    }
    if (btn.dataset.side === selected.dataset.side) {   // Seite gewechselt
      selected.classList.remove('match-btn--selected');
      selected = btn;
      btn.classList.add('match-btn--selected');
      return;
    }

    const a = selected;
    selected = null;
    a.classList.remove('match-btn--selected');
    const card = pairs[Number(btn.dataset.i)];

    if (a.dataset.i === btn.dataset.i) {
      // Treffer: Paar einfrieren, Wort vorlesen, werten.
      [a, btn].forEach(el => { el.disabled = true; el.classList.add('match-btn--matched'); });
      speakWord(card.back, lang);
      const ok = !missed.has(btn.dataset.i);
      session.gradedAnswers++;
      if (ok) session.correctAnswers++;
      const userStats = getUserStats();
      if (ok) {
        userStats.learnedWords = (userStats.learnedWords || 0) + 1;
        userStats.totalCorrect = (userStats.totalCorrect || 0) + 1;
      }
      userStats.totalAnswered = (userStats.totalAnswered || 0) + 1;
      setUserStats(userStats);
      recordAnswerEffects(session, card, ok, ok);
      solved++;
      if (solved === pairs.length) {
        session.matchDone = true;
        session.currentIndex++;        // das Brett zählt als ein Schritt
        session.currentPrompt = null;
        setCurrentSession(session);
        updateProgress();
        document.getElementById('mc-fb').innerHTML = `
          <div class="correct" style="margin-top:14px"><p>✅ Alle Paare gefunden!</p></div>
          <div class="actions" style="margin-top:14px">
            <button type="button" class="btn btn-primary" id="courseNext">Weiter</button>
          </div>
        `;
        document.getElementById('courseNext').addEventListener('click', showCourseStep);
      }
    } else {
      // Daneben: beide kurz rot, das Zielpaar gilt als „mit Fehlversuch".
      missed.add(a.dataset.i);
      missed.add(btn.dataset.i);
      [a, btn].forEach(el => {
        el.classList.add('match-btn--wrong');
        setTimeout(() => el.classList.remove('match-btn--wrong'), 500);
      });
      playWrong();
    }
  });
}

// Schreib-Runde OHNE Tastatur: Das Zielwort wird aus Bausteinen
// zusammengesetzt — Einzelwörter aus Buchstaben-Kacheln, Wortgruppen aus
// Wort-Kacheln. Bewusst KEIN Eingabefeld: Für Griechisch, Russisch oder
// Japanisch ist die passende Tastatur auf dem Gerät meist gar nicht
// installiert; hier sind alle nötigen Zeichen immer da — antippen legt
// sie ab, erneutes Antippen holt sie zurück.
function renderCourseWordTiles(session) {
  const card = session.queue[0];
  const lang = session.deck.language;
  const expected = answerText(session, card);
  const multi = /\s/.test(expected.trim());
  const letters = multi ? expected.trim().split(/\s+/) : expected.split('');
  const order = shuffleArray(letters.map((_, i) => i));
  const learnArea = document.getElementById('learnArea');

  learnArea.innerHTML = `
    <div class="mc-card build-card">
      ${courseBadge(`<i class="fas fa-shapes"></i> Schreiben — noch ${session.queue.length}`)}
      <p class="fc-label">${promptLabel(session)}</p>
      <div class="fc-word">${escHtml(promptText(session, card))} ${promptAudioBtn(session)}</div>
      <p class="prompt">Baue die Übersetzung aus den ${multi ? 'Wörtern' : 'Buchstaben'} (${answerLabel(session)}):</p>
      <div class="build-answer tile-answer" id="tileAnswer" aria-label="Deine Antwort"></div>
      <div class="build-pool" id="tilePool">
        ${order.map(i => `<button type="button" class="build-tile${multi ? '' : ' letter-tile'}" data-i="${i}">${escHtml(letters[i])}</button>`).join('')}
      </div>
      <div id="mc-fb"></div>
    </div>
  `;

  session.currentPrompt = { card };
  setCurrentSession(session);
  wirePromptAudio(session, card);

  const placed = [];
  const pool = document.getElementById('tilePool');
  const answerEl = document.getElementById('tileAnswer');

  const joiner = multi ? ' ' : '';
  const finish = isCorrect => {
    session.currentPrompt = null;
    document.querySelectorAll('.build-tile').forEach(t => (t.disabled = true));
    courseGrade(session, card, isCorrect);
    speakWord(card.back, lang);
    document.getElementById('mc-fb').innerHTML = `
      ${courseFeedbackHtml(isCorrect, card, '', expected)}
      <div class="actions" style="margin-top:14px">
        <button type="button" class="btn btn-primary" id="courseNext">Weiter</button>
      </div>
    `;
    document.getElementById('courseNext').addEventListener('click', showCourseStep);
  };

  pool.addEventListener('click', e => {
    const tile = e.target.closest('.build-tile');
    if (!tile || tile.disabled) return;
    tile.disabled = true;
    tile.classList.add('build-tile--used');
    placed.push(Number(tile.dataset.i));
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = tile.className.replace('build-tile--used', '').trim() + ' build-tile--placed';
    chip.dataset.i = tile.dataset.i;
    chip.textContent = letters[Number(tile.dataset.i)];
    answerEl.appendChild(chip);
    // Voll? Dann sofort prüfen — ein extra Knopf wäre nur ein Klick mehr.
    if (placed.length === letters.length) {
      finish(placed.map(i => letters[i]).join(joiner) === (multi ? expected.trim().split(/\s+/).join(' ') : expected));
    }
  });
  answerEl.addEventListener('click', e => {
    const chip = e.target.closest('.build-tile--placed');
    if (!chip || !session.currentPrompt) return;
    const i = Number(chip.dataset.i);
    placed.splice(placed.indexOf(i), 1);
    chip.remove();
    const orig = pool.querySelector(`.build-tile[data-i="${i}"]`);
    if (orig) { orig.disabled = false; orig.classList.remove('build-tile--used'); }
  });
}

// Phase „Auffrischung": fällige Karten aus früheren Lektionen als kurze
// Multiple-Choice-Runde. Falsch beantwortete kommen sofort wieder dran.
function renderCourseReview(session) {
  const card = session.queue[0];
  const lang = session.deck.language;
  const options = buildMCOptions(card, session.knownCards);
  const learnArea = document.getElementById('learnArea');

  learnArea.innerHTML = `
    <div class="mc-card">
      ${courseBadge(`<i class="fas fa-clock-rotate-left"></i> Auffrischung — noch ${session.queue.length}`)}
      <p class="fc-label">${promptLabel(session)}</p>
      <div class="fc-word mc-question">${escHtml(promptText(session, card))} ${promptAudioBtn(session)}</div>
      <p class="prompt">Kennst du das noch?</p>
      ${mcOptionsMarkup(options, { textOf: o => answerText(session, o) })}
    </div>
  `;

  wirePromptAudio(session, card);
  if (isReverse(session.deck)) speakWord(card.back, lang);
  learnArea.querySelectorAll('.mc-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const { isCorrect } = markMcAnswer(options, Number(btn.dataset.idx), card);
      if (isCorrect) speakWord(card.back, lang);
      courseGrade(session, card, isCorrect);
      document.getElementById('mc-fb').innerHTML = `
        ${courseFeedbackHtml(isCorrect, card, '', answerText(session, card))}
        <div class="actions" style="margin-top:14px">
          <button type="button" class="btn btn-primary" id="courseNext">Weiter</button>
        </div>
      `;
      document.getElementById('courseNext').addEventListener('click', showCourseStep);
    });
  });
}

// Übungs-Variante „Vergleich": Stimmt diese Übersetzung? (Passt / Passt nicht)
function renderCourseCompare(session) {
  const card = session.queue[0];
  const lang = session.deck.language;
  const alts = session.knownCards.filter(c => c.back !== card.back && c.front !== card.front);
  const isMatch = alts.length === 0 || Math.random() < 0.5;
  const other = isMatch ? card : alts[Math.floor(Math.random() * alts.length)];
  const learnArea = document.getElementById('learnArea');

  learnArea.innerHTML = `
    <div class="mc-card">
      ${courseBadge(`<i class="fas fa-scale-balanced"></i> Wörter üben — noch ${session.queue.length}`)}
      <p class="prompt">Stimmt diese Übersetzung?</p>
      <div class="comparison-card">
        <span class="word word-source">${escHtml(promptText(session, card))}</span>
        <i class="fas fa-arrow-right"></i>
        <span class="word word-target">
          ${escHtml(answerText(session, other))}
          <button type="button" class="audio-btn" id="audioBtn" title="Aussprache anhören"><i class="fas fa-volume-up"></i></button>
        </span>
      </div>
      <div class="actions">
        <button type="button" class="btn btn-primary" id="courseCompYes"><i class="fas fa-check"></i> Passt</button>
        <button type="button" class="btn btn-secondary" id="courseCompNo"><i class="fas fa-times"></i> Passt nicht</button>
      </div>
      <div id="mc-fb"></div>
    </div>
  `;

  session.currentPrompt = { card, isMatch };
  setCurrentSession(session);
  document.getElementById('audioBtn').addEventListener('click', () => speakWord(card.back, lang));

  const answer = says => {
    const isCorrect = says === isMatch;
    document.getElementById('courseCompYes').disabled = true;
    document.getElementById('courseCompNo').disabled = true;
    session.currentPrompt = null;
    courseGrade(session, card, isCorrect);
    if (isCorrect) speakWord(card.back, lang);
    document.getElementById('mc-fb').innerHTML = `
      ${courseFeedbackHtml(isCorrect, card, `<p class="listen-reveal">${escHtml(promptText(session, card))} → <b>${escHtml(answerText(session, card))}</b></p>`, answerText(session, card))}
      <div class="actions" style="margin-top:14px">
        <button type="button" class="btn btn-primary" id="courseNext">Weiter</button>
      </div>
    `;
    document.getElementById('courseNext').addEventListener('click', showCourseStep);
  };
  document.getElementById('courseCompYes').addEventListener('click', () => answer(true));
  document.getElementById('courseCompNo').addEventListener('click', () => answer(false));
}

// Phase 5: SCHREIBEN — ein paar Wörter der Lektion selbst tippen
// (tolerant wie der frühere Tippen-Modus).
function renderCourseWrite(session) {
  // Immer Bausteine, nie Tastatur — siehe renderCourseWordTiles.
  renderCourseWordTiles(session);
}

// Phase „Konversation": eine echte Alltagswendung hören, verstehen und
// laut nachsprechen — inklusive typischer Antwort des Gegenübers, damit
// man den Baustein sofort in einem Mini-Dialog erlebt.
function renderCourseTalk(session) {
  const phrase = session.queue[0];
  const lang = session.deck.language;
  const SR = speechRecognitionCtor();
  const learnArea = document.getElementById('learnArea');

  const pron = [];
  if (phrase.roman) pron.push(escHtml(phrase.roman));
  if (lang === 'la') pron.push(`gesprochen: „${escHtml(latinPron(phrase.target))}"`);

  learnArea.innerHTML = `
    <div class="mc-card talk-card">
      ${courseBadge(`<i class="fas fa-comments"></i> Konversation — noch ${session.queue.length}`)}
      <p class="fc-label">${escHtml(phrase.de)}</p>
      <div class="talk-bubble talk-bubble--you">
        <span class="talk-bubble__text">${escHtml(phrase.target)}</span>
        <button type="button" class="audio-btn" id="talkSay" title="Anhören"><i class="fas fa-volume-up"></i></button>
      </div>
      ${pron.length ? `<p class="course-pron">${pron.join(' · ')}</p>` : ''}
      ${phrase.reply ? `
        <div class="talk-bubble talk-bubble--other">
          <span class="talk-bubble__text">${escHtml(phrase.reply)}</span>
          <button type="button" class="audio-btn" id="talkReply" title="Antwort anhören"><i class="fas fa-volume-up"></i></button>
        </div>
        <p class="talk-reply-de">${escHtml(phrase.replyDe || '')}</p>` : ''}
      ${phrase.hint ? `<p class="talk-hint"><i class="fas fa-lightbulb"></i> ${escHtml(phrase.hint)}</p>` : ''}
      <p class="prompt">Sprich die Wendung laut nach${SR ? ' — ich höre zu' : ''}:</p>
      ${SR ? `<div class="actions">
        <button type="button" class="btn btn-primary" id="talkRec"><i class="fas fa-microphone"></i> Aufnehmen</button>
      </div>` : ''}
      <div class="actions" style="margin-top:8px">
        <button type="button" class="btn ${SR ? '' : 'btn-good'}" id="talkOk"><i class="fas fa-check"></i> Hat geklappt</button>
        <button type="button" class="btn" id="talkAgain"><i class="fas fa-rotate-left"></i> Nochmal hören</button>
      </div>
      <div id="mc-fb"></div>
    </div>
  `;

  const sayPhrase = () => speakWord(phrase.target, lang);
  sayPhrase();
  document.getElementById('talkSay').addEventListener('click', sayPhrase);
  document.getElementById('talkReply')?.addEventListener('click', () => speakWord(phrase.reply, lang));
  document.getElementById('talkAgain').addEventListener('click', sayPhrase);

  // Genau ein Abschluss pro Baustein (wie in der Sprech-Runde).
  let settled = false;
  let activeRec = null;
  const finish = () => {
    if (settled) return;
    settled = true;
    if (quizTimeout) { clearTimeout(quizTimeout); quizTimeout = null; }
    try { activeRec?.abort(); } catch { /* lief nicht mehr */ }
    const st = getCurrentSession();
    if (!st || st.mode !== 'course' || st.phase !== 'talk') return;
    talkGrade(session);
    showCourseStep();
  };
  document.getElementById('talkOk').addEventListener('click', finish);

  if (SR) {
    document.getElementById('talkRec').addEventListener('click', () => {
      if (settled) return;
      const btn = document.getElementById('talkRec');
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-microphone-lines"></i> Ich höre …';
      let done = false;
      const rec = new SR();
      activeRec = rec;
      rec.lang = lang === 'la' ? 'de-DE' : getLangCode(lang);
      rec.interimResults = false;
      rec.maxAlternatives = 3;
      const settle = (ok, heard) => {
        if (done || settled) return;
        done = true;
        const fb = document.getElementById('mc-fb');
        if (fb) fb.innerHTML = ok
          ? `<div class="correct" style="margin-top:10px"><p>✅ Sehr gut${heard ? ` — gehört: „${escHtml(heard)}"` : ''}!</p></div>`
          : `<div class="incorrect" style="margin-top:10px"><p>🎤 ${heard ? `Gehört: „${escHtml(heard)}" — ` : ''}hör noch einmal hin und sprich nach.</p></div>`;
        if (ok) quizTimeout = setTimeout(() => { quizTimeout = null; finish(); }, 800);
        else { btn.disabled = false; btn.innerHTML = '<i class="fas fa-microphone"></i> Nochmal aufnehmen'; }
      };
      rec.onresult = e => {
        const alts = [...(e.results[0] || [])].map(a => a.transcript || '');
        const target = normAnswer(lang === 'la' ? latinPron(phrase.target) : (phrase.roman || phrase.target));
        const ok = alts.some(t => {
          const h = normAnswer(t);
          if (!h) return false;
          if (h === target || target.includes(h) || h.includes(target)) return true;
          // Teiltreffer: die Hälfte der Wörter genügt für ein „gut gemacht".
          const words = target.split(' ').filter(w => w.length > 2);
          const hit = words.filter(w => h.includes(w)).length;
          return words.length > 0 && hit >= Math.ceil(words.length / 2);
        });
        settle(ok, alts[0] || '');
      };
      rec.onerror = () => { if (!done) { done = true; btn.disabled = false; btn.innerHTML = '<i class="fas fa-microphone"></i> Aufnehmen'; } };
      rec.onend = () => { if (!done) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-microphone"></i> Aufnehmen'; } };
      try { rec.start(); } catch { if (!done) { done = true; btn.disabled = false; } }
    });
  }
}

// Konversations-Bausteine sind keine Deck-Vokabeln — sie zählen für den
// Fortschritt und XP, aber nicht für den Karten-Lernstand (SRS).
// Phase „Satz hören": Verstehen scheitert im echten Gespräch selten am
// einzelnen Wort, sondern am Tempo eines ganzen Satzes. Zwei Varianten:
//   meaning — Satz nur HÖREN (kein Text!) und die Bedeutung wählen.
//   gap     — Satz hören, den Lückentext mitlesen, das fehlende Wort wählen.
function renderCourseHearing(session) {
  const card = session.queue[0];
  const lang = session.deck.language;
  const learnArea = document.getElementById('learnArea');
  const badge = `<i class="fas fa-headphones"></i> Satz hören — noch ${session.queue.length}`;

  // Für die Bedeutungs-Variante braucht es zwei echte Alternativsätze.
  const alts = shuffleArray(session.knownCards.filter(c => c.exampleDE && c.exampleDE !== card.exampleDE)).slice(0, 2);
  const gapped = findGapSentence(card.example, card.back, lang);
  let variant = session.hearVariants?.[card.front] || 'meaning';
  if (variant === 'meaning' && alts.length < 2) variant = 'gap';
  if (variant === 'gap' && !gapped) variant = alts.length >= 2 ? 'meaning' : null;
  if (!variant) {                       // weder das eine noch das andere möglich
    session.queue.shift();
    setCurrentSession(session);
    showCourseStep();
    return;
  }

  const play = () => speakWord(card.example, lang);

  if (variant === 'meaning') {
    const options = shuffleArray([
      { text: card.exampleDE, correct: true },
      ...alts.map(c => ({ text: c.exampleDE, correct: false })),
    ]);
    const correctIdx = options.findIndex(o => o.correct);
    learnArea.innerHTML = `
      <div class="mc-card hear-card">
        ${courseBadge(badge)}
        <button type="button" class="listen-play" id="hearPlay" title="Nochmal anhören">
          <i class="fas fa-volume-up"></i>
        </button>
        <p class="prompt">Was bedeutet dieser Satz?</p>
        <div class="mc-options" role="group" aria-label="Antwortmöglichkeiten">
          ${options.map((o, i) => `
            <button type="button" class="mc-option" data-idx="${i}" aria-keyshortcuts="${i + 1} ${'abc'[i]}">
              <span class="mc-key" aria-hidden="true">${'ABC'[i]}</span>
              <span class="mc-text">${escHtml(o.text)}</span>
            </button>`).join('')}
        </div>
        <div id="mc-fb"></div>
      </div>
    `;
    session.currentPrompt = { card, variant, correctIdx };
    setCurrentSession(session);
    play();
    document.getElementById('hearPlay').addEventListener('click', play);

    learnArea.querySelectorAll('.mc-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.idx);
        const isCorrect = idx === correctIdx;
        learnArea.querySelectorAll('.mc-option').forEach((b, i) => {
          b.disabled = true;
          if (i === correctIdx) b.classList.add('mc-correct');
          else if (i === idx) b.classList.add('mc-wrong');
        });
        if (isCorrect) playCorrect(); else playWrong();
        session.currentPrompt = null;
        courseGrade(session, card, isCorrect);
        // Erst jetzt den Satz zeigen — vorher wäre es Lesen, nicht Hören.
        document.getElementById('mc-fb').innerHTML = `
          ${isCorrect
            ? '<div class="correct" style="margin-top:14px"><p>✅ Richtig gehört!</p></div>'
            : '<div class="incorrect" style="margin-top:14px"><p>❌ Nicht ganz — hör noch mal hin.</p></div>'}
          <p class="hear-reveal">${escHtml(card.example)}</p>
          <div class="actions" style="margin-top:12px">
            <button type="button" class="btn btn-primary" id="courseNext">Weiter</button>
          </div>
        `;
        document.getElementById('courseNext').addEventListener('click', showCourseStep);
      });
    });
    return;
  }

  // Variante „gap": Lücke hören und lesen.
  const options = buildMCOptions(card, session.knownCards);
  learnArea.innerHTML = `
    <div class="mc-card hear-card">
      ${courseBadge(badge)}
      <button type="button" class="listen-play" id="hearPlay" title="Nochmal anhören">
        <i class="fas fa-volume-up"></i>
      </button>
      <div class="gap-sentence">${escHtml(gapped)}</div>
      <p class="prompt">Welches Wort hast du gehört?</p>
      ${mcOptionsMarkup(options, { textOf: o => o.back })}
    </div>
  `;
  session.currentPrompt = { card, variant, options };
  setCurrentSession(session);
  play();
  document.getElementById('hearPlay').addEventListener('click', play);

  learnArea.querySelectorAll('.mc-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const { isCorrect } = markMcAnswer(options, Number(btn.dataset.idx), card);
      session.currentPrompt = null;
      courseGrade(session, card, isCorrect);
      document.getElementById('mc-fb').innerHTML = `
        ${courseFeedbackHtml(isCorrect, card, '', card.back)}
        <p class="hear-reveal">${escHtml(card.example)}</p>
        <div class="actions" style="margin-top:12px">
          <button type="button" class="btn btn-primary" id="courseNext">Weiter</button>
        </div>
      `;
      document.getElementById('courseNext').addEventListener('click', showCourseStep);
    });
  });
}

// Phase „Dialog": eine der eben gelernten Wendungen hören und die
// passende Antwort wählen — das ist der Moment, in dem aus Nachsprechen
// echte Konversation wird. Falsche Wahl → die Frage kommt nochmal.
function renderCourseDialog(session) {
  const phrase = session.queue[0];
  const lang = session.deck.language;
  // Distraktoren: Antworten ANDERER Wendungen derselben Sprache.
  const others = shuffleArray((session.phrasePool || [])
    .filter(p => p.reply && p.reply !== phrase.reply)).slice(0, 2);
  const options = shuffleArray([phrase, ...others]);
  const correctIdx = options.indexOf(phrase);
  const learnArea = document.getElementById('learnArea');

  learnArea.innerHTML = `
    <div class="mc-card talk-card">
      ${courseBadge(`<i class="fas fa-comments"></i> Dialog — noch ${session.queue.length}`)}
      <div class="talk-bubble talk-bubble--other">
        <span class="talk-bubble__text">${escHtml(phrase.target)}</span>
        <button type="button" class="audio-btn" id="dialogSay" title="Anhören"><i class="fas fa-volume-up"></i></button>
      </div>
      <p class="talk-reply-de">${escHtml(phrase.de)}</p>
      <p class="prompt">Was antwortest du?</p>
      <div class="mc-options" role="group" aria-label="Antwortmöglichkeiten">
        ${options.map((opt, i) => `
          <button type="button" class="btn mc-option" data-idx="${i}" aria-keyshortcuts="${i + 1} ${'abc'[i]}">
            <span class="mc-key" aria-hidden="true">${'ABC'[i]}</span>
            <span class="mc-text">${escHtml(opt.reply)}${opt.replyDe ? `<span class="dialog-reply-de">${escHtml(opt.replyDe)}</span>` : ''}</span>
          </button>`).join('')}
      </div>
      <div id="mc-fb"></div>
    </div>
  `;

  session.currentPrompt = { correctIdx };
  setCurrentSession(session);
  const say = () => speakWord(phrase.target, lang);
  say();
  document.getElementById('dialogSay').addEventListener('click', say);

  learnArea.querySelectorAll('.mc-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.idx);
      const isCorrect = idx === correctIdx;
      learnArea.querySelectorAll('.mc-option').forEach((b, i) => {
        b.disabled = true;
        if (i === correctIdx) b.classList.add('mc-correct');
        else if (i === idx && !isCorrect) b.classList.add('mc-wrong');
      });
      if (isCorrect) { playCorrect(); speakWord(phrase.reply, lang); } else playWrong();
      session.currentPrompt = null;
      dialogGrade(session, isCorrect);
      document.getElementById('mc-fb').innerHTML = `
        ${isCorrect
          ? '<div class="correct" style="margin-top:14px"><p>✅ Genau so antwortet man!</p></div>'
          : `<div class="incorrect" style="margin-top:14px"><p>❌ Passt nicht — die Antwort wäre: <b>${escHtml(phrase.reply)}</b>${phrase.replyDe ? ` („${escHtml(phrase.replyDe)}")` : ''}</p><p style="color:var(--gray);font-size:.85rem">Kommt gleich nochmal.</p></div>`}
        <div class="actions" style="margin-top:14px">
          <button type="button" class="btn btn-primary" id="courseNext">Weiter</button>
        </div>
      `;
      document.getElementById('courseNext').addEventListener('click', showCourseStep);
    });
  });
}

// Dialog-Wertung: wie die Kurs-Wertung, aber ohne SRS-Eintrag — die
// Wendungen sind keine Vokabelkarten des Decks.
function dialogGrade(session, isCorrect) {
  session.gradedAnswers++;
  if (isCorrect) {
    session.queue.shift();
    session.currentIndex++;
    session.correctAnswers++;
  } else {
    session.queue.push(session.queue.shift());
  }
  const { gained } = recordGameAnswer(isCorrect, { boost: !!session.boosted });
  session.xpFromAnswers = (session.xpFromAnswers || 0) + gained;
  setCurrentSession(session);
  renderGamiHeader();
  renderLearnWidgets();
  announceUnlocks();
  updateProgress();
}

function talkGrade(session) {
  session.queue.shift();
  session.currentIndex++;
  session.correctAnswers++;
  session.gradedAnswers++;
  const { gained } = recordGameAnswer(true, { boost: !!session.boosted });
  session.xpFromAnswers = (session.xpFromAnswers || 0) + gained;
  setCurrentSession(session);
  renderGamiHeader();
  renderLearnWidgets();
  announceUnlocks();
  updateProgress();
}

// Satz-Variante „Satzbau": den Beispielsatz aus Kacheln zusammensetzen
// (bei Latein: die deutsche Übersetzung zur lateinischen Vorlage).
function renderCourseBuild(session) {
  const card = session.queue[0];
  const lang = session.deck.language;
  const rev = isReverse(session.deck);
  // Chinesisch/Japanisch werden zeichenweise sortiert (keine Leerzeichen).
  const splitLang = rev ? 'de' : lang;
  const tokens = splitSentence(rev ? card.exampleDE : card.example, splitLang);
  const order = shuffleArray(tokens.map((_, i) => i));
  const learnArea = document.getElementById('learnArea');

  learnArea.innerHTML = `
    <div class="mc-card build-card">
      ${courseBadge(`<i class="fas fa-comment-dots"></i> Sätze üben — noch ${session.queue.length}`)}
      <p class="build-src">„${escHtml(rev ? card.example : card.exampleDE)}"</p>
      <p class="prompt">${rev ? 'Setze die deutsche Übersetzung zusammen:' : 'Setze den Satz zusammen:'}</p>
      <div class="build-answer" id="courseBuildAnswer" aria-label="Deine Antwort"></div>
      <div class="build-pool" id="courseBuildPool">
        ${order.map(i => `<button type="button" class="build-tile" data-i="${i}">${escHtml(tokens[i])}</button>`).join('')}
      </div>
      <div class="actions">
        <button type="button" class="btn btn-primary" id="courseBuildCheck" disabled>Prüfen</button>
      </div>
      <div id="mc-fb"></div>
    </div>
  `;

  const placed = [];
  session.currentPrompt = { card, tokens };
  setCurrentSession(session);
  const pool = document.getElementById('courseBuildPool');
  const answerEl = document.getElementById('courseBuildAnswer');
  const checkBtn = document.getElementById('courseBuildCheck');

  pool.addEventListener('click', e => {
    const tile = e.target.closest('.build-tile');
    if (!tile || tile.disabled) return;
    tile.disabled = true;
    tile.classList.add('build-tile--used');
    placed.push(Number(tile.dataset.i));
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'build-tile build-tile--placed';
    chip.dataset.i = tile.dataset.i;
    chip.textContent = tokens[Number(tile.dataset.i)];
    answerEl.appendChild(chip);
    checkBtn.disabled = placed.length !== tokens.length;
  });
  answerEl.addEventListener('click', e => {
    const chip = e.target.closest('.build-tile--placed');
    if (!chip) return;
    const i = Number(chip.dataset.i);
    placed.splice(placed.indexOf(i), 1);
    chip.remove();
    const orig = pool.querySelector(`.build-tile[data-i="${i}"]`);
    if (orig) { orig.disabled = false; orig.classList.remove('build-tile--used'); }
    checkBtn.disabled = placed.length !== tokens.length;
  });

  checkBtn.addEventListener('click', () => {
    const built = joinSentence(placed.map(i => tokens[i]), splitLang);
    const isCorrect = built === joinSentence(tokens, splitLang);
    checkBtn.disabled = true;
    document.querySelectorAll('.build-tile').forEach(t => (t.disabled = true));
    session.currentPrompt = null;
    courseGrade(session, card, isCorrect);
    if (isCorrect) speakWord(card.example, lang);
    document.getElementById('mc-fb').innerHTML = `
      ${isCorrect
        ? '<div class="correct" style="margin-top:14px"><p>✅ Richtig!</p></div>'
        : `<div class="incorrect" style="margin-top:14px"><p>❌ Nicht ganz — richtig wäre:</p><p style="margin-top:6px"><b>${escHtml(rev ? card.exampleDE : card.example)}</b></p><p style="color:var(--gray);font-size:.85rem">Kommt gleich nochmal.</p></div>`}
      <div class="actions" style="margin-top:14px">
        <button type="button" class="btn btn-primary" id="courseNext">Weiter</button>
      </div>
    `;
    document.getElementById('courseNext').addEventListener('click', showCourseStep);
  });
}

// Satz-Variante „Bedeutung": Satz lesen/hören → deutsche Bedeutung wählen.
function renderCourseMeaning(session) {
  const card = session.queue[0];
  const lang = session.deck.language;
  const alts = shuffleArray(session.knownCards.filter(c => c.exampleDE && c.exampleDE !== card.exampleDE)).slice(0, 3);
  const options = shuffleArray([
    { text: card.exampleDE, correct: true },
    ...alts.map(c => ({ text: c.exampleDE, correct: false })),
  ]);
  const learnArea = document.getElementById('learnArea');

  learnArea.innerHTML = `
    <div class="mc-card story-card">
      ${courseBadge(`<i class="fas fa-comment-dots"></i> Sätze üben — noch ${session.queue.length}`)}
      <p class="story-sent">
        ${escHtml(card.example)}
        <button type="button" class="audio-btn" id="storyAudio" title="Anhören"><i class="fas fa-volume-up"></i></button>
      </p>
      <p class="prompt">Was bedeutet dieser Satz?</p>
      <div class="mc-options">
        ${options.map((o, i) => `
          <button type="button" class="mc-option" data-idx="${i}">
            <span class="mc-key">${String.fromCharCode(65 + i)}</span>
            <span class="mc-text">${escHtml(o.text)}</span>
          </button>`).join('')}
      </div>
      <div id="mc-fb"></div>
    </div>
  `;

  session.currentPrompt = { card, options };
  setCurrentSession(session);
  speakWord(card.example, lang);
  document.getElementById('storyAudio').addEventListener('click', () => speakWord(card.example, lang));

  learnArea.querySelectorAll('.mc-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.idx);
      const correctIdx = options.findIndex(o => o.correct);
      const isCorrect = idx === correctIdx;
      document.querySelectorAll('.mc-option').forEach((b, i) => {
        b.disabled = true;
        if (i === correctIdx) b.classList.add('mc-correct');
        else if (i === idx) b.classList.add('mc-wrong');
      });
      session.currentPrompt = null;
      courseGrade(session, card, isCorrect);
      document.getElementById('mc-fb').innerHTML = `
        ${courseFeedbackHtml(isCorrect, card, '', card.exampleDE)}
        <div class="actions" style="margin-top:14px">
          <button type="button" class="btn btn-primary" id="courseNext">Weiter</button>
        </div>
      `;
      document.getElementById('courseNext').addEventListener('click', showCourseStep);
    });
  });
}

// Feedback-Text für die Kurs-Übungen (richtig / falsch mit Lösung).
function courseFeedbackHtml(isCorrect, card, extra = '', answer = card.back) {
  return `${isCorrect
    ? '<div class="correct" style="margin-top:14px"><p>✅ Richtig!</p></div>'
    : `<div class="incorrect" style="margin-top:14px"><p>❌ Falsch — richtig: <b>${escHtml(answer)}</b>. Kommt gleich nochmal.</p></div>`}${extra}`;
}

// Sucht im Beispielsatz das Wort, das zum Zielwort gehört (auch gebeugte
// Formen wie hus→huset oder mit Artikel verklebt wie l'école).
function findGapSentence(example, back, lang) {
  // Ohne Leerzeichen (zh/ja): das Zielwort direkt im Satz ausblenden.
  if (isSpaceless(lang)) {
    const at = example.indexOf(back);
    return at < 0 ? null : example.slice(0, at) + '____' + example.slice(at + back.length);
  }
  const norm = s => s.toLowerCase();
  const target = norm(back);
  const tokens = example.split(/(\s+)/);
  let bestIdx = -1;
  let bestScore = 0;

  tokens.forEach((tok, idx) => {
    if (/^\s+$/.test(tok) || !tok) return;
    const word = norm(tok.replace(/[.,!?;:„“"»«()¿¡]/g, ''));
    if (!word) return;
    let score = 0;
    if (word === target) score = 100;
    else if (word.includes(target) || target.includes(word)) score = 80;
    else {
      let p = 0;
      while (p < word.length && p < target.length && word[p] === target[p]) p++;
      if (p >= Math.min(4, target.length)) score = p;
    }
    if (score > bestScore) { bestScore = score; bestIdx = idx; }
  });

  if (bestIdx === -1) return null;
  const blanked = tokens.map((t, i) => {
    if (i !== bestIdx) return t;
    // Satzzeichen am ausgeblendeten Wort erhalten
    return t.replace(/[^.,!?;:„“"»«()¿¡]+/, '____');
  }).join('');
  return blanked;
}

// Phase 3: Sätze üben (Lückentext-Multiple-Choice).
function renderCourseGapFill(session) {
  const card = session.queue[0];
  const lang = session.deck.language;
  // Distraktoren nur aus bereits gelernten Wörtern.
  const options = buildMCOptions(card, session.knownCards);
  const learnArea = document.getElementById('learnArea');

  // Sätze in der Warteschlange sind garantiert lückenfähig (Vorauswahl).
  const gapped = findGapSentence(card.example, card.back, lang);

  const question =
    `<p class="fc-label">${getLangName(lang)}</p>
       <div class="gap-sentence">${escHtml(gapped)}</div>
       <p class="prompt">Welches Wort gehört in die Lücke?</p>`;

  learnArea.innerHTML = `
    <div class="mc-card">
      ${courseBadge(`<i class="fas fa-comment-dots"></i> Sätze üben — noch ${session.queue.length}`)}
      ${question}
      ${mcOptionsMarkup(options)}
    </div>
  `;

  learnArea.querySelectorAll('.mc-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const { isCorrect } = markMcAnswer(options, Number(btn.dataset.idx), card);
      if (isCorrect) speakWord(card.example || card.back, lang);

      courseGrade(session, card, isCorrect);

      const extra = `
        <p class="fc-example" style="margin-top:10px">${card.example ? exampleLine(card.example) : ''}</p>
        ${card.exampleDE ? `<p class="fc-example-de">${escHtml(card.exampleDE)}</p>` : ''}`;
      document.getElementById('mc-fb').innerHTML = `
        ${courseFeedbackHtml(isCorrect, card, extra)}
        <div class="actions" style="margin-top:14px">
          <button type="button" class="btn btn-primary" id="courseNext">Weiter</button>
        </div>
      `;
      wireExampleAudio(lang);
      document.getElementById('courseNext').addEventListener('click', showCourseStep);
    });
  });
}

function endCourseLesson(session) {
  // Endlos-Runden führen keine neuen Wörter ein → kein Kursfortschritt.
  if (!session.endless) advanceCourse(session.deckId, session.lessonCards.length);
  markSentencesDone(session.deckId, session.sentencesCompleted);
  const sentencesLearned = session.sentencesCompleted.length;

  const userStats = getUserStats();
  userStats.totalSessions = (userStats.totalSessions || 0) + 1;
  const today = new Date().toISOString().slice(0, 10);
  if (userStats.lastSessionDate !== today) {
    userStats.activeDays = (userStats.activeDays || 0) + 1;
    userStats.lastSessionDate = today;
  }
  userStats.successRate = session.gradedAnswers > 0
    ? Math.round((session.correctAnswers * 2 / session.gradedAnswers) * 50)
    : 0;
  setUserStats(userStats);
  updateStats();

  const { xpEarned, perfect, gemsEarned, game } = recordSessionEnd({
    language: session.deck.language,
    correct: session.correctAnswers,
    total: session.gradedAnswers,
    boost: !!session.boosted,
  });
  const xpTotal = (session.xpFromAnswers || 0) + xpEarned;
  showCombo(0);
  renderGamiHeader();
  renderLearnWidgets();
  const freshAchievements = checkAchievements();

  const nextLesson = lessonNumber(session.deckId);

  const sentenceNote = sentencesLearned > 0
    ? `<p style="color:var(--gray);margin-bottom:14px">Und du hast <b>${sentencesLearned}</b> ${sentencesLearned === 1 ? 'Satz' : 'Sätze'} freigeschaltet und geübt — aus Wörtern, die du schon kennst.</p>`
    : `<p style="color:var(--gray);margin-bottom:14px">Ganze Sätze schaltest du frei, sobald du genug Wörter für sie gelernt hast.</p>`;

  const head = session.endless
    ? `<h3 style="font-size:1.6rem;margin-bottom:12px">🔁 Endlos-Runde ${endlessRound} geschafft!</h3>
       <p style="color:var(--gray);margin-bottom:6px">${session.lessonCards.length} Wörter aufgefrischt — der Kurs bleibt für dich offen.</p>`
    : `<h3 style="font-size:1.6rem;margin-bottom:12px">🎉 Lektion ${session.lesson} geschafft!</h3>
       <p style="color:var(--gray);margin-bottom:6px">${session.lessonCards.length} neue Wörter gelernt — sie fließen jetzt in dein Level-System ein.</p>`;

  document.getElementById('learnArea').innerHTML = `
    ${head}
    ${sentenceNote}
    <div class="session-rewards">
      <span class="reward-pill reward-pill--xp"><i class="fas fa-bolt"></i> +${xpTotal} XP</span>
      ${rewardExtras(gemsEarned, session.boosted)}
      ${perfect ? '<span class="reward-pill reward-pill--perfect"><i class="fas fa-star"></i> Fehlerfrei!</span>' : ''}
      <span class="reward-pill reward-pill--streak"><i class="fas fa-fire"></i> Serie: ${game.streak.current} ${game.streak.current === 1 ? 'Tag' : 'Tage'}</span>
    </div>
    ${dailyRecapHtml()}
    <div class="actions" style="margin-top:20px">
      <button type="button" class="btn btn-primary" id="restartSession">
        ${session.endless
          ? '<i class="fas fa-rotate"></i> Nächste Endlos-Runde'
          : `<i class="fas fa-graduation-cap"></i> Lektion ${nextLesson} starten`}
      </button>
    </div>
  `;

  toastAchievements(freshAchievements);
  toastCosmetics(checkNewCosmetics());
  celebrateSessionEnd();
  syncSoon();                       // Fortschritt auf die anderen Geräte spiegeln
  document.getElementById('restartSession').addEventListener('click', startSession);
  setCurrentSession(null);

  const textEl = document.getElementById('progress-text');
  const barEl  = document.getElementById('progress-bar');
  if (textEl) textEl.textContent = `${session.totalCards}/${session.totalCards} Schritte`;
  if (barEl)  barEl.style.width = '100%';
}

// ── Helpers ──────────────────────────────────────────────────────

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}


// „Für dich": gespeicherte Fehler-Wörter als Karteikarten-Runde üben.
export async function startErrorReviewByFronts(deckId, fronts) {
  const deck = await loadDeck(deckId);
  const set = new Set(fronts);
  const cards = (deck?.cards || []).filter(c => set.has(c.front));
  if (!cards.length) return false;
  clearErrors(deckId);
  document.getElementById('view-learn')?.classList.add('session-active');
  startErrorReview(deck, deckId, cards);
  return true;
}

// Abgeschlossene Lektion vom Pfad aus wiederholen (Multiple Choice;
// bei sehr kleinen Lektionen Karteikarten). Abschluss vergoldet den Knoten.
export async function startLessonReview(deckId, lessonIdx) {
  const deck = await loadDeck(deckId);
  const sizes = deck?.lessonSizes;
  if (!deck || !sizes || lessonIdx < 0 || lessonIdx >= sizes.length) return false;
  let start = 0;
  for (let k = 0; k < lessonIdx; k++) start += sizes[k];
  const cards = deck.cards.slice(start, start + sizes[lessonIdx]);
  if (!cards.length) return false;

  const mode = cards.length >= 4 ? 'multiplechoice' : 'flashcard';
  const shuffled = shuffleArray([...cards]);
  const session = {
    deck,
    deckId,
    cards: shuffled,
    mode,
    currentIndex: 0,
    correctAnswers: 0,
    gradedAnswers: 0,
    totalCards: shuffled.length,
    currentPrompt: null,
    combo: 0,
    boosted: false,
    reviewLesson: { deckId, index: lessonIdx },
    queue: [...shuffled],
    reviewQueue: [],
    reviewRound: 1,
  };
  setCurrentSession(session);
  enterFocus(mode);
  const title = deck.lessonTitles?.[lessonIdx];
  document.getElementById('session-title').textContent =
    `Lektion ${lessonIdx + 1}${title ? ' · ' + title : ''} — Wiederholung`;
  updateProgress();
  if (mode === 'multiplechoice') showMultipleChoice(); else showFlashcard();
  return true;
}


// ── BLITZRUNDE ───────────────────────────────────────────────────
// 60 Sekunden, so viele Multiple-Choice-Antworten wie möglich.
// Antworten zählen normal (XP, Combo, SRS); die erste Runde des Tages
// bringt zusätzlich Diamanten in Höhe des Scores (max. 15).
const BLITZ_SECONDS = 60;

export async function startBlitz() {
  clearBlitzTimer();
  const deckId = document.getElementById('deckSelect').value;
  const deck = await loadDeck(deckId);
  if (!deck?.cards?.length) { alert('Bitte wähle ein gültiges Deck aus.'); return; }

  const shuffled = shuffleArray([...deck.cards]);
  const session = {
    deck,
    deckId,
    cards: shuffled,
    mode: 'blitz',
    currentIndex: 0,
    correctAnswers: 0,
    totalCards: shuffled.length,
    currentPrompt: null,
    combo: 0,
    boosted: false,
    blitzEnd: Date.now() + BLITZ_SECONDS * 1000,
    blitzAnswered: 0,
    queue: [],
    reviewQueue: [],
    reviewRound: 1,
  };
  setCurrentSession(session);
  enterFocus('blitz');
  const icon = document.getElementById('sessionModeIcon');
  if (icon) icon.className = 'fas fa-bolt';
  document.getElementById('session-title').textContent = `⚡ Blitzrunde — ${deck.name}`;

  blitzTimer = setInterval(() => {
    const st = getCurrentSession();
    if (!st || st.mode !== 'blitz') { clearBlitzTimer(); return; }
    const left = Math.max(0, Math.ceil((st.blitzEnd - Date.now()) / 1000));
    const el = document.getElementById('blitzTimer');
    if (el) {
      el.textContent = `${left}s`;
      el.classList.toggle('blitz-timer--low', left <= 10);
    }
    if (left <= 0) endBlitz();
  }, 250);

  showBlitz();
}

function showBlitz() {
  const session = getCurrentSession();
  if (!session || session.mode !== 'blitz') return;
  if (Date.now() >= session.blitzEnd) { endBlitz(); return; }

  const card = session.cards[session.currentIndex % session.cards.length];
  session.currentIndex++;
  const pool = session.cards.filter(c => c.back !== card.back && c.front !== card.front);
  const options = shuffleArray([card, ...shuffleArray(pool).slice(0, 3)]);
  session.currentPrompt = { card, options };
  setCurrentSession(session);

  const left = Math.max(0, Math.ceil((session.blitzEnd - Date.now()) / 1000));
  document.getElementById('learnArea').innerHTML = `
    <div class="mc-card blitz-card">
      <div class="blitz-head">
        <span class="blitz-score"><i class="fas fa-bolt"></i> ${session.correctAnswers}</span>
        <span class="blitz-timer" id="blitzTimer">${left}s</span>
      </div>
      <p class="mc-question">${escHtml(promptText(session, card))}</p>
      <div class="mc-options">
        ${options.map((o, i) => `
          <button type="button" class="mc-option" data-idx="${i}">
            <span class="mc-key">${String.fromCharCode(65 + i)}</span>
            <span class="mc-text">${escHtml(answerText(session, o))}</span>
          </button>`).join('')}
      </div>
    </div>
  `;
  document.querySelectorAll('.blitz-card .mc-option').forEach(btn =>
    btn.addEventListener('click', () => checkBlitzAnswer(Number(btn.dataset.idx))));

  const t = document.getElementById('progress-text');
  if (t) t.textContent = `${session.blitzAnswered} Antworten`;
  const b = document.getElementById('progress-bar');
  if (b) b.style.width = `${Math.round(((BLITZ_SECONDS * 1000 - (session.blitzEnd - Date.now())) / (BLITZ_SECONDS * 1000)) * 100)}%`;
}

function checkBlitzAnswer(idx) {
  const session = getCurrentSession();
  if (!session?.currentPrompt || session.mode !== 'blitz') return;
  const { card, options } = session.currentPrompt;
  const isCorrect = options[idx] === card;
  session.blitzAnswered++;
  if (isCorrect) session.correctAnswers++;
  session.currentPrompt = null;
  setCurrentSession(session);
  recordAnswerEffects(session, card, isCorrect, isCorrect);
  // Kein „Weiter"-Knopf — sofort die nächste Frage (Tempo!).
  if (Date.now() >= session.blitzEnd) { endBlitz(); return; }
  showBlitz();
}

function endBlitz() {
  clearBlitzTimer();
  const session = getCurrentSession();
  if (!session || session.mode !== 'blitz') return;

  const score = session.correctAnswers;
  const answered = session.blitzAnswered;
  const { gems, first, best, record } = noteBlitz(score);
  const { xpEarned, game } = recordSessionEnd({
    language: session.deck.language,
    correct: score,
    total: answered,
  });
  const xpTotal = (session.xpFromAnswers || 0) + xpEarned;
  showCombo(0);
  renderGamiHeader();
  renderLearnWidgets();
  toastAchievements(checkAchievements());
  toastCosmetics(checkNewCosmetics());
  celebrateSessionEnd();
  if (gems > 0 || (record && score > 0)) confettiBurst();

  document.getElementById('learnArea').innerHTML = `
    <h3 style="font-size:1.6rem;margin-bottom:12px">⚡ Blitzrunde vorbei!</h3>
    <p style="font-size:2.2rem;font-weight:800;color:var(--primary);margin-bottom:4px">${score}</p>
    <p style="color:var(--gray);margin-bottom:14px">richtige Antworten in ${BLITZ_SECONDS} Sekunden (${answered} beantwortet)</p>
    <div class="session-rewards">
      <span class="reward-pill reward-pill--xp"><i class="fas fa-bolt"></i> +${xpTotal} XP</span>
      ${gems > 0 ? `<span class="reward-pill reward-pill--gems"><i class="fas fa-gem"></i> +${gems} Tagesbonus</span>` : ''}
      ${record && score > 0 ? '<span class="reward-pill reward-pill--perfect"><i class="fas fa-trophy"></i> Neuer Rekord!</span>' : ''}
      <span class="reward-pill reward-pill--streak"><i class="fas fa-fire"></i> Serie: ${game.streak.current} ${game.streak.current === 1 ? 'Tag' : 'Tage'}</span>
    </div>
    <p style="color:var(--gray);font-size:.85rem;margin-top:8px"><i class="fas fa-trophy" style="color:var(--warning,#f4a261)"></i> Bestleistung: <b>${best}</b></p>
    ${!first ? '<p style="color:var(--gray);font-size:.82rem;margin-top:8px">Diamanten-Bonus gibt es für die erste Runde des Tages.</p>' : ''}
    ${dailyRecapHtml()}
    <div class="actions" style="margin-top:20px">
      <button type="button" class="btn btn-primary" id="restartBlitz">
        <i class="fas fa-bolt"></i> Noch eine Runde
      </button>
    </div>
  `;
  document.getElementById('restartBlitz').addEventListener('click', startBlitz);
  setCurrentSession(null);
}


// ── THEMEN-QUIZ ──────────────────────────────────────────────────
// Prüfung über ALLE Wörter eines Pfad-Themas (z. B. „Essen" über alle
// „Essen 1..n"-Lektionen). Eine Runde Multiple Choice ohne Wiederholungs-
// schleife; ab 90 % gibt es das Themen-Abzeichen auf dem Lernpfad.
const QUIZ_PASS_RATE = 0.9;
const baseThemeOf = t => (t || '').replace(/ \d+$/, '');

export async function startThemeQuiz(deckId, theme) {
  clearBlitzTimer();
  const deck = await loadDeck(deckId);
  if (!deck?.cards?.length || !deck.lessonSizes || !deck.lessonTitles) return false;

  // Alle Karten der Lektionen dieses (Basis-)Themas einsammeln.
  const cards = [];
  let start = 0;
  deck.lessonSizes.forEach((size, i) => {
    if (baseThemeOf(deck.lessonTitles[i]) === theme) cards.push(...deck.cards.slice(start, start + size));
    start += size;
  });
  if (!cards.length) return false;

  const shuffled = shuffleArray([...cards]);
  const session = {
    deck,
    deckId,
    cards: shuffled,
    mode: 'themequiz',
    quizTheme: theme,
    currentIndex: 0,
    correctAnswers: 0,
    totalCards: shuffled.length,
    currentPrompt: null,
    combo: 0,
    boosted: false,
    queue: [],
    reviewQueue: [],
    reviewRound: 1,
  };
  setCurrentSession(session);
  enterFocus('themequiz');
  const icon = document.getElementById('sessionModeIcon');
  if (icon) icon.className = 'fas fa-award';
  document.getElementById('session-title').textContent = `🏅 Themen-Quiz — ${theme}`;
  showThemeQuiz();
  return true;
}

function showThemeQuiz() {
  const session = getCurrentSession();
  if (!session || session.mode !== 'themequiz') return;
  if (session.currentIndex >= session.totalCards) { endThemeQuiz(); return; }

  const card = session.cards[session.currentIndex];
  // Ablenker aus dem ganzen Deck, damit auch kleine Themen 4 Optionen haben.
  const pool = session.deck.cards.filter(c => c.back !== card.back && c.front !== card.front);
  const options = shuffleArray([card, ...shuffleArray(pool).slice(0, 3)]);
  session.currentPrompt = { card, options };
  setCurrentSession(session);

  document.getElementById('learnArea').innerHTML = `
    <div class="mc-card quiz-card">
      <div class="quiz-head">
        <span class="quiz-progress"><i class="fas fa-award"></i> Frage ${session.currentIndex + 1}/${session.totalCards}</span>
        <span class="quiz-score">${session.correctAnswers} richtig</span>
      </div>
      <p class="mc-question">${escHtml(promptText(session, card))}</p>
      <div class="mc-options">
        ${options.map((o, i) => `
          <button type="button" class="mc-option" data-idx="${i}">
            <span class="mc-key">${String.fromCharCode(65 + i)}</span>
            <span class="mc-text">${escHtml(answerText(session, o))}</span>
          </button>`).join('')}
      </div>
    </div>
  `;
  document.querySelectorAll('.quiz-card .mc-option').forEach(btn =>
    btn.addEventListener('click', () => checkThemeQuizAnswer(Number(btn.dataset.idx))));

  const t = document.getElementById('progress-text');
  if (t) t.textContent = `${session.currentIndex}/${session.totalCards} Fragen`;
  const b = document.getElementById('progress-bar');
  if (b) b.style.width = `${Math.round((session.currentIndex / session.totalCards) * 100)}%`;
}

function checkThemeQuizAnswer(idx) {
  const session = getCurrentSession();
  if (!session?.currentPrompt || session.mode !== 'themequiz') return;
  const { card, options } = session.currentPrompt;
  const { isCorrect } = markMcAnswer(options, idx, card);
  session.currentIndex++;
  if (isCorrect) session.correctAnswers++;
  session.currentPrompt = null;
  setCurrentSession(session);
  recordAnswerEffects(session, card, isCorrect, isCorrect);
  // Kurz die Auflösung zeigen, dann automatisch weiter (Prüfungs-Tempo);
  // bei Fehlern etwas länger, damit die richtige Antwort hängen bleibt.
  quizTimeout = setTimeout(() => {
    quizTimeout = null;
    showThemeQuiz();
  }, isCorrect ? 450 : 1300);
}

function endThemeQuiz() {
  clearBlitzTimer();
  const session = getCurrentSession();
  if (!session || session.mode !== 'themequiz') return;

  const total = session.totalCards;
  const correct = session.correctAnswers;
  const rate = total ? correct / total : 0;
  const passed = rate >= QUIZ_PASS_RATE;
  const alreadyBadged = !!getThemeBadges(session.deckId)[session.quizTheme];
  if (passed) awardThemeBadge(session.deckId, session.quizTheme);

  const { xpEarned, game } = recordSessionEnd({
    language: session.deck.language,
    correct,
    total,
  });
  const xpTotal = (session.xpFromAnswers || 0) + xpEarned;
  showCombo(0);
  renderGamiHeader();
  renderLearnWidgets();
  toastAchievements(checkAchievements());
  toastCosmetics(checkNewCosmetics());
  celebrateSessionEnd();
  if (passed) {
    confettiBurst();
    if (!alreadyBadged) showToast(`<i class="fas fa-award toast__icon"></i><div class="toast__body"><b>Themen-Abzeichen verdient! 🏅</b><span>„${escHtml(session.quizTheme)}" gemeistert</span></div>`);
  }

  document.getElementById('learnArea').innerHTML = `
    <h3 style="font-size:1.6rem;margin-bottom:12px">${passed ? '🏅 Quiz bestanden!' : '📝 Quiz beendet'}</h3>
    <p style="font-size:2.2rem;font-weight:800;color:var(--primary);margin-bottom:4px">${Math.round(rate * 100)}%</p>
    <p style="color:var(--gray);margin-bottom:14px">${correct} von ${total} Fragen zum Thema „${escHtml(session.quizTheme)}" richtig</p>
    <div class="session-rewards">
      <span class="reward-pill reward-pill--xp"><i class="fas fa-bolt"></i> +${xpTotal} XP</span>
      ${passed ? '<span class="reward-pill reward-pill--perfect"><i class="fas fa-award"></i> Themen-Abzeichen</span>' : ''}
      <span class="reward-pill reward-pill--streak"><i class="fas fa-fire"></i> Serie: ${game.streak.current} ${game.streak.current === 1 ? 'Tag' : 'Tage'}</span>
    </div>
    ${passed ? '' : `<p style="color:var(--gray);font-size:.85rem;margin-top:8px">Für das Abzeichen brauchst du mindestens ${Math.round(QUIZ_PASS_RATE * 100)} % — versuch es gleich nochmal!</p>`}
    ${dailyRecapHtml()}
    <div class="actions" style="margin-top:20px">
      <button type="button" class="btn btn-primary" id="restartQuiz">
        <i class="fas fa-award"></i> ${passed ? 'Noch einmal' : 'Nochmal versuchen'}
      </button>
    </div>
  `;
  const { deckId, quizTheme } = session;
  document.getElementById('restartQuiz').addEventListener('click', () => startThemeQuiz(deckId, quizTheme));
  setCurrentSession(null);

  const textEl = document.getElementById('progress-text');
  const barEl  = document.getElementById('progress-bar');
  if (textEl) textEl.textContent = `${total}/${total} Fragen`;
  if (barEl)  barEl.style.width = '100%';
}
