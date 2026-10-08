#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 11pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 18pt,
  node((1, -0.8), [leitura errada]),
  node((1, 0), [×]),
  node((0, 1), [+]),
  node((2, 1), [a]),
  node((-0.5, 2), [a]),
  node((0.5, 2), [a]),
  edge((1, 0), (0, 1), "-"),
  edge((1, 0), (2, 1), "-"),
  edge((0, 1), (-0.5, 2), "-"),
  edge((0, 1), (0.5, 2), "-"),
  node((1, 3.2), [com precedência]),
  node((1, 4), [+]),
  node((0, 5), [a]),
  node((2, 5), [×]),
  node((1.5, 6), [a]),
  node((2.5, 6), [a]),
  edge((1, 4), (0, 5), "-"),
  edge((1, 4), (2, 5), "-"),
  edge((2, 5), (1.5, 6), "-"),
  edge((2, 5), (2.5, 6), "-"),
)
