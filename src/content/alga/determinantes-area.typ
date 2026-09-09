#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  draw.line((0, -0.4), (0, 3.6))
  draw.line((-0.4, 0), (3.6, 0))
  draw.line((0, 0), (2, 0), (3, 3), (1, 3), close: true)
  draw.content((2.15, -0.25), [$(2, 0)$])
  draw.content((0.35, 3.15), [$(1, 3)$])
  draw.content((2, 1.5), [área $6$])
})
