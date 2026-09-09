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

FEUP uses warm off-white and charcoal themes with a burgundy accent, plus blue and green accent choices. Readers can also choose Gruvbox, Catppuccin, Nord or Dracula, each with light and dark palettes. Eight opaque course colours keep white labels readable. LEIC elective groups use neutral cards.

Nucleus cards use their own brand colours. ACM FEUP and IEEE FEUP have white logo areas with original blue artwork and blue lower panels with white text in both themes. Keep logo artwork and proportions unchanged.

Notebook highlights use muted gold in both themes, independent of the reading accent. Comments keep their passage highlighted. The active passage has a stronger fill and an underline.

Reading callouts use blue for information and notes, green for tips, amber for warnings and red for danger. Each has a matching pale background in light mode and a darker background in dark mode.

## Typography

Manrope serves navigation and headings. Prose offers eight locally hosted fonts: Manrope, Inter, Atkinson Hyperlegible, Lexend, Source Serif 4, Lora, Literata and IBM Plex Mono. Reading options group them by sans serif, serif and monospace, with a live preview. Prose has adjustable size and a line height of 1.8. Lesson titles use 36px type, reduced to 30px at 700px and below. Code uses a high-contrast theme and scrolls horizontally.

## Layout

A quiet header, short introduction with the FEUP logo, contribution notice and course grid. Page width defaults to 1360px and adjusts from 1040px to 1920px in 80px steps.

Course pages use 32px horizontal padding and 40px gaps. The columns hold a 200px course sidebar, the article and a 170px page index. Text width defaults to 720px and adjusts independently from 560px to 1000px in 40px steps, within the available space. Both navigation columns stay sticky and scroll when needed.

At 1280px and below, the page index becomes a disclosure above the article; the grid uses a 210px sidebar and a flexible article within 1120px. At 1100px and below, course navigation also becomes a collapsed disclosure and the page uses one column within 840px. Horizontal padding falls to 24px, then 20px at 700px and below.

LEIC and MEIC are plain links above the course grid. LEIC years stay in order, with two semester columns on desktop and stacked semesters below 700px. Each semester keeps two card columns. MEIC required courses use coloured cards; named options appear as compact rows inside initially collapsed semester disclosures. Option rows use two columns on desktop and one at 700px and below. The nucleus directory uses two columns on desktop and one on mobile.

The notebook sits beside the page in a 380px sidebar above 1000px. At 1000px and below, it becomes a bottom panel capped at 62dvh and adjusts to the on-screen keyboard.

With the notebook open above 1100px, the course grid uses a 180px sidebar, a flexible article, 28px gaps and 24px horizontal padding. The page index becomes an inline disclosure. At 1100px and below, the course page keeps its single-column layout.

## Elevation & Depth

Cards use flat colour. Course hover adds a small lift and a soft shadow (0 8px 14px #00000018). Dialogs use a deeper shadow (0 16px 80px #0003). The AI popover and notebook use softer shadows (0 8px 30px #0002 and 0 10px 40px #0002). Reduced motion removes animation.

The selection toolbar uses a 0 6px 28px #0003 shadow. Save and undo feedback uses 0 8px 28px #0003.

## Shapes

Controls have gently rounded corners. Cards and the AI popover use larger corners, followed by search and shortcut dialogs, then appearance and course dialogs. Course icons use larger Lucide outlines with 1.7px strokes.

Notebook panels use 12px corners. Selection toolbars and feedback use 10px corners, with 6px action corners. Quotes and comment fields use 8px corners. Notebook actions have a minimum height of 44px.

Callouts and content images use 8px corners. Linked footnotes use a 4px rounded accent background on the targeted note.

## Components

The header opens global search, the notebook and appearance. Search finds courses, lessons and nuclei. Native dialogs close with Escape and restore focus to the opener. Preferences apply before the first paint. Real course cards explain their unpublished state.

Lesson pages offer a native AI popover with provider icons. Floating UI anchors it below the trigger with a 6px offset, flips it when needed and keeps it within 12px of the viewport edges. Available height limits the menu so its contents can scroll. The button reads “Perguntar ao Chat”. Its links ask the provider to read the public Markdown and page URLs. Gemini uses a copy-prompt fallback. The homepage has no page actions.

Selecting lesson text offers “Destacar” and “Comentar”. Highlighting saves without opening the notebook. Commenting opens it and saves while typing. Readers can browse this page or all notes, return to a passage, undo deletion and export Markdown. Notes stay in this browser. Previous scratchpad notes remain editable under “Notas anteriores” and are included in exports. Missing or ambiguous passages keep their notes without highlighting unrelated text.

Keyboard settings support remapping, disabling single-key shortcuts and optional spatial hjkl card navigation. Shortcuts leave text entry alone.

Course navigation groups published lessons by section and marks the current page with an accent fill. The page index links to second- and third-level headings. Previous and next links continue the reading sequence below the article.

Markdown and MDX share LaTeX rendering. Typst text is selectable HTML with MathML; charts and DOT graphs render as SVG. Callouts have a coloured title, tinted background and thin border; collapsible explanations use a surface background. Footnotes sit below a divider and include return links.

Figures require descriptive alt text and offer an original-image link beside the caption. Authors can preserve, dim or invert images in dark mode; print keeps the original image. Tabs use an accent underline for the selected option, scroll horizontally when needed and support arrow, Home and End keys.

YouTube previews load a remote thumbnail behind a dark overlay, a red play button and the video title. Clicking loads the player from youtube-nocookie.com. A caption explains when the thumbnail and player load and provides a direct YouTube link.

**The Reading Controls Rule.** Keep light, system and dark appearance separate from the palette choice. Put FEUP accent choices and independent page and text width sliders inside “Ajustar cores e largura”. Hide FEUP accent choices for other palettes. Width values and sliders occupy separate rows.

**The Playground Theme Rule.** Executable examples use the reading palette for editor backgrounds, text, gutters, selection and output. Containers have 10px corners and thin dividers. CodeMirror uses 14px IBM Plex Mono with a line height of 1.6. Run is the accent action; reset is secondary. HTML previews keep their own white canvas.

**The Mobile Playground Rule.** At 480px and below, the HTML playground title occupies its own toolbar row. Reset and preview stay together below it, with unbroken labels and controls at least 36px high.

**The Diagram Theme Rule.** Diagram neutrals and shared example accents follow the reading palette. Preserve distinct data-series colours and transparency.

## Do's and Don'ts

Use simple Portuguese, distinct course colours and the real FEUP logo. Keep unpublished real courses separate from the fictional examples. Keep logos legible in both themes.

Do not add a course-only search, year filters, extra catalogue heading, hero CTA or invented logo. Do not copy lesson text or private notes into AI prompts.
