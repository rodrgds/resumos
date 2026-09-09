#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 20pt,
  node((0, 0), [$n$]),
  edge((0, 0), (1, -1), "-|>"),
  edge((0, 0), (1, 1), "-|>"),
  node((1, -1), [$n \/ 2$]),
  node((1, 1), [$n \/ 2$]),
  edge((1, -1), (2, -1.6), "-|>"),
  edge((1, -1), (2, -0.4), "-|>"),
  edge((1, 1), (2, 0.4), "-|>"),
  edge((1, 1), (2, 1.6), "-|>"),
  node((2, -1.6), [$n \/ 4$]),
  node((2, -0.4), [$n \/ 4$]),
  node((2, 0.4), [$n \/ 4$]),
  node((2, 1.6), [$n \/ 4$]),
  node((3.4, -1.2), [nível 0: soma $n$], stroke: none),
  node((3.4, 0), [nível 1: soma $n$], stroke: none),
  node((3.4, 1.2), [⋮ $log n$ níveis de $n$], stroke: none),
)
