# Resumos FEUP

- Use `devenv shell` for project commands. `README.md` covers authoring and checks.
- `src/data/courses.ts` owns the curriculum. Verify changes against its SIGARRA source, including the academic year. Competências Transversais are elective groups.
- Real courses remain unpublished. Keep the fictional example course separate from the FEUP curriculum. New content pages use `Lesson.astro` and `Prose.astro`.
- Preserve the user's colourful course grid and FEUP accent. See `PRODUCT.md` and `DESIGN.md` for the approved direction.
- Compile trusted Typst sources at build time through `src/lib/typst.ts`. HTML export requires Typst 0.15+ and is experimental. Test equations and diagrams when changing this adapter.
- Reading content uses `Prose.astro`. Markdown and MDX share the unified maths pipeline. Typst SVG requires descriptive alt text.
- Content fixtures belong under `tests/fixtures`; `RESUMOS_TEST_CONTENT=1` is for tests only and must never be set for a production build.
- Leave `data/` and `_data/` as ignored local reference material. Never publish them.
- Pagefind indexes built public content only. Keep study tools and local notes outside `data-pagefind-body`; use `data-pagefind-ignore` for controls. Rebuild to refresh development search.
- DOT renders through `src/lib/dot.ts` at build time. Never ship compilers or author-source evaluation to visitors.
- Cloudflare Pages builds pushes to `main` with `scripts/cloudflare-build.sh`. Keep its pinned Typst release in sync with CI and the documented environment.
