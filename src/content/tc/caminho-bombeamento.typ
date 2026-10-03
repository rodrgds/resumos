#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 26pt,
  node((0, 0), [$q_0$], corner-radius: 10pt),
  node((1, 0), [$q$], corner-radius: 10pt),
  node((2, 0), [$q_f$], corner-radius: 10pt),
  edge((0, 0), (1, 0), "-|>", label: [$x$], label-side: left),
  edge((1, 0), (1, 0), "-|>", label: [$y$], bend: 120deg),
  edge((1, 0), (2, 0), "-|>", label: [$z$], label-side: left),
)
#align(center)[$x y^i z$, $i >= 0$, $abs(y) >= 1$]
