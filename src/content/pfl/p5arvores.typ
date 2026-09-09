#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 11pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 20pt,
  node((2, 0), [2+3\*4]),
  node((9, 0), [(2+3)\*4]),
  node((2, 1), [$+$]),
  node((0, 2), [2]),
  node((4, 2), [$times$]),
  node((3, 3), [3]),
  node((5, 3), [4]),
  node((9, 1), [$times$]),
  node((7, 2), [$+$]),
  node((11, 2), [4]),
  node((6, 3), [2]),
  node((8, 3), [3]),
  edge((2, 1), (0, 2), "->"),
  edge((2, 1), (4, 2), "->"),
  edge((4, 2), (3, 3), "->"),
  edge((4, 2), (5, 3), "->"),
  edge((9, 1), (7, 2), "->"),
  edge((9, 1), (11, 2), "->"),
  edge((7, 2), (6, 3), "->"),
  edge((7, 2), (8, 3), "->"),
)
