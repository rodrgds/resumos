#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 20pt,
  node((0, 0), "pai(ana, X)"),
  node((2, 0), "pai(ana, leo)"),
  node((0, 1), "pai(X, leo)"),
  node((2, 1), "pai(tomas, ana)"),
  edge((0, 0), (2, 0), "->", label: "{X/leo}"),
  edge((0, 1), (2, 1), "->", label: "falha"),
)
