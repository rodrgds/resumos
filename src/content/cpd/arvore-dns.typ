#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 10pt)
#diagram(
  spacing: (36pt, 16pt),
  node((0, 0), [raiz]),
  node((0, 1), [.pt]),
  node((0, 2), [exemplo.pt]),
  node((2, 0), [resolvedor]),
  node((2, 1), [cache + TTL]),
  edge((0, 0), (0, 1), "->"),
  edge((0, 1), (0, 2), "->"),
  edge((2, 0), (2, 1), "->"),
  edge((2, 0), (0, 0), "->", [1]),
  edge((2, 1), (0, 1), "->", [2]),
  edge((2, 1), (0, 2), "->", [3]),
)
