// Kopiert das self-hosted lightweight-charts-Bundle aus node_modules nach
// public/vendor (kein CDN zur Laufzeit).
import { copyFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'node_modules/lightweight-charts/dist/lightweight-charts.standalone.production.mjs');
const destDir = join(root, 'public/vendor');
await mkdir(destDir, { recursive: true });
await copyFile(src, join(destDir, 'lightweight-charts.standalone.production.mjs'));
console.log('lightweight-charts nach public/vendor kopiert.');
