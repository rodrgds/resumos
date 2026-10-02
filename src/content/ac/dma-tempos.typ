#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 11pt)

#canvas(length: 12pt, {
  import draw: *

  content((-0.5, 4.7), [DMA], anchor: "east")
  content((-0.5, 1.7), [CPU], anchor: "east")

  for t in (0, 4, 8, 12, 15) {
    line((t, 0), (t, 5.9), stroke: (paint: black.transparentize(80%), thickness: .5pt))
    line((t, 0), (t, -0.3), stroke: .7pt)
    content((t, -0.65), [#t], anchor: "north")
  }
  line((0, 0), (15, 0), stroke: .7pt)
  content((7.5, -2), [Tempo (ms)])

  for (start, end, number) in ((0, 4, 1), (4, 8, 2), (8, 12, 3)) {
    rect((start, 3.7), (end, 5.7), fill: rgb("f3e9e9"), stroke: .8pt + rgb("8c2d3b"))
    content(((start + end) / 2, 4.7), [B#number])
  }

  for (start, end, number) in ((4, 7, 1), (8, 11, 2), (12, 15, 3)) {
    rect((start, 0.7), (end, 2.7), fill: white, stroke: .8pt + rgb("28716c"))
    content(((start + end) / 2, 1.7), [B#number])
  }

  let idle = (paint: black, thickness: .7pt, dash: "dashed")
  line((0, 1.7), (4, 1.7), stroke: idle)
  line((7, 1.7), (8, 1.7), stroke: idle)
  line((11, 1.7), (12, 1.7), stroke: idle)
  line((12, 4.7), (15, 4.7), stroke: idle)
  content((2, 2.5), [Espera])
  content((13.5, 5.5), [Livre])

  line((15, 0), (15, 6.3), stroke: 1pt + rgb("8c2d3b"))
  content((15, 6.8), [Fim: 15 ms], anchor: "east")
  line((0, -3.3), (1.5, -3.3), stroke: idle)
  content((2, -3.3), [Sem trabalho neste exemplo], anchor: "west")
})
