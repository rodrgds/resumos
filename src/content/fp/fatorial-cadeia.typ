#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: (18pt, 22pt),
  node((0, 0), [`fatorial(4)`]),
  node((1, 0), [`fatorial(3)`]),
  node((2, 0), [`fatorial(2)`]),
  node((3, 0), [`fatorial(1)`]),
  node((4, 0), [`fatorial(0)`]),
  node((4, 1), [`1`]),
  edge((0, 0), (1, 0), [-,]),
  edge((1, 0), (2, 0), [-,]),
  edge((2, 0), (3, 0), [-,]),
  edge((3, 0), (4, 0), [-,]),
  edge((4, 0), (4, 1), [caso base,], bend: -30deg),
  edge((4, 1), (0, 0), [regresso: `1`, `1`, `2`, `6`, `24`,], bend: -25deg),
)
