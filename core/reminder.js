import { createUserStore } from './userStore.js';
import { getGame } from './gamification.js';

// Tägliche Lern-Erinnerung.
//
// EHRLICHE EINORDNUNG: Eine Benachrichtigung, die dich erreicht, während
// die App GESCHLOSSEN ist, braucht zwingend einen Push-Dienst (VAPID-
// Schlüssel + ein Server, der zur richtigen Zeit sendet). Das ist hier
// bewusst NICHT vorgetäuscht. Was diese Datei kann: Sobald die App
// geöffnet wird und die gewünschte Uhrzeit vorbei ist, ohne dass heute
// gelernt wurde, meldet sie sich per System-Benachrichtigung — auf allen
// Geräten, auch auf dem iPhone. Mehr ist ohne Server-Baustein nicht
// seriös umsetzbar; siehe PUSH-SETUP.md.

const store = createUserStore('lingualearn_reminder_');
export function reinitReminder() { store.reinit(); }

export function getReminder() {
  const st = store.get();
  return { enabled: !!st.enabled, hour: Number.isInteger(st.hour) ? st.hour : 18, lastShown: st.lastShown || '' };
}

export function setReminder({ enabled, hour }) {
  const st = getReminder();
  if (enabled !== undefined) st.enabled = !!enabled;
  if (hour !== undefined) st.hour = Math.min(23, Math.max(0, Number(hour) || 0));
  store.save(st);
  return st;
}

export function notificationsSupported() {
  return typeof Notification !== 'undefined';
}

export async function requestNotificationPermission() {
  if (!notificationsSupported()) return 'unsupported';
  if (Notification.permission === 'granted' || Notification.permission === 'denied') {
    return Notification.permission;
  }
  try { return await Notification.requestPermission(); } catch { return 'denied'; }
}

// Beim App-Start prüfen: eingeschaltet, Uhrzeit vorbei, heute noch nicht
// gelernt und heute noch nicht erinnert → eine Benachrichtigung.
export function maybeRemind() {
  const st = getReminder();
  if (!st.enabled || !notificationsSupported() || Notification.permission !== 'granted') return false;

  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  if (st.lastShown === today) return false;
  if (now.getHours() < st.hour) return false;

  const g = getGame();
  const learnedToday = g.daily?.date === today && (g.daily?.count || 0) > 0;
  if (learnedToday) return false;

  const streak = g.streak?.current || 0;
  try {
    new Notification('Zeit für deine Lernrunde', {
      body: streak > 0
        ? `Deine Serie steht bei ${streak} ${streak === 1 ? 'Tag' : 'Tagen'} — halte sie mit einer kurzen Lektion.`
        : 'Schon ein paar Minuten reichen für eine Lektion.',
      icon: './icons/icon-192.png',
      tag: 'lingualearn-daily',
    });
  } catch { return false; }

  const saved = store.get();
  saved.lastShown = today;
  store.save(saved);
  return true;
}
