#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 11pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 18pt,
  node((0, 0), [Objeto]),
  edge("-|>", [modelação]),
  node((0, 1), [Mundo]),
  edge("-|>", [vista]),
  node((0, 2), [Câmara]),
  edge("-|>", [projeção]),
  node((0, 3), [Recorte]),
  edge("-|>", [recorte; divisão por $w$]),
  node((0, 4), [NDC]),
  edge("-|>", [viewport]),
  node((0, 5), [Janela]),
  edge("-|>", [rasterização]),
  node((0, 6), [Fragmentos]),
)
