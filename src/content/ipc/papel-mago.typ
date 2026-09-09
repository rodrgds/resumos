#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt, spacing: 26pt,
  node((0, 0), [Folha 1: grupo + Nova sessão], corner-radius: 2pt),
  node((2, 0), [Folha 2: dois blocos com sala], corner-radius: 2pt),
  node((4, 0), [Folha 3: confirmação], corner-radius: 2pt),
  edge((0, 0), (2, 0), [toca em Nova sessão], "-|>"),
  edge((2, 0), (4, 0), [escolhe um bloco], "-|>"),
  node((2, -1), text(size: 8pt)[_Tu, o mago: trocas as folhas_], stroke: none),
)
