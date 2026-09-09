#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 18pt,
  node((0, -1), [lido: nada]),
  node((0, 0), [$\$$], corner-radius: 4pt),
  node((1, -1), [lido: $00$]),
  node((1, 0), [$0$], corner-radius: 4pt),
  node((1, 1), [$0$], corner-radius: 4pt),
  node((1, 2), [$\$$], corner-radius: 4pt),
  node((2, -1), [lido: $001$]),
  node((2, 0), [$0$], corner-radius: 4pt),
  node((2, 1), [$\$$], corner-radius: 4pt),
  node((3, -1), [lido: $0011$]),
  node((3, 0), [$\$$], corner-radius: 4pt),
  edge((0, 0), (1, 1), "-|>", bend: 15deg),
  edge((1, 1), (2, 1), "-|>", bend: 15deg),
  edge((2, 1), (3, 0), "-|>", bend: 15deg),
)
