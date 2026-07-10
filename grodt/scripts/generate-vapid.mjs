// Erzeugt ein VAPID-Schlüsselpaar (P-256) und gibt die Werte für
// `wrangler secret put` aus. Einmalig vor dem ersten Deploy ausführen.
import { webcrypto as crypto } from 'node:crypto';

const b64url = (buf) => Buffer.from(buf).toString('base64url');

const pair = await crypto.subtle.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, true, ['sign']);
const jwk = await crypto.subtle.exportKey('jwk', pair.privateKey);
const publicRaw = new Uint8Array(await crypto.subtle.exportKey('raw', pair.publicKey));

console.log('VAPID-Schlüssel erzeugt. Jetzt als Worker-Secrets setzen:\n');
console.log(`  echo "${b64url(publicRaw)}" | npx wrangler secret put VAPID_PUBLIC_KEY`);
console.log(`  echo "${jwk.d}" | npx wrangler secret put VAPID_PRIVATE_KEY`);
console.log('  echo "mailto:deine@mail.de" | npx wrangler secret put VAPID_SUBJECT');
console.log('\nDen privaten Schlüssel nirgendwo committen!');
