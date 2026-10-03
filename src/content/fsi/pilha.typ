#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 12pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 22pt,
  node((0, 3), [endereço de retorno], corner-radius: 4pt),
  node((0, 2), [outras variáveis], corner-radius: 4pt),
  node((0, 1), [buf (8 bytes)], corner-radius: 4pt),
  node((0, 0), [Entrada: 13 bytes\
    (12 + nulo)], corner-radius: 4pt),
  edge((0, 0), (0, 1), "->", label: [transborda]),
)
