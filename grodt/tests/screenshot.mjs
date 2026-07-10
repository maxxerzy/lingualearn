// Erzeugt Vorschau-Screenshots (Phone + Desktop) gegen den laufenden
// Dev-Server. Aufruf: node tests/screenshot.mjs <ausgabeordner>
import { chromium } from '@playwright/test';

const outDir = process.argv[2] || '.';
const base = 'http://127.0.0.1:8787';
const browser = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM_PATH || undefined,
});

const phone = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await phone.goto(`${base}/#/s/SAP.DE`);
await phone.waitForSelector('#chartContainer canvas');
await phone.waitForTimeout(1500);
await phone.screenshot({ path: `${outDir}/phone-chart.png` });

await phone.goto(`${base}/#/maerkte`);
await phone.waitForTimeout(2500);
await phone.screenshot({ path: `${outDir}/phone-markets.png` });

const desktop = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await desktop.goto(`${base}/#/s/SAP.DE`);
await desktop.waitForSelector('#chartContainer canvas');
await desktop.click('[data-ind="rsi"]');
await desktop.click('[data-ind="sma50"]');
await desktop.waitForTimeout(1500);
await desktop.screenshot({ path: `${outDir}/desktop-chart.png` });

await browser.close();
console.log('Screenshots gespeichert in', outDir);
