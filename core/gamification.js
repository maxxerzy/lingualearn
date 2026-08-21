import { getUserStats } from './state.js';
import { countMasteredAll } from './cardProgress.js';
import { createUserStore } from './userStore.js';
import { addLeagueXp, getLeaguePromotions } from './league.js';
import { friendXpSoon } from './friends.js';

const DEFAULTS = {
  xp: 0,
  gems: 0,             // „Diamanten" — Belohnungswährung
  gemsEarned: 0,       // Lebenszeit-Zähler (für Erfolge)
  questsDone: 0,       // abgeschlossene Tagesquests gesamt
  bestCombo: 0,        // längste Serie richtiger Antworten
  bestBlitz: 0,        // Blitzrunden-Bestleistung (richtige Antworten)
  chests: {},          // Streak-Meilenstein -> Datum der Truhe
  dailyGoal: 20,
  daily: { date: null, count: 0, correct: 0, lessons: 0, xp: 0, perfect: 0, combo: 0, blitz: 0, goalHit: false },
  goalHitEver: false,
  streak: { current: 0, longest: 0, lastDate: null },
  inventory: { streakFreeze: 0, xpBoost: 0 },
  achievements: {},   // id -> Datum der Freischaltung
  activity: {},       // 'YYYY-MM-DD' -> beantwortete Karten
  langsPlayed: [],    // Sprachcodes abgeschlossener Sessions
  perfectSessions: 0,
};

// Streak-Truhen: einmalige Diamanten-Belohnung beim Erreichen der Meilensteine.
const CHEST_MILESTONES = [3, 7, 14, 30, 50, 100];
const CHEST_GEMS = { 3: 15, 7: 30, 14: 50, 30: 100, 50: 150, 100: 300 };
const LEVEL_UP_GEMS = 10;

export const XP = { correct: 10, wrong: 2, session: 50, perfect: 100 };

const EMPTY_DAY = () => ({ date: todayStr(), count: 0, correct: 0, lessons: 0, xp: 0, perfect: 0, combo: 0, blitz: 0, goalHit: false });

const store = createUserStore('lingualearn_game_', {
  defaults: () => structuredClone(DEFAULTS),
  merge: raw => ({
    ...structuredClone(DEFAULTS),
    ...raw,
    daily: { ...DEFAULTS.daily, ...(raw.daily || {}) },
    streak: { ...DEFAULTS.streak, ...(raw.streak || {}) },
    inventory: { ...DEFAULTS.inventory, ...(raw.inventory || {}) },
    chests: { ...(raw.chests || {}) },
  }),
});

const load = () => store.get();
const persist = () => store.save(load());

export function reinitGame() { store.reinit(); }
export function getGame() { return load(); }

function todayStr() { return new Date().toISOString().slice(0, 10); }
function yesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}
function daysBetween(a, b) {
  return Math.round((Date.parse(b) - Date.parse(a)) / 86400000);
}

// Level-Schwellen: Gesamt-XP für Level n = 50·n·(n−1)
// L1=0, L2=100, L3=300, L4=600, L5=1000, …
export function levelInfo(xp) {
  let level = 1;
  while (50 * (level + 1) * level <= xp) level++;
  const base = 50 * level * (level - 1);
  const nextAt = 50 * (level + 1) * level;
  return {
    level, xp, base, nextAt,
    progress: Math.min(1, (xp - base) / (nextAt - base)),
    rank: rankName(level),
  };
}

function rankName(level) {
  if (level >= 15) return 'Diamant';
  if (level >= 10) return 'Platin';
  if (level >= 6) return 'Gold';
  if (level >= 3) return 'Silber';
  return 'Bronze';
}

// XP gutschreiben und Level-Aufstieg erkennen (Feier + Diamanten-Bonus).
function applyXp(g, amount) {
  if (!amount) return;
  const before = levelInfo(g.xp).level;
  g.xp += amount;
  const after = levelInfo(g.xp).level;
  if (after > before) {
    g.pendingLevelUp = after;
    g.gems = (g.gems || 0) + LEVEL_UP_GEMS;
    g.gemsEarned = (g.gemsEarned || 0) + LEVEL_UP_GEMS;
  }
}

// Streak & Tageszähler beim ersten Lernereignis des Tages fortschreiben.
// Streak-Freeze aus dem Inventar schützt genau EINEN verpassten Tag.
// Meilensteine (3/7/14/30/50/100 Tage) öffnen einmalig eine Diamanten-Truhe.
function touchDay(g) {
  const today = todayStr();
  if (g.daily.date !== today) g.daily = EMPTY_DAY();
  if (g.streak.lastDate !== today) {
    if (g.streak.lastDate === yesterdayStr()) {
      g.streak.current += 1;
    } else if (g.streak.lastDate && daysBetween(g.streak.lastDate, today) === 2 && (g.inventory.streakFreeze || 0) > 0) {
      g.inventory.streakFreeze -= 1;         // genau 1 Tag verpasst → Freeze einsetzen
      g.streak.current += 1;
      g.streakFrozeToday = true;
    } else {
      g.streak.current = 1;
    }
    g.streak.lastDate = today;
    g.streak.longest = Math.max(g.streak.longest, g.streak.current);

    // Doppelt-oder-nichts: gewonnen, sobald die Ziel-Serie steht;
    // verloren, wenn die Serie unterwegs reißt (Freeze schützt weiter).
    if (g.wager?.active) {
      if (g.streak.current >= g.wager.target) {
        g.gems = (g.gems || 0) + 100;
        g.gemsEarned = (g.gemsEarned || 0) + 100;
        g.pendingWager = { won: true };
        delete g.wager;
      } else if (g.streak.current === 1 && g.wager.startStreak > 0) {
        g.pendingWager = { won: false };
        delete g.wager;
      }
    }

    // Truhen für alle erreichten, noch nicht geöffneten Meilensteine.
    let chestGems = 0, chestDays = 0;
    for (const m of CHEST_MILESTONES) {
      if (g.streak.current >= m && !g.chests[m]) {
        g.chests[m] = today;
        chestGems += CHEST_GEMS[m];
        chestDays = m;
      }
    }
    if (chestGems) {
      g.gems = (g.gems || 0) + chestGems;
      g.gemsEarned = (g.gemsEarned || 0) + chestGems;
      g.pendingChest = { days: chestDays, gems: chestGems };
    }
  }
}

// Eine Antwort verbuchen. opts.bonus = Combo-Bonus-XP, opts.boost = 2× aktiv.
export function recordGameAnswer(correct, { bonus = 0, boost = false } = {}) {
  const g = load();
  touchDay(g);
  let gained = (correct ? XP.correct : XP.wrong) + (bonus || 0);
  if (boost) gained *= 2;
  applyXp(g, gained);
  g.daily.xp += gained;
  g.daily.count++;
  if (correct) g.daily.correct++;
  const today = todayStr();
  g.activity[today] = (g.activity[today] || 0) + 1;
  if (!g.daily.goalHit && g.daily.count >= g.dailyGoal) {
    g.daily.goalHit = true;
    g.goalHitEver = true;
  }
  persist();
  addLeagueXp(gained);
  friendXpSoon();
  return { game: g, gained };
}

// Bonus-XP ohne Antwort (z. B. „Wort des Tages").
export function addBonusXp(n) {
  const g = load();
  applyXp(g, n);
  g.daily.date === todayStr() ? (g.daily.xp += n) : (g.daily = EMPTY_DAY(), g.daily.xp = n);
  persist();
  addLeagueXp(n);
  friendXpSoon();
  return g;
}

export function recordSessionEnd({ language, correct, total, boost = false }) {
  const g = load();
  touchDay(g);
  let xpEarned = XP.session;
  const perfect = total >= 5 && correct === total;
  if (perfect) {
    xpEarned += XP.perfect;
    g.perfectSessions++;
    g.daily.perfect++;
  }
  if (boost) xpEarned *= 2;
  applyXp(g, xpEarned);
  g.daily.xp += xpEarned;
  g.daily.lessons++;
  const gemsEarned = 3 + (perfect ? 3 : 0);   // Diamanten fürs Abschließen
  g.gems = (g.gems || 0) + gemsEarned;
  g.gemsEarned = (g.gemsEarned || 0) + gemsEarned;
  if (language && !g.langsPlayed.includes(language)) g.langsPlayed.push(language);
  persist();
  addLeagueXp(xpEarned);
  friendXpSoon();
  return { xpEarned, perfect, gemsEarned, game: g };
}

// Anstehende Feiern (Level-Up, Streak-Truhe) abholen & löschen.
export function consumeCelebrations() {
  const g = load();
  const out = { levelUp: g.pendingLevelUp || null, chest: g.pendingChest || null, wager: g.pendingWager || null, gemBonus: LEVEL_UP_GEMS };
  if (g.pendingLevelUp || g.pendingChest || g.pendingWager) {
    delete g.pendingLevelUp;
    delete g.pendingChest;
    delete g.pendingWager;
    persist();
  }
  return out;
}

// Blitzrunde beendet: Runden zählen; Diamanten-Bonus nur für die erste
// Runde des Tages (Score, gedeckelt auf 15). Bestleistung wird gemerkt.
export function noteBlitz(score) {
  const g = load();
  touchDay(g);
  g.daily.blitz = (g.daily.blitz || 0) + 1;
  let gems = 0;
  if (g.daily.blitz === 1) {
    gems = Math.max(0, Math.min(score, 15));
    g.gems = (g.gems || 0) + gems;
    g.gemsEarned = (g.gemsEarned || 0) + gems;
  }
  const record = score > (g.bestBlitz || 0);
  if (record) g.bestBlitz = score;
  persist();
  return { gems, first: g.daily.blitz === 1, best: g.bestBlitz, record };
}

// Lebenszeit-Zähler für Erfolge.
export function noteQuestDone() { const g = load(); g.questsDone = (g.questsDone || 0) + 1; persist(); }
export function noteCombo(n) {
  const g = load();
  let dirty = false;
  if (n > (g.bestCombo || 0)) { g.bestCombo = n; dirty = true; }
  if (g.daily.date === todayStr() && n > (g.daily.combo || 0)) { g.daily.combo = n; dirty = true; }
  if (dirty) persist();
}

// Doppelt-oder-nichts: 50 Diamanten setzen, 7 weitere Serientage → 100 zurück.
export function startWager() {
  const g = load();
  if (g.wager?.active) return { ok: false, err: 'Wette läuft bereits' };
  if ((g.gems || 0) < 50) return { ok: false, err: 'Nicht genug Diamanten (50 nötig)' };
  g.gems -= 50;
  g.wager = { active: true, startStreak: g.streak.current, target: g.streak.current + 7 };
  persist();
  return { ok: true, wager: g.wager };
}
export function getWager() {
  const g = load();
  if (!g.wager?.active) return null;
  return { ...g.wager, progress: Math.max(0, g.streak.current - g.wager.startStreak) };
}

// ── Diamanten & Inventar ─────────────────────────────────────────
export function getGems() { return load().gems || 0; }
export function addGems(n) {
  const g = load();
  g.gems = (g.gems || 0) + n;
  if (n > 0) g.gemsEarned = (g.gemsEarned || 0) + n;
  persist();
  return g.gems;
}
export function spendGems(n) {
  const g = load();
  if ((g.gems || 0) < n) return false;
  g.gems -= n; persist(); return true;
}
export function getInventory() { return { ...load().inventory }; }
export function addInventory(item, n = 1) {
  const g = load();
  g.inventory[item] = (g.inventory[item] || 0) + n;
  persist();
  return g.inventory[item];
}
export function consumeXpBoost() {
  const g = load();
  if ((g.inventory.xpBoost || 0) > 0) { g.inventory.xpBoost -= 1; persist(); return true; }
  return false;
}

export function setDailyGoal(n) {
  const g = load();
  g.dailyGoal = Math.max(1, Math.min(500, Math.round(n) || 20));
  if (g.daily.date === todayStr() && !g.daily.goalHit && g.daily.count >= g.dailyGoal) {
    g.daily.goalHit = true;
    g.goalHitEver = true;
  }
  persist();
  return g;
}

export const ACHIEVEMENTS = [
  { id: 'erste-session', icon: 'fa-flag-checkered', name: 'Erste Schritte',  desc: 'Erste Session abgeschlossen',            test: c => c.sessions >= 1 },
  { id: 'richtig-100',   icon: 'fa-check-double',   name: 'Hundert!',        desc: '100 richtige Antworten',                  test: c => c.totalCorrect >= 100 },
  { id: 'richtig-500',   icon: 'fa-bolt',           name: 'Auf der Überholspur', desc: '500 richtige Antworten',              test: c => c.totalCorrect >= 500 },
  { id: 'meister-10',    icon: 'fa-seedling',       name: 'Erste Ernte',     desc: '10 Vokabeln gemeistert',                  test: c => c.mastered >= 10 },
  { id: 'meister-50',    icon: 'fa-graduation-cap', name: 'Vokabelprofi',    desc: '50 Vokabeln gemeistert',                  test: c => c.mastered >= 50 },
  { id: 'meister-100',   icon: 'fa-crown',          name: 'Wortschatz-König', desc: '100 Vokabeln gemeistert',                test: c => c.mastered >= 100 },
  { id: 'serie-3',       icon: 'fa-fire',           name: 'Warmgelaufen',    desc: '3 Tage in Serie gelernt',                 test: c => c.streak >= 3 },
  { id: 'serie-7',       icon: 'fa-fire-alt',       name: 'Eine ganze Woche', desc: '7 Tage in Serie gelernt',                test: c => c.streak >= 7 },
  { id: 'serie-30',      icon: 'fa-meteor',         name: 'Unaufhaltsam',    desc: '30 Tage in Serie gelernt',                test: c => c.streak >= 30 },
  { id: 'perfekt',       icon: 'fa-star',           name: 'Perfekt!',        desc: 'Session ohne Fehler (mind. 5 Karten)',    test: c => c.perfectSessions >= 1 },
  { id: 'polyglott',     icon: 'fa-globe',          name: 'Polyglott',       desc: 'In allen 6 Sprachen eine Session beendet', test: c => c.langCount >= 6 },
  { id: 'tagesziel',     icon: 'fa-bullseye',       name: 'Ziel erreicht',   desc: 'Tagesziel zum ersten Mal geschafft',      test: c => c.goalHitEver },
  { id: 'level-5',       icon: 'fa-trophy',         name: 'Aufsteiger',      desc: 'Level 5 erreicht',                        test: c => c.level >= 5 },
  { id: 'quests-10',     icon: 'fa-list-check',     name: 'Questjäger',      desc: '10 Tagesquests abgeschlossen',            test: c => c.questsDone >= 10 },
  { id: 'combo-10',      icon: 'fa-fire',           name: 'Lauffeuer',       desc: '10 richtige Antworten in Folge',          test: c => c.bestCombo >= 10 },
  { id: 'gems-250',      icon: 'fa-gem',            name: 'Schatzmeister',   desc: '250 Diamanten gesammelt (gesamt)',        test: c => c.gemsEarned >= 250 },
  { id: 'liga-auf',      icon: 'fa-ranking-star',   name: 'Liga-Aufsteiger', desc: 'Erstmals in eine höhere Liga aufgestiegen', test: c => c.promotions >= 1 },
  { id: 'blitz-20',      icon: 'fa-stopwatch',      name: 'Blitzmeister',    desc: '20 richtige Antworten in einer Blitzrunde', test: c => c.bestBlitz >= 20 },
];

// Prüft alle Bedingungen und schaltet neue Erfolge frei.
// Gibt die frisch freigeschalteten Erfolge zurück (für Toasts).
export function checkAchievements() {
  const g = load();
  const stats = getUserStats();
  const ctx = {
    sessions: stats.totalSessions || 0,
    totalCorrect: stats.totalCorrect || 0,
    mastered: countMasteredAll(),
    streak: g.streak.current,
    perfectSessions: g.perfectSessions,
    langCount: g.langsPlayed.length,
    goalHitEver: g.goalHitEver,
    level: levelInfo(g.xp).level,
    questsDone: g.questsDone || 0,
    bestCombo: g.bestCombo || 0,
    bestBlitz: g.bestBlitz || 0,
    gemsEarned: g.gemsEarned || 0,
    promotions: getLeaguePromotions(),
  };
  const fresh = [];
  for (const a of ACHIEVEMENTS) {
    if (!g.achievements[a.id] && a.test(ctx)) {
      g.achievements[a.id] = todayStr();
      fresh.push(a);
    }
  }
  if (fresh.length) persist();
  return fresh;
}
