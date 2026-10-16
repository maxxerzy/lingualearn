import { getCurrentSession, setCurrentSession, getUserStats, setUserStats } from '../state.js';
import { updateProgress } from '../progress.js';
import { updateStats } from '../stats.js';
import { shuffleArray, pickRandom, escHtml, todayStr } from '../../utils/helpers.js';
import { isCognate } from '../../utils/cognate.js';
import { recordCardAnswer } from '../cardProgress.js';
import { recordGameAnswer, recordSessionEnd, checkAchievements, consumeCelebrations, noteCombo, getGame } from '../gamification.js';
import { renderGamiHeader, renderLearnWidgets } from '../../ui/gami.js';
import { showToast, toastAchievements, toastCosmetics, confettiBurst } from '../../ui/toast.js';
import { checkNewCosmetics } from '../cosmetics.js';
import { pendingQuestClaims } from '../quests.js';
import { saveErrors } from '../errorLog.js';
import { autoSaveDeck } from '../offline.js';
import { playCorrect, playWrong } from '../../utils/feedback.js';
import { speak } from '../../utils/speech.js';
import { syncSoon } from '../sync.js';
import { createUserStore } from '../userStore.js';
import { startSession } from '../session.js';
import { showFlashcard } from './flashcard.js';

export { escHtml };

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
export function awardThemeBadge(deckId, theme) {
  const map = quizStore.get();
  const badges = map[deckId] || {};
  badges[theme] = todayStr();
  map[deckId] = badges;
  quizStore.save(map);
}

// Erfolge prüfen + einblenden, danach dadurch freigeschaltete Cosmetics.
export function announceUnlocks() {
  toastAchievements(checkAchievements());
  toastCosmetics(checkNewCosmetics());
}

// Combo-Anzeige (aufeinanderfolgende richtige Antworten).
export function showCombo(combo, bonus) {
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
export function rewardExtras(gemsEarned, boosted) {
  return `${gemsEarned ? `<span class="reward-pill reward-pill--gems"><i class="fas fa-gem"></i> +${gemsEarned}</span>` : ''}${boosted ? '<span class="reward-pill reward-pill--boost"><i class="fas fa-bolt"></i> 2× XP</span>' : ''}`;
}
export function celebrateSessionEnd() {
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

const LANG_CODES = { da: 'da-DK', el: 'el-GR', fr: 'fr-FR', es: 'es-ES', la: 'la', ru: 'ru-RU', ja: 'ja-JP', zh: 'zh-CN', pt: 'pt-PT', ar: 'ar-SA' };
const LANG_NAMES  = { da: 'Dänisch', el: 'Griechisch', fr: 'Französisch', es: 'Spanisch', la: 'Latein', ru: 'Russisch', ja: 'Japanisch', zh: 'Chinesisch', pt: 'Portugiesisch', ar: 'Arabisch' };

export function getLangCode(lang) {
  return LANG_CODES[lang] || lang;
}

export function getLangName(lang) {
  return LANG_NAMES[lang] || lang;
}

export function speakWord(text, lang) {
  speak(text, lang);
}

// ── Abfragerichtung ──────────────────────────────────────────────
// Latein wird in Prüfungsrichtung gelernt: die Abfrage zeigt das
// LATEINISCHE Wort, geantwortet wird auf Deutsch (wie im Unterricht).
// Alle anderen Sprachen fragen weiterhin Deutsch → Fremdsprache ab.
export function isReverse(deck) { return deck?.language === 'la'; }
export function promptText(session, card) { return isReverse(session.deck) ? card.back : card.front; }
export function answerText(session, card) { return isReverse(session.deck) ? card.front : card.back; }
export function promptLabel(session) { return isReverse(session.deck) ? getLangName(session.deck.language) : 'Deutsch'; }
export function answerLabel(session) { return isReverse(session.deck) ? 'Deutsch' : getLangName(session.deck.language); }
// Aussprache-Knopf neben dem fremdsprachigen Abfragewort (nur umgekehrte Richtung).
export function promptAudioBtn(session) {
  return isReverse(session.deck)
    ? '<button type="button" class="audio-btn" id="promptAudioBtn" title="Aussprache anhören"><i class="fas fa-volume-up"></i></button>'
    : '';
}
export function wirePromptAudio(session, card) {
  document.getElementById('promptAudioBtn')?.addEventListener('click', () =>
    speakWord(card.back, session.deck.language));
}

export function getSelectedMode() {
  const btn = document.querySelector('.mode-btn.active');
  return btn ? btn.dataset.mode : 'flashcard';
}

// Fokus-Modus: blendet (mobil) die Konfiguration aus und zeigt nur den
// Lernbereich mit Zurück-/Modus-Leiste. Die Lernkarte gibt's im Kurs.
export function enterFocus(mode) {
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
export const timers = { blitz: null, quiz: null };
export function clearBlitzTimer() {
  if (timers.blitz) { clearInterval(timers.blitz); timers.blitz = null; }
  if (timers.quiz) { clearTimeout(timers.quiz); timers.quiz = null; }
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
// No-Scroll-Garantie + großzügiges Kartenfenster: Misst den tatsächlichen
// freien Platz unterhalb der Karten-Oberkante im sichtbaren Viewport
// (visualViewport auf iOS Safari statt 100vh/scrollHeight, das auf iPhones
// durch die Adressleiste ~110px zu groß ist und die Karte fälschlich
// abgeschnitten hat). Auf Handys/Tablets wächst #learnArea auf eine
// komfortable Mindesthöhe, sodass alle 4 Antworten + Umschrift Platz haben;
// bei Überlauf scrollt nur #learnArea intern, die Seite selbst nie.
function fitLearnArea() {
  const area = document.getElementById('learnArea');
  if (!area) return;
  area.style.maxHeight = '';
  area.style.minHeight = '';
  area.style.overflowY = '';
  area.style.justifyContent = '';
  if (!document.getElementById('view-learn')?.classList.contains('session-active')) return;
  const vh = window.visualViewport?.height || window.innerHeight;
  const rect = area.getBoundingClientRect();
  const cs = el => (el ? getComputedStyle(el) : null);
  const px = v => parseFloat(v) || 0;
  const panelSt = cs(area.closest('.learn-panel'));
  const contentSt = cs(area.closest('.content'));
  const bodySt = cs(document.body);
  const bottomChrome = Math.ceil(
    (panelSt ? px(panelSt.paddingBottom) + px(panelSt.borderBottomWidth) : 14) +
    (contentSt ? px(contentSt.paddingBottom) : 14) +
    (bodySt ? px(bodySt.paddingBottom) : 0)
  );
  const avail = Math.floor(vh - rect.top - bottomChrome - 2);
  if (avail <= 160) return;
  if (window.innerWidth <= 1200) {
    const targetMin = Math.min(avail, window.innerWidth <= 768 ? 560 : 620);
    if (rect.height < targetMin) {
      area.style.minHeight = `${targetMin}px`;
    }
  }
  if (area.scrollHeight > avail + 2) {
    area.style.minHeight = '';
    area.style.maxHeight = `${Math.max(180, avail)}px`;
    area.style.overflowY = 'auto';
    area.style.justifyContent = 'flex-start';
  }
}

if (typeof MutationObserver !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const area = document.getElementById('learnArea');
    if (!area) return;
    let fitRaf = 0;
    const scheduleFit = () => {
      if (fitRaf) return;
      fitRaf = requestAnimationFrame(() => {
        fitRaf = 0;
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
          btn.scrollIntoView({ block: 'nearest', behavior: 'instant' });
        }
      });
    };
    window.addEventListener('resize', scheduleFit);
    window.addEventListener('orientationchange', scheduleFit);
    window.visualViewport?.addEventListener('resize', scheduleFit);
    // Style-Änderungen lösen den Beobachter nicht aus (nur childList),
    // deshalb kann fitLearnArea hier gefahrlos die Höhe setzen.
    new MutationObserver(scheduleFit).observe(area, { childList: true, subtree: true });
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
export function exampleLine(sentence, { strong = true } = {}) {
  const text = escHtml(sentence);
  const inner = strong ? `<strong>${text}</strong>` : text;
  return `<span class="ex-line">${inner}
    <button type="button" class="audio-btn ex-audio" data-say="${text}" title="Satz anhören" aria-label="Satz anhören">
      <i class="fas fa-volume-up"></i>
    </button></span>`;
}

// Einmal pro Render aktivieren: alle Satz-Knöpfe im Lernbereich verdrahten.
export function wireExampleAudio(lang) {
  document.querySelectorAll('#learnArea .ex-audio').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      speakWord(btn.dataset.say, lang);
    });
  });
}

// Kognat-Hinweis: verwandte Wörter merkt man sich leichter.
export function cognateChip(card) {
  if (!isCognate(card.front, card.back, card.roman)) return '';
  return `<div class="cognate-chip" title="Dieses Wort ist mit dem deutschen „${escHtml(card.front)}" verwandt — leichter zu merken!">
    <i class="fas fa-link"></i> verwandt mit „${escHtml(card.front)}"
  </div>`;
}

export function buildMCOptions(card, cards) {
  // Distraktoren müssen sich auf BEIDEN Seiten unterscheiden — sonst
  // gäbe es bei umgekehrter Richtung doppelte Antworttexte.
  const wrongs = pickRandom(cards, 3, c => c.back !== card.back && c.front !== card.front);
  return shuffleArray([card, ...wrongs]);
}

// Gemeinsames Markup der Antwort-Optionen (A–D) + Feedback-Container.
// withAudio blendet je Option einen Aussprache-Knopf ein.
// showRoman blendet bei fremden Schriften (ar/ru/el/ja/zh) die Umschrift
// rechts neben dem Wort ein, damit Lernende, die das Alphabet noch nicht
// flüssig lesen können, jede Option entziffern und zuordnen können.
// WICHTIG: .mc-text enthält ausschließlich den reinen Antworttext!
export function mcOptionsMarkup(options, { withAudio = false, textOf = o => o.back, showRoman = true } = {}) {
  return `
      <div class="mc-options" role="group" aria-label="Antwortmöglichkeiten">
        ${options.map((opt, i) => {
          const txt = textOf(opt);
          const roman = showRoman && opt?.roman && txt === opt.back ? opt.roman : '';
          return `
          <button type="button" class="btn mc-option" data-idx="${i}"
            aria-keyshortcuts="${i + 1} ${'abcd'[i]}">
            <span class="mc-key" aria-hidden="true">${'ABCD'[i]}</span>
            <span class="mc-text">${escHtml(txt)}</span>${roman ? `<span class="mc-roman">${escHtml(roman)}</span>` : ''}${withAudio ? `
            <span class="audio-btn mc-audio" role="button" tabindex="0" data-text="${escHtml(txt)}" title="Aussprache">
              <i class="fas fa-volume-up"></i>
            </span>` : ''}
          </button>`;
        }).join('')}
      </div>
      <div id="mc-fb"></div>`;
}

// Verdrahtet die Aussprache-Knöpfe (.mc-audio) innerhalb der MC-Optionen,
// ohne beim Klick die Antwort-Option selbst auszulösen.
export function wireMcAudio(root, lang) {
  if (!root) return;
  root.querySelectorAll('.mc-audio').forEach(a => {
    a.addEventListener('click', e => {
      e.stopPropagation();
      speakWord(a.dataset.text, lang);
    });
    a.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        speakWord(a.dataset.text, lang);
      }
    });
  });
}

// Deaktiviert die Optionen und markiert richtig/falsch. Gibt Auswertung zurück.
export function markMcAnswer(options, chosenIdx, card) {
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
export function recordAnswerEffects(session, card, isCorrect, ratingOrBool) {
  recordCardAnswer(session.deckId, card.front, ratingOrBool);
  // Combo: Serie richtiger Antworten gibt Bonus-XP (bis +10).
  session.combo = isCorrect ? (session.combo || 0) + 1 : 0;
  if (isCorrect) noteCombo(session.combo);
  const comboBonus = isCorrect && session.combo >= 2 ? Math.min(session.combo - 1, 5) * 2 : 0;
  const { gained } = recordGameAnswer(isCorrect, { bonus: comboBonus, boost: !!session.boosted });
  session.xpFromAnswers = (session.xpFromAnswers || 0) + gained;
  // Falsche Antworten fürs anschließende Fehler-Training merken; richtige
  // merken, damit sie am Ende aus der gespeicherten Fehlerliste fallen.
  if (!isCorrect) {
    session.wrongCards = session.wrongCards || [];
    if (!session.wrongCards.some(c => c.front === card.front)) session.wrongCards.push(card);
  } else {
    (session.rightFronts = session.rightFronts || new Set()).add(card.front);
  }
  renderGamiHeader();
  renderLearnWidgets({ duringSession: true });
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
export function dailyRecapHtml() {
  const g = getGame();
  const d = g.daily.date === todayStr() ? g.daily : {};
  return `
    <div class="day-recap">
      <span class="day-recap__title"><i class="fas fa-sun"></i> Heute</span>
      <span class="day-recap__stat"><b>${d.xp || 0}</b> XP</span>
      <span class="day-recap__stat"><b>${d.correct || 0}</b> richtig</span>
      <span class="day-recap__stat"><b>×${d.combo || 0}</b> Combo</span>
      <span class="day-recap__stat"><b>${g.streak.current}</b> 🔥</span>
    </div>`;
}

// ── SESSION-ENDE ─────────────────────────────────────────────────

export function endSession() {
  const session = getCurrentSession();
  const userStats = getUserStats();

  // Count completed session and track active days
  userStats.totalSessions = (userStats.totalSessions || 0) + 1;
  const today = todayStr();
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

  // Das gelernte Deck fürs Offline-Lernen sichern — nach der ersten
  // abgeschlossenen Lektion liegt es dauerhaft im Cache, auch ohne dass
  // jemand an den Schalter in den Einstellungen gedacht hat.
  if (session?.deckId) autoSaveDeck(session.deckId);

  // Fehler für „Für dich"/Fehler-Training über Neustarts hinweg merken.
  if (session?.deckId) {
    saveErrors(session.deckId,
      (session.wrongCards || []).map(c => c.front),
      [...(session.rightFronts || [])]);
  }
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

export function courseBadge(text) {
  return `<div class="course-phase-badge">${text}</div>`;
}