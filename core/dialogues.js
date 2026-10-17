// core/dialogues.js
// Verwaltet den Fortschritt und die Belohnungen für interaktive Alltagsdialoge.
import { getCurrentUser } from './auth.js';
import { storage } from './storage.js';
import { addBonusXp, getGame } from './gamification.js';
import { todayStr } from '../utils/helpers.js';

const KEY_PREFIX = 'lingualearn_dialogues_';

function getKey(user = getCurrentUser()) {
  return user ? KEY_PREFIX + user : null;
}

export function getCompletedDialogues(user = getCurrentUser()) {
  const k = getKey(user);
  if (!k) return {};
  try {
    return JSON.parse(storage.getItem(k) || '{}');
  } catch {
    return {};
  }
}

export function isDialogueCompleted(dialogueId, user = getCurrentUser()) {
  if (!dialogueId) return false;
  const map = getCompletedDialogues(user);
  return !!map[dialogueId];
}

export function recordDialogueCompletion(dialogueId, language, score = 100, user = getCurrentUser()) {
  if (!dialogueId) return { ok: false, xpGained: 0, gemsGained: 0, isFirstTime: false };
  const k = getKey(user);
  if (!k) return { ok: false, xpGained: 0, gemsGained: 0, isFirstTime: false };

  const map = getCompletedDialogues(user);
  const isFirstTime = !map[dialogueId];

  map[dialogueId] = {
    completedAt: Date.now(),
    date: todayStr(),
    language: language || 'unknown',
    score: Math.min(100, Math.max(0, score)),
    count: (map[dialogueId]?.count || 0) + 1,
  };

  try {
    storage.setItem(k, JSON.stringify(map));
  } catch {
    /* ignore */
  }

  // Belohnungen: Bei erstmaligem Abschluss +30 XP und Diamantenbonus
  let xpGained = isFirstTime ? 30 : 10;
  let gemsGained = isFirstTime ? 2 : 0;

  try {
    addBonusXp(xpGained);
    if (gemsGained > 0) {
      const g = getGame();
      if (g) {
        g.gems = (g.gems || 0) + gemsGained;
        g.gemsEarned = (g.gemsEarned || 0) + gemsGained;
      }
    }
  } catch {
    /* ignore in headless/isolated test */
  }

  return {
    ok: true,
    dialogueId,
    isFirstTime,
    xpGained,
    gemsGained,
  };
}

export function getDialogueStats(language, totalCount = 0, user = getCurrentUser()) {
  const map = getCompletedDialogues(user);
  const completedKeys = Object.entries(map).filter(([id, d]) => d.language === language || id.startsWith(language + '-'));
  const completed = completedKeys.length;
  const percent = totalCount > 0 ? Math.round((completed / totalCount) * 100) : 0;
  return { total: totalCount, completed, percent };
}

export function resetDialogues(user = getCurrentUser()) {
  const k = getKey(user);
  if (k) storage.removeItem(k);
}
