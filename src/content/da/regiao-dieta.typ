#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 9pt)
// Dieta: x + 2y >= 5 e 3x + y >= 6. Escala: 1 unidade de x = 1,1 cm,
// 1 unidade de y = 0,85 cm.
#canvas({
  // Região admissível: (0,6), (1,4;1,8), (5,0) e para cima.
  draw.line(
    (0, 5.1), (1.54, 1.53), (5.5, 0), (6.8, 0), (6.8, 5.95), (0, 5.95),
    close: true, fill: rgb("f3e9e9"), stroke: none)
  // Eixos.
  draw.line((0, 0), (7, 0), mark: (end: ">"))
  draw.line((0, 0), (0, 6.2), mark: (end: ">"))
  draw.content((7.05, 0), [$x$], anchor: "west")
  draw.content((0, 6.3), [$y$], anchor: "south")
  // Reta P: y = (5 - x) / 2, de (0, 2,5) a (5, 0).
  draw.line((0, 2.125), (5.6, -0.085), stroke: 1pt + rgb("28716c"))
  draw.content((5.7, 0.35), [P], anchor: "west")
  // Reta Q: y = 6 - 3x, de (0, 6) a (2, 0).
  draw.line((0, 5.1), (2.3, -0.255), stroke: 1pt + rgb("28716c"))
  draw.content((0.15, 5.4), [Q], anchor: "west")
  // Vértices com custos.
  draw.circle((0, 5.1), radius: 0.07, fill: rgb("8c2d3b"), stroke: none)
  draw.content((-0.15, 5.1), [18], anchor: "east")
  draw.circle((1.54, 1.53), radius: 0.07, fill: rgb("8c2d3b"), stroke: none)
  draw.content((1.54, 1.1), [8,2])
  draw.circle((5.5, 0), radius: 0.07, fill: rgb("8c2d3b"), stroke: none)
  draw.content((5.5, 0.35), [10])
})
