#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 11pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 22pt,
  node((0, 0), [Eq]),
  node((0, 1), [Ord]),
  node((2, 1), [Num]),
  node((0, 2), [Real]),
  node((2, 2), [Fractional]),
  node((0, 3), [Integral]),
  node((2, 3), [Floating]),
  node((-2, 2), [Enum]),
  edge((0, 1), (0, 0), "->", label: [exige]),
  edge((0, 2), (0, 1), "->"),
  edge((0, 2), (2, 1), "->"),
  edge((0, 3), (0, 2), "->"),
  edge((0, 3), (-2, 2), "->"),
  edge((2, 2), (2, 1), "->"),
  edge((2, 3), (2, 2), "->"),
)
