import { execFileSync } from 'node:child_process';
import {
  mkdirSync,
  mkdtempSync,
  cpSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import {
  animationFingerprint,
  getManimAnimation,
  manimPalettes,
  renderSettings,
  scenes,
} from '../src/lib/manim-assets.mjs';

const ids = process.argv.slice(2);
if (!ids.length) ids.push(...Object.keys(scenes));
for (const id of ids) {
  if (!Object.hasOwn(scenes, id)) throw new Error(`Unknown animation: ${id}`);
}
const version = execFileSync('manim', ['--version'], { encoding: 'utf8' });
if (!version.includes(`v${renderSettings.manimVersion}`))
  throw new Error(
    `Use Manim ${renderSettings.manimVersion} from the project's Devenv profile.`,
  );

for (const id of ids) {
  try {
    getManimAnimation(id);
    console.log(`${id}: up to date`);
    continue;
  } catch {
    /* Missing or stale assets need a new render. */
  }
  const definition = scenes[id];
  const fingerprint = animationFingerprint(id);
  const base = `/manim/${id}/${fingerprint}`;
  const temporary = mkdtempSync(resolve(tmpdir(), 'resumos-manim-'));
  const output = resolve(temporary, 'output');
  mkdirSync(output);
  try {
    for (const [variant, palette] of Object.entries(manimPalettes())) {
      console.log(`${id}: ${variant}`);
      const media = resolve(temporary, 'media');
      execFileSync(
        'manim',
        [
          'render',
          '--renderer',
          'cairo',
          '--resolution',
          `${renderSettings.width},${renderSettings.height}`,
          '--fps',
          String(renderSettings.frameRate),
          '--format',
          'mp4',
          '--disable_caching',
          '--progress_bar',
          'none',
          '--verbosity',
          'ERROR',
          '--media_dir',
          media,
          '--output_file',
          'scene',
          definition.source,
          definition.scene,
        ],
        {
          stdio: 'inherit',
          timeout: 300_000,
          env: {
            ...process.env,
            PYTHONPATH: resolve('scripts/manim'),
            RESUMOS_MANIM_PALETTE: JSON.stringify(palette),
            PYTHONDONTWRITEBYTECODE: '1',
          },
        },
      );
      const movie = resolve(
        media,
        'videos',
        definition.source.split('/').at(-1).replace(/\.py$/, ''),
        `${renderSettings.height}p${renderSettings.frameRate}`,
        'scene.mp4',
      );
      execFileSync('ffmpeg', [
        '-v',
        'error',
        '-y',
        '-i',
        movie,
        '-an',
        '-c:v',
        'libx264',
        '-crf',
        '20',
        '-pix_fmt',
        'yuv420p',
        '-movflags',
        '+faststart',
        `${output}/${variant}.mp4`,
      ]);
      execFileSync('ffmpeg', [
        '-v',
        'error',
        '-y',
        '-ss',
        String(definition.posterTime),
        '-i',
        movie,
        '-frames:v',
        '1',
        '-c:v',
        'libwebp',
        '-lossless',
        '1',
        `${output}/${variant}.webp`,
      ]);
      for (const extension of ['mp4', 'webp']) {
        if (
          !statSync(`${output}/${variant}.${extension}`, {
            throwIfNoEntry: false,
          })?.size
        )
          throw new Error(
            `${id}: empty ${extension} for ${variant}. Check that posterTime (${definition.posterTime}s) is inside the scene duration.`,
          );
      }
      rmSync(media, { recursive: true, force: true });
    }
    // Publish only a complete set. The fingerprint in URLs also invalidates browser caches.
    const destination = resolve(`public${base}`);
    mkdirSync(resolve(`public/manim/${id}`), { recursive: true });
    rmSync(destination, { recursive: true, force: true });
    cpSync(output, destination, { recursive: true });
    mkdirSync('src/generated/manim', { recursive: true });
    const manifestPath = `src/generated/manim/${id}.json`;
    let previous;
    try {
      previous = JSON.parse(readFileSync(manifestPath, 'utf8'));
    } catch {
      /* First render. */
    }
    writeFileSync(
      manifestPath,
      JSON.stringify({ fingerprint, base, ...renderSettings }, null, 2) + '\n',
    );
    if (previous?.base?.startsWith(`/manim/${id}/`) && previous.base !== base)
      rmSync(`public${previous.base}`, { recursive: true, force: true });
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
}
