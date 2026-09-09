#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 20pt,
  node((0, 0), [Análise lexical]),
  edge("-|>"),
  node((0, 1), [Análise sintática]),
  edge("-|>"),
  node((0, 2), [Análise semântica]),
  edge("-|>"),
  node((0, 3), [Código intermédio]),
  edge("-|>"),
  node((0, 4), [Otimização]),
  edge("-|>"),
  node((0, 5), [Código objeto]),
  node((1, 1), [Tabela de símbolos], corner-radius: 4pt),
)
