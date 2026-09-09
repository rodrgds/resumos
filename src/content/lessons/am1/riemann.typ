#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  import draw: *
  // Eixos
  line((0, 0), (12.5, 0))
  line((0, 0), (0, 7))
  content((12.5, 0), anchor: "north", pad(4pt)[$x$])
  content((0, 7), anchor: "east", pad(4pt)[$y$])
  // Reta y = x (de (0,0) a (12,6): escala 6 unidades em x, 6 em y)
  line((0, 0), (12, 6), stroke: rgb("28716c") + 1.2pt)
  // 4 retângulos à direita para y = x em [0, 2]: largura 0.5 em x -> 3 unidades
  // alturas: f(0.5)=0.5 -> 1.5; f(1)=1 -> 3; f(1.5)=1.5 -> 4.5; f(2)=2 -> 6
  rect((0, 0), (3, 1.5), stroke: rgb("8c2d3b"))
  rect((3, 0), (6, 3), stroke: rgb("8c2d3b"))
  rect((6, 0), (9, 4.5), stroke: rgb("8c2d3b"))
  rect((9, 0), (12, 6), stroke: rgb("8c2d3b"))
  content((6, -0.9), [$S_4$ com extremos direitos em $[0, 2]$])
})
