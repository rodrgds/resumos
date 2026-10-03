#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 12pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: (28pt, 30pt),
  node((0, 0), [`BEGIN`], shape: rect, corner-radius: 4pt),
  node((1, 0), [Reservar lugar], shape: rect, corner-radius: 4pt),
  node((2, 0), [`INSERT bilhete`], shape: rect, corner-radius: 4pt),
  node((3, 0), [`COMMIT`], shape: rect, corner-radius: 4pt),
  node((1.5, 1), [`ROLLBACK`\ sem lugar ou falha], shape: rect, corner-radius: 4pt, fill: rgb("8c2d3b").lighten(80%)),
  edge((0, 0), (1, 0), "-|>"),
  edge((1, 0), (2, 0), "-|>"),
  edge((2, 0), (3, 0), "-|>"),
  edge((1, 0), (1.5, 1), "-|>"),
  edge((2, 0), (1.5, 1), "-|>"),
)
