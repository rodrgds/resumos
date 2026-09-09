#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: (24pt, 24pt),
  node((0, 0), [via A], corner-radius: 10pt),
  node((1, 0), [via B], corner-radius: 10pt),
  node((0, 1), [`1: lw t0`], corner-radius: 4pt),
  node((1, 1), [`2: add t3` bloqueada], corner-radius: 4pt),
  node((0, 2), [`3: sub t5`], corner-radius: 4pt),
  edge((0, 1), (0, 2), "-|>"),
  edge((0, 2), (1, 1), [a 3.ª passa à frente], bend: 25deg),
)
