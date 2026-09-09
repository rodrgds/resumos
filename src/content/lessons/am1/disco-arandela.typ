#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  import draw: *
  // Eixo de rotação
  line((-1, 0), (11, 0))
  content((11, 0), anchor: "west", pad(4pt)[eixo])
  // Disco: secção cheia de raio R = 2 (altura 4)
  rect((1, -2), (2, 2), fill: rgb("28716c").transparentize(70%), stroke: rgb("28716c"))
  line((1.5, 0), (1.5, 2), stroke: rgb("28716c") + 1pt, mark: (end: ">"))
  content((1.5, 2), anchor: "south", pad(2pt)[$R$])
  content((1.5, -2.9), [disco])
  // Arandela: coroa entre r = 1 e R = 2
  rect((5, -2), (6, -1), fill: rgb("8c2d3b").transparentize(70%), stroke: rgb("8c2d3b"))
  rect((5, 1), (6, 2), fill: rgb("8c2d3b").transparentize(70%), stroke: rgb("8c2d3b"))
  line((5.5, 0), (5.5, 1), mark: (end: ">"))
  content((5.5, 0.5), anchor: "east", pad(3pt)[$r$])
  line((5.5, 0), (5.5, 2), mark: (end: ">"))
  content((5.5, 2), anchor: "south", pad(2pt)[$R$])
  content((5.5, -2.9), [arandela])
})
