import type { Page } from '@playwright/test';
import { readFile } from 'node:fs/promises';

export async function runnerHeaders(page: Page) {
  const headers = Object.fromEntries(
    (await readFile('runners/_headers', 'utf8'))
      .split('\n')
      .filter((line) => line.startsWith('  '))
      .map((line) => {
        const separator = line.indexOf(':');
        return [
          line.slice(0, separator).trim(),
          line.slice(separator + 1).trim(),
        ];
      }),
  );
  // The test reader has its own origin; keep every other production restriction.
  headers['Content-Security-Policy'] = headers[
    'Content-Security-Policy'
  ].replace(/frame-ancestors [^;]+/, 'frame-ancestors http://127.0.0.1:4322');
  // Context routing also applies to network requests made by the runtime cache worker.
  await page.context().route('http://127.0.0.1:4324/**', async (route) => {
    const response = await route.fetch();
    await route.fulfill({
      response,
      headers: { ...response.headers(), ...headers },
    });
  });
}
