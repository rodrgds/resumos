#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 12pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: (28pt, 30pt),
  node((0.5, 0), [Utilizador U7], shape: rect, corner-radius: 4pt),
  node((0, 1), [Bilhete B1\ estado: pago], shape: rect, corner-radius: 4pt),
  node((1, 1), [Bilhete B2\ estado: reservado], shape: rect, corner-radius: 4pt),
  node((0.5, 2), [Sessão S12], shape: rect, corner-radius: 4pt),
  edge((0.5, 0), (0, 1), "-"),
  edge((0.5, 0), (1, 1), "-"),
  edge((0, 1), (0.5, 2), "-"),
  edge((1, 1), (0.5, 2), "-"),
)
