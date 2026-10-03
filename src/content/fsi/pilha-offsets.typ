#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 11pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 22pt,
  node((0, 4), [retorno em ebp+4], corner-radius: 4pt),
  node((0, 3), [ebp guardado: bytes 16-19], corner-radius: 4pt),
  node((0, 2), [buf em ebp-16, 12 bytes], corner-radius: 4pt),
  node((0, 1), [cópia: índice 20 atinge retorno], corner-radius: 4pt),
  edge((0, 1), (0, 2), "->", label: [transborda]),
)
