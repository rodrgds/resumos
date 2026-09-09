#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 26pt,
  node((0, 0), [`BEGIN`], corner-radius: 4pt),
  node((1, 0), [`INSERT bilhete`], corner-radius: 4pt),
  node((2, 0), [`UPDATE pagamento`], corner-radius: 4pt),
  node((3, 0), [`COMMIT`], corner-radius: 4pt),
  node((2, 1), [`ROLLBACK`], corner-radius: 4pt, stroke: 1pt + rgb("8c2d3b"), fill: rgb("8c2d3b").lighten(80%)),
  edge("-|>"),
  edge("-|>"),
  edge("-|>"),
  edge((2, 0), (2, 1), "-|>", [se falhar]),
)
