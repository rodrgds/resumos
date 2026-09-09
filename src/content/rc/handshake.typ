#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 30pt,
  node((0, 0), [Cliente], corner-radius: 4pt),
  node((2, 0), [Servidor], corner-radius: 4pt),
  edge((0, 1), (2, 1), "->", label: [SYN, seq 100]),
  edge((2, 2), (0, 2), "->", label: [SYN-ACK, seq 500, ack 101]),
  edge((0, 3), (2, 3), "->", label: [ACK, seq 101, ack 501]),
)
