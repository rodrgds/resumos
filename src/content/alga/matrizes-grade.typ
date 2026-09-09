#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  draw.line((0, -0.4), (0, 1.6))
  draw.line((-0.4, 0), (1.6, 0))
  draw.line((0, 0), (1, 0), (1, 1), (0, 1), close: true)
  draw.content((0.5, -0.35), [antes])
  draw.line((4, -0.4), (4, 3.6))
  draw.line((3.6, 0), (6.6, 0))
  draw.line((4, 0), (6, 0), (7, 3), (5, 3), close: true)
  draw.content((5.5, -0.35), [depois de $A$])
})
