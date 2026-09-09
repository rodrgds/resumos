#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 9pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 14pt,
  node((0, 0), [Objeto]),
  edge("-|>"),
  node((1, 0), [Mundo]),
  edge("-|>"),
  node((2, 0), [Câmara]),
  edge("-|>"),
  node((3, 0), [Recorte]),
  edge("-|>"),
  node((4, 0), [NDC]),
  edge("-|>"),
  node((5, 0), [Janela]),
  edge("-|>"),
  node((6, 0), [Píxel]),
)
