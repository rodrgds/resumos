#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 11pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: (36pt, 34pt),
  node((1, 0), [Spam?], name: <s>, corner-radius: 8pt),
  node((0, 1), ["grátis"], name: <g>),
  node((2, 1), [prémio], name: <p>),
  edge(<s>, <g>, "->"),
  edge(<s>, <p>, "->"),
)
