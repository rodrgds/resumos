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
  node((5, -0.8), [leitura certa]),
  node((5, 0), [+]),
  node((4, 1), [a]),
  node((6, 1), [×]),
  node((5.5, 2), [a]),
  node((6.5, 2), [a]),
  edge((5, 0), (4, 1), "-"),
  edge((5, 0), (6, 1), "-"),
  edge((6, 1), (5.5, 2), "-"),
  edge((6, 1), (6.5, 2), "-"),
)
