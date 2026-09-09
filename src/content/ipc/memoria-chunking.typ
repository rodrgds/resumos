#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt, spacing: 26pt,
  node((0, 0), [Memória de trabalho: 7±2 blocos, segundos], corner-radius: 4pt),
  node((2, 0), [Chunking: agrupar com sentido], corner-radius: 4pt),
  node((4, 0), [Memória de longo prazo: vasta, precisa de pistas], corner-radius: 4pt),
  edge((0, 0), (2, 0), [agrupa], "-|>"),
  edge((2, 0), (4, 0), [pistas], "-|>"),
)
