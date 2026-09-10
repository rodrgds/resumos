---
name: Resumos LEIC FEUP
description: A course index with distinct course colours and a burgundy FEUP accent.
colors:
  primary: '#8c2d3b'
  page: '#faf9f7'
  surface: '#ffffff'
  text: '#292a30'
  muted: '#68666c'
  line: '#e5e2df'
  dark-page: '#1b1b1e'
  dark-surface: '#242427'
  dark-text: '#eeedf0'
  dark-primary: '#eda1ae'
  notebook-highlight: '#f6df8c'
  annotation-ink: '#e8c54c55'
  dark-annotation-ink: '#e8c54c44'
  notebook-highlight-text: '#302914'
  notebook-highlight-active: '#ebc55e'
  dark-notebook-highlight: '#665527'
  dark-notebook-highlight-text: '#fff0bf'
  dark-notebook-highlight-active: '#856a27'
  dark-notebook-highlight-active-text: '#fff4d4'
  notebook-excerpt-underline: '#dbc26c'
  callout-info: '#2459a1'
  callout-info-bg: '#edf3fb'
  callout-tip: '#22694f'
  callout-tip-bg: '#edf5f0'
  callout-warning: '#79500a'
  callout-warning-bg: '#fcf3df'
  callout-danger: '#9c293c'
  callout-danger-bg: '#fbeef0'
  dark-callout-info: '#a5c6fa'
  dark-callout-info-bg: '#242f40'
  dark-callout-tip: '#a3d8b9'
  dark-callout-tip-bg: '#21352c'
  dark-callout-warning: '#ebcc86'
  dark-callout-warning-bg: '#342e20'
  dark-callout-danger: '#f0adb8'
  dark-callout-danger-bg: '#40272d'
  video-overlay: '#0009'
  video-overlay-hover: '#0007'
  video-play: '#b12434'
rounded:
  footnote-target: '4px'
  notebook-action: '6px'
  notebook-toolbar: '10px'
  playground: '10px'
  control: '8px'
  card: '12px'
  search-dialog: '14px'
  dialog: '16px'
---

## Overview

A FEUP course index based on the user's Resumos LEIC reference. Distinct course colours, plain Portuguese and the real institutional logos define the site. Preserve this system when adding content.

## Colors

FEUP uses warm off-white and charcoal themes with a burgundy accent, plus blue and green accent choices. Readers can also choose Gruvbox, Catppuccin, Nord, Dracula, Flexoki or Solarized, each with light and dark palettes. Eight opaque course colours keep white labels readable. LEIC elective groups use neutral cards.

Nucleus cards use their own brand colours. ACM FEUP and IEEE FEUP have white logo areas with original blue artwork and blue lower panels with white text in both themes. Keep logo artwork and proportions unchanged.

Notebook passages use translucent gold Rough Notation highlights, independent of the reading accent. The active passage keeps an underline, and its margin marker gains an accent background. Native highlights remain the fallback; mathematical notation retains its solid highlight. Highlight strokes follow continuous visual lines across inline formatting and syntax tokens, avoiding darker overlaps between adjacent fragments.

Reading callouts use blue for information and notes, green for tips, amber for warnings and red for danger. Each has a matching pale background in light mode and a darker background in dark mode.

## Typography

Manrope serves navigation and interface controls. Reading titles and prose use Source Serif 4 by default and respect saved font choices. Eight locally hosted reading fonts remain available: Manrope, Inter, Atkinson Hyperlegible, Lexend, Source Serif 4, Lora, Literata and IBM Plex Mono. Options group them by sans serif, serif and monospace, with a live preview. Lesson prose defaults to 18px with adjustable size and a line height of 1.8. Titles scale from 30px to 44px with a weight of 550 and a line height of 1.18. Code uses a high-contrast theme and scrolls horizontally.

## Layout

A quiet header, short introduction with the FEUP logo, contribution notice and course grid. Page width defaults to 1200px and adjusts from 1040px to 1920px in 80px steps.

Course pages use one centred reading column. Text width defaults to 640px and adjusts independently from 560px to 1000px in 40px steps. The article adds 24px padding on each side. The header spans the viewport. At 1200px and above, a 200px course sidebar sits left of the article and a 170px page index sits right, separated by 32px gaps. Both sidebars stay available while reading and scroll within the viewport, leaving a 24px bottom margin. Their height follows the visible header. Below this breakpoint, course navigation uses a compact row aligned with the header margins. At 700px and below, permanent 36px gutters leave room for annotation markers without covering the text.

Below 1200px, a sticky row holds the course link and a closed “Conteúdos” disclosure. Its chapter menu overlays the page and scrolls within the viewport. The current page’s heading links appear inside that menu. Course overview pages show published lessons as numbered rows with thin dividers and a shared rounded border.

LEIC and MEIC are plain links above the course grid. LEIC years stay in order, with two semester columns on desktop and stacked semesters below 700px. Each semester keeps two card columns. MEIC required courses use coloured cards; named options appear as compact rows inside initially collapsed semester disclosures. Option rows use two columns on desktop and one at 700px and below. The nucleus directory uses three columns above 1100px, two on tablets and one on mobile.

Opening notes never moves or resizes the article. A contextual note uses a compact 300px floating panel beside its passage when space permits, constrained to the viewport. At 700px and below, it becomes a bottom sheet capped at 62dvh and adjusts to the on-screen keyboard.

The full notebook opens as a 380px overlay on the right. At 1000px and below, it becomes a bottom panel capped at 62dvh. Returning from a contextual note opens this complete notebook view.

The footer keeps the independence statement and smaller inspiration link in two text blocks, alongside appearance, GitHub, shortcuts and the mobile FEUP logo. Text wraps naturally on narrow screens.

## Elevation & Depth

Cards use flat colour. Course hover adds a small lift and a soft shadow (0 8px 14px #00000018). Dialogs use a deeper shadow (0 16px 80px #0003). The AI popover and notebook use softer shadows (0 8px 30px #0002 and 0 10px 40px #0002). Reduced motion removes animation.

The selection toolbar uses a 0 6px 28px #0003 shadow. Save and undo feedback uses 0 8px 28px #0003.

## Shapes

Controls have gently rounded corners. Cards and the AI popover use larger corners, followed by search and shortcut dialogs, then appearance and course dialogs. Interface controls use Heroicons SVGs through `Icon.astro`. Course artwork uses `CourseIcon.astro`: choose distinct subject-specific Tabler or custom SVGs, such as integrals, logic gates and automata. Course cards use 56px icons; MEIC option rows use 28px icons. Keep official brand logos separate; do not use Unicode characters as icons.

Notebook panels use 12px corners. Selection toolbars and feedback use 10px corners, with 6px action corners. Quotes and comment fields use 8px corners. Full notebook and selection actions have a minimum height of 44px; contextual note controls use 32px. Margin markers use compact Heroicons buttons with 6px corners.

Callouts and content images use 8px corners. Linked footnotes use a 4px rounded accent background on the targeted note.

## Components

The same header appears on the homepage and reading pages. It keeps search, the notebook’s book icon and appearance directly available. On mobile, “Núcleos” and “Contribuir” move into a navigation menu. The header hides on every screen size while scrolling down and returns when scrolling up or receiving keyboard focus. It stays visible near the top and while its menu, a dialog or the notebook is open. Reduced motion removes the transition. Search finds courses, lessons and nuclei. Native dialogs close with Escape and restore focus to the opener. Preferences apply before the first paint.

Lesson pages show “Perguntar ao Chat” and “Brain rot” as direct actions with 12px side padding. The AI action opens a native popover with provider icons. Floating UI anchors it below the trigger with a 6px offset, flips it when needed and keeps it within 12px of the viewport edges. Available height limits the menu so its contents can scroll. The button reads “Perguntar ao Chat”. Its links ask the provider to read the public Markdown and page URLs. Gemini uses a copy-prompt fallback. The homepage has no page actions.

Brain rot opens a full-screen black lesson reader based on the supplied TikTok reference, colegottdank.com. Centre a portrait video on desktop and fill the width below 600px. Keep “A seguir / Para ti” above the video, a fictional channel and social counts over it, social icons on the right, and a black navigation bar below. Only “Início” works; the other bottom items are disabled. Captions use bold white Manrope with a dark outline. Images, formulas and code appear in a scrollable white panel.

Swipe vertically to change clips and tap the video or content cards to pause or resume. Centre reading content on the full video, independently of the social rail. Cards replace captions. Captions default to 20–26px and at most six words. Readers can show one token at a time, choose a reading font and scale text from 80% to 140%. Paginate the display without splitting spoken sentences. Inline maths remains an intact token. New captions and cards have a 100 ms scale/opacity entrance, starting at 90% opacity, and respect reduced motion. Single-word mode animates each token and hides the redundant animation toggle; other caption modes allow disabling it. Animated captions lead speech by 100 ms. Word highlighting starts enabled, defaults to pale gold and has a colour picker. Code and table cards stay static, without animated line highlighting. Centre the play button on the video in portrait and landscape, including when a card is visible. Preserve syntax colours on white cards. YouTube cards show a thumbnail and an explicit link to open the video. The upper-right settings cog opens voice, speed, caption and display controls in one panel, without nested disclosures. Readers can hide the avatar, likes, comments and bookmarks independently. Store these choices, the selected voice and volume in local browser preferences. Keep the share action available.

The progress scrubber uses TikTok red and a translucent remaining track. While dragging or keyboard-focused, thicken it, reveal the white thumb and show elapsed/total time above it in bold tabular numerals. Mark an estimated duration with ≈. The lower-left sound button mutes or restores narration volume. Desktop hover or keyboard focus reveals a vertical slider above it, with a continuous pointer path into the control; touch uses only mute/unmute. Changing volume keeps the reading position. Share opens a copy-link/device-share panel. Reading transport, recordings and uploads belong in the settings panel. Desktop clip arrows sit outside the animated video shell. Fade them in only after the phone entrance ends, and fade them out before the phone exits. Below 500px high, widen the feed and compress the social rail so landscape controls stay apart. Respect safe areas and keep background videos still with reduced motion. FEUP pink marks focus and settings links; cyan and red decorate the create icon.

The appearance sidebar exposes its theme swatches, font choices, sliders and CSS suggestions directly. Group controls under Appearance, Reading, Code and Custom CSS, with scrolling inside a fixed header and reset footer. On mobile it fills the viewport. Preserve native radio-group keyboard behavior and show selection with colour and a checkmark.

Brain rot groups Piper voices and Sopro V2 Turbo references. Mark Sopro as Pesado and keep benchmark times in developer documentation. Loading distinguishes downloaded data, reference preparation, model initialization and audio generation. Complete-sentence synthesis is the default. Prepare the current and following cue before playback and retain at most two future cues. Offer streaming separately under Sopro reproduction, explicitly using the same Turbo model. If streaming runs out of audio, pause reading progress until the rest of that sentence is ready. Keep the reading-speed control separate from model performance.

Selecting lesson text offers “Destacar” and “Comentar”. Highlighting saves without opening a panel. Commenting opens a contextual note and saves while typing. Margin markers reopen saved passages by pointer or keyboard. Readers can browse this page or all notes, return to a passage, undo deletion and export Markdown. Notes stay in this browser. Previous scratchpad notes remain editable under “Notas anteriores” and are included in exports. Missing or ambiguous passages keep their notes without highlighting unrelated text.

Returning readers see “Continuar a ler” and up to four recently opened pages on the homepage. The main card resumes their position or offers the next published topic after they reach the end. First visits show neither section. History stays in this browser and can be cleared.

Keyboard settings support remapping, disabling single-key shortcuts and optional spatial hjkl card navigation. Shortcuts leave text entry alone.

Course navigation groups and numbers published lessons, marking the current page with accent text. Its second- and third-level heading links sit beneath the current page. Escape closes the chapter overlay and returns focus to its trigger; selecting a heading closes it and focuses the destination. Previous and next links continue the reading sequence below the article.

Course progress has one linked segment per lesson and shows the current position in the course, not proof that earlier lessons were studied. The current segment fills while reading. It sits in the left sidebar on desktop and under the course row on smaller screens.

On desktop, “Nesta página” shows heading links without a progress bar. Rough Notation underlines the current heading and strikes through passed sections in the accent colour. Marks animate on section changes; resizing does not replay them. Reduced motion removes the animation. Scrolling back removes those marks. Below 1200px, the section progress strip remains below the introduction. One segment links to the introduction and each following segment links to a section. Accent fill tracks reading progress within each segment; the current location is exposed to assistive technology. Links work by keyboard and focus their destinations. Pages without sections omit the strip.

Markdown and MDX share LaTeX rendering. Typst text is selectable HTML with MathML; charts and DOT graphs render as SVG. Callouts have a coloured title, tinted background and thin border; collapsible explanations use a surface background. Footnotes sit below a divider and include return links. Collapsible explanations use a 20px Heroicons chevron with a 12px gap; it points right when closed and down when open. The Chat and chapter chevrons point up while open.

Authors can use `Bracket.astro` for explicit emphasis: a short label and an accent bracket along the left edge. It has a plain border fallback without JavaScript. Keep these marks separate from personal annotations and preserve conventional link underlines.

Figures require descriptive alt text and offer an original-image link beside the caption. Authors can preserve, dim or invert images in dark mode; print keeps the original image. Tabs use an accent underline for the selected option, scroll horizontally when needed and support arrow, Home and End keys.

YouTube previews load a remote thumbnail behind a dark overlay, a red play button and the video title. Clicking loads the player from youtube-nocookie.com. A caption explains when the thumbnail and player load and provides a direct YouTube link.

**The Reading Controls Rule.** Keep light, system and dark appearance separate from the palette choice. Put FEUP accent choices and independent page and text width sliders inside “Ajustar cores e largura”. Hide FEUP accent choices for other palettes. Width values and sliders occupy separate rows.

**The Playground Theme Rule.** Executable examples use the reading palette for editor backgrounds, text, gutters, selection and output. Containers have 10px corners and thin dividers. Static code and CodeMirror use the same 14px monospace font and a line height of 1.6, with shared syntax tokens. Readers choose IBM Plex Mono, JetBrains Mono or system monospace. Toolbars use compact 13px interface text and 6px vertical padding. The editor uses its caret and active line for focus, without an outline around the editing area. Run is the accent action; reset is secondary. Editors have no attribution footer; runtime versions and credits belong in the authoring guide. HTML previews keep their own white canvas.

**The Mobile Playground Rule.** At 480px and below, the HTML playground title occupies its own toolbar row. Reset and preview stay together below it, with unbroken labels and controls at least 36px high.

**The Diagram Theme Rule.** Diagram neutrals and shared example accents follow the reading palette. Preserve distinct data-series colours and transparency.

## Do's and Don'ts

Use simple Portuguese, distinct course colours and the real FEUP logo. Keep unpublished real courses separate from the fictional examples. Keep logos legible in both themes.

Do not add a course-only search, year filters, extra catalogue heading, hero CTA or invented logo. Do not copy lesson text or private notes into AI prompts.

Semester pushpins add compact horizontal course cards at the top of the homepage, keeping the original grid in place. Returning readers skip the introduction before first paint; clearing history restores it only when no valid semester pin remains. A valid pin also hides the introduction before first paint.

CSS snippets sit in a disclosure below the appearance controls. Suggestions start disabled; editing uses explicit Save and Cancel actions. The footer keeps an appearance action available when the simplified header preset hides its controls.

Projects remain available at `/projetos/`, but stay out of navigation, homepage links and search while hidden. The projects catalogue inherits the reading palette, typography and header. A compact search form filters a plain list by course and language. Each row links to the author repository, explains the project and distinguishes academic year from repository creation. Metadata stacks beneath the description on mobile. Empty results offer a reset that returns focus to search.

The AI menu shows provider options and WhatsApp without a help footer or disclosure. Copy feedback appears only after an action; clipboard failure reveals a selected text field for manual copying.

Reader loading messages describe the awaited cue, including disk lookup, model files, reference preparation, speech generation and saving. Cached cues skip synthesis; Sopro in complete-sentence mode still prepares the following cue before playback. The personal recording prompt allows up to 30 seconds at a natural pace.
