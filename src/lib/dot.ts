import { instance } from '@viz-js/viz';
const renderer = instance();
export async function renderDot(source: string) {
  return (await renderer).renderString(source, {
    format: 'svg',
    engine: 'dot',
  });
}
