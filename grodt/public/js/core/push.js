// Client-Seite der Push-Mitteilungen: Berechtigung (nur nach Nutzergeste!),
// Subscription am Worker registrieren, Testmitteilung anstoßen.

import { apiGet, apiSend } from './api.js';
import { getSyncMeta } from './store.js';

export function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
}

export function isIos() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

/** Kann dieses Gerät gerade Push aktivieren? Liefert {ok, reason}. */
export function pushAvailability() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    return { ok: false, reason: 'Dieser Browser unterstützt keine Web-Push-Mitteilungen.' };
  }
  if (isIos() && !isStandalone()) {
    return {
      ok: false,
      reason: 'Am iPhone zuerst installieren: Teilen-Symbol → „Zum Home-Bildschirm". Danach in der installierten App Mitteilungen aktivieren.',
    };
  }
  return { ok: true };
}

function urlBase64ToUint8Array(base64) {
  const padded = base64.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(base64.length / 4) * 4, '=');
  const raw = atob(padded);
  return Uint8Array.from(raw, (c) => c.charCodeAt(0));
}

export async function enablePush() {
  const { code } = getSyncMeta();
  if (!code) throw new Error('Zuerst Sync aktivieren (Einstellungen → Sync) — Alarme brauchen ein Sync-Profil.');

  const availability = pushAvailability();
  if (!availability.ok) throw new Error(availability.reason);

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') throw new Error('Mitteilungen wurden nicht erlaubt.');

  const { publicKey } = await apiGet('/api/push/key', {}, { ttl: 3600000 });
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey),
  });
  await apiSend('/api/push/subscribe', 'POST', { code, subscription: subscription.toJSON() });
  return true;
}

export async function disablePush() {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();
  if (subscription) {
    await apiSend('/api/push/unsubscribe', 'POST', { endpoint: subscription.endpoint }).catch(() => {});
    await subscription.unsubscribe();
  }
}

export async function isPushEnabled() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return false;
  if (Notification.permission !== 'granted') return false;
  const registration = await navigator.serviceWorker.ready;
  return !!(await registration.pushManager.getSubscription());
}

export async function sendTestPush() {
  const { code } = getSyncMeta();
  if (!code) throw new Error('Kein Sync-Profil aktiv.');
  return apiSend('/api/push/test', 'POST', { code });
}
