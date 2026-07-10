import { test, expect } from '@playwright/test';

test('App-Shell lädt mit deutschem Titel und Navigation', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/GRODT/);
  await expect(page.locator('#mainNav a')).toHaveCount(5);
  await expect(page.locator('#mainNav')).toContainText('Märkte');
  await expect(page.locator('#mainNav')).toContainText('Watchlist');
});

test('Märkte-Tab zeigt Indizes mit Kursen', async ({ page }) => {
  await page.goto('/#/maerkte');
  await expect(page.locator('#indexList')).toContainText('DAX');
  await expect(page.locator('[data-price="^GDAXI"] .q-last')).not.toHaveText('–', { timeout: 10000 });
});

test('Suche findet SAP und gruppiert Börsenplätze', async ({ page }) => {
  await page.goto('/#/suche');
  await page.fill('#searchInput', 'SAP');
  await expect(page.locator('#searchResults')).toContainText('SAP SE', { timeout: 10000 });
  await expect(page.locator('#searchResults')).toContainText('XETRA');
});

test('Detailansicht rendert Kerzenchart mit Daten', async ({ page }) => {
  await page.goto('/#/s/SAP.DE');
  await expect(page.locator('#dPrice')).not.toHaveText('–', { timeout: 10000 });
  await expect(page.locator('#chartStatus')).toContainText('Kerzen', { timeout: 15000 });
  const canvas = page.locator('#chartContainer canvas').first();
  await expect(canvas).toBeVisible();
  const box = await canvas.boundingBox();
  expect(box.width).toBeGreaterThan(100);
});

test('Indikator-Toggle (RSI) erzeugt zusätzliches Pane', async ({ page }) => {
  await page.goto('/#/s/SAP.DE');
  await expect(page.locator('#chartStatus')).toContainText('Kerzen', { timeout: 15000 });
  const before = await page.locator('#chartContainer canvas').count();
  await page.click('[data-ind="rsi"]');
  await page.waitForTimeout(500);
  const after = await page.locator('#chartContainer canvas').count();
  expect(after).toBeGreaterThan(before);
});

test('Kennzahlen-Tab zeigt KGV und Dividendenrendite', async ({ page }) => {
  await page.goto('/#/s/SAP.DE');
  await page.click('[data-tab="fundamentals"]');
  await expect(page.locator('#tabContent')).toContainText('KGV', { timeout: 10000 });
  await expect(page.locator('#tabContent')).toContainText('Dividendenrendite');
  await expect(page.locator('#tabContent')).toContainText('Quartalszahlen');
});

test('Watchlist: Titel hinzufügen überlebt Reload', async ({ page }) => {
  await page.goto('/#/s/SAP.DE');
  await page.click('#starBtn');
  await page.goto('/#/watchlist');
  await expect(page.locator('#wlRows')).toContainText('SAP.DE');
  await page.reload();
  await expect(page.locator('#wlRows')).toContainText('SAP.DE', { timeout: 10000 });
});

test('Alarm anlegen erscheint in der Liste', async ({ page }) => {
  await page.goto('/#/s/SAP.DE');
  await page.click('[data-tab="alerts"]');
  await page.click('#newAlert');
  await page.selectOption('#alType', 'stop_loss');
  await page.fill('#alValue', '150');
  await page.click('[data-ok]');
  await expect(page.locator('#tabContent')).toContainText('Stop-Loss');
});

test('Depot: Einzahlung und Kauf ergeben Position', async ({ page }) => {
  await page.goto('/#/depot');
  await page.click('#pfCashBtn');
  await page.fill('#cashAmount', '10000');
  await page.click('[data-ok]');
  await page.click('#pfTrade');
  await page.selectOption('#txKind', 'buy');
  await page.fill('#txSymbol', 'SAP.DE');
  await page.fill('#txQty', '10');
  await page.fill('#txPrice', '190');
  await page.click('[data-ok]');
  await expect(page.locator('#pfPositions')).toContainText('SAP.DE');
  await expect(page.locator('#pfCash')).toContainText('8.100');
});

test('News-Tab lädt Marktnachrichten', async ({ page }) => {
  await page.goto('/#/news');
  await expect(page.locator('#newsList .news-item').first()).toBeVisible({ timeout: 10000 });
});

test('Vergleich: zwei Titel ergeben Legende mit Prozentwerten', async ({ page }) => {
  await page.goto('/#/vergleich/SAP.DE');
  await page.fill('#cmpAdd', 'AAPL');
  await page.click('#cmpAddBtn');
  await expect(page.locator('#cmpLegend')).toContainText('SAP.DE', { timeout: 10000 });
  await expect(page.locator('#cmpLegend')).toContainText('AAPL');
  await expect(page.locator('#cmpLegend')).toContainText('%');
});

test('Manifest und Service Worker sind registriert', async ({ page }) => {
  await page.goto('/');
  const manifest = await page.evaluate(async () => {
    const res = await fetch('manifest.webmanifest');
    return res.json();
  });
  expect(manifest.name).toContain('GRODT');
  expect(manifest.display).toBe('standalone');
  const swRegistered = await page.evaluate(async () => {
    if (!('serviceWorker' in navigator)) return false;
    const reg = await navigator.serviceWorker.getRegistration();
    return !!reg || !!(await new Promise((resolve) => {
      navigator.serviceWorker.ready.then(() => resolve(true));
      setTimeout(() => resolve(false), 5000);
    }));
  });
  expect(swRegistered).toBe(true);
});
