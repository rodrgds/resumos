#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 6pt)
#set text(size: 12pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 20pt,
  node((0, 0), [segundos 59 \ de 07:32:59], corner-radius: 4pt),
  node((0, 1), [atualização \ 07:32:59 → 07:33:00], corner-radius: 4pt),
  node((0, 2), [horas e minutos \ 07 e 33], corner-radius: 4pt),
  node((0, 3), [misto 07:33:59 \ não observado], corner-radius: 4pt),
  edge((0, 0), (0, 1), "-|>"),
  edge((0, 1), (0, 2), "-|>"),
  edge((0, 2), (0, 3), "-|>"),
)
