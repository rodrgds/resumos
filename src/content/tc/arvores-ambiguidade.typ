#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 20pt,
  node((-2, -1), [árvore 1: $times$ no topo]),
  node((-2, 0), [$times$], corner-radius: 4pt),
  node((-3, 1), [$+$], corner-radius: 4pt),
  node((-1, 1), [$a$], corner-radius: 4pt),
  node((-3.5, 2), [$a$], corner-radius: 4pt),
  node((-2.5, 2), [$a$], corner-radius: 4pt),
  edge((-2, 0), (-3, 1), "-|>"),
  edge((-2, 0), (-1, 1), "-|>"),
  edge((-3, 1), (-3.5, 2), "-|>"),
  edge((-3, 1), (-2.5, 2), "-|>"),
  node((2, -1), [árvore 2: $+$ no topo]),
  node((2, 0), [$+$], corner-radius: 4pt),
  node((1, 1), [$a$], corner-radius: 4pt),
  node((3, 1), [$times$], corner-radius: 4pt),
  node((2.5, 2), [$a$], corner-radius: 4pt),
  node((3.5, 2), [$a$], corner-radius: 4pt),
  edge((2, 0), (1, 1), "-|>"),
  edge((2, 0), (3, 1), "-|>"),
  edge((3, 1), (2.5, 2), "-|>"),
  edge((3, 1), (3.5, 2), "-|>"),
)
