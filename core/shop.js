import { spendGems, addInventory, getGems, getInventory } from './gamification.js';

// Diamanten-Shop: Power-ups gegen die Belohnungswährung.
export const SHOP = [
  { id: 'streakFreeze', item: 'streakFreeze', name: 'Streak-Freeze', icon: 'fa-snowflake', price: 50, cap: 2,
    desc: 'Schützt deine Serie, wenn du einen Tag verpasst.' },
  { id: 'xpBoost', item: 'xpBoost', name: 'XP-Boost', icon: 'fa-bolt', price: 30, cap: 5,
    desc: 'Doppelte XP in deiner nächsten Session.' },
];

export function buy(id) {
  const it = SHOP.find(s => s.id === id);
  if (!it) return { ok: false, err: 'Unbekannter Artikel' };
  const inv = getInventory();
  if ((inv[it.item] || 0) >= it.cap) return { ok: false, err: `Maximal ${it.cap} im Vorrat` };
  if (getGems() < it.price) return { ok: false, err: 'Nicht genug Diamanten' };
  if (!spendGems(it.price)) return { ok: false, err: 'Nicht genug Diamanten' };
  const count = addInventory(it.item, 1);
  return { ok: true, item: it, count };
}
