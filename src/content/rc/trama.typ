#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 20pt,
  node((0, 0), [Delimitador], corner-radius: 4pt),
  edge("-"),
  node((1, 0), [Cabeçalho], corner-radius: 4pt),
  edge("-"),
  node((2, 0), [Dados `1010`], corner-radius: 4pt),
  edge("-"),
  node((3, 0), [CRC `011`], corner-radius: 4pt),
  edge("-"),
  node((4, 0), [Delimitador], corner-radius: 4pt),
)
