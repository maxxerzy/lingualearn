import { createUserStore } from './userStore.js';
import { getGame, levelInfo, ACHIEVEMENTS } from './gamification.js';
import { countMasteredAll } from './cardProgress.js';

// Freischaltbare Cosmetics als Belohnung fürs Lernen. Bedingungen stützen
// sich auf das vorhandene Gamification-System (Level aus XP, Rekord-Streak,
// freigeschaltete Erfolge, gemeisterte Vokabeln).

// req-Formen: { always:true } | { level:n } | { streak:n } | { mastered:n }
//           | { perfect:n } | { gems:n } | { achievement:'id' }
//           | { month: n | [n,…] }  → saisonal: nur in diesen Monaten
//             freischaltbar; einmal freigeschaltet, bleibt es dauerhaft.
export const THEMES = [
  { id: 'standard', name: 'Standard',        req: { always: true } },
  { id: 'ocean',    name: 'Ozean',           req: { level: 3 } },
  { id: 'sunset',   name: 'Sonnenuntergang', req: { streak: 3 } },
  { id: 'forest',   name: 'Wald',            req: { level: 6 } },
  { id: 'dark',     name: 'Mitternacht',     req: { level: 4 } },
  { id: 'royal',    name: 'Königlich',       req: { achievement: 'meister-100' } },
  { id: 'sakura',   name: 'Sakura',          req: { streak: 5 } },
  { id: 'retro',    name: 'Retro',           req: { mastered: 40 } },
  { id: 'lava',     name: 'Lava',            req: { perfect: 3 } },
  { id: 'neon',     name: 'Neon-Nacht',      req: { achievement: 'combo-10' } },
  { id: 'galaxy',   name: 'Galaxie',         req: { level: 12 } },
  { id: 'sommer',   name: 'Sommerbrise',     req: { month: [6, 7, 8] } },
  { id: 'spuk',     name: 'Spuknacht',       req: { month: 10 } },
  { id: 'winter',   name: 'Winterzauber',    req: { month: 12 } },
];

export const AVATARS = [
  { id: 'circle',  name: 'Standard',   icon: 'fa-user-circle',    req: { always: true } },
  { id: 'cat',     name: 'Katze',      icon: 'fa-cat',            req: { level: 2 } },
  { id: 'rocket',  name: 'Rakete',     icon: 'fa-rocket',         req: { level: 5 } },
  { id: 'dragon',  name: 'Drache',     icon: 'fa-dragon',         req: { streak: 7 } },
  { id: 'astro',   name: 'Astronaut',  icon: 'fa-user-astronaut', req: { level: 8 } },
  { id: 'flamme',  name: 'Flamme',     icon: 'fa-fire',           req: { achievement: 'combo-10' } },
  { id: 'hund',    name: 'Hund',       icon: 'fa-dog',            req: { streak: 5 } },
  { id: 'frosch',  name: 'Frosch',     icon: 'fa-frog',           req: { mastered: 30 } },
  { id: 'geist',   name: 'Geist',      icon: 'fa-ghost',          req: { perfect: 5 } },
  { id: 'roboter', name: 'Roboter',    icon: 'fa-robot',          req: { gems: 300 } },
  { id: 'magier',  name: 'Magier',     icon: 'fa-hat-wizard',     req: { level: 10 } },
  { id: 'otter',   name: 'Otter',      icon: 'fa-otter',          req: { streak: 14 } },
  { id: 'schneemann', name: 'Schneemann', icon: 'fa-snowman',     req: { month: 12 } },
  { id: 'crown',   name: 'Krone',      icon: 'fa-crown',          req: { achievement: 'meister-100' } },
];

export const TITLES = [
  { id: 'neuling',    name: 'Neuling',          req: { always: true } },
  { id: 'sammler',    name: 'Wortsammler',      req: { level: 3 } },
  { id: 'talent',     name: 'Sprachtalent',     req: { level: 6 } },
  { id: 'ausdauernd', name: 'Ausdauernd',       req: { streak: 7 } },
  { id: 'profi',      name: 'Vokabelprofi',     req: { achievement: 'meister-50' } },
  { id: 'koenig',     name: 'Wortschatz-König', req: { achievement: 'meister-100' } },
  { id: 'polyglott',  name: 'Polyglott',        req: { achievement: 'polyglott' } },
  { id: 'aufsteiger', name: 'Liga-Aufsteiger',  req: { achievement: 'liga-auf' } },
  { id: 'questheld',  name: 'Questheld',        req: { achievement: 'quests-10' } },
  { id: 'perfekt',    name: 'Perfektionist',    req: { perfect: 5 } },
  { id: 'diamant',    name: 'Diamantenherz',    req: { gems: 500 } },
  { id: 'feuerherz',  name: 'Feuerherz',        req: { streak: 14 } },
  { id: 'meister',    name: 'Sprachmeister',    req: { level: 12 } },
  { id: 'titan',      name: 'Vokabel-Titan',    req: { mastered: 200 } },
];

export const CARD_DESIGNS = [
  { id: 'standard', name: 'Standard', req: { always: true } },
  { id: 'paper',    name: 'Papier',   req: { achievement: 'erste-session' } },
  { id: 'gold',     name: 'Gold',     req: { level: 5 } },
  { id: 'neon',     name: 'Neon',     req: { level: 9 } },
  { id: 'sakura',   name: 'Sakura',   req: { mastered: 25 } },
  { id: 'ocean',    name: 'Ozeanwelle', req: { streak: 7 } },
  { id: 'holz',     name: 'Holz',       req: { mastered: 75 } },
  { id: 'galaxy',   name: 'Galaxie',    req: { level: 11 } },
];

// Seltenheitsstufen der 13 Erfolge für die Abzeichen-Vitrine.
export const BADGE_RARITY = {
  'erste-session': 'bronze', 'tagesziel': 'bronze', 'serie-3': 'bronze',
  'richtig-100': 'silber', 'meister-10': 'silber', 'serie-7': 'silber',
  'perfekt': 'silber', 'level-5': 'silber',
  'richtig-500': 'gold', 'meister-50': 'gold', 'serie-30': 'gold',
  'quests-10': 'silber', 'combo-10': 'silber',
  'gems-250': 'gold', 'liga-auf': 'gold', 'blitz-20': 'gold',
  'polyglott': 'legendaer', 'meister-100': 'legendaer',
};

export const CATALOGS = { theme: THEMES, avatar: AVATARS, title: TITLES, cardDesign: CARD_DESIGNS };

const DEFAULTS = {
  equipped: { theme: 'standard', avatar: 'circle', title: 'neuling', cardDesign: 'standard' },
  seen: [],   // bereits freigeschaltete (und getoastete) Cosmetic-IDs
};

const store = createUserStore('lingualearn_cosmetics_', {
  defaults: () => structuredClone(DEFAULTS),
  merge: raw => ({
    ...structuredClone(DEFAULTS),
    ...raw,
    equipped: { ...DEFAULTS.equipped, ...(raw.equipped || {}) },
    seen: raw.seen || [],
  }),
});

export function reinitCosmetics() { store.reinit(); }
export function getCosmetics() { return store.get(); }
export function getEquipped() { return store.get().equipped; }

// Aktueller Fortschritts-Kontext für die Freischalt-Bedingungen.
function context() {
  const g = getGame();
  return {
    level: levelInfo(g.xp).level,
    streak: g.streak.longest,
    mastered: countMasteredAll(),
    perfect: g.perfectSessions || 0,
    gems: g.gemsEarned || 0,
    achievements: new Set(Object.keys(g.achievements || {})),
    month: new Date().getMonth() + 1,
    seen: new Set(store.get().seen || []),
  };
}

export function isUnlocked(item, ctx = context()) {
  const r = item.req;
  if (r.always) return true;
  if (r.level !== undefined) return ctx.level >= r.level;
  if (r.streak !== undefined) return ctx.streak >= r.streak;
  if (r.mastered !== undefined) return ctx.mastered >= r.mastered;
  if (r.perfect !== undefined) return ctx.perfect >= r.perfect;
  if (r.gems !== undefined) return ctx.gems >= r.gems;
  if (r.achievement !== undefined) return ctx.achievements.has(r.achievement);
  // Saisonal: im passenden Monat freischaltbar; einmal freigeschaltet
  // (in `seen` vermerkt), bleibt es dauerhaft verfügbar.
  if (r.month !== undefined) {
    return [].concat(r.month).includes(ctx.month) || (ctx.seen?.has(item.id) ?? false);
  }
  return false;
}

const MONTH_NAMES = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

export function requirementText(item) {
  const r = item.req;
  if (r.always) return 'Von Anfang an';
  if (r.level !== undefined) return `Ab Level ${r.level}`;
  if (r.streak !== undefined) return `${r.streak} Tage Serie`;
  if (r.mastered !== undefined) return `${r.mastered} Vokabeln gemeistert`;
  if (r.perfect !== undefined) return `${r.perfect} perfekte Sessions`;
  if (r.gems !== undefined) return `${r.gems} Diamanten gesammelt (gesamt)`;
  if (r.achievement !== undefined) {
    const a = ACHIEVEMENTS.find(x => x.id === r.achievement);
    return `Erfolg „${a ? a.name : r.achievement}"`;
  }
  if (r.month !== undefined) {
    const m = [].concat(r.month);
    const range = m.length > 1 ? `${MONTH_NAMES[m[0] - 1]}–${MONTH_NAMES[m[m.length - 1] - 1]}` : MONTH_NAMES[m[0] - 1];
    return `Saisonal: nur im ${range} freischaltbar`;
  }
  return '';
}

// Ausrüsten (nur wenn freigeschaltet). Gibt true bei Erfolg zurück.
export function equip(type, id) {
  const cat = CATALOGS[type];
  if (!cat) return false;
  const item = cat.find(x => x.id === id);
  if (!item || !isUnlocked(item)) return false;
  store.mutate(s => { s.equipped[type] = id; });
  return true;
}

// Neu freigeschaltete Cosmetics seit dem letzten Aufruf (für Toasts).
export function checkNewCosmetics() {
  const ctx = context();
  const state = store.get();
  const seen = new Set(state.seen);
  const fresh = [];
  for (const [type, cat] of Object.entries(CATALOGS)) {
    for (const item of cat) {
      if (item.req.always) { seen.add(item.id); continue; }
      if (isUnlocked(item, ctx) && !seen.has(item.id)) {
        seen.add(item.id);
        fresh.push({ type, ...item });
      }
    }
  }
  if (fresh.length || state.seen.length !== seen.size) {
    store.mutate(s => { s.seen = [...seen]; });
  }
  return fresh;
}
