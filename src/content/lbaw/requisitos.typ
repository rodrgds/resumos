#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: (36pt, 22pt),
  node((0, 0), [Visitante], shape: circle),
  node((0, 1), [Comprador], shape: circle),
  node((1, 0), [Pesquisar\ eventos], corner-radius: 10pt),
  node((1, 1), [Comprar\ bilhete], corner-radius: 10pt),
  node((1, 2), [Consultar\ histórico], corner-radius: 10pt),
  edge((0, 0), (1, 0), "->"),
  edge((0, 1), (1, 0), "->"),
  edge((0, 1), (1, 1), "->"),
  edge((0, 1), (1, 2), "->"),
)
