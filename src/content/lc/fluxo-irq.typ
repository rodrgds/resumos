#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 11pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 28pt,
  node((0, 1), [Periférico \ gera evento], corner-radius: 4pt),
  node((1, 1), [PIC \ assinala IRQ], corner-radius: 4pt),
  node((2, 1), [CPU \ suspende], corner-radius: 4pt),
  node((2, 0), [Handler \ recolhe dados], corner-radius: 4pt),
  node((1, 0), [Programa \ consome], corner-radius: 4pt),
  edge("-|>"),
  edge("-|>"),
  edge((2, 1), (2, 0), "-|>"),
  edge((2, 0), (1, 0), "-|>"),
)
