import { createUserStore } from './userStore.js';
import { getGame, levelInfo, ACHIEVEMENTS } from './gamification.js';
import { countMasteredAll } from './cardProgress.js';

// Freischaltbare Cosmetics als Belohnung fürs Lernen. Bedingungen stützen
// sich auf das vorhandene Gamification-System (Level aus XP, Rekord-Streak,
// freigeschaltete Erfolge, gemeisterte Vokabeln).

// req-Formen: { always:true } | { level:n } | { streak:n } | { mastered:n }
//           | { achievement:'id' }
export const THEMES = [
  { id: 'standard', name: 'Standard',        req: { always: true } },
  { id: 'ocean',    name: 'Ozean',           req: { level: 3 } },
  { id: 'sunset',   name: 'Sonnenuntergang', req: { streak: 3 } },
  { id: 'forest',   name: 'Wald',            req: { level: 6 } },
  { id: 'dark',     name: 'Mitternacht',     req: { level: 4 } },
  { id: 'royal',    name: 'Königlich',       req: { achievement: 'meister-100' } },
];

export const AVATARS = [
  { id: 'circle',  name: 'Standard',   icon: 'fa-user-circle',    req: { always: true } },
  { id: 'cat',     name: 'Katze',      icon: 'fa-cat',            req: { level: 2 } },
  { id: 'rocket',  name: 'Rakete',     icon: 'fa-rocket',         req: { level: 5 } },
  { id: 'dragon',  name: 'Drache',     icon: 'fa-dragon',         req: { streak: 7 } },
  { id: 'astro',   name: 'Astronaut',  icon: 'fa-user-astronaut', req: { level: 8 } },
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
];

export const CARD_DESIGNS = [
  { id: 'standard', name: 'Standard', req: { always: true } },
  { id: 'paper',    name: 'Papier',   req: { achievement: 'erste-session' } },
  { id: 'gold',     name: 'Gold',     req: { level: 5 } },
  { id: 'neon',     name: 'Neon',     req: { level: 9 } },
  { id: 'sakura',   name: 'Sakura',   req: { mastered: 25 } },
];

// Seltenheitsstufen der 13 Erfolge für die Abzeichen-Vitrine.
export const BADGE_RARITY = {
  'erste-session': 'bronze', 'tagesziel': 'bronze', 'serie-3': 'bronze',
  'richtig-100': 'silber', 'meister-10': 'silber', 'serie-7': 'silber',
  'perfekt': 'silber', 'level-5': 'silber',
  'richtig-500': 'gold', 'meister-50': 'gold', 'serie-30': 'gold',
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
    achievements: new Set(Object.keys(g.achievements || {})),
  };
}

export function isUnlocked(item, ctx = context()) {
  const r = item.req;
  if (r.always) return true;
  if (r.level !== undefined) return ctx.level >= r.level;
  if (r.streak !== undefined) return ctx.streak >= r.streak;
  if (r.mastered !== undefined) return ctx.mastered >= r.mastered;
  if (r.achievement !== undefined) return ctx.achievements.has(r.achievement);
  return false;
}

export function requirementText(item) {
  const r = item.req;
  if (r.always) return 'Von Anfang an';
  if (r.level !== undefined) return `Ab Level ${r.level}`;
  if (r.streak !== undefined) return `${r.streak} Tage Serie`;
  if (r.mastered !== undefined) return `${r.mastered} Vokabeln gemeistert`;
  if (r.achievement !== undefined) {
    const a = ACHIEVEMENTS.find(x => x.id === r.achievement);
    return `Erfolg „${a ? a.name : r.achievement}"`;
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
