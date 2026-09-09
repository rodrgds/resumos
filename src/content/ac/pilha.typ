#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: (28pt, 22pt),
  node((0, 0), [zona livre], corner-radius: 4pt),
  node((1, 0), [`sp` aponta aqui antes], corner-radius: 10pt),
  edge((0, 0), (1, 0)),
  node((0, 1), [`ra` guardado em `8(sp)`], corner-radius: 4pt),
  node((0, 2), [`s0` guardado em `0(sp)`], corner-radius: 4pt),
  node((1, 2), [`sp` aponta aqui depois ($-16$)], corner-radius: 10pt),
  edge((0, 2), (1, 2)),
  node((0, 3), [resto da pilha], corner-radius: 4pt),
  edge((0, 0), (0, 1), "-|>"),
  edge((0, 1), (0, 2), "-|>"),
  edge((0, 2), (0, 3), "-|>"),
)
