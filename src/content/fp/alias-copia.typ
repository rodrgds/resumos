#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: (26pt, 20pt),
  node((0, 0), [`notas`]),
  node((0, 1), [`copia`]),
  node((1, 0), [`[12, 15]`], name: <L>),
  node((0, 2), [`c`]),
  node((1, 2), [`[12, 15]`]),
  edge((0, 0), <L>, [alias]),
  edge((0, 1), <L>, [-,]),
  edge((0, 2), (1, 2), [cópia]),
)
