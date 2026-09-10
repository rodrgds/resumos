# Resumos FEUP

- Use `devenv shell` for project commands. `README.md` covers authoring and checks.
- When writing or reviewing course summaries, worked exercises, or student guides, read [resumos-writing](.agents/skills/resumos-writing/SKILL.md) for the teaching voice and explanation style.
- `src/data/courses.ts` owns the LEIC curriculum; `src/data/meic.ts` owns the 2026/27 MEIC plan. Verify changes against its SIGARRA source, including the academic year. LEIC Competências Transversais are elective groups; MEIC lists the named options.
- Keep the fictional example course separate from the FEUP curriculum. Author lessons in `src/content/lessons/<course-id>/` with the schema in `src/content.config.ts`. `course-content.ts` owns navigation and published course links; drafts never generate routes or search entries. `Lesson.astro` and `Prose.astro` own the reading layout.
- Preserve the user's colourful course grid and FEUP accent. See `PRODUCT.md` and `DESIGN.md` for the approved direction.
- Compile trusted Typst sources at build time through `src/lib/typst.ts`. HTML export requires Typst 0.15+ and is experimental. Test equations and diagrams when changing this adapter.
- Reading content uses `Prose.astro`. Markdown and MDX share the unified maths pipeline. Typst SVG requires descriptive alt text.
- Content fixtures belong under `tests/fixtures`; `RESUMOS_TEST_CONTENT=1` is for tests only and must never be set for a production build.
- Leave root `/data/` and `/_data/` as ignored local reference material. Never publish them. Keep ignore rules rooted so `src/data/` remains tracked.
- Pagefind indexes built public content only. Keep study tools and local notes outside `data-pagefind-body`; use `data-pagefind-ignore` for controls. Rebuild to refresh development search.
- DOT renders through `src/lib/dot.ts` at build time. Do not ship Typst or DOT compilers to visitors.
- Cloudflare Pages builds pushes to `main` with `scripts/cloudflare-build.sh`. Keep its pinned Typst release in sync with CI and the documented environment.

- AI actions belong on lessons, not the homepage. Send only the public page URL and a reading prompt; never send page text or private notes.
- MEIC named optional courses use `optional`; LEIC elective placeholder groups use `elective`. Keep their explanations distinct. MEIC includes all named options, including courses without an occurrence link in SIGARRA.

- Annotations are local-only and restricted to `[data-annotatable]` lesson content. Keep storage in `src/lib/annotations.ts` and passage anchoring in `src/lib/text-anchors.ts`. Preserve legacy `resumos-notes` data. Missing or ambiguous passages retain their notes without highlighting unrelated text.

- Executable examples use `CodePlayground` and disposable Workers. Java, Haskell, Prolog and PHP use the separate `resumos-code.pages.dev` origin; build it with `npm run build:runners`. Never host reading pages or notes there; see README before changing execution or isolation.
- `markdown-export.mjs` generates public Markdown from built pages, never raw content directories or browser storage. Keep drafts and local notes private.
- Add tests only for meaningful user-visible regressions or execution/privacy boundaries. Avoid assertions that freeze incidental copy, count markup, or mirror implementation.

- Use Heroicons through `Icon.astro` for interface controls. Courses use subject-specific SVGs through `CourseIcon.astro`, with Tabler artwork and custom drawings in `course-icons.ts`; choose each course icon in its curriculum data. Preserve official brand logos. Do not use Unicode glyphs as icons or add footers to executable code blocks.

- Reading history stays in browser storage through `reading-history.ts`. Resolve it against published course navigation; never export or index it. Only explicit resume links restore scroll position.

- RISC-V uses one RARS instance per disposable Worker. Keep `new Worker(new URL(..., import.meta.url))` static so Vite bundles each runtime. Markdown disclosure icons come from the same Heroicons package through `rehype-disclosures.mjs`.
- Give each parallel content lane its own branch and Worktrunk-managed worktree. After `wt switch --create`, verify each worktree's HEAD with `git -C <path> rev-parse --abbrev-ref HEAD` before spawning agents. One branch per checkout, never shared. Lane agents assert HEAD and a clean tree at start (prefixing git commands with `git -C <worktree>`) and stop and report on mismatch instead of repairing refs.

- CSS snippets are local-only. Preserve the customization selectors documented in README and the `?sem-css=1` recovery path. Apply snippets after generated styles but before visible content; insert CSS as text, never HTML.
- Static and runnable code share `--code-*` tokens and `--code-font`. Keep the shared Shiki configuration in `markdown.shikiConfig` so Markdown and MDX follow the selected palette.
- Homepage introduction visibility follows valid reading history, applied before paint and refreshed when history is cleared. Pinned semesters duplicate course cards at the top; original fragment IDs belong only to the catalogue.

- Runnable and web editors share CodeMirror setup and token colours in `src/lib/editor-setup.ts`. Use language parsers for highlighting; keep web previews in their opaque, network-blocked iframe. The WhatsApp action copies only the public page URL and a message starter.

- Brain rot narrates published lesson content locally through its disposable Piper Worker. Keep text, generated audio, notes and user videos on-device. Match ONNX JS and WASM versions. Clip scrolling must preserve narration and bound loaded videos; sources and reuse terms belong in `public/brainrot/CREDITOS.txt`.
- Brain rot audio boundaries follow complete sentences, never caption width. Keep word timing and ungenerated duration explicitly approximate. Share only the canonical page URL; opening media must remain an explicit action. Preserve published syntax tokens and original playground source in visual cards. Scope each visual to its own cue; inline maths belongs in captions as an atomic notation token with its spoken text. Never carry a previous card into unrelated narration.
- Brain rot voices come from the pinned pt-PT model catalogue in `src/data/brainrot-voices.ts`, never Web Speech or installed voices. Changing models requires a new Worker and invalidates prepared audio and durations. Keep Miro/Dii models unmodified and preserve their non-commercial attribution terms.
