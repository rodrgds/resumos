#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  draw.arc((0, 0), radius: 2.5, start: 0deg, stop: 180deg)
  draw.line((-2.5, 0), (2.5, 0))
  draw.line((0, 0), (0, 1.6), mark: (end: ">"), stroke: rgb("8c2d3b"))
  draw.content((0.35, 1.5), [$S$])
  draw.line((0, 0), (0, -1.2), mark: (end: ">"), stroke: rgb("28716c"))
  draw.content((0.35, -1.1), [$T$])
  draw.content((0, -1.9), [fecha $S$ com a tampa $T$ e subtrai o fluxo de $T$])
})
