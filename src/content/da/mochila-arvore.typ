#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 22pt,
  node((0, 0), [cap 7]),
  edge((0, 0), (1, -1), [leva A], "-|>", label-side: right),
  edge((0, 0), (1, 1), [ignora A], "-|>"),
  node((1, -1), [cap 5]),
  node((1, 1), [cap 7]),
  edge((1, -1), (2, -2), [leva B], "-|>", label-side: right),
  edge((1, -1), (2, 0), [ignora B], "-|>"),
  node((2, -2), [cap 2]),
  node((2, 0), [cap 5]),
  edge((2, -2), (3, -3), [leva C: pesa 4, podado], "-|>", label-side: right,
    stroke: rgb("8c2d3b") + 1pt),
  edge((2, -2), (3, -1), [ignora C], "-|>"),
  node((3, -3), [excede], fill: rgb("e8e8e8")),
  node((3, -1), [cap 2]),
  edge((3, -1), (4, -2), [leva D: pesa 5, podado], "-|>", label-side: right,
    stroke: rgb("8c2d3b") + 1pt),
  edge((3, -1), (4, 0), [ignora D], "-|>"),
  node((4, -2), [excede], fill: rgb("e8e8e8")),
  node((4, 0), [folha AB: (5, 7)]),
)
