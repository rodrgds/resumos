#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 16pt,
  node((0, 0), [start \ 0], corner-radius: 4pt),
  node((1, 0), [7 bits \ de dados], corner-radius: 4pt),
  node((2, 0), [paridade \ par], corner-radius: 4pt),
  node((3, 0), [stop \ 1], corner-radius: 4pt),
  edge("-|>"),
  edge("-|>"),
  edge("-|>"),
)
