import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  testMatch: '*.spec.mjs',
  timeout: 30000,
  use: {
    baseURL: 'http://127.0.0.1:8787',
    viewport: { width: 390, height: 844 }, // iPhone-Format
    // Vorinstallierten Chromium nutzen, falls die gepinnte Playwright-Version
    // keinen eigenen Browser-Download hat (z. B. in CI/Cloud-Umgebungen).
    launchOptions: process.env.PW_CHROMIUM_PATH
      ? { executablePath: process.env.PW_CHROMIUM_PATH }
      : {},
  },
  webServer: {
    command: 'npx wrangler dev --var USE_FIXTURES:1 --port 8787',
    url: 'http://127.0.0.1:8787/api/health',
    reuseExistingServer: true,
    timeout: 60000,
  },
});
