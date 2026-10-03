#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 11pt)
#grid(
  columns: (auto, auto, auto, auto),
  align: center + horizon,
  rect(inset: 8pt)[`10`],
  rect(inset: 8pt)[`20`],
  rect(inset: 8pt)[`30`],
  box(inset: 8pt)[`end()`],
)
#v(8pt)
`begin()` identifica `10`. \
`end()` marca o fim e não se desreferencia.
