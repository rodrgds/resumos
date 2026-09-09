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
rounded:
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

## Typography

Manrope serves navigation and headings. Readers can choose Source Serif 4 for prose, with a line height of 1.8 and adjustable size. Fictional-course notices are plain text. Code uses a high-contrast theme and scrolls horizontally.

## Layout

A quiet header, short introduction with the FEUP logo, contribution notice and course grid. The container is 1120px, or 1440px in wide mode. Lessons use an 860px container.

LEIC and MIEIC are plain links above the course grid. MIEIC is a separate five-year archive with options marked on their cards. Years stay in order, with two semester columns on desktop and stacked semesters below 700px. Each semester keeps two card columns. The nucleus directory uses two columns on desktop and one on mobile.

The scratchpad stays beside the page on wide screens and becomes a lower panel below 1000px.

## Elevation & Depth

Cards use flat colour. Course hover adds a small lift and a soft shadow (0 8px 14px #00000018). Dialogs use a deeper shadow (0 16px 80px #0003). The AI popover and notes panel use softer shadows (0 8px 30px #0002 and 0 10px 40px #0002). Reduced motion removes animation.

## Shapes

Controls have gently rounded corners. Cards and the AI popover use larger corners, followed by search and shortcut dialogs, then appearance and course dialogs. Course icons use larger Lucide outlines with 1.7px strokes.

## Components

The header opens global search, notes and appearance. Search finds courses, lessons and nuclei. Native dialogs close with Escape and restore focus to the opener. Preferences apply before the first paint. Real course cards explain their unpublished state.

Lesson pages offer a native AI popover with provider icons. Its links ask the provider to read the public page URL. Gemini uses a copy-prompt fallback. The homepage has no page actions.

The scratchpad saves locally and offers a text download. Keyboard settings support remapping, disabling single-key shortcuts and optional spatial hjkl card navigation. Shortcuts leave text entry alone.

Markdown and MDX share LaTeX rendering. Typst text is selectable HTML with MathML; charts and DOT graphs render as SVG on white figure backgrounds. YouTube loads only on request.

## Do's and Don'ts

Use simple Portuguese, distinct course colours and the real FEUP logo. Keep unpublished real courses separate from the fictional examples. Keep logos legible in both themes.

Do not add a course-only search, year filters, extra catalogue heading, hero CTA or invented logo. Do not copy lesson text or private notes into AI prompts.
