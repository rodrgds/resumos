#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 20pt,
  node((1, 1), [VLAN 10], corner-radius: 4pt),
  node((1, -1), [VLAN 20], corner-radius: 4pt),
  node((0, 1), [A], corner-radius: 4pt),
  edge("-"),
  node((0, -1), [C], corner-radius: 4pt),
  edge("-"),
  node((2, 1), [B], corner-radius: 4pt),
  edge("-"),
  node((2, -1), [D], corner-radius: 4pt),
  edge("-"),
)
