#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  import draw: *
  circle((0, 0), radius: 1, stroke: black)
  content((0, 0), [$+Q$])
  content((0.7, -0.75), [$R$])
  circle((0, 0), radius: 2, stroke: (paint: black, dash: "dashed"))
  content((-1.5, -1.5), [$S$])
  line((0, 0), (2.6, 0), mark: (end: ">"), stroke: rgb("8c2d3b") + 1pt)
  line((0, 0), (0, 2.6), mark: (end: ">"), stroke: rgb("8c2d3b") + 1pt)
  line((0, 0), (-1.84, 1.84), mark: (end: ">"), stroke: rgb("8c2d3b") + 1pt)
  content((2.75, 0.35), [$d vec(A)$])
  content((0.35, 2.7), [$vec(E)$])
  content((2.2, -0.5), [$r$])
})
