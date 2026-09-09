#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: (24pt, 22pt),
  node((0, 0), [`(x for x in ...)`]),
  node((1, -1), [`[0, 1, 4, 9]`]),
  node((1, 1), [`[ ]`]),
  edge((0, 0), (1, -1), [1.ª vez,]),
  edge((0, 0), (1, 1), [2.ª vez,]),
)
