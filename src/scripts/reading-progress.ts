import { readingHistory, saveReadingVisit } from '../lib/reading-history';

const body = document.querySelector<HTMLElement>(
  '[data-reading-page] .lesson-body',
);
if (body) {
  const end = document.querySelector<HTMLElement>('.lesson-practice') || body;
  const path = location.pathname;
  const previous = readingHistory().find((visit) => visit.path === path);
  let ready = false;
  let visitedAt = Date.now();
  const extent = () =>
    Math.max(
      0,
      end.getBoundingClientRect().bottom -
        body.getBoundingClientRect().top -
        innerHeight * 0.65,
    );
  const top = () => body.getBoundingClientRect().top + scrollY;
  const save = () => {
    if (!ready) return;
    const position = extent()
      ? Math.min(1, Math.max(0, (scrollY - top()) / extent()))
      : 0;
    const reachedEnd = end.getBoundingClientRect().bottom <= innerHeight;
    const exercise = [
      ...end.querySelectorAll<HTMLElement>('[data-exercise]'),
    ].find((question) => {
      const rect = question.getBoundingClientRect();
      return (
        question.querySelector('details')?.open &&
        rect.top < innerHeight &&
        rect.bottom > 0
      );
    })?.id;
    saveReadingVisit({ path, visitedAt, position, reachedEnd, exercise });
  };
  const start = async () => {
    await document.fonts.ready;
    const url = new URL(location.href);
    if (url.searchParams.has('continuar')) {
      if (previous && !url.hash) {
        const exercise = previous.exercise
          ? document.getElementById(previous.exercise)
          : null;
        const disclosure = exercise?.matches('.lesson-practice [data-exercise]')
          ? exercise.querySelector('details')
          : null;
        if (disclosure) {
          disclosure.open = true;
          exercise!.scrollIntoView({ behavior: 'instant', block: 'center' });
        } else
          scrollTo({
            top:
              previous.position > 0 ? top() + previous.position * extent() : 0,
            behavior: 'instant',
          });
      }
      url.searchParams.delete('continuar');
      history.replaceState(history.state, '', url);
    }
    ready = true;
    save();
  };
  if (document.readyState === 'complete') void start();
  else window.addEventListener('load', () => void start(), { once: true });
  window.addEventListener('pagehide', save);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') save();
  });
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      visitedAt = Date.now();
      save();
    }
  });
}
