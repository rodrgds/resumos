import { createHash } from 'node:crypto';
import { readFileSync, statSync } from 'node:fs';
import { readingThemes } from '../data/reading-themes.ts';

export const renderSettings = {
  manimVersion: '0.21.0',
  width: 1280,
  height: 720,
  frameRate: 30,
};
export const scenes = JSON.parse(
  readFileSync('src/data/manim-scenes.json', 'utf8'),
);

// Read the FEUP tokens from their CSS owner; other palettes live in reading-themes.
function feupTokens(selector) {
  const css = readFileSync('src/styles/global.css', 'utf8');
  const start = css.indexOf(`${selector} {`);
  if (start === -1)
    throw new Error(`Missing FEUP palette selector: ${selector}`);
  const block = css.slice(start + selector.length + 2);
  return Object.fromEntries(
    [
      ...block.slice(0, block.indexOf('}')).matchAll(/--([\w-]+):\s*([^;]+);/g),
    ].map(([, name, value]) => [name, value.trim()]),
  );
}

function color(value) {
  if (/^#[\da-f]{3}$/i.test(value))
    return '#' + [...value.slice(1)].map((digit) => digit + digit).join('');
  if (/^#[\da-f]{6}$/i.test(value)) return value;
  const mix = /^color-mix\(in srgb, (#[\da-f]{6}) 65%, (#[\da-f]{6})\)$/i.exec(
    value,
  );
  if (!mix) throw new Error(`Unsupported Manim palette colour: ${value}`);
  return (
    '#' +
    [1, 3, 5]
      .map((offset) =>
        Math.round(
          parseInt(mix[1].slice(offset, offset + 2), 16) * 0.65 +
            parseInt(mix[2].slice(offset, offset + 2), 16) * 0.35,
        )
          .toString(16)
          .padStart(2, '0'),
      )
      .join('')
  );
}

export function manimPalettes() {
  const palettes = {};
  for (const theme of readingThemes) {
    for (const mode of ['light', 'dark']) {
      for (const accent of theme.id === 'feup'
        ? ['red', 'blue', 'green']
        : ['red']) {
        const tokens =
          theme.id === 'feup'
            ? {
                ...feupTokens(':root'),
                ...(mode === 'dark'
                  ? feupTokens(":root[data-theme='dark']")
                  : {}),
                ...(accent !== 'red'
                  ? feupTokens(`:root[data-accent='${accent}']`)
                  : {}),
                ...(accent !== 'red' && mode === 'dark'
                  ? feupTokens(
                      `:root[data-theme='dark'][data-accent='${accent}']`,
                    )
                  : {}),
              }
            : theme[mode];
        palettes[
          `${theme.id}-${mode}${theme.id === 'feup' ? `-${accent}` : ''}`
        ] = Object.fromEntries(
          [
            'surface',
            'text',
            'muted',
            'accent',
            'accent-soft',
            'diagram-secondary',
          ].map((token) => [token, color(tokens[token])]),
        );
      }
    }
  }
  return palettes;
}

export function animationFingerprint(id) {
  const scene = scenes[id];
  if (!scene) throw new Error(`Unknown Manim animation: ${id}`);
  const hash = createHash('sha256');
  hash.update(
    JSON.stringify({ scene, renderSettings, palettes: manimPalettes() }),
  );
  for (const file of [
    scene.source,
    ...scene.dependencies,
    'scripts/render-manim.mjs',
    'scripts/manim/resumos_manim.py',
    'devenv.nix',
    'devenv.lock',
  ]) {
    hash.update(file).update(readFileSync(file));
  }
  return hash.digest('hex').slice(0, 16);
}

export function getManimAnimation(id) {
  const fingerprint = animationFingerprint(id);
  try {
    const animation = JSON.parse(
      readFileSync(`src/generated/manim/${id}.json`, 'utf8'),
    );
    if (animation.fingerprint !== fingerprint) throw new Error('Stale render');
    for (const variant of Object.keys(manimPalettes())) {
      for (const extension of ['mp4', 'webp']) {
        const path = `${animation.base}/${variant}.${extension}`;
        if (!statSync(`public${path}`).size)
          throw new Error(`Empty asset: ${path}`);
      }
    }
    return animation;
  } catch (cause) {
    throw new Error(
      `Manim: render "${id}" with devenv --profile manim shell -- npm run render:manim -- ${id}, then include its generated files.`,
      { cause },
    );
  }
}
