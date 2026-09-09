#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  draw.line((-1.6, 0), (2.4, 0))
  draw.line((0, -2.4), (0, 2.4))
  draw.line((-1.5, -1.5), (2, 2))
  draw.line((0.75, -1.5), (-0.5, 1))
  draw.content((2.1, 1.8), [$(1, 1)$, $lambda = 5$])
  draw.content((-1.35, 1.0), [$(1, -2)$, $lambda = 2$])
})
