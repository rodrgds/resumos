#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 30pt,
  node((0, 0), [$q_0$]),
  node((2, 0), [$q_"id"$], stroke: 2pt + rgb("8c2d3b")),
  node((2, 1.4), [$q_"num"$], stroke: 2pt + rgb("8c2d3b")),
  edge((0, 0), (2, 0), "-|>", label: [letra ou `_`]),
  edge((0, 0), (2, 1.4), "-|>", label: [dígito]),
  edge((2, 0), (2, 0), "-|>", bend: -35deg, label: [letra, dígito ou `_`]),
  edge((2, 1.4), (2, 1.4), "-|>", bend: 35deg, label: [dígito]),
)
