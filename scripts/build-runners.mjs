import { build } from 'esbuild';
import { builtinModules } from 'node:module';
import { cp, mkdir, readdir, rm } from 'node:fs/promises';

const outdir = 'runners/dist';
await rm(outdir, { recursive: true, force: true });
await mkdir(outdir, { recursive: true });
for (const file of await readdir('runners', { withFileTypes: true })) {
  if (file.isFile() && file.name !== 'php.worker.js') {
    await cp(`runners/${file.name}`, `${outdir}/${file.name}`);
  }
}
await build({
  entryPoints: ['runners/php.worker.js'],
  outdir,
  bundle: true,
  format: 'esm',
  platform: 'browser',
  loader: { '.wasm': 'file', '.so': 'file' },
  external: ['node:*', ...builtinModules],
  minify: true,
  assetNames: '[name]-[hash]',
  legalComments: 'linked',
});

await cp('node_modules/@php-wasm/web-8-4/LICENSE', `${outdir}/LICENSE.php`);
