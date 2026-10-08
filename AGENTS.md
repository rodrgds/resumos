# Resumos FEUP

## Start here

- Run project commands through `devenv shell`. Read [docs/desenvolvimento.md](docs/desenvolvimento.md) for checks and publishing. `.node-version` pins Node for both Cloudflare Pages projects. Pushes to `main` deploy the website and separate runners; verify both when changing their protocol. Published code must match the built source.
- For course content, read [CONTRIBUTING.md](CONTRIBUTING.md) and [resumos-writing](.agents/skills/resumos-writing/SKILL.md). Teach the reasoning, not instructions to press Executar or lists of output. Use the student's Moodle materials as the baseline and verify their academic year.
- For interface changes, read [PRODUCT.md](PRODUCT.md) and [DESIGN.md](DESIGN.md). Preserve the colourful course grid and FEUP accent. Use existing theme tokens and SVG icon components.

- **Lesson video catalog:** `src/pages/lesson-catalog.json.ts` exports published content IDs and public URLs for the separate `resumos-videos` project. Exclude introductions, revisions, exercises, drafts and the fictional course. Keep gameplay and speech runtimes in that project.

## Content and privacy

- Verify curriculum changes against SIGARRA for the correct academic year. LEIC elective groups, named CT options and MEIC named options are distinct; keep the fictional example course outside the curriculum.
- Keep LEIC third-year second-semester lessons (C, CG, CPD and IA) as drafts while current FEUP source coverage is incomplete.
- Publish through the content schema and published navigation. Drafts must stay out of routes, search, Markdown and print exports. Keep the top-level `404.html` so Cloudflare returns 404 for missing routes. Link to absolute public routes and verify fragments against built headings.
- Root `/data/` and `/_data/` are ignored private reference material. Keep downloads and editorial reports there, never in published lessons. Bibliography belongs in course introductions.
- Personal course pages use browser-only IndexedDB through `src/lib/personal-notes.ts`. Keep Markdown as source, image attachments local, and previews sanitized. Reuse course navigation and keep text editable in place with CodeMirror decorations. Use GFM for both editing commands and preview parsing. Private pages must stay out of public search, public lesson exports and Chat.
- Notes, annotations, reader code, exercise answers, reading history and personal recordings stay on-device. Public search and lesson exports contain published content only. Chat and sharing send only a public URL and message starter.
- Keep lesson text and annotation anchors unchanged by navigation or visual overlays. Preserve existing browser data and user-edited CSS; retain the `?sem-css=1` recovery path.

## Read before changing a subsystem

- **Reading, appearance, annotations or keyboard navigation:** [docs/leitura.md](docs/leitura.md).
- **Runnable code, exercise runtimes or web previews:** [docs/execucao.md](docs/execucao.md) and [docs/linguagens.md](docs/linguagens.md). Keep disposable runtimes and the separate runner origin isolated from reading pages and notes. Python may share a pristine prepared Worker, never one that has executed reader code. Grade code by behavior, not source matching. Use explicit `sqlite` or `postgresql` dialects, separate SQL seeds from queries, and follow the input and automatic-execution contracts in those docs.
- **Reading themes and syntax:** preserve saved palette ids. Verify upstream colours and record sources/adaptations in [docs/leitura.md](docs/leitura.md). Regenerate syntax tokens with `scripts/sync-code-themes.mjs` and all Manim variants when reading palette tokens change. Fullscreen must reuse the editor and isolated output, not copy their state.
- **Exercises, interactive demos, Typst, DOT, Mermaid or Manim:** [CONTRIBUTING.md](CONTRIBUTING.md). Let Markdown create paragraphs in multiline MDX and preserve literal inline colon notation. Preserve centered display math for standalone `$$…$$` paragraphs, including same-line delimiters, through the shared Markdown/MDX pipeline. Render trusted exercise Markdown and graphics at build time; readers never run their compilers. Verify authored code and visuals in the browser. Distinguish automatic correctness from self-assessment.
- **Manim assets:** keep generated media outside Git. Actions caches and release bundles use the scene fingerprint; builds download completed bundles. The main workflow publishes assets before committing updated manifests to trigger Cloudflare. Preserve this ordering and the fingerprint inputs.

## Verification

- Add tests for observable regressions and privacy/isolation boundaries, not copies of lesson text or implementation details. Fixtures live in `tests/fixtures`; `RESUMOS_TEST_CONTENT=1` is never a production setting.
- Parallel editing lanes need separate branches and Worktrunk worktrees. Verify each lane's branch and clean tree before editing. Keep Astro caches local to each checkout, not in shared `node_modules`.
- Keep this file short. Put subsystem details in their existing documentation or beside the code, not in an accumulating list of past fixes.
