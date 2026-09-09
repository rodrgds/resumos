#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  draw.line((0, -0.4), (0, 2.4))
  draw.line((-0.4, 0), (2.6, 0))
  draw.line((0, 0), (1, 0), (2, 1), (1, 1), close: true)
  draw.line((0, 0), (1, 0))
  draw.line((0, 0), (1, 1))
  draw.line((0, 0), (2, 1))
  draw.content((1.1, -0.25), [$u_1$])
  draw.content((0.7, 1.2), [$u_2$])
  draw.content((2.2, 0.8), [$u_1 + u_2$])
})
