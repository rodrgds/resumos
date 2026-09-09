#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  draw.line((0, 0), (4.2, 0), mark: (end: ">"))
  draw.content((2.1, -0.35), [$r$])
  draw.line((0, 0), (2.72, 1.27), mark: (end: ">"))
  draw.content((2.95, 1.45), [$theta$])
  draw.arc((0, 0), radius: 3, start: 0deg, stop: 25deg)
  draw.arc((0, 0), radius: 2, start: 8deg, stop: 20deg, stroke: rgb("8c2d3b"))
  draw.line((1.97, 0.28), (2.93, 0.42), stroke: rgb("8c2d3b"))
  draw.line((1.88, 0.70), (2.81, 1.05), stroke: rgb("8c2d3b"))
  draw.content((2.4, 1.15), [$r dif r dif theta$])
})
