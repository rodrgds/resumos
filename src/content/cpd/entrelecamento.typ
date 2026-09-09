#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 10pt)
#diagram(
  spacing: (28pt, 12pt),
  node((0, 0), [Thread A]),
  node((1, 0), [Thread B]),
  node((0, 1), [lê 0]),
  edge((0, 0), (0, 1), "->"),
  node((1, 2), [lê 0]),
  edge((1, 0), (1, 2), "->"),
  node((0, 3), [escreve 1]),
  edge((0, 1), (0, 3), "->"),
  node((1, 4), [escreve 1]),
  edge((1, 2), (1, 4), "->"),
  node((0, 5), [total = 1]),
  node((1, 5), [devia ser 2]),
)
