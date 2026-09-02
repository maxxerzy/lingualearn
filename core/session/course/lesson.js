import { getCurrentSession, setCurrentSession, getUserStats, setUserStats } from '../../state.js';
import { updateProgress } from '../../progress.js';
import { updateStats } from '../../stats.js';
import { shuffleArray } from '../../../utils/helpers.js';
import { getDueFronts, getCardState } from '../../cardProgress.js';
import { checkAchievements, consumeXpBoost, recordSessionEnd } from '../../gamification.js';
import { renderGamiHeader, renderLearnWidgets } from '../../../ui/gami.js';
import { toastAchievements, toastCosmetics } from '../../../ui/toast.js';
import { checkNewCosmetics } from '../../cosmetics.js';
import { findGapSentence, isSpaceless, sentenceIsKnown, splitSentence } from '../../../utils/sentence.js';
import { speak } from '../../../utils/speech.js';
import { syncSoon } from '../../sync.js';
import { advanceCourse, getCourseState, getSentencesDone, lessonNumber, markSentencesDone, nextLessonCards } from '../../course.js';
import { startSession } from '../../session.js';
import { celebrateSessionEnd, dailyRecapHtml, isReverse, rewardExtras, showCombo } from '../shared.js';
import { renderCourseTeach, renderCourseListen } from './teach.js';
import { renderCourseSpeak, renderCourseTalk, renderCourseHearing } from './speech.js';
import { renderCourseWordMC, renderCourseMatch, renderCourseReview, renderCourseCompare, renderCourseWrite } from './practice.js';
import { renderCourseDialog, renderCourseBuild, renderCourseMeaning, renderCourseGapFill } from './sentences.js';

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
    const mod = await import(`../../../js/data/phrases/${lang}.js`);
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

export function showCourseStep() {
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