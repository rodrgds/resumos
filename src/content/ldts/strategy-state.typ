#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: (28pt, 26pt),
  node((1, 0), [Monstro \ agir()], corner-radius: 4pt),
  node((0, 1), [EstadoCalmo \ passear], corner-radius: 4pt),
  node((2, 1), [EstadoAlerta \ perseguir], corner-radius: 4pt),
  node((1, 2), [Comportamento \ mover()], corner-radius: 4pt),
  edge((1, 0), (0, 1), "->", label: [calmo]),
  edge((1, 0), (2, 1), "->", label: [alerta]),
  edge((0, 1), (1, 2), "-|>", label: [devolve]),
  edge((2, 1), (1, 2), "-|>", label: [devolve]),
)
