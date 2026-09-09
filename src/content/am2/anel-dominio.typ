#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  draw.line((-4.6, 0), (4.6, 0), mark: (end: ">"))
  draw.line((0, -4.6), (0, 4.6), mark: (end: ">"))
  draw.content((4.8, 0.3), [$x$])
  draw.content((0.3, 4.6), [$y$])
  draw.circle((0, 0), radius: 4, stroke: (dash: "dashed"))
  draw.circle((0, 0), radius: 2)
  draw.content((0, 2.35), [$r = 2$ (incluída)])
  draw.content((0, -4.35), [$r = 4$ (excluída)])
})
