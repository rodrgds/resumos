// Start the first runtime only after this frame is controlled. Storage restrictions
// must still allow online execution, so registration has a short fallback deadline.
export const cacheReady = new Promise((resolve) => {
  if (!('serviceWorker' in navigator)) return resolve();
  let timer;
  const ready = () => {
    clearTimeout(timer);
    navigator.serviceWorker.removeEventListener('controllerchange', ready);
    resolve();
  };
  navigator.serviceWorker.addEventListener('controllerchange', ready, {
    once: true,
  });
  timer = setTimeout(ready, 1500);
  navigator.serviceWorker
    .register('/sw.js', { updateViaCache: 'none' })
    .catch(ready);
  if (navigator.serviceWorker.controller) ready();
});
