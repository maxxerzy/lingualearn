// Erzeugt die PWA-Icons (192/512/180) aus einem Inline-SVG mit sharp.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public/icons');
await mkdir(outDir, { recursive: true });

// Dunkle Kachel mit grün/roter Kerzen-Silhouette und Schriftzug.
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#101418"/>
      <stop offset="1" stop-color="#1a2230"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="96" fill="url(#bg)"/>
  <!-- Kerzen -->
  <g stroke-linecap="round">
    <line x1="128" y1="150" x2="128" y2="352" stroke="#e5484d" stroke-width="12"/>
    <rect x="100" y="196" width="56" height="110" rx="10" fill="#e5484d"/>
    <line x1="256" y1="120" x2="256" y2="330" stroke="#30a46c" stroke-width="12"/>
    <rect x="228" y="160" width="56" height="120" rx="10" fill="#30a46c"/>
    <line x1="384" y1="88" x2="384" y2="300" stroke="#30a46c" stroke-width="12"/>
    <rect x="356" y="118" width="56" height="128" rx="10" fill="#30a46c"/>
  </g>
  <text x="256" y="452" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
        font-size="88" font-weight="800" letter-spacing="6" fill="#f4f6fb">GRODT</text>
</svg>`;

const buf = Buffer.from(svg);
await sharp(buf).resize(192, 192).png().toFile(join(outDir, 'icon-192.png'));
await sharp(buf).resize(512, 512).png().toFile(join(outDir, 'icon-512.png'));
await sharp(buf).resize(180, 180).png().toFile(join(outDir, 'apple-touch-icon-180.png'));
console.log('Icons erzeugt: icon-192.png, icon-512.png, apple-touch-icon-180.png');
