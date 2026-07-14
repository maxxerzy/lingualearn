import { getGame, levelInfo, ACHIEVEMENTS } from '../core/gamification.js';
import { getDeckProgress, getDueFronts } from '../core/cardProgress.js';
import { getDecks, loadDeck } from '../core/state.js';
import { getCourseState, lessonNumber, LESSON_SIZE } from '../core/course.js';
import { themeOf } from '../js/data/themes.js';

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

    const dueN = getDueFronts(deckId).length;
    setText('dueCount', dueN);
    const dueBadge = document.getElementById('dueCount');
    if (dueBadge) dueBadge.hidden = dueN === 0;

    // Lernkurs-Zeile: Lektion mit Leitbegriff + Fortschritt des Decks.
    const { introduced } = getCourseState(deckId);
    const L = lessonNumber(deckId);
    const done = introduced >= total && total > 0;
    setText('courseProgressText', done
      ? `Kurs abgeschlossen — alle ${total} Wörter gelernt`
      : `Lektion ${L} · ${introduced}/${total} Wörter`);
    // Leitbegriff nachladen (Deck-Karten kommen ggf. asynchron).
    if (!done) {
      loadDeck(deckId).then(deck => {
        if (document.getElementById('deckSelect')?.value !== deckId) return;
        const title = deck?.lessonTitles?.[L - 1] || fallbackLessonTitle(deck, L);
        if (title) setText('courseProgressText', `Lektion ${L} · ${title} · ${introduced}/${total} Wörter`);
      }).catch(() => {});
    }

    // Start-Button-Beschriftung je nach Modus.
    const startBtn = document.getElementById('startBtn');
    const activeMode = document.querySelector('.mode-btn.active')?.dataset.mode;
    if (startBtn) {
      startBtn.innerHTML = activeMode === 'course'
        ? `<i class="fas fa-graduation-cap"></i> Lektion ${lessonNumber(deckId)} starten`
        : '<i class="fas fa-play"></i> Session starten';
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

  renderHeatmap(g.activity);
  renderAchievements(g.achievements);
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
