#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 12pt)
#canvas({
  draw.arc((0, 0), anchor: "origin", radius: 2.5, start: 0deg, stop: 180deg)
  draw.line((-2.5, 0), (2.5, 0), stroke: rgb("28716c"))
  draw.content((-1.7, 2.2), [$S$])
  draw.content((1.7, -0.3), [$T$])
  draw.line((0, 2.5), (0, 3.5), mark: (end: ">"), stroke: rgb("8c2d3b"))
  draw.content((1.4, 3.3), [normal de $S$])
  draw.line((0, 0), (0, -1.2), mark: (end: ">"), stroke: rgb("28716c"))
  draw.content((1.4, -1.1), [normal de $T$])
  draw.content((0, -1.9), [corte: tampa em $z = 0$, normal para baixo])
})
