#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 18pt,
  node((0, 0), [Código: instruções, só leitura]),
  edge("-|>"),
  node((0, 1), [Dados estáticos: globais, endereço fixo]),
  edge("-|>"),
  node((0, 2), [Pilha: registos de ativação]),
  edge("-|>"),
  node((0, 3), [Monte: objetos dinâmicos]),
)
