#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 12pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 16pt,
  node((0, 0), "[8,12,6,15,10]"),
  edge("->"),
  node((0, 1), "filter (>= 9.5)"),
  edge("->"),
  node((0, 2), "[12,15,10]"),
  edge("->"),
  node((0, 3), "soma 37, n 3"),
  edge("->"),
  node((0, 4), "37 / 3 = 12,33..."),
)
