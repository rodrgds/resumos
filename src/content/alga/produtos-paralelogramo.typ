#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  draw.line((0, -0.4), (0, 3.6))
  draw.line((-0.4, 0), (2.6, 0))
  draw.line((0, 0), (2, 0), (2, 3), (0, 3), close: true)
  draw.line((1, 1.5), (1, 2.6))
  draw.content((1, 0.8), [área $6$])
  draw.content((1.35, 2.4), [$a times b$])
})
