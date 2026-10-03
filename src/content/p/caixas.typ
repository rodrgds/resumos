#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 11pt)
#grid(
  columns: (auto, auto, auto, auto),
  column-gutter: 12pt,
  align: center + horizon,
  rect(inset: 8pt)[`a = 3`],
  [←],
  rect(inset: 8pt)[`p = &a`],
  rect(inset: 8pt)[`b = 4`],
)
#v(8pt)
`p` guarda o endereço de `a`; `b` é outro objeto.
