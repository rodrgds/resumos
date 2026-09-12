import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { expect, test } from '@playwright/test';

const workerSource = readFileSync(
  new URL('../public/sw.js', import.meta.url),
  'utf8',
);

for (const failure of ['open', 'match', 'put']) {
  for (const destination of ['document', 'style']) {
    test(`online ${destination} survives cache ${failure} failure`, async () => {
      let fetchHandler: (event: unknown) => void = () => {};
      const cache = {
        async match() {
          if (failure === 'match') throw new Error('Storage unavailable');
          return undefined;
        },
        async put() {
          if (failure === 'put') throw new Error('Quota exceeded');
        },
      };
      runInNewContext(workerSource, {
        URL,
        Response,
        self: {
          location: { origin: 'https://resumos.test' },
          addEventListener(type: string, handler: typeof fetchHandler) {
            if (type === 'fetch') fetchHandler = handler;
          },
        },
        caches: {
          async open() {
            if (failure === 'open') throw new Error('Storage unavailable');
            return cache;
          },
          match: cache.match,
        },
        fetch: async () => new Response('Fresh network response'),
      });
      let response: Promise<Response> | undefined;
      fetchHandler({
        request: {
          method: 'GET',
          url: `https://resumos.test/${destination === 'style' ? '_astro/test.css' : 'lesson/'}`,
          mode: destination === 'document' ? 'navigate' : 'cors',
          destination,
        },
        respondWith(value: Promise<Response>) {
          response = value;
        },
      });
      expect(await (await response!).text()).toBe('Fresh network response');
    });
  }
}
