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
- Hide the homepage introduction when there is valid reading history or a valid semester pin, including before first paint. Clearing history must respect pins. Pinned semesters duplicate course cards at the top; original fragment IDs belong only to the catalogue.

- Runnable and web editors share CodeMirror setup and token colours in `src/lib/editor-setup.ts`. Use language parsers for highlighting; keep web previews in their opaque, network-blocked iframe. The WhatsApp action copies only the public page URL and a message starter.

- Brain rot narrates published lesson content locally through disposable Piper and Sopro Workers. Keep text, generated audio, notes and user videos on-device. Match ONNX JS and WASM versions. Clip scrolling must preserve narration and bound loaded videos; sources and reuse terms belong in `public/brainrot/CREDITOS.txt`.
- Brain rot audio boundaries follow complete sentences, never caption width. Keep word timing and ungenerated duration explicitly approximate. Share only the canonical page URL; opening media must remain an explicit action. Preserve published syntax tokens and original playground source in visual cards. Scope each visual to its own cue; inline maths belongs in captions as an atomic notation token with its spoken text. Never carry a previous card into unrelated narration.
- Brain rot voices come from the pinned pt-PT model catalogue in `src/data/brainrot-voices.ts`, never Web Speech or installed voices. Changing models requires a new Worker and invalidates prepared audio and durations. Keep Miro/Dii models unmodified and preserve their non-commercial attribution terms.

- Mark Sopro options as Pesado; benchmark timings belong in `docs/vozes-locais.md`, not the voice selector. Normalize playback in `brainrot-audio.ts`; keep model weights unchanged. Sopro shares one pinned model across reference voices and uses its own ONNX runtime version. Keep reference sources and terms distinct from model licenses.
- Sopro V2 Turbo defaults to complete-cue synthesis. Prime the current and following cue before playback, prefetch at most two future cues, and invalidate the queue on seeks or voice/delivery changes. Optional streaming uses `brainrot-speech-stream.ts` and `brainrot-speech-player.ts`; after underflow, wait for the complete cue instead of repeatedly restarting short blocks. Freeze its clock during underflow and retain preparation on pause. Closing or changing voice releases the Worker. Aggregate downloaded bytes by asset; a file reaching 100% does not mean the voice is ready. Benchmark the mobile WASM profile separately from desktop WebGPU and never present emulation as phone measurements.
- Personal voice samples stay in IndexedDB through `brainrot-personal-voice.ts`, never uploads or public assets. Record at most 30 seconds and save only after explicit use. Cancel, close, hidden documents and late microphone permissions must release all tracks. Changing or deleting the active reference invalidates prepared narration and its saved audio.
- Appearance controls are directly visible radio groups and sliders. Preserve `resumos-preferences`, CSS snippet recovery and reset behavior when changing the sidebar.

- CSS preset fixes must also handle saved defaults before paint. Upgrade only exact known preset CSS; preserve user edits, names, toggles and deletions. Offer missing presets explicitly, disabled.

- Brain rot display and volume preferences belong in `brainrot-preferences.ts`, with controls in `brainrot-settings.ts`. Persist only settings in localStorage, never lesson text or recordings. Volume changes use the speech player without regenerating speech; caption modes never split TTS sentences. Keep the desktop volume hover path connected, touch mute direct, and caption motion optional with reduced-motion support.

- `brainrot-speech-cache.ts` owns disposable generated audio in IndexedDB, bounded to 256 MiB and 1000 cues. Cues expire after 30 days without use; cache reads and writes remove expired entries. Keys include text, voice, model revision, delivery mode and personal recording hash. Bump its revision when reference assets, synthesis parameters or normalization change. Storage failure must not block narration. Progress belongs to the awaited cue; background preparation must not overwrite it.
- `student-projects.json` contains manually reviewed public project links and metadata. Verify FEUP affiliation and project content in the author README. Distinguish academic year from repository creation date; do not republish student numbers, emails or demo credentials. `/projetos/` filters locally and works as a plain list without JavaScript.

- Reading uses a centred article with course and page sidebars at 1200px and above. Below that, `CourseSidebar.astro` opens chapter navigation over the page; notes never resize or move the article. `annotation-marks.ts` draws Rough Notation outside `[data-annotatable]` from resolved ranges, preserving text anchors. `Bracket.astro` is for explicit author emphasis. Keep link underlines conventional, saved fonts intact, and Projects out of navigation and search while hidden.

- Use the same header on home and reading pages. `header.ts` owns scroll visibility on all screens and must reveal focused controls. `CourseProgress.astro` shows course position, not completion history. `SectionProgress.astro` and `section-progress.ts` own introduction and H2 progress links. Keep both controls outside indexed lesson text. Keep Chat and Brain rot directly visible. Merge adjacent annotation rectangles per visual line across syntax tokens without changing text anchors.
