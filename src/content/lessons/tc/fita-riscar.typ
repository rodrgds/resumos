#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 16pt,
  node((0, -1), [antes]),
  node((0, 0), [$0$], corner-radius: 2pt),
  node((1, 0), [$0$], corner-radius: 2pt),
  node((2, 0), [$1$], corner-radius: 2pt),
  node((3, 0), [$1$], corner-radius: 2pt),
  node((4, 0), [$⊔$], corner-radius: 2pt),
  node((0, 1), [depois]),
  node((0, 2), [$X$], corner-radius: 2pt),
  node((1, 2), [$0$], corner-radius: 2pt),
  node((2, 2), [$1$], corner-radius: 2pt),
  node((3, 2), [$1$], corner-radius: 2pt),
  node((4, 2), [$⊔$], corner-radius: 2pt),
  edge((0, -1), (0, 0), "-|>", bend: -30deg),
  edge((0, 1), (0, 2), "-|>", bend: -30deg),
)
