#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 11pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 28pt,
  node((0, 1), [timer.h \ declara], corner-radius: 4pt),
  node((0, 0), [timer.c \ implementa], corner-radius: 4pt),
  edge((0, 1), (0, 0), "-|>"),
  node((1, 0), [main.c \ inclui timer.h], corner-radius: 4pt),
  edge((1, 0), (0, 1), "<|-", bend: 20deg),
)
