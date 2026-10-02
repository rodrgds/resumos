# Design

## Direction

Preserve the user's Resumos LEIC reference: distinct course colours, the FEUP burgundy accent, real institutional logos and plain Portuguese. Reading pages should put the lesson first. [PRODUCT.md](PRODUCT.md) defines scope; [reading documentation](docs/leitura.md) explains controls.

## Colour and type

- Use semantic CSS tokens, not copied colour values. `src/styles/global.css` owns the FEUP theme; `src/data/reading-themes.ts` owns the other palettes. Reading themes do not recolour course cards or official logos.
- Keep text and syntax readable in light and dark themes, including selected code and comments. Static code and editors share `--code-*` and `--code-font`. Code scrolls horizontally unless the reader enables wrapping.
- Use Manrope for controls and Source Serif 4 as the default reading font. Respect saved font and size choices. Give mathematical notation and code enough room without widening the whole article.
- Annotation ink is distinct from the reading accent. Callout colours indicate meaning; diagrams also use labels or patterns so colour is not the only distinction.

## Layout

- Keep the colourful catalogue, with ordered years and semesters. Pins duplicate compact course cards at the top without replacing the grid. Returning readers skip the introduction when history or a valid pin exists.
- Reading uses a centred article with independently adjustable page and text widths. At 1200px and above, course navigation sits left and page headings right. Below that, chapter navigation opens over the page.
- Notes open as overlays and never resize the article. Keep margin markers away from text and use a bottom sheet on small screens.
- Use the same header on home and reading pages. Reveal it on upward scroll or keyboard focus. Keep Chat and Brain rot directly visible on lessons, not on the homepage.
- Course progress means position, not completion. Keep page-section marks on desktop only. Chapter links, previous/next links and contextual printing should remain usable without a separate study dashboard.

## Controls and motion

- Use `Icon.astro` for Heroicons controls and `CourseIcon.astro` for subject-specific SVGs. Preserve official logos. Avoid Unicode icons and decorative controls.
- Prefer direct appearance choices, native radio groups and labelled sliders. Keep the header and reset controls available while settings scroll. Apply preferences before paint.
- Dialogs close with Escape and restore focus. Popovers stay beside their trigger and within the viewport. Keyboard shortcuts leave typing and browser shortcuts alone; Vim is read-only lesson navigation.
- Respect reduced motion. Animation may clarify a change, but must not be needed to understand content. Layout redraws and restored exercise progress do not replay celebratory effects.
- Keep CSS suggestions optional and preserve reader edits. The `?sem-css=1` recovery path must remain available.

## Teaching components

- Executable examples use the reading palette and compact toolbars. Run is primary; supporting code may be collapsed when it is not the subject. No editor attribution footer or redundant prose announcing output.
- Questions state correctness explicitly. Reasoning questions use clearly labelled self-assessment rather than pretending to grade prose. Printing and Markdown include authored content, never reader answers.
- Figures have descriptive alt text. Diagram neutrals follow the palette while distinct data-series colours remain distinct. Prefer static SVG when motion adds no explanation.
- Subject demos show topic controls and visuals; web editors belong in web-development lessons. Keep assumptions in lesson prose and controls outside indexed or annotatable text.
- Rough Notation may mark personal passages, desktop section navigation and explicit author emphasis. Draw outside the lesson text, preserve anchors and keep ordinary link underlines.

## Brain rot

Keep the approved TikTok-style portrait reader, captions and topic visuals. Manual background navigation randomizes clips without seeking narration; natural playback remains sequential. Controls must fit portrait and landscape and work with keyboard and touch.

Speech, recordings and personal videos stay local. Caption layout never splits a spoken sentence. Keep model-loading stages honest, heavy voices labelled and estimated timings explicit. Detailed behavior, licenses and benchmarks belong in [docs/brainrot.md](docs/brainrot.md) and [docs/vozes-locais.md](docs/vozes-locais.md), not this design brief.

## Avoid

Keep the catalogue simple: no course-only search, year filters, hero call to action or invented branding. Projects remain reachable at `/projetos/` but hidden from navigation and search while unpublished in discovery. Share public URLs, not copied lesson text or private notes.
