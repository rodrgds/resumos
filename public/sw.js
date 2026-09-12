const CACHE_NAME = 'resumos-runtime-v1';
const OFFLINE_URL = '/__resumos_offline_fallback__';
const OFFLINE_HTML = `<!doctype html>
<html lang="pt-PT">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#8c2d3b">
    <title>Sem ligação · Resumos FEUP</title>
    <style>
      :root { color-scheme: light dark; font: 16px/1.6 system-ui, sans-serif; }
      body { max-width: 40rem; margin: 0 auto; padding: 3rem 1.25rem; background: #faf9f7; color: #292a30; }
      @media (prefers-color-scheme: dark) { body { background: #1b1b1e; color: #eeedf0; } }
      h1 { color: #8c2d3b; font-size: 1.5rem; }
      a { color: #8c2d3b; }
    </style>
  </head>
  <body>
    <main>
      <h1>Estás sem ligação.</h1>
      <p>As páginas que já abriste continuam disponíveis quando voltarem a carregar.</p>
      <p><a href="/">Voltar aos Resumos FEUP</a></p>
    </main>
  </body>
</html>`;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>
        cache.put(
          OFFLINE_URL,
          new Response(OFFLINE_HTML, {
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
          }),
        ),
      )
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) => key.startsWith('resumos-runtime-') && key !== CACHE_NAME,
            )
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin || shouldSkip(url)) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  if (isStaticAsset(request, url)) event.respondWith(cacheFirst(request));
});

function shouldSkip(url) {
  return (
    url.pathname.startsWith('/brainrot/') ||
    /\.(?:mp3|mp4|wasm|webm|woff|ttf)$/i.test(url.pathname)
  );
}

function isStaticAsset(request, url) {
  return (
    ['font', 'image', 'script', 'style'].includes(request.destination) ||
    url.pathname.startsWith('/pagefind/')
  );
}

async function readCache(request) {
  try {
    const cache = await caches.open(CACHE_NAME);
    return await cache.match(request);
  } catch {
    return undefined;
  }
}

async function cacheResponse(request, response) {
  if (!response.ok) return;
  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, response.clone());
  } catch {
    // Private browsing and full storage must not break online reading.
  }
}

async function networkFirst(request) {
  let response;
  try {
    response = await fetch(request);
  } catch {
    return (
      (await readCache(request)) ||
      new Response(OFFLINE_HTML, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      })
    );
  }
  await cacheResponse(request, response);
  return response;
}

async function cacheFirst(request) {
  const cached = await readCache(request);
  if (cached) return cached;

  const response = await fetch(request);
  await cacheResponse(request, response);
  return response;
}
