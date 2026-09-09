import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  use: {
    baseURL: 'http://127.0.0.1:4322',
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    },
    trace: 'retain-on-failure',
  },
  webServer: {
    command:
      'astro build --outDir .test-dist && astro preview --outDir .test-dist --port 4322 --host 127.0.0.1',
    env: { RESUMOS_TEST_CONTENT: '1', ASTRO_PREVIEW_BACKGROUND: '1' },
    url: 'http://127.0.0.1:4322',
    reuseExistingServer: false,
  },
});
