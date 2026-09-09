#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: (20pt, 26pt),
  node((0, 0), [$N$], corner-radius: 4pt),
  node((1, 0), [$times$]),
  node((2, 0), [CPI], corner-radius: 4pt),
  node((3, 0), [$times$]),
  node((4, 0), [$T_c$], corner-radius: 4pt),
  node((0, 1), [menos instruções:\ncompilador, ISA], corner-radius: 4pt),
  node((2, 1), [menos ciclos por instrução:\npipeline, caches], corner-radius: 4pt),
  node((4, 1), [relógio mais rápido:\nfrequência], corner-radius: 4pt),
  edge((0, 0), (0, 1), "-|>"),
  edge((2, 0), (2, 1), "-|>"),
  edge((4, 0), (4, 1), "-|>"),
)
