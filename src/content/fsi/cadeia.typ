#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 11pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 30pt,
  node((0, 2), [Servidor da loja], corner-radius: 4pt),
  node((0, 1), [CA intermédia], corner-radius: 4pt),
  node((0, 0), [CA raiz], corner-radius: 4pt),
  edge((0, 0), (0, 1), "->", label: [assina]),
  edge((0, 1), (0, 2), "->", label: [assina]),
)
