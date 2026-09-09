#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: (30pt, 26pt),
  node((0, 1), [ControladorArena \ faz tudo], corner-radius: 4pt),
  node((1, 0), [ControladorArena \ passo(tecla)], corner-radius: 4pt),
  node((2, 0), [Comando \ executar()], corner-radius: 4pt),
  node((1, 1), [VistaArena \ desenhar()], corner-radius: 4pt),
  edge((0, 1), (1, 0), "->", label: [separar]),
  edge((1, 0), (2, 0), "-|>", label: [usa]),
  edge((1, 0), (1, 1), "->", label: [pede]),
)
