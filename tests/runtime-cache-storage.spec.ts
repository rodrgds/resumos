import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { expect, test } from '@playwright/test';

const source = readFileSync(
  new URL('../public/runtime-cache.js', import.meta.url),
  'utf8',
);

test('the runtime cache evicts older downloads within its byte budget and survives a worker restart', async () => {
  const stored = new Map<string, Response>();
  const requests: string[] = [];
  const cache = {
    async keys() {
      return [...stored.keys()].map((url) => new Request(url));
    },
    async match(request: Request) {
      return stored.get(request.url)?.clone();
    },
    async delete(request: Request) {
      return stored.delete(request.url);
    },
    async put(request: Request, response: Response) {
      stored.set(request.url, response);
    },
  };
  const createWorker = () => {
    return runInNewContext(
      source +
        `
self.runtimeAssetCache({ name: 'runtime', maxBytes: 100, matches: () => true });`,
      {
        self: {},
        Headers,
        Response,
        URL,
        caches: { open: async () => cache },
        fetch: async (request: Request) => {
          requests.push(request.url);
          return new Response('x'.repeat(40));
        },
      },
    );
  };
  const request = async (
    handle: ReturnType<typeof createWorker>,
    name: string,
  ) => {
    let response!: Promise<Response>;
    let writing!: Promise<void>;
    handle({
      request: new Request(`https://runtime.test/${name}.wasm`),
      respondWith(value: Promise<Response>) {
        response = value;
      },
      waitUntil(value: Promise<void>) {
        writing = value;
      },
    });
    expect(await (await response).text()).toBe('x'.repeat(40));
    await writing;
  };
  const worker = createWorker();
  await request(worker, 'one');
  await request(worker, 'two');
  await request(worker, 'three');
  expect([...stored.keys()]).toEqual([
    'https://runtime.test/two.wasm',
    'https://runtime.test/three.wasm',
  ]);
  await request(createWorker(), 'two');
  expect(requests).toHaveLength(3);
});
