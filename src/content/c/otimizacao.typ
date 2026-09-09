#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 22pt,
  node((0, -0.8), [antes]),
  node((0, 0), [#strike[`t1 = 5`]]),
  edge("-|>"),
  node((0, 1), [#strike[`t2 = t1 + 3`]]),
  edge("-|>"),
  node((0, 2), [`x = t2`]),
  edge("-|>"),
  node((0, 3), [#strike[`y = 10`]]),
  node((2, -0.8), [depois]),
  node((2, 2), [`x = 8`]),
  edge((0, 2), (2, 2), "-|>", label: [propaga e dobra]),
)
