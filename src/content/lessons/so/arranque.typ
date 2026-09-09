#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 11pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 20pt,
  node((0, 0), [Firmware], corner-radius: 4pt),
  edge("-|>", label: [testes]),
  node((1, 0), [Bootloader], corner-radius: 4pt),
  edge("-|>", label: [carrega]),
  node((2, 0), [Núcleo], corner-radius: 4pt),
  edge("-|>", label: [lança]),
  node((3, 0), [Primeiro processo], corner-radius: 4pt),
  edge("-|>", label: [abre]),
  node((4, 0), [Shell], corner-radius: 4pt),
)
