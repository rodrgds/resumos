#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 22pt,
  node((0, 0), [concat], corner-radius: 4pt),
  node((0, 1), [$(a union b)^*$], corner-radius: 4pt),
  node((1, 1), [$a a$], corner-radius: 4pt),
  node((2, 1), [$(a union b)^*$], corner-radius: 4pt),
  node((0, 2), [$"b"$], corner-radius: 4pt),
  node((2, 2), [$"ab"$], corner-radius: 4pt),
  edge((0, 0), (0, 1), "-|>", bend: 20deg),
  edge((0, 0), (1, 1), "-|>"),
  edge((0, 0), (2, 1), "-|>", bend: -20deg),
  edge((0, 1), (0, 2), "-|>"),
  edge((2, 1), (2, 2), "-|>"),
)
