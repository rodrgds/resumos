import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { createWriteStream } from 'node:fs';
import { cp, mkdir, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { parseArgs } from 'node:util';
import { extract } from 'tar';
import {
  animationFingerprint,
  getManimAnimation,
  scenes,
} from '../src/lib/manim-assets.mjs';

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: { available: { type: 'boolean', default: false } },
});
const ids = positionals.length ? positionals : Object.keys(scenes);
const release =
  process.env.MANIM_RELEASE_URL ||
  'https://github.com/rodrgds/resumos/releases/download/manim-assets';

for (const id of ids) {
  if (!Object.hasOwn(scenes, id) || !/^[a-z0-9-]+$/.test(id))
    throw new Error(`Unknown animation: ${id}`);
  try {
    getManimAnimation(id);
    console.log(`${id}: local render is current`);
    continue;
  } catch {
    // A fresh checkout or changed scene needs its published bundle.
  }
  const fingerprint = animationFingerprint(id);
  const response = await fetch(`${release}/${id}-${fingerprint}.tar.gz`, {
    signal: AbortSignal.timeout(120_000),
  });
  if (response.status === 404 && values.available) {
    console.log(`${id}: not published yet, needs rendering`);
    continue;
  }
  if (!response.ok)
    throw new Error(
      `${id}: render bundle returned HTTP ${response.status}. Run the Manim workflow or render locally before building.`,
    );
  const temporary = await mkdtemp(join(tmpdir(), 'resumos-manim-download-'));
  try {
    const archive = join(temporary, 'render.tar.gz');
    await pipeline(Readable.fromWeb(response.body), createWriteStream(archive));
    await extract({
      file: archive,
      cwd: temporary,
      strict: true,
      filter: (_, entry) => entry.type === 'File' || entry.type === 'Directory',
    });
    const animation = getManimAnimation(id, { root: temporary });
    const destination = resolve(`public${animation.base}`);
    await mkdir(resolve(`public/manim/${id}`), { recursive: true });
    await rm(destination, { recursive: true, force: true });
    await cp(join(temporary, `public${animation.base}`), destination, {
      recursive: true,
    });
    await mkdir('src/generated/manim', { recursive: true });
    await cp(
      join(temporary, `src/generated/manim/${id}.json`),
      `src/generated/manim/${id}.json`,
    );
    console.log(`${id}: downloaded ${fingerprint}`);
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}
