#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 10pt)
// Gadget SAT -> cobertura: 1 variável (aresta x / não x) e
// 1 cláusula (triângulo), com o triângulo ligado ao literal x.
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 26pt,
  node((0, 1), [$x$]),
  node((0, -1), [$overline(x)$]),
  edge((0, 1), (0, -1), "-"),
  node((2, 1), [$t_1$]),
  node((2, -1), [$t_2$]),
  node((3, 0), [$t_3$]),
  edge((2, 1), (2, -1), "-"),
  edge((2, -1), (3, 0), "-"),
  edge((3, 0), (2, 1), "-"),
  edge((0, 1), (2, 1), "-|>", label: [literal], label-side: left),
)
