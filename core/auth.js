const CURRENT_USER_KEY = 'lingualearn_current_user';

// Der eigentliche Login/Registrierungs-Flow (inkl. Passwort-Hash und
// Legacy-Migration) lebt im Inline-Skript in index.html, weil er laufen
// muss, bevor die ES-Module geladen sind. Dieses Modul liefert nur die
// Lesezugriffe, die der Rest der App auf den angemeldeten Nutzer braucht.

export function getCurrentUser() {
  try {
    return localStorage.getItem(CURRENT_USER_KEY) || null;
  } catch {
    return null;
  }
}

export function isLoggedIn() {
  return !!getCurrentUser();
}

export function logout() {
  try { localStorage.removeItem(CURRENT_USER_KEY); } catch { /* ignore */ }
}
