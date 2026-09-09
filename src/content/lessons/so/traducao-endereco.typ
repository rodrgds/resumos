#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 11pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 20pt,
  node((0, 2), [`0x1A3F5`], corner-radius: 4pt),
  edge("-|>", label: [#text(size: 9pt)[12 bits baixos]]),
  node((1, 2), [Deslocamento `0x3F5`], corner-radius: 4pt),
  edge((0, 2), (1, 1), "-|>", label: [#text(size: 9pt)[resto]]),
  node((1, 1), [Página `0x1A`], corner-radius: 4pt),
  edge("-|>", label: [#text(size: 9pt)[tabela]]),
  node((2, 1), [Moldura `0x07`], corner-radius: 4pt),
  edge((2, 1), (2, 0), "-|>", label: [#text(size: 9pt)[junta]]),
  edge((1, 2), (2, 0), "-|>", label: [#text(size: 9pt)[passa intacto]], bend: -20deg),
  node((2, 0), [Físico `0x073F5`], corner-radius: 4pt),
)
