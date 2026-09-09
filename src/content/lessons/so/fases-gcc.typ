#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 11pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 20pt,
  node((0, 0), [`fonte.c`], corner-radius: 4pt),
  edge("-|>", label: [#text(size: 9pt)[expande `#include`]]),
  node((1, 0), [Pré-processador], corner-radius: 4pt),
  edge("-|>", label: [#text(size: 9pt)[traduz para assembly]]),
  node((2, 0), [Compilador], corner-radius: 4pt),
  edge("-|>", label: [#text(size: 9pt)[gera objeto]]),
  node((3, 0), [Montador], corner-radius: 4pt),
  edge("-|>", label: [#text(size: 9pt)[junta bibliotecas]]),
  node((4, 0), [Ligador], corner-radius: 4pt),
  edge("-|>", label: [#text(size: 9pt)[executa]]),
  node((5, 0), [Executável], corner-radius: 4pt),
)
