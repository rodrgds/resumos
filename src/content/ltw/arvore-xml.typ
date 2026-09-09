#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), spacing: (20pt, 26pt),
  node((2.5, 0), [`catalogo`]),
  node((1, 1), [`livro`]),
  node((4, 1), [`livro`]),
  node((0, 2), [`titulo`]),
  node((2, 2), [`preco`]),
  node((3, 2), [`titulo`]),
  node((5, 2), [`preco`]),
  edge((2.5, 0), (1, 1), "->"),
  edge((2.5, 0), (4, 1), "->"),
  edge((1, 1), (0, 2), "->"),
  edge((1, 1), (2, 2), "->"),
  edge((4, 1), (3, 2), "->"),
  edge((4, 1), (5, 2), "->"),
)
