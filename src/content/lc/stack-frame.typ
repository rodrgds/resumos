#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 20pt,
  node((0, 3), [argumentos \ do chamador], corner-radius: 4pt),
  node((0, 2), [endereço \ de retorno], corner-radius: 4pt),
  node((0, 1), [FP guardado \ frame anterior], corner-radius: 4pt),
  node((0, 0), [variáveis \ locais], corner-radius: 4pt),
  edge((0, 3), (0, 2), "-|>"),
  edge((0, 2), (0, 1), "-|>"),
  edge((0, 1), (0, 0), "-|>"),
)
