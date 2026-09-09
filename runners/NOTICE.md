# Browser runtimes

`ecj-3.26.0.jar` is the Eclipse Compiler for Java, published by the Eclipse Foundation. The archive includes its original copyright and licence notices in `about.html` and `META-INF`.

- Binary: https://repo.maven.apache.org/maven2/org/eclipse/jdt/ecj/3.26.0/ecj-3.26.0.jar
- Corresponding source: https://repo.maven.apache.org/maven2/org/eclipse/jdt/ecj/3.26.0/ecj-3.26.0-sources.jar
- Licence: Eclipse Public License 2.0, https://www.eclipse.org/legal/epl-2.0/

CheerpJ 4.3 is loaded from Leaning Technologies' CDN. It is not redistributed here. This personal, open-source website uses it under its free licence: https://cheerpj.com/docs/licensing.html. Commercial or institutional deployments must review those terms.

The runner has a separate origin, `resumos-code.pages.dev`, and receives only the code and explicit standard input. It must never host the reading website or its local notes.

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
