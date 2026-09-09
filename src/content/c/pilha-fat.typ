#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 20pt,
  node((1, 3), [topo]),
  node((0, 0), [`fat(2)`: endereço de retorno]),
  edge("-|>"),
  node((0, 1), [`fat(2)`: `n` = 2]),
  edge("-|>"),
  node((0, 2), [`fat(1)`: endereço de retorno]),
  edge("-|>"),
  node((0, 3), [`fat(1)`: `n` = 1]),
  edge((1, 3), (0, 3), "-|>"),
)
