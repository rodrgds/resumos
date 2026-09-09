#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  draw.line((0, 0), (4, 0.5), (3.5, 3), (-0.5, 2.5), close: true)
  draw.line((-0.5, -0.5), (4.5, 3.5))
  draw.line((1.55, 1.35), (1.95, 1.75))
  draw.line((1.55, 1.75), (1.95, 1.35))
  draw.content((2.2, 1.9), [$P$])
  draw.content((4.3, 3.3), [reta])
  draw.content((3.6, 0.2), [plano])
})
