#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: (28pt, 24pt),
  node((0, 0), [ControladorArena], corner-radius: 4pt),
  node((1, 0), [Heroi], corner-radius: 4pt),
  node((2, 0), [Ecra], corner-radius: 4pt),
  node((0, 1), [1: passo("cima")], stroke: none, fill: none),
  node((1, 1), [2: somar(0, -1)], stroke: none, fill: none),
  node((1, 2), [3: nova posição], stroke: none, fill: none),
  node((2, 1), [4: desenhar(...)], stroke: none, fill: none),
  edge((0, 0), (1, 0), "->"),
  edge((1, 0), (1, 1), "->"),
  edge((1, 1), (2, 1), "->"),
)
