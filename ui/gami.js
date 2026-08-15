import { getGame, levelInfo, ACHIEVEMENTS, getGems } from '../core/gamification.js';
import { getDeckProgress, getDueFronts } from '../core/cardProgress.js';
import { getDecks, loadDeck } from '../core/state.js';
import { getCourseState, lessonNumber, LESSON_SIZE } from '../core/course.js';
import { getErrors } from '../core/errorLog.js';
import { startErrorReviewByFronts, startWeakThemePractice } from '../core/session.js';
import { themeOf } from '../js/data/themes.js';
import { themeProfile, weakThemes, weakestForRecommendation, ratePercent, WEAK_RATE, SHOW_RATE, MIN_THEME_ANSWERS } from '../core/weakness.js';

// Fallback-Titel, falls ein Deck (noch) keine thematischen Lektions-Titel
// mitbringt: häufigstes Thema der 8 Wörter, sonst das markanteste Wort.
function fallbackLessonTitle(deck, lessonNum) {
  const from = (lessonNum - 1) * LESSON_SIZE;
  const slice = (deck?.cards || []).slice(from, from + LESSON_SIZE);
  if (!slice.length) return null;
  const counts = {};
  for (const c of slice) { const t = themeOf(c.front); if (t) counts[t] = (counts[t] || 0) + 1; }
  const best = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  if (best && best[1] >= 2) return best[0];
  return slice.map(c => c.front).sort((a, b) => b.length - a.length)[0];
}

// Ansichtswechsel (aus der Navigation) — nötig, damit ein Übungspaket
// aus der Statistik heraus direkt in der Lern-Ansicht startet.
let navigate = null;
export function initGamiNav(activateView) { navigate = activateView; }

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

// ── Header: Streak-Flamme + Level-Chip mit XP-Balken ─────────────
export function renderGamiHeader() {
  const g = getGame();
  const info = levelInfo(g.xp);

  setText('streakCount', g.streak.current);
  setText('levelNum', info.level);
  setText('gemCount', g.gems || 0);

  const fill = document.getElementById('xpFill');
  if (fill) fill.style.width = `${Math.round(info.progress * 100)}%`;

  const chip = document.getElementById('levelChip');
  if (chip) chip.title = `Level ${info.level} (${info.rank}) — ${g.xp} XP, nächstes Level bei ${info.nextAt} XP`;

  const streakChip = document.getElementById('streakChip');
  if (streakChip) {
    streakChip.title = `Aktuelle Serie: ${g.streak.current} Tage · Rekord: ${g.streak.longest} Tage`;
    streakChip.classList.toggle('gami-chip--active', g.streak.current > 0);
  }
}

// ── Lern-Ansicht: Deck-Fortschritt, Fällig-Zähler, Tagesziel ─────
export function renderLearnWidgets() {
  const deckSelect = document.getElementById('deckSelect');
  const deckId = deckSelect?.value;
  const decks = getDecks();

  renderSmartBar(deckId);

  // Lernpfad- und Grammatik-Knopf gehören zum Lernkurs — sonst ausblenden.
  const modeNow = document.querySelector('.mode-btn.active')?.dataset.mode;
  const mapCfgBtn = document.getElementById('coursemapBtn');
  if (mapCfgBtn) mapCfgBtn.style.display = modeNow === 'course' ? '' : 'none';
  const gramCfgBtn = document.getElementById('grammarBtn');
  if (gramCfgBtn) gramCfgBtn.style.display = modeNow === 'course' ? '' : 'none';

  if (deckId && decks[deckId]) {
    const total = decks[deckId].cards?.length ?? decks[deckId].count ?? 0;
    const p = getDeckProgress(deckId, total);

    const wrap = document.getElementById('deckProgress');
    if (wrap) {
      wrap.hidden = false;
      const masteredPct = total ? (p.mastered / total) * 100 : 0;
      const learningPct = total ? ((p.seen - p.mastered) / total) * 100 : 0;
      const mEl = document.getElementById('dpMastered');
      const lEl = document.getElementById('dpLearning');
      if (mEl) mEl.style.width = `${masteredPct}%`;
      if (lEl) lEl.style.width = `${learningPct}%`;
      setText('deckProgressText',
        `${p.mastered} gemeistert · ${p.seen - p.mastered} in Arbeit · ${p.fresh} neu`);
    }

    // Lernkurs-Zeile + Start-Button. Der genaue Lektions-Zuschnitt (Titel,
    // Nummer) steht erst nach dem Laden des Decks fest (thematischer Plan).
    const { introduced } = getCourseState(deckId);
    const done = introduced >= total && total > 0;
    const activeMode = document.querySelector('.mode-btn.active')?.dataset.mode;

    // Die „Lektion N"-Zeile ist nur im Lernkurs relevant.
    const courseWrap = document.getElementById('courseProgress');
    if (courseWrap) courseWrap.style.display = activeMode === 'course' ? '' : 'none';

    setText('courseProgressText', done
      ? `Alle ${total} Wörter gelernt — Endlos-Runden halten sie frisch`
      : `Lektion ${lessonNumber(deckId)} · ${introduced}/${total} Wörter`);
    const startBtn = document.getElementById('startBtn');
    if (startBtn && activeMode !== 'course') {
      startBtn.innerHTML = '<i class="fas fa-play"></i> Session starten';
    } else if (startBtn && done) {
      startBtn.innerHTML = '<i class="fas fa-rotate"></i> Endlos-Runde starten';
    }

    if (!done) {
      loadDeck(deckId).then(() => {
        if (document.getElementById('deckSelect')?.value !== deckId) return;
        const deck = getDecks()[deckId];
        const L = lessonNumber(deckId);   // jetzt mit thematischem Plan
        const title = deck?.lessonTitles?.[L - 1] || fallbackLessonTitle(deck, L);
        setText('courseProgressText',
          `Lektion ${L}${title ? ' · ' + title : ''} · ${introduced}/${total} Wörter`);
        const sb = document.getElementById('startBtn');
        if (sb && document.querySelector('.mode-btn.active')?.dataset.mode === 'course') {
          sb.innerHTML = `<i class="fas fa-graduation-cap"></i> Lektion ${L} starten`;
        }
      }).catch(() => {});
    }
  }

  const g = getGame();
  const today = new Date().toISOString().slice(0, 10);
  const count = g.daily.date === today ? g.daily.count : 0;
  const goalHit = count >= g.dailyGoal;
  // Erreicht → Zahl in Klammern + grünes Häkchen; Balken bei 100 % gekappt.
  setText('dailyGoalText', goalHit ? `(${count}/${g.dailyGoal})` : `${count}/${g.dailyGoal}`);
  const bar = document.getElementById('dailyGoalBar');
  if (bar) bar.style.width = `${Math.min(100, Math.round((count / g.dailyGoal) * 100))}%`;
  const goalWrap = document.getElementById('dailyGoalWrap');
  if (goalWrap) goalWrap.classList.toggle('daily-goal--done', goalHit);
  const goalCheck = document.getElementById('dailyGoalCheck');
  if (goalCheck) goalCheck.hidden = !goalHit;
}

// ── Statistik-Ansicht: Zusatz-Karten, Heatmap, Erfolge ───────────
export function renderStatsExtras() {
  const g = getGame();
  const info = levelInfo(g.xp);

  setText('stat-streak', g.streak.current);
  setText('stat-streak-longest', g.streak.longest);
  setText('stat-level', info.level);
  setText('stat-rank', info.rank);
  setText('stat-xp', g.xp);

  // Wochen-Bilanz: Summe + aktive Tage der letzten 7 Tage.
  let weekCards = 0, weekDays = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const n = g.activity[d.toISOString().slice(0, 10)] || 0;
    weekCards += n;
    if (n > 0) weekDays++;
  }
  setText('weekSummary', `Diese Woche: ${weekCards} Karten · ${weekDays}/7 Tage aktiv`);

  renderHeatmap(g.activity);
  renderWeakThemes();
  renderAchievements(g.achievements);
}

// ── Schwächen-Profil: die drei schwächsten Themen ────────────────
// Ein Tippen startet sofort eine Runde aus den schwächsten Wörtern des
// Themas. Solange zu wenig Daten da sind, sagt die Ansicht das ehrlich,
// statt aus drei Antworten eine „Schwäche" zu erfinden.
function renderWeakThemes() {
  const root = document.getElementById('weakThemes');
  const hint = document.getElementById('weakHint');
  if (!root) return;
  const deckId = document.getElementById('deckSelect')?.value;
  const deckName = getDecks()[deckId]?.name || '';
  const themes = deckId ? weakThemes(deckId, 3) : [];

  if (!themes.length) {
    root.innerHTML = '';
    if (!hint) return;
    if (!deckId) hint.textContent = 'Kein Deck gewählt.';
    else if (themeProfile(deckId).length) hint.textContent = `${deckName}: Gerade hakt kein Thema — alles über ${Math.round(SHOW_RATE * 100)} %.`;
    else hint.textContent = `${deckName}: noch zu wenige Antworten — ab ${MIN_THEME_ANSWERS} Antworten je Thema erscheint hier dein Profil.`;
    return;
  }

  if (hint) hint.textContent = `${deckName}: Tippe ein Thema an, um genau diese Wörter zu üben.`;
  root.innerHTML = themes.map(t => `
    <button type="button" class="weak-theme${t.rate < WEAK_RATE ? ' weak-theme--bad' : ''}"
            data-weak-theme="${escAttr(t.theme)}">
      <span class="weak-theme__main">
        <b>${escHtml(t.theme)}</b>
        <span>${t.words} Wörter · ${t.answers} Antworten</span>
      </span>
      <span class="weak-theme__rate">${ratePercent(t.rate)}%</span>
      <span class="weak-theme__bar"><i style="width:${ratePercent(t.rate)}%"></i></span>
      <span class="weak-theme__go"><i class="fas fa-play"></i> Üben</span>
    </button>
  `).join('');

  root.querySelectorAll('[data-weak-theme]').forEach(btn =>
    btn.addEventListener('click', () => {
      navigate?.('learn');
      startWeakThemePractice(deckId, btn.dataset.weakTheme);
    }));
}

function escHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function escAttr(s) {
  return escHtml(s).replace(/"/g, '&quot;');
}

// GitHub-Style-Aktivitätskalender der letzten 12 Wochen.
function renderHeatmap(activity) {
  const root = document.getElementById('heatmap');
  if (!root) return;

  const WEEKS = 12;
  const today = new Date();
  // Am Ende der aktuellen Woche (Sonntag) ausrichten.
  const end = new Date(today);
  end.setDate(end.getDate() + (7 - ((end.getDay() + 6) % 7) - 1));

  const cells = [];
  for (let w = WEEKS - 1; w >= 0; w--) {
    const col = [];
    for (let d = 6; d >= 0; d--) {
      const day = new Date(end);
      day.setDate(day.getDate() - (w * 7 + d));
      const key = day.toISOString().slice(0, 10);
      const count = activity[key] || 0;
      const future = day > today;
      col.push({ key, count, future });
    }
    cells.push(col);
  }

  const intensity = c => (c === 0 ? 0 : c < 10 ? 1 : c < 20 ? 2 : c < 40 ? 3 : 4);
  root.innerHTML = cells.map(col => `
    <div class="heatmap__col">
      ${col.map(c => c.future
        ? '<span class="heatmap__cell heatmap__cell--future"></span>'
        : `<span class="heatmap__cell heatmap__cell--i${intensity(c.count)}"
             title="${c.key}: ${c.count} Karten"></span>`).join('')}
    </div>
  `).join('');
}

function renderAchievements(unlocked) {
  const root = document.getElementById('achievements');
  if (!root) return;

  const n = Object.keys(unlocked).length;
  setText('achCount', `(${n}/${ACHIEVEMENTS.length})`);

  root.innerHTML = ACHIEVEMENTS.map(a => {
    const date = unlocked[a.id];
    return `
      <div class="achievement${date ? ' achievement--unlocked' : ''}"
           title="${date ? 'Freigeschaltet am ' + date : 'Noch gesperrt'}">
        <i class="fas ${a.icon} achievement__icon"></i>
        <div class="achievement__name">${a.name}</div>
        <div class="achievement__desc">${a.desc}</div>
      </div>
    `;
  }).join('');
}


// ── „Für dich": Ein-Klick-Empfehlung über der Modus-Wahl ─────────
// Priorität: fällige Karten → gemerkte Fehler → Themen-Schwäche →
// Kurs fortsetzen → Kurs beginnen.
function smartRecommendation(deckId) {
  const total = getDecks()[deckId]?.cards?.length ?? getDecks()[deckId]?.count ?? 0;
  const due = getDueFronts(deckId).length;
  if (due > 0) return { type: 'due', text: `${due} fällige ${due === 1 ? 'Karte' : 'Karten'} wiederholen` };
  const errs = getErrors(deckId);
  if (errs.length) return { type: 'errors', fronts: errs, text: `${errs.length} Fehler von zuletzt üben` };
  const weak = weakestForRecommendation(deckId);
  if (weak) {
    return { type: 'weak', theme: weak.theme,
      text: `Schwäche üben: ${weak.theme} — ${ratePercent(weak.rate)} %` };
  }
  const { introduced } = getCourseState(deckId);
  if (total > 0 && introduced >= total) return null;   // Kurs fertig, nichts fällig
  return introduced > 0
    ? { type: 'course', text: `Weiter mit Lektion ${lessonNumber(deckId)}` }
    : { type: 'course', text: 'Starte Lektion 1 des Lernkurses' };
}

function renderSmartBar(deckId) {
  const bar = document.getElementById('smartBar');
  if (!bar || !deckId) return;
  const rec = deckId ? smartRecommendation(deckId) : null;
  if (!rec) { bar.hidden = true; return; }
  bar.hidden = false;
  const textEl = document.getElementById('smartBarText');
  if (textEl) textEl.textContent = rec.text;
  bar.onclick = () => {
    if (rec.type === 'due') {
      const chk = document.getElementById('dueOnly');
      if (chk) chk.checked = true;   // Einmal-Filter; startSession setzt ihn zurück
      document.querySelectorAll('.mode-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.mode === 'flashcard'));
      document.getElementById('startBtn')?.click();
    } else if (rec.type === 'errors') {
      startErrorReviewByFronts(deckId, rec.fronts);
    } else if (rec.type === 'weak') {
      startWeakThemePractice(deckId, rec.theme);
    } else {
      document.querySelectorAll('.mode-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.mode === 'course'));
      renderLearnWidgets();
      document.getElementById('startBtn')?.click();
    }
  };
}
