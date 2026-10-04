import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { create } from 'tar';
import { getManimAnimation, scenes } from '../src/lib/manim-assets.mjs';

const ids = process.argv.slice(2);
if (!ids.length) ids.push(...Object.keys(scenes));
const directory = '.manim-artifacts';
await mkdir(directory, { recursive: true });
for (const id of ids) {
  const animation = getManimAnimation(id);
  const file = join(directory, `${id}-${animation.fingerprint}.tar.gz`);
  await create({ file, gzip: true, portable: true }, [
    `src/generated/manim/${id}.json`,
    `public${animation.base}`,
  ]);
  console.log(file);
}
