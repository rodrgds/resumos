# Browser runtimes

`ecj-3.26.0.jar` is the Eclipse Compiler for Java, published by the Eclipse Foundation. The archive includes its original copyright and licence notices in `about.html` and `META-INF`.

- Binary: https://repo.maven.apache.org/maven2/org/eclipse/jdt/ecj/3.26.0/ecj-3.26.0.jar
- Corresponding source: https://repo.maven.apache.org/maven2/org/eclipse/jdt/ecj/3.26.0/ecj-3.26.0-sources.jar
- Licence: Eclipse Public License 2.0, https://www.eclipse.org/legal/epl-2.0/

CheerpJ 4.3 is loaded from Leaning Technologies' CDN. It is not redistributed here. This personal, open-source website uses it under its free licence: https://cheerpj.com/docs/licensing.html. Commercial or institutional deployments must review those terms.

The runner has a separate origin, `resumos-code.pages.dev`, and receives only code, support files and declared input. It must never host the reading website or its local notes.

## Haskell and Prolog

Haskell loads the GHC in Browser image from https://github.com/haskell-wasm/ghc-in-browser, revision c57d8b6e37737d662aed05cab88f867918307053. The adapter follows that project's browser startup example. Its GHC source and build tooling are maintained at https://gitlab.haskell.org/ghc/ghc and https://gitlab.haskell.org/ghc/ghc-wasm-meta. GHC licensing: https://www.haskell.org/ghc/license.html.

Prolog loads the SWI-Prolog team's `swipl-wasm` 8.1.2 package from jsDelivr. Source, build tooling and BSD licence: https://github.com/SWI-Prolog/npm-swipl-wasm.

## PHP

PHP uses the WordPress Playground packages `@php-wasm/universal` and `@php-wasm/web-8-4` 3.1.53, including PHP 8.4.25. The build bundles the published loaders and copies their unchanged WASM binaries. Original bundle notices are preserved in `php.worker.js.LEGAL.txt`; the package licence is served as `LICENSE.php`.

- Package source and build scripts at the published revision: https://github.com/WordPress/wordpress-playground/tree/8cd60ace8c3d32c8cb2b569b7471fdd98f88013e
- Source archive: https://github.com/WordPress/wordpress-playground/archive/8cd60ace8c3d32c8cb2b569b7471fdd98f88013e.tar.gz
- Package licence: GPL-2.0-or-later, https://github.com/WordPress/wordpress-playground/blob/8cd60ace8c3d32c8cb2b569b7471fdd98f88013e/LICENSE
- PHP source licence: https://www.php.net/license/3_01.txt
- The site's adapter and bundling recipe are in `runners/php.worker.js` and `scripts/build-runners.mjs` at https://github.com/rodrgds/resumos.

DartPad and Ripes are loaded as external tools, only after the reader chooses to open them. Their code is not redistributed by this site.

## Python

Python uses Pyodide 314.0.7 from the official Pyodide distribution on jsDelivr, including its pinned scientific package catalogue. The module Worker loads packages identified in the example's imports. Code and input remain in that Worker; the site receives only output and PNG figures. Each run starts with a fresh in-memory filesystem.

- Distribution: https://cdn.jsdelivr.net/pyodide/v314.0.7/full/
- Source, release and package recipes: https://github.com/pyodide/pyodide/tree/314.0.7
- Pyodide licence: Mozilla Public License 2.0, https://github.com/pyodide/pyodide/blob/314.0.7/LICENSE
- Runtime and package licences: https://cdn.jsdelivr.net/pyodide/v314.0.7/full/pyodide-lock.json

## Databases

SQLite uses sql.js 1.14.2, bundled locally with its WASM binary. sql.js is MIT licensed; SQLite is public domain. The build copies the upstream licence to `LICENSE.sql-js`.

- Source and licence: https://github.com/sql-js/sql.js
- SQLite: https://sqlite.org/copyright.html

PostgreSQL uses PGlite 0.5.8, bundled with its WASM, initdb and filesystem assets. PGlite is Apache-2.0 licensed and includes PostgreSQL under the PostgreSQL licence. The build copies the package licence to `LICENSE.pglite`.

- Source and licences: https://github.com/electric-sql/pglite
- PostgreSQL: https://www.postgresql.org/about/licence/

Both databases run in disposable Workers on the runner origin. Database storage is in memory. Neither runtime can access the reading origin or its private notes. Each support SQL script runs before the main script, and the frontend renders bounded positional results as text in tables. PGlite supports a single connection, not a multi-client PostgreSQL server.
