#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 20pt,
  node((0, 1), [(200,150)], corner-radius: 4pt),
  node((1, 1), [(201,150)], corner-radius: 4pt),
  node((2, 1), [(202,150)], corner-radius: 4pt),
  node((0, 0), [(200,151)], corner-radius: 4pt),
  node((1, 0), [(201,151)], corner-radius: 4pt),
  node((2, 0), [(202,151)], corner-radius: 4pt),
  node((3, 1), [índice = \ y × 1024 + x], corner-radius: 4pt),
  edge((2, 1), (3, 1), "-|>"),
)
