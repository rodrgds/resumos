#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 11pt)
#canvas({
  draw.line((0, 0), (3, 0), (4, 1.5), (1, 1.5), close: true)
  draw.line((0, 0), (3, 0), mark: (end: ">"))
  draw.line((0, 0), (1, 1.5), mark: (end: ">"))
  draw.line((2, 0.75), (2, 3), mark: (end: ">"))
  draw.content((1.5, -0.35), [$a = (2, 0, 0)$])
  draw.content((-0.9, 1.3), [$b = (0, 3, 0)$])
  draw.content((3, 0.65), [área $6$])
  draw.content((2, 3.4), [$a times b = (0, 0, 6)$])
})
