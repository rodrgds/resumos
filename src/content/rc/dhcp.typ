#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 30pt,
  node((0, 0), [Cliente], corner-radius: 4pt),
  node((2, 0), [Servidor DHCP], corner-radius: 4pt),
  edge((0, 1), (2, 1), "->", label: [`Discover`]),
  edge((2, 2), (0, 2), "->", label: [`Offer`]),
  edge((0, 3), (2, 3), "->", label: [`Request`]),
  edge((2, 4), (0, 4), "->", label: [`Ack`]),
)
