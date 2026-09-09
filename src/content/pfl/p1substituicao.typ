#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 20pt,
  node((0, 0), "somaQuadrados [1,2,3]"),
  edge("->"),
  node((0, 1), "1^2 + somaQuadrados [2,3]"),
  edge("->"),
  node((0, 2), "1 + (4 + somaQuadrados [3])"),
  edge("->"),
  node((0, 3), "1 + (4 + (9 + 0))"),
  edge("->"),
  node((0, 4), "14"),
)
