// Web Push ohne Fremdbibliothek: VAPID-JWT (ES256) + Payload-Verschlüsselung
// nach RFC 8291/8188 (aes128gcm) rein mit WebCrypto.
//
// Erwartete Secrets (wrangler secret put …):
//   VAPID_PUBLIC_KEY  — base64url des unkomprimierten P-256-Punkts (65 Bytes)
//   VAPID_PRIVATE_KEY — base64url des privaten Skalars d (32 Bytes)
//   VAPID_SUBJECT     — z. B. "mailto:du@example.com"

const enc = new TextEncoder();

export function b64urlEncode(bytes) {
  let s = '';
  const arr = new Uint8Array(bytes);
  for (const b of arr) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function b64urlDecode(str) {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(str.length / 4) * 4, '=');
  const bin = atob(padded);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function importVapidPrivateKey(env) {
  const pub = b64urlDecode(env.VAPID_PUBLIC_KEY);
  const jwk = {
    kty: 'EC',
    crv: 'P-256',
    x: b64urlEncode(pub.slice(1, 33)),
    y: b64urlEncode(pub.slice(33, 65)),
    d: env.VAPID_PRIVATE_KEY,
    ext: true,
  };
  return crypto.subtle.importKey('jwk', jwk, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign']);
}

async function vapidAuthHeader(env, endpoint) {
  const aud = new URL(endpoint).origin;
  const header = b64urlEncode(enc.encode(JSON.stringify({ typ: 'JWT', alg: 'ES256' })));
  const payload = b64urlEncode(
    enc.encode(
      JSON.stringify({
        aud,
        exp: Math.floor(Date.now() / 1000) + 12 * 3600,
        sub: env.VAPID_SUBJECT || 'mailto:admin@example.com',
      })
    )
  );
  const signingInput = `${header}.${payload}`;
  const key = await importVapidPrivateKey(env);
  const signature = await crypto.subtle.sign(
    { name: 'ECDSA', hash: 'SHA-256' },
    key,
    enc.encode(signingInput)
  );
  return `vapid t=${signingInput}.${b64urlEncode(signature)}, k=${env.VAPID_PUBLIC_KEY}`;
}

async function hkdf(salt, ikm, info, length) {
  const key = await crypto.subtle.importKey('raw', ikm, 'HKDF', false, ['deriveBits']);
  return new Uint8Array(
    await crypto.subtle.deriveBits({ name: 'HKDF', hash: 'SHA-256', salt, info }, key, length * 8)
  );
}

/** Verschlüsselt payload (String) nach RFC 8291 für eine Push-Subscription. */
async function encryptPayload(sub, payload) {
  const clientPubBytes = b64urlDecode(sub.keys.p256dh);
  const authSecret = b64urlDecode(sub.keys.auth);

  const asKeys = await crypto.subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveBits']);
  const asPubBytes = new Uint8Array(await crypto.subtle.exportKey('raw', asKeys.publicKey));
  const clientPubKey = await crypto.subtle.importKey(
    'raw', clientPubBytes, { name: 'ECDH', namedCurve: 'P-256' }, false, []
  );
  const ecdhSecret = new Uint8Array(
    await crypto.subtle.deriveBits({ name: 'ECDH', public: clientPubKey }, asKeys.privateKey, 256)
  );

  // IKM = HKDF(auth, ecdh, "WebPush: info" || client_pub || as_pub)
  const keyInfo = new Uint8Array([
    ...enc.encode('WebPush: info\0'), ...clientPubBytes, ...asPubBytes,
  ]);
  const ikm = await hkdf(authSecret, ecdhSecret, keyInfo, 32);

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const cek = await hkdf(salt, ikm, enc.encode('Content-Encoding: aes128gcm\0'), 16);
  const nonce = await hkdf(salt, ikm, enc.encode('Content-Encoding: nonce\0'), 12);

  // Klartext + Delimiter 0x02 (letzter Record).
  const plain = enc.encode(payload);
  const padded = new Uint8Array(plain.length + 1);
  padded.set(plain);
  padded[plain.length] = 2;

  const aesKey = await crypto.subtle.importKey('raw', cek, 'AES-GCM', false, ['encrypt']);
  const cipher = new Uint8Array(
    await crypto.subtle.encrypt({ name: 'AES-GCM', iv: nonce }, aesKey, padded)
  );

  // aes128gcm-Header: salt(16) | rs(4) | idlen(1) | keyid(as_pub, 65)
  const recordSize = 4096;
  const header = new Uint8Array(16 + 4 + 1 + asPubBytes.length);
  header.set(salt, 0);
  new DataView(header.buffer).setUint32(16, recordSize);
  header[20] = asPubBytes.length;
  header.set(asPubBytes, 21);

  const body = new Uint8Array(header.length + cipher.length);
  body.set(header);
  body.set(cipher, header.length);
  return body;
}

/**
 * Sendet eine Push-Nachricht. Rückgabe: HTTP-Status des Push-Dienstes
 * (404/410 → Subscription ist tot und sollte gelöscht werden).
 */
export async function sendWebPush(env, subscription, payloadObj) {
  const body = await encryptPayload(subscription, JSON.stringify(payloadObj));
  const auth = await vapidAuthHeader(env, subscription.endpoint);
  const res = await fetch(subscription.endpoint, {
    method: 'POST',
    headers: {
      Authorization: auth,
      'Content-Encoding': 'aes128gcm',
      'Content-Type': 'application/octet-stream',
      TTL: '3600',
      Urgency: 'high',
    },
    body,
  });
  return res.status;
}
