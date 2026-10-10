importScripts('/runtime-cache.js');

// Replaced by build-runners from the complete deployed asset fingerprint.
const CACHE_NAME = 'resumos-engines-__BUILD_ID__';
const localAssets = new Set(['__LOCAL_ASSETS__']);
const externalPaths = [
  'https://cdn.jsdelivr.net/pyodide/v314.0.7/full/',
  'https://cdn.jsdelivr.net/npm/swipl-wasm@8.1.2/dist/swipl/',
  'https://cdn.jsdelivr.net/gh/haskell-wasm/ghc-in-browser@c57d8b6e37737d662aed05cab88f867918307053/',
  'https://cjrtnc.leaningtech.com/4.3/',
  'https://esm.sh/gh/haskell-wasm/browser_wasi_shim@2f86b49/',
];
const externalFiles = new Set([
  'https://esm.sh/gh/haskell-wasm/browser_wasi_shim@2f86b49',
  'https://haskell-wasm.github.io/ghc-in-browser/rootfs.tar.zst',
  'https://haskell-wasm.github.io/bsdtar-wasm/bsdtar.wasm',
]);
const handleAsset = self.runtimeAssetCache({
  name: CACHE_NAME,
  maxBytes: 192 * 1024 * 1024,
  matches: (url) =>
    !url.search &&
    (url.origin === self.location.origin
      ? localAssets.has(url.pathname)
      : externalPaths.some((path) => url.href.startsWith(path)) ||
        externalFiles.has(url.href)),
});
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>
        cache.addAll(['/worker.html', '/java.html', '/cache.js']),
      )
      .catch(() => {})
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
              (key) => key.startsWith('resumos-engines-') && key !== CACHE_NAME,
            )
            .map((key) => caches.delete(key)),
        ),
      )
      .catch(() => {})
      .then(() => self.clients.claim()),
  );
});
self.addEventListener('fetch', handleAsset);
