#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 11pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 20pt,
  node((2, 0), [2+3\*4]),
  node((2, 5), [(2+3)\*4]),
  node((2, 1), [$+$]),
  node((0, 2), [2]),
  node((4, 2), [$times$]),
  node((3, 3), [3]),
  node((5, 3), [4]),
  node((2, 6), [$times$]),
  node((0, 7), [$+$]),
  node((4, 7), [4]),
  node((1, 8), [2]),
  node((3, 8), [3]),
  edge((2, 1), (0, 2), "->"),
  edge((2, 1), (4, 2), "->"),
  edge((4, 2), (3, 3), "->"),
  edge((4, 2), (5, 3), "->"),
  edge((2, 6), (0, 7), "->"),
  edge((2, 6), (4, 7), "->"),
  edge((0, 7), (1, 8), "->"),
  edge((0, 7), (3, 8), "->"),
)
