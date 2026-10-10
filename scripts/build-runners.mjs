import { createHash } from 'node:crypto';
import { build } from 'esbuild';
import { builtinModules } from 'node:module';
import { cp, mkdir, readdir, readFile, writeFile, rm } from 'node:fs/promises';

const outdir = 'runners/dist';
await rm(outdir, { recursive: true, force: true });
await mkdir(outdir, { recursive: true });
for (const file of await readdir('runners', { withFileTypes: true })) {
  if (
    file.isFile() &&
    ![
      'php.worker.js',
      'sqlite.worker.js',
      'postgresql.worker.js',
      'sql-results.js',
      'sw.js',
    ].includes(file.name)
  ) {
    await cp(`runners/${file.name}`, `${outdir}/${file.name}`);
  }
}
await build({
  entryPoints: [
    'runners/php.worker.js',
    'runners/sqlite.worker.js',
    'runners/postgresql.worker.js',
  ],
  outdir,
  bundle: true,
  format: 'esm',
  platform: 'browser',
  loader: { '.wasm': 'file', '.so': 'file' },
  external: ['./pglite/index.js', 'node:*', ...builtinModules],
  minify: true,
  assetNames: '[name]-[hash]',
  legalComments: 'linked',
});

await cp('node_modules/@php-wasm/web-8-4/LICENSE', `${outdir}/LICENSE.php`);

// Keep upstream ESM boundaries: bundling its deferred Node filesystem driver
// would hoist Node-only imports into the browser Worker.
await cp('node_modules/@electric-sql/pglite/dist', `${outdir}/pglite`, {
  recursive: true,
  filter: (source) => !/\.(map|cjs|cts|ts)$/.test(source),
});
await cp('node_modules/sql.js/dist/sql-wasm.wasm', `${outdir}/sqlite.wasm`);
await cp('node_modules/sql.js/LICENSE', `${outdir}/LICENSE.sql-js`);
await cp(
  'node_modules/@electric-sql/pglite/LICENSE',
  `${outdir}/LICENSE.pglite`,
);

// A change to any runner or dependency creates a fresh cache namespace.
await cp('public/runtime-cache.js', `${outdir}/runtime-cache.js`);
const assets = (await readdir(outdir, { recursive: true, withFileTypes: true }))
  .filter((entry) => entry.isFile())
  .map((entry) => `${entry.parentPath}/${entry.name}`)
  .sort();
const fingerprint = createHash('sha256');
for (const file of assets) {
  fingerprint.update(file.slice(outdir.length));
  fingerprint.update(await readFile(file));
}
const serviceWorker = await readFile('runners/sw.js', 'utf8');
fingerprint.update(serviceWorker);
await writeFile(
  `${outdir}/sw.js`,
  serviceWorker
    .replace('__BUILD_ID__', fingerprint.digest('hex').slice(0, 16))
    .replace(
      "['__LOCAL_ASSETS__']",
      JSON.stringify(assets.map((file) => file.slice(outdir.length))),
    ),
);
