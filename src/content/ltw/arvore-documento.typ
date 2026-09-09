#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), spacing: (28pt, 30pt),
  node((2, 0), [`html`]),
  node((0, 1), [`head`]),
  node((3, 1), [`body`]),
  node((2, 2), [`header`]),
  node((4, 2), [`main`]),
  node((4, 3), [`article`]),
  edge((2, 0), (0, 1), "->"),
  edge((2, 0), (3, 1), "->"),
  edge((3, 1), (2, 2), "->"),
  edge((3, 1), (4, 2), "->"),
  edge((4, 2), (4, 3), "->"),
)
