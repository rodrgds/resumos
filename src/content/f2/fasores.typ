#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  import draw: *
  line((-0.6, 0), (4.2, 0), mark: (end: ">"), stroke: black + 0.5pt)
  line((0, -2.7), (0, 2.7), mark: (end: ">"), stroke: black + 0.5pt)
  line((0, 0), (0, -2), mark: (end: ">"), stroke: rgb("28716c") + 1.2pt)
  line((0, 0), (0, 2), mark: (end: ">"), stroke: rgb("28716c") + 1.2pt)
  line((0, 0), (3, 0), mark: (end: ">"), stroke: rgb("8c2d3b") + 1.4pt)
  content((3.3, -0.4), [$V_R$])
  content((0.55, 2), [$V_L$])
  content((0.55, -2), [$V_C$])
  content((2.1, 0.75), [em fase com $I$])
})
