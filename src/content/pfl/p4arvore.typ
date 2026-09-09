#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 11pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 22pt,
  node((2, 0), [3]),
  node((0, 1), [1]),
  node((4, 1), [4]),
  node((1, 2), [1]),
  node((5, 2), [5]),
  edge((2, 0), (0, 1), "->"),
  edge((2, 0), (4, 1), "->"),
  edge((0, 1), (1, 2), "->"),
  edge((4, 1), (5, 2), "->"),
)
