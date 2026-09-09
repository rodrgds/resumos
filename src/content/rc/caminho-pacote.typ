#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 20pt,
  node((0, 0), [Portátil], corner-radius: 4pt),
  edge("-|>"),
  node((1, 0), [Router de acesso], corner-radius: 4pt),
  edge("-|>"),
  node((2, 0), [Núcleo], corner-radius: 4pt),
  edge("-|>"),
  node((3, 0), [Router de acesso], corner-radius: 4pt),
  edge("-|>"),
  node((4, 0), [Servidor], corner-radius: 4pt),
)
