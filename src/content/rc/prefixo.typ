#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 24pt,
  node((0, 0), [`192.168.0.0/16`, por eth0], corner-radius: 4pt),
  node((1, 0), [Destino `192.168.1.130`], corner-radius: 4pt),
  node((2, 0), [`192.168.1.128/26`, por eth1], corner-radius: 4pt),
  edge((2, 0), (1, 0), "-|>", label: [mais específico]),
)
