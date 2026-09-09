#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 11pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: (30pt, 34pt),
  node((1, 0), [penas?], name: <r>),
  node((0, 1), [6 aves], name: <l>),
  node((2, 1), [6 mamíferos], name: <rr>),
  edge(<r>, <l>, "->", [sim]),
  edge(<r>, <rr>, "->", [não]),
)
