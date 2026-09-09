#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  draw.circle((0, 0), radius: 2.5)
  draw.line((0, 0), (2.5, 0), mark: (end: ">"), stroke: rgb("8c2d3b"))
  draw.line((0, 0), (-1.77, 1.77), mark: (end: ">"), stroke: rgb("8c2d3b"))
  draw.line((0, 0), (0, -2.5), mark: (end: ">"), stroke: rgb("8c2d3b"))
  draw.content((1.3, 0.35), [normal exterior])
  draw.line((-1, -1.5), (-1, 1.5), mark: (end: ">"), stroke: rgb("28716c"))
  draw.line((1, -1.5), (1, 1.5), mark: (end: ">"), stroke: rgb("28716c"))
  draw.content((1, -1.9), [$z hat(k)$])
})
