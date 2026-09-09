#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 11pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: (34pt, 26pt),
  node((0, 0), [$x_1$], name: <x1>),
  node((0, 1), [$x_2$], name: <x2>),
  node((0, 2), [$-1$], name: <b>),
  node((2, 1), [soma e sinal], name: <n>, corner-radius: 8pt),
  node((4, 1), [classe], name: <o>),
  edge(<x1>, <n>, "->", [$2$]),
  edge(<x2>, <n>, "->", [$-1$]),
  edge(<b>, <n>, "->", [viés]),
  edge(<n>, <o>, "->"),
)
