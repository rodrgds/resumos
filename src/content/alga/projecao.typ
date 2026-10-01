#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 11pt)
#canvas({
  draw.line((-0.3, 0), (3.8, 0))
  draw.line((0, 0), (3, 0), mark: (end: ">"))
  draw.line((0, 0), (3, 2), mark: (end: ">"))
  draw.line((3, 0), (3, 2), stroke: (dash: "dashed"))
  draw.line((2.75, 0), (2.75, 0.25), (3, 0.25))
  draw.content((3.75, -0.25), [$W$])
  draw.content((1.7, -0.3), [$p = "proj"_W v$])
  draw.content((1.3, 1.3), [$v$])
  draw.content((3.5, 1), [$e = v - p$])
})
