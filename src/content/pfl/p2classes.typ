#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 11pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 22pt,
  node((1, 0), [Eq]),
  node((0, 1), [Ord]),
  node((2, 1), [Num]),
  node((1, 2), [Integral]),
  node((3, 2), [Fractional]),
  edge((1, 0), (0, 1), "->"),
  edge((1, 0), (2, 1), "->"),
  edge((2, 1), (1, 2), "->"),
  edge((2, 1), (3, 2), "->"),
)
