#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 11pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 20pt,
  node((0, 1), [`write`], corner-radius: 4pt),
  edge("-|>", label: [#text(size: 9pt)[resolve e verifica]]),
  node((1, 1), [Inode], corner-radius: 4pt),
  edge("-|>", label: [#text(size: 9pt)[entrega]]),
  node((2, 1), [Driver], corner-radius: 4pt),
  edge((2, 1), (3, 1), "-|>", label: [#text(size: 9pt)[programa]]),
  node((3, 1), [Controlador], corner-radius: 4pt),
  edge((3, 1), (3, 0), "-|>", label: [#text(size: 9pt)[interrupção]]),
  node((3, 0), [Processo acorda], corner-radius: 4pt),
  edge((2, 1), (2, 0), "-|>", label: [#text(size: 9pt)[blocos grandes]]),
  node((2, 0), [DMA], corner-radius: 4pt),
  edge((2, 0), (3, 0), "-|>"),
)
