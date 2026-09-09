#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 20pt,
  node((0, -0.8), [dentro do bloco]),
  node((0, 0), [`x` → 4 (bloco)]),
  edge("-|>"),
  node((0, 1), [`x` → 3 (global)]),
  node((2, -0.8), [bloco fechado]),
  node((2, 1), [`x` → 3 (global)]),
)
