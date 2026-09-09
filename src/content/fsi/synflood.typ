#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 11pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 26pt,
  node((0, 1), [Atacante], corner-radius: 4pt),
  node((2, 1), [Servidor], corner-radius: 4pt),
  node((2, 0), [fila cheia: só fantasmas], corner-radius: 4pt),
  edge((0, 1), (2, 1), "->", label: [SYN]),
  edge((0, 1), (2, 1), "->", label: [SYN], bend: 12deg),
  edge((0, 1), (2, 1), "->", label: [SYN], bend: -12deg),
  edge((2, 1), (2, 0), "->"),
)
