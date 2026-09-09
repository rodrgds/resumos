#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 11pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: (36pt, 28pt),
  node((0, 0), [Monstro \ agir()], corner-radius: 4pt),
  node((1, 0), [Comportamento \ mover()], corner-radius: 4pt),
  edge((0, 0), (1, 0), "-|>", label: [tem um]),
)
