#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  draw.circle((0, 0), radius: 2.5)
  draw.line((2.5, 0), (2.5, 0.7), mark: (end: ">"), stroke: rgb("8c2d3b"))
  draw.content((2.9, 0.6), [sentido direto])
  draw.content((0, 0), [$R$])
  draw.line((-3.2, 0), (3.2, 0), mark: (end: ">"))
  draw.line((0, -3.2), (0, 3.2), mark: (end: ">"))
  draw.content((3.4, 0.3), [$x$])
  draw.content((0.3, 3.2), [$y$])
})
