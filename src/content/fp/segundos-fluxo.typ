#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: (30pt, 24pt),
  node((0, 1), [total]),
  node((1, 0), [horas]),
  node((1, 2), [resto]),
  node((2, 1), [minutos]),
  node((2, 3), [segundos]),
  edge((0, 1), (1, 0), [`// 3600`]),
  edge((0, 1), (1, 2), [`% 3600`]),
  edge((1, 2), (2, 1), [`// 60`]),
  edge((1, 2), (2, 3), [`% 60`]),
)
