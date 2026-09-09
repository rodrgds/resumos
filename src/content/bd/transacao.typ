#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: .7pt,
  spacing: (22pt, 26pt),
  node((0, 0), [`BEGIN`], name: <b>),
  node((1, 0), [escreve encomenda], name: <e1>),
  node((2, 0), [escreve linhas], name: <e2>),
  node((3, 0), [baixa stock], name: <e3>),
  node((4, 0), [`COMMIT` → tudo visível], name: <c>),
  node((4, 1), [`ROLLBACK` → nada muda], name: <r>),
  edge(<b>, <e1>),
  edge(<e1>, <e2>),
  edge(<e2>, <e3>),
  edge(<e3>, <c>),
  edge(<e3>, <r>, bend: -25deg),
)
