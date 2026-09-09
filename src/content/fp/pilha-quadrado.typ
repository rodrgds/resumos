#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: (16pt, 18pt),
  node((0, 0), [`quadrado(5)`]),
  node((0, 1), [`x` vale `5`]),
  node((0, 2), [calcula `5 * 5`]),
  node((0, 3), [devolve `25`]),
  edge((0, 0), (0, 1), [-,]),
  edge((0, 1), (0, 2), [-,]),
  edge((0, 2), (0, 3), [-,]),
)
