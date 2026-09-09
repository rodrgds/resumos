#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 9pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: (14pt, 18pt),
  node((0, 0), [1]),
  node((1, 0), [2]),
  node((2, 0), [3]),
  node((3, 0), [4]),
  node((4, 0), [5]),
  node((5, 0), [6]),
  node((6, 0), [7]),
  node((6, 0), [7]),
  node((0, 1), [`lw`]),
  node((1, 1), [IF]),
  node((2, 1), [ID]),
  node((3, 1), [EX]),
  node((4, 1), [MEM]),
  node((5, 1), [WB]),
  node((0, 2), [`add`]),
  node((2, 2), [IF]),
  node((3, 2), [ID]),
  node((4, 2), [bolha]),
  node((5, 2), [EX]),
  node((6, 2), [MEM]),
  node((7, 2), [WB]),
  edge((4, 1), (5, 2), [forwarding], bend: -30deg),
)
