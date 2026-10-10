// Shared by the reader and the isolated runner service workers.
// Only callers' allowlisted, public GET assets enter this cache.
self.runtimeAssetCache = ({ name, matches, maxBytes }) => {
  const maxAge = 7 * 24 * 60 * 60 * 1000;
  let writes = Promise.resolve();

  const read = async (request) => {
    try {
      return await (await caches.open(name)).match(request);
    } catch {
      return undefined;
    }
  };

  const store = (request, response) => {
    if (response.status !== 200 || response.type === 'opaque') return;
    // Clone synchronously, before respondWith hands the stream to the browser.
    const copy = response.clone();
    const saving = async () => {
      // Read only the background copy. The reader receives the network stream.
      const body = await copy.blob();
      if (body.size > maxBytes / 2) return;
      const cache = await caches.open(name);
      const entries = await Promise.all(
        (await cache.keys())
          .filter((key) => key.url !== request.url)
          .map(async (key) => ({
            key,
            bytes:
              Number(
                (await cache.match(key))?.headers.get('x-resumos-bytes'),
              ) || 0,
          })),
      );
      let bytes = entries.reduce((sum, entry) => sum + entry.bytes, 0);
      let count = entries.length;
      // Cache.keys preserves insertion order. Evict only runtime assets, never notes.
      for (const entry of entries) {
        if (bytes + body.size <= maxBytes && count < 160) break;
        await cache.delete(entry.key);
        bytes -= entry.bytes;
        count--;
      }
      const headers = new Headers(copy.headers);
      headers.delete('content-encoding');
      headers.delete('content-length');
      headers.set('x-resumos-bytes', String(body.size));
      headers.set('x-resumos-cached-at', String(Date.now()));
      await cache.put(request, new Response(body, { headers }));
    };
    // Serialize writes so concurrent package downloads share one storage budget.
    writes = writes.then(saving).catch(() => {});
    return writes;
  };

  return (event) => {
    const request = event.request;
    if (
      request.method !== 'GET' ||
      request.headers.has('range') ||
      !matches(new URL(request.url))
    )
      return false;
    let writing;
    const response = read(request).then(async (cached) => {
      if (
        cached &&
        Date.now() - Number(cached.headers.get('x-resumos-cached-at')) < maxAge
      )
        return cached;
      try {
        const fresh = await fetch(request);
        if (!fresh.ok && cached) return cached;
        writing = store(request, fresh);
        return fresh;
      } catch (error) {
        if (cached) return cached;
        throw error;
      }
    });
    event.respondWith(response);
    event.waitUntil(response.then(() => writing).catch(() => {}));
    return true;
  };
};
