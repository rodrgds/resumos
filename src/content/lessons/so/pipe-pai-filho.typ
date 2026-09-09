#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 11pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 24pt,
  node((0, 1), [Pai], corner-radius: 4pt),
  node((0, -1), [Filho], corner-radius: 4pt),
  node((1, 0), [Pipe], corner-radius: 4pt),
  edge((0, -1), (1, 0), "-|>", label: [#text(size: 9pt)[fecha leitura, escreve]]),
  edge((1, 0), (0, 1), "-|>", label: [#text(size: 9pt)[`ola pai`]], bend: 20deg),
  node((2, 1), [Fecha escrita, lê], corner-radius: 4pt),
  edge((0, 1), (2, 1), "-|>", label: [#text(size: 9pt)[após `fork`]]),
)
