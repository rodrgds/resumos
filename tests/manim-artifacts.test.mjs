import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { cp, mkdir, mkdtemp, readFile, rm } from 'node:fs/promises';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { test } from 'node:test';
import { create, extract } from 'tar';

const id = 'soma-vetores';
const manifestPath = `src/generated/manim/${id}.json`;
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const fixtureFiles = [
  'src/data/manim-scenes.json',
  'src/styles/global.css',
  'src/content/exemplo/vetores.py',
  'scripts/render-manim.mjs',
  'scripts/manim/resumos_manim.py',
  'devenv.nix',
  'devenv.lock',
  manifestPath,
  `public${manifest.base}`,
];
const checksum = (value) => createHash('sha256').update(value).digest('hex');

function run(script, args, cwd, env = {}) {
  return new Promise((resolveRun) => {
    const child = spawn(process.execPath, [resolve(script), ...args], {
      cwd,
      env: { ...process.env, ...env },
    });
    let output = '';
    child.stdout.on('data', (data) => (output += data));
    child.stderr.on('data', (data) => (output += data));
    child.on('close', (code) => resolveRun({ code, output }));
  });
}

test('render bundles restore exact media, reuse local files, and reject incomplete downloads', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'resumos-manim-artifacts-'));
  let server;
  try {
    for (const file of fixtureFiles) {
      await mkdir(dirname(join(directory, file)), { recursive: true });
      await cp(file, join(directory, file), { recursive: true });
    }
    const movie = `public${manifest.base}/feup-light-red.mp4`;
    const poster = `public${manifest.base}/feup-light-red.webp`;
    const expected = await Promise.all(
      [movie, poster].map((file) => readFile(file)),
    );
    const packed = await run('scripts/pack-manim.mjs', [id], directory);
    assert.equal(packed.code, 0, packed.output);
    const archiveName = `${id}-${manifest.fingerprint}.tar.gz`;
    let payload = await readFile(
      join(directory, '.manim-artifacts', archiveName),
    );
    let requests = 0;
    server = createServer((request, response) => {
      requests++;
      assert.equal(request.url, `/${archiveName}`);
      response.end(payload);
    });
    await new Promise((ready) => server.listen(0, '127.0.0.1', ready));
    const env = {
      MANIM_RELEASE_URL: `http://127.0.0.1:${server.address().port}`,
    };
    await rm(join(directory, 'public/manim'), { recursive: true });
    const restored = await run('scripts/fetch-manim.mjs', [id], directory, env);
    assert.equal(restored.code, 0, restored.output);
    for (const [index, file] of [movie, poster].entries())
      assert.equal(
        checksum(await readFile(join(directory, file))),
        checksum(expected[index]),
      );
    assert.deepEqual(
      JSON.parse(await readFile(join(directory, manifestPath))),
      manifest,
    );
    const cached = await run('scripts/fetch-manim.mjs', [id], directory, env);
    assert.equal(cached.code, 0, cached.output);
    assert.equal(requests, 1, 'current files must not make another download');

    const incomplete = join(directory, 'incomplete');
    await mkdir(incomplete);
    await extract({
      file: join(directory, '.manim-artifacts', archiveName),
      cwd: incomplete,
    });
    await rm(join(incomplete, poster));
    const badArchive = join(directory, 'incomplete.tar.gz');
    await create({ file: badArchive, cwd: incomplete, gzip: true }, [
      manifestPath,
      `public${manifest.base}`,
    ]);
    payload = await readFile(badArchive);
    await rm(join(directory, poster));
    const failed = await run('scripts/fetch-manim.mjs', [id], directory, env);
    assert.notEqual(failed.code, 0);
    assert.match(failed.output, /Manim: render/);
    assert.equal(
      checksum(await readFile(join(directory, movie))),
      checksum(expected[0]),
      'an incomplete download must preserve existing media',
    );
    assert.deepEqual(
      JSON.parse(await readFile(join(directory, manifestPath))),
      manifest,
    );
  } finally {
    if (server) await new Promise((closed) => server.close(closed));
    await rm(directory, { recursive: true, force: true });
  }
});
