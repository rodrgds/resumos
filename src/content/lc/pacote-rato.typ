#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 20pt,
  node((0, 2), [0x28 \ botões e sinais], corner-radius: 4pt),
  node((1, 2), [0x05 \ delta X], corner-radius: 4pt),
  node((2, 2), [0xFB \ delta Y], corner-radius: 4pt),
  node((0, 1), [bit 3 = 1 \ sincroniza], corner-radius: 4pt),
  node((1, 1), [+5 \ direita], corner-radius: 4pt),
  node((2, 1), [-5 \ para cima], corner-radius: 4pt),
  edge((0, 2), (0, 1), "-|>"),
  edge((1, 2), (1, 1), "-|>"),
  edge((2, 2), (2, 1), "-|>"),
)
