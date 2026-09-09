#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 11pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: (36pt, 30pt),
  node((0, 1), [Model \ Arena, regras], corner-radius: 4pt),
  node((2, 1), [View \ desenha], corner-radius: 4pt),
  node((1, 0), [Controller \ teclas], corner-radius: 4pt),
  edge((1, 0), (0, 1), "->", label: [atualiza]),
  edge((0, 1), (2, 1), "->", label: [lê]),
  edge((1, 0), (2, 1), "->", label: [redesenha]),
)
