#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 20pt,
  node((1, 0), [Propriedade]),
  edge("->"),
  node((3, 0), [Gerar casos]),
  edge("->"),
  node((4, 1), [Correr]),
  edge("->"),
  node((2, 2), [Encolher]),
  edge("->"),
  node((0, 1), [Corrigir]),
  edge((0, 1), (1, 0), "->"),
)
