#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 18pt,
  node((0, 1), [bit 7], corner-radius: 4pt),
  node((1, 1), [bit 5 \ erro], corner-radius: 4pt),
  node((2, 1), [...], corner-radius: 4pt),
  node((3, 1), [bit 0 \ pronto], corner-radius: 4pt),
  node((1, 0), [testa \ 0x20], corner-radius: 4pt),
  node((3, 0), [testa \ 0x01], corner-radius: 4pt),
  edge((1, 1), (1, 0), "-|>"),
  edge((3, 1), (3, 0), "-|>"),
)
