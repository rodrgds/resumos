#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 11pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 28pt,
  node((0, 0), [1193182 Hz \ relógio fixo], corner-radius: 4pt),
  node((1, 0), [÷ 19886 \ divisor], corner-radius: 4pt),
  node((2, 0), [60 Hz \ interrupções], corner-radius: 4pt),
  edge("-|>"),
  edge("-|>"),
)
