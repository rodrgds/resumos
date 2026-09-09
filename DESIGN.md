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
rounded:
  notebook-action: '6px'
  notebook-toolbar: '10px'
  control: '8px'
  card: '12px'
  search-dialog: '14px'
  dialog: '16px'
---

## Overview

A FEUP course index based on the user's Resumos LEIC reference. Distinct course colours, plain Portuguese and the real institutional logos define the site. Preserve this system when adding content.

## Colors

Warm off-white and charcoal page themes use burgundy accents, with blue and green alternatives in reading options. Eight opaque course colours keep white labels readable. Elective groups use neutral cards.

Nucleus cards use their own brand colours. ACM FEUP and IEEE FEUP have white logo areas with original blue artwork and blue lower panels with white text in both themes. Keep logo artwork and proportions unchanged.

Notebook highlights use muted gold in both themes, independent of the reading accent. Comments keep their passage highlighted. The active passage has a stronger fill and an underline.

## Typography

Manrope serves navigation and headings. Readers can choose Source Serif 4 for prose, with a line height of 1.8 and adjustable size. Fictional-course notices are plain text. Code uses a high-contrast theme and scrolls horizontally.

## Layout

A quiet header, short introduction with the FEUP logo, contribution notice and course grid. The container is 1120px, or 1440px in wide mode. Lessons use an 860px container.

LEIC and MEIC are plain links above the course grid. MEIC is a separate two-year course with options marked on their cards. Years stay in order, with two semester columns on desktop and stacked semesters below 700px. Each semester keeps two card columns. The nucleus directory uses two columns on desktop and one on mobile.

The notebook sits beside the page in a 380px sidebar above 1000px. At 1000px and below, it becomes a bottom panel capped at 62dvh and adjusts to the on-screen keyboard.

## Elevation & Depth

Cards use flat colour. Course hover adds a small lift and a soft shadow (0 8px 14px #00000018). Dialogs use a deeper shadow (0 16px 80px #0003). The AI popover and notebook use softer shadows (0 8px 30px #0002 and 0 10px 40px #0002). Reduced motion removes animation.

The selection toolbar uses a 0 6px 28px #0003 shadow. Save and undo feedback uses 0 8px 28px #0003.

## Shapes

Controls have gently rounded corners. Cards and the AI popover use larger corners, followed by search and shortcut dialogs, then appearance and course dialogs. Course icons use larger Lucide outlines with 1.7px strokes.

Notebook panels use 12px corners. Selection toolbars and feedback use 10px corners, with 6px action corners. Quotes and comment fields use 8px corners. Notebook actions have a minimum height of 44px.

## Components

The header opens global search, the notebook and appearance. Search finds courses, lessons and nuclei. Native dialogs close with Escape and restore focus to the opener. Preferences apply before the first paint. Real course cards explain their unpublished state.

Lesson pages offer a native AI popover with provider icons. Its links ask the provider to read the public page URL. Gemini uses a copy-prompt fallback. The homepage has no page actions.

Selecting lesson text offers “Destacar” and “Comentar”. Highlighting saves without opening the notebook. Commenting opens it and saves while typing. Readers can browse this page or all notes, return to a passage, undo deletion and export Markdown. Notes stay in this browser. Previous scratchpad notes remain editable under “Notas anteriores” and are included in exports. Missing or ambiguous passages keep their notes without highlighting unrelated text.

Keyboard settings support remapping, disabling single-key shortcuts and optional spatial hjkl card navigation. Shortcuts leave text entry alone.

Markdown and MDX share LaTeX rendering. Typst text is selectable HTML with MathML; charts and DOT graphs render as SVG on white figure backgrounds. YouTube loads only on request.

## Do's and Don'ts

Use simple Portuguese, distinct course colours and the real FEUP logo. Keep unpublished real courses separate from the fictional examples. Keep logos legible in both themes.

Do not add a course-only search, year filters, extra catalogue heading, hero CTA or invented logo. Do not copy lesson text or private notes into AI prompts.
