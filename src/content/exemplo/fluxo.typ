#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 11pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 24pt,
  node((0, 0), [Ler dados], corner-radius: 4pt),
  edge("-|>"),
  node((1, 0), [Calcular], corner-radius: 4pt),
  edge("-|>"),
  node((2, 0), [Mostrar resultado], corner-radius: 4pt),
)
