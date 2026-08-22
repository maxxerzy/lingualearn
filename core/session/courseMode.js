import { getCurrentSession, setCurrentSession, getUserStats, setUserStats } from '../state.js';
import { updateProgress } from '../progress.js';
import { updateStats } from '../stats.js';
import { shuffleArray } from '../../utils/helpers.js';
import { getDueFronts, getCardState } from '../cardProgress.js';
import { recordGameAnswer, recordSessionEnd, checkAchievements, consumeXpBoost } from '../gamification.js';
import { renderGamiHeader, renderLearnWidgets } from '../../ui/gami.js';
import { toastAchievements, toastCosmetics } from '../../ui/toast.js';
import { checkNewCosmetics } from '../cosmetics.js';
import { isSpaceless, splitSentence, joinSentence, sentenceIsKnown, findGapSentence } from '../../utils/sentence.js';
import { comparePronunciation, mismatchHint } from '../../utils/pronounce.js';
import { playCorrect, playWrong } from '../../utils/feedback.js';
import { speak, latinPron } from '../../utils/speech.js';
import { syncSoon } from '../sync.js';
import { nextLessonCards, lessonNumber, advanceCourse, getCourseState, getSentencesDone, markSentencesDone } from '../course.js';
import { startSession } from '../session.js';
import {
  announceUnlocks, showCombo, rewardExtras, celebrateSessionEnd, getLangCode, getLangName,
  speakWord, isReverse, promptText, answerText, promptLabel, answerLabel,
  promptAudioBtn, wirePromptAudio, exampleLine, wireExampleAudio, cognateChip,
  buildMCOptions, mcOptionsMarkup, markMcAnswer, recordAnswerEffects, dailyRecapHtml,
  escHtml, courseBadge, timers
} from './shared.js';
import { hasStrokeLang, openStrokeOrder } from '../../ui/strokeOrder.js';

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
    const mod = await import(`../../js/data/phrases/${lang}.js`);
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


export async function startCourseLesson(deck, deckId) {
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
      ${hasStrokeLang(lang) ? `
        <button type="button" class="btn btn-secondary stroke-order-btn" id="strokeOrderBtn">
          <i class="fas fa-pen-fancy"></i> Strichfolge
        </button>
      ` : ''}
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
  if (hasStrokeLang(lang)) {
    document.getElementById('strokeOrderBtn').addEventListener('click', () => openStrokeOrder(lang, card.back));
  }
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
function canRecordAudio() {
  return typeof MediaRecorder !== 'undefined' && !!navigator.mediaDevices?.getUserMedia;
}

// Baustein-Anzeige des Vergleichs: abweichende Stellen sind markiert.
function pronPartsHtml(parts, charLevel) {
  return parts.map(p =>
    `<span class="pron-part${p.ok ? '' : ' pron-part--bad'}">${escHtml(p.text)}</span>`)
    .join(charLevel ? '' : ' ');
}

function pronCompareHtml(result) {
  return `
    <div class="pron-compare">
      <div class="pron-row">
        <span class="pron-label">Ziel</span>
        <span class="pron-text">${pronPartsHtml(result.target, result.charLevel)}</span>
      </div>
      <div class="pron-row">
        <span class="pron-label">Gehört</span>
        <span class="pron-text">${result.heard.length
          ? pronPartsHtml(result.heard, result.charLevel)
          : '<i>nichts verstanden</i>'}</span>
      </div>
      ${mismatchHint(result) ? `<p class="pron-hint">${escHtml(mismatchHint(result))}</p>` : ''}
    </div>`;
}

// Sprechen-Schritt.
//
// Drei Ausbaustufen, je nachdem was das Gerät kann:
//   'listen'  — Spracherkennung da: Wort-für-Wort-Abgleich, die
//               abweichende Stelle wird markiert.
//   'compare' — keine Erkennung (iOS Safari), aber Mikrofon: eigene
//               Aufnahme gegen die Referenzstimme, komplett auf dem
//               Gerät, nichts verlässt das Telefon.
//   'self'    — weder noch: Referenz hören und selbst einschätzen.
function renderCourseSpeak(session) {
  const card = session.queue[0];
  const lang = session.deck.language;
  const SR = speechRecognitionCtor();
  const mode = SR ? 'listen' : (canRecordAudio() ? 'compare' : 'self');
  const spoken = lang === 'la' ? latinPron(card.back) : card.back;
  const pron = [];
  if (card.roman) pron.push(escHtml(card.roman));
  if (card.ipa) pron.push('/' + escHtml(card.ipa) + '/');
  if (lang === 'la') pron.push(`gesprochen: „${escHtml(latinPron(card.back))}“`);
  const learnArea = document.getElementById('learnArea');

  const intro = mode === 'listen' ? ' — ich höre zu und zeige dir, wo es abwich'
    : mode === 'compare' ? ' — nimm dich auf und vergleiche' : ':';

  learnArea.innerHTML = `
    <div class="mc-card speak-card" data-speak-mode="${mode}">
      ${courseBadge(`<i class="fas fa-microphone"></i> Sprechen — noch ${session.queue.length}`)}
      <div class="fc-word fc-word-target">
        ${escHtml(card.back)}
        <button type="button" class="audio-btn" id="speakListen" title="Anhören"><i class="fas fa-volume-up"></i></button>
      </div>
      <p class="fc-example-de" style="margin:2px 0 6px">${escHtml(card.front)}</p>
      ${pron.length ? `<p class="course-pron">${pron.join(' · ')}</p>` : ''}
      <p class="prompt">Hör zu und sprich das Wort laut nach${intro}</p>
      ${mode === 'listen' ? `<div class="actions">
        <button type="button" class="btn btn-primary" id="courseSpeakRec"><i class="fas fa-microphone"></i> Aufnehmen</button>
      </div>` : ''}
      ${mode === 'compare' ? `<div class="actions">
        <button type="button" class="btn btn-primary" id="courseSpeakRec"><i class="fas fa-microphone"></i> Aufnehmen</button>
      </div>
      <div class="pron-play" id="pronPlay" hidden>
        <button type="button" class="btn" id="pronPlayMine"><i class="fas fa-user"></i> Meine Aufnahme</button>
        <button type="button" class="btn" id="pronPlayRef"><i class="fas fa-volume-up"></i> Original</button>
      </div>` : ''}
      <div class="actions" style="margin-top:8px">
        <button type="button" class="btn ${mode === 'listen' ? '' : 'btn-good'}" id="courseSpeakOk"><i class="fas fa-check"></i> ${mode === 'compare' ? 'Klang gleich' : 'Hat geklappt'}</button>
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
  let mediaRec = null;
  let mineUrl = null;
  let micStream = null;
  const releaseMic = () => {
    try { micStream?.getTracks().forEach(t => t.stop()); } catch { /* schon zu */ }
    micStream = null;
  };
  const finish = ok => {
    if (settled) return;
    settled = true;
    if (timers.quiz) { clearTimeout(timers.quiz); timers.quiz = null; }
    try { activeRec?.abort(); } catch { /* Erkennung lief nicht mehr */ }
    try { mediaRec?.state === 'recording' && mediaRec.stop(); } catch { /* Aufnahme lief nicht */ }
    releaseMic();
    if (mineUrl) { URL.revokeObjectURL(mineUrl); mineUrl = null; }
    const st = getCurrentSession();
    if (!st || st.mode !== 'course' || st.phase !== 'speak') return;
    courseGrade(session, card, ok);
    showCourseStep();
  };
  document.getElementById('courseSpeakOk').addEventListener('click', () => finish(true));
  document.getElementById('courseSpeakRetry').addEventListener('click', () => finish(false));

  // ── Vergleichs-Modus: eigene Aufnahme gegen die Referenzstimme ──
  function wireCompare() {
    const btn = document.getElementById('courseSpeakRec');
    const row = document.getElementById('pronPlay');
    if (!btn || !row) return;
    btn.addEventListener('click', async () => {
      if (settled) return;
      if (mediaRec?.state === 'recording') { mediaRec.stop(); return; }
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch {
        const fb = document.getElementById('mc-fb');
        if (fb) fb.innerHTML = '<div class="incorrect" style="margin-top:10px"><p>🎤 Kein Zugriff aufs Mikrofon — hör dir das Original an und schätze selbst ein.</p></div>';
        btn.disabled = true;
        return;
      }
      micStream = stream;
      const chunks = [];
      mediaRec = new MediaRecorder(stream);
      mediaRec.ondataavailable = e => { if (e.data?.size) chunks.push(e.data); };
      mediaRec.onstop = () => {
        releaseMic();
        btn.innerHTML = '<i class="fas fa-microphone"></i> Nochmal aufnehmen';
        if (!chunks.length) return;
        if (mineUrl) URL.revokeObjectURL(mineUrl);
        mineUrl = URL.createObjectURL(new Blob(chunks, { type: mediaRec.mimeType || 'audio/webm' }));
        row.hidden = false;
        const fb = document.getElementById('mc-fb');
        if (fb) fb.innerHTML = '<div class="pron-compare"><p class="pron-hint">Hör beides nacheinander an: klingt deins wie das Original?</p></div>';
      };
      btn.innerHTML = '<i class="fas fa-stop"></i> Aufnahme stoppen';
      mediaRec.start();
      // Kurz und schmerzlos — ein Wort braucht keine Minute.
      timers.quiz = setTimeout(() => {
        timers.quiz = null;
        try { mediaRec?.state === 'recording' && mediaRec.stop(); } catch { /* schon gestoppt */ }
      }, 4000);
    });
    document.getElementById('pronPlayMine')?.addEventListener('click', () => {
      if (!mineUrl) return;
      const a = new Audio(mineUrl);
      a.play().catch(() => { /* Autoplay-Sperre */ });
    });
    document.getElementById('pronPlayRef')?.addEventListener('click', () => speakWord(card.back, lang));
  }

  // Erkennung fällt aus (iOS, kein Netz, keine Erlaubnis) → auf den
  // Vergleichs-Modus umschalten statt den Nutzer ohne Rückmeldung zu lassen.
  function fallbackToCompare(reason) {
    if (settled || !canRecordAudio()) return false;
    const card_ = document.querySelector('.speak-card');
    const rec = document.getElementById('courseSpeakRec');
    if (!card_ || !rec) return false;
    card_.dataset.speakMode = 'compare';
    rec.disabled = false;
    rec.innerHTML = '<i class="fas fa-microphone"></i> Aufnehmen';
    if (!document.getElementById('pronPlay')) {
      rec.parentElement.insertAdjacentHTML('afterend', `
        <div class="pron-play" id="pronPlay" hidden>
          <button type="button" class="btn" id="pronPlayMine"><i class="fas fa-user"></i> Meine Aufnahme</button>
          <button type="button" class="btn" id="pronPlayRef"><i class="fas fa-volume-up"></i> Original</button>
        </div>`);
    }
    const ok = document.getElementById('courseSpeakOk');
    if (ok) ok.innerHTML = '<i class="fas fa-check"></i> Klang gleich';
    const fb = document.getElementById('mc-fb');
    if (fb) fb.innerHTML = `<div class="incorrect" style="margin-top:10px"><p>🎤 ${escHtml(reason)} — nimm dich stattdessen auf und vergleiche mit dem Original.</p></div>`;
    // Die Erkennungs-Klicks am alten Knopf sind mit ihm verschwunden,
    // deshalb neu verdrahten.
    const fresh = rec.cloneNode(true);
    rec.replaceWith(fresh);
    wireCompare();
    return true;
  }

  if (mode === 'compare') wireCompare();

  if (mode === 'listen') {
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
      const finishRec = (result) => {
        if (done || settled) return;
        done = true;
        const fb = document.getElementById('mc-fb');
        const perfect = result.target.every(p => p.ok);
        if (fb) {
          // Knapp bestanden ist nicht dasselbe wie sauber getroffen —
          // sonst stünde „Klang gut" über einer rot markierten Stelle.
          const head = result.ok
            ? (perfect ? '✅ Klang gut!' : '✅ Reicht — eine Stelle war aber daneben:')
            : '🎤 Fast — schau, wo es abwich:';
          fb.innerHTML = `
            <div class="${result.ok ? 'correct' : 'incorrect'}" style="margin-top:10px">
              <p>${head}</p>
            </div>
            ${perfect && result.ok ? '' : pronCompareHtml(result)}`;
        }
        const pause = result.ok ? (perfect ? 900 : 2000) : 2600;
        timers.quiz = setTimeout(() => { timers.quiz = null; finish(result.ok); }, pause);
      };
      rec.onresult = e => {
        const alts = [...(e.results[0] || [])].map(a => a.transcript || '');
        // Beste Alternative gewinnt — die Erkennung liefert oft mehrere.
        let best = comparePronunciation(spoken, alts[0] || '', lang);
        for (const alt of alts.slice(1)) {
          const cand = comparePronunciation(spoken, alt, lang);
          if (cand.score > best.score) best = cand;
        }
        finishRec(best);
      };
      rec.onerror = e => {
        if (done) return;
        done = true;
        const why = e?.error === 'not-allowed' || e?.error === 'service-not-allowed'
          ? 'Die Erkennung darf nicht zuhören'
          : 'Die Erkennung ist hier nicht verfügbar';
        if (!fallbackToCompare(why)) {
          btn.disabled = false;
          btn.innerHTML = '<i class="fas fa-microphone"></i> Aufnehmen';
        }
      };
      rec.onend = () => { if (!done) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-microphone"></i> Aufnehmen'; } };
      try { rec.start(); } catch { if (!done) { done = true; if (!fallbackToCompare('Die Erkennung ließ sich nicht starten')) btn.disabled = false; } }
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
    if (timers.quiz) { clearTimeout(timers.quiz); timers.quiz = null; }
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
        if (ok) timers.quiz = setTimeout(() => { timers.quiz = null; finish(); }, 800);
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
