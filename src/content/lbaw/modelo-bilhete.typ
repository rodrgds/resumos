#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 30pt,
  node((0, 0), [Utilizador], corner-radius: 4pt),
  node((1, 0), [Bilhete:\ código,\ estado], corner-radius: 4pt),
  node((2, 0), [Sessão], corner-radius: 4pt),
  edge((0, 0), (1, 0), "-|>", [1 — 0..\*]),
  edge((1, 0), (2, 0), "-|>", [0..\* — 1]),
)
