import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { expect, test } from '@playwright/test';

const runtimeSource = readFileSync(
  new URL('../public/runtime-cache.js', import.meta.url),
  'utf8',
);
const workerSource =
  runtimeSource +
  '\n' +
  readFileSync(new URL('../public/sw.js', import.meta.url), 'utf8');

for (const failure of ['open', 'match', 'put']) {
  for (const destination of ['document', 'style', 'runtime']) {
    test(`online ${destination} survives cache ${failure} failure`, async () => {
      let fetchHandler: (event: unknown) => void = () => {};
      const cache = {
        async match() {
          if (failure === 'match') throw new Error('Storage unavailable');
          return undefined;
        },
        async keys() {
          return [];
        },
        async put() {
          if (failure === 'put') throw new Error('Quota exceeded');
        },
      };
      runInNewContext(workerSource, {
        URL,
        importScripts() {},
        Response,
        Headers,
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
      const background: Promise<unknown>[] = [];
      fetchHandler({
        request: {
          method: 'GET',
          url:
            destination === 'runtime'
              ? 'https://runno.dev/langs/wasmedge_quickjs.wasm'
              : `https://resumos.test/${destination === 'style' ? '_astro/test.css' : 'lesson/'}`,
          mode: destination === 'document' ? 'navigate' : 'cors',
          destination,
          headers: new Headers(),
        },
        respondWith(value: Promise<Response>) {
          response = value;
        },
        waitUntil(value: Promise<unknown>) {
          background.push(value);
        },
      });
      expect(await (await response!).text()).toBe('Fresh network response');
      await Promise.all(background);
    });
  }
}

for (const destination of ['document', 'style', 'runtime']) {
  test(`${destination} reaches the reader before its offline copy finishes writing`, async () => {
    let fetchHandler: (event: unknown) => void = () => {};
    let finishWrite!: () => void;
    const writing = new Promise<void>((resolve) => {
      finishWrite = resolve;
    });
    let stored = '';
    runInNewContext(workerSource, {
      URL,
      importScripts() {},
      Response,
      Headers,
      self: {
        location: { origin: 'https://resumos.test' },
        addEventListener(type: string, handler: typeof fetchHandler) {
          if (type === 'fetch') fetchHandler = handler;
        },
      },
      caches: {
        async open() {
          return {
            async match() {
              return undefined;
            },
            async keys() {
              return [];
            },
            async put(_request: unknown, response: Response) {
              await writing;
              stored = await response.text();
            },
          };
        },
      },
      fetch: async () => new Response('Ready to read'),
    });
    let response: Promise<Response> | undefined;
    const background: Promise<unknown>[] = [];
    fetchHandler({
      request: {
        method: 'GET',
        url:
          destination === 'runtime'
            ? 'https://runno.dev/langs/wasmedge_quickjs.wasm'
            : `https://resumos.test/${destination === 'style' ? '_astro/test.css' : 'lesson/'}`,
        mode: destination === 'document' ? 'navigate' : 'cors',
        destination,
        headers: new Headers(),
      },
      respondWith(value: Promise<Response>) {
        response = value;
      },
      waitUntil(value: Promise<unknown>) {
        background.push(value);
      },
    });
    let readable = false;
    void response!.then(() => {
      readable = true;
    });
    try {
      await expect.poll(() => readable, { timeout: 500 }).toBe(true);
      expect(await (await response!).text()).toBe('Ready to read');
      expect(stored).toBe('');
    } finally {
      finishWrite();
      await Promise.all(background);
    }
    expect(stored).toBe('Ready to read');
  });
}
