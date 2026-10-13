#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 11pt)
#canvas(length: 1cm, {
  import draw: *
  let C = (0, 0)
  let P = (4, 0)
  let L = (4, 3)
  line((3.5, -0.4), (4.5, 0.4), stroke: 1pt + rgb("292a30"))
  line(C, P, stroke: 1pt + rgb("28716c"), mark: (end: ">"))
  line(L, (4, 1.5), stroke: 1pt + rgb("8c2d3b"), mark: (end: ">"))
  line((4, 1.5), P, stroke: 1pt + rgb("8c2d3b"), stroke-dasharray: (4pt, 3pt))
  line((3.6, 1.5), (4.4, 1.5), stroke: 3pt + rgb("292a30"))
  for p in (C, P, L) {
    circle(p, radius: 0.08, fill: rgb("292a30"), stroke: none)
  }
  content((0, -0.4), [Câmara C])
  content((4, -0.6), [P visível])
  content((4, 3.4), [Luz L])
  content((1.7, 0.3), [caminho livre])
  content((2.4, 1.5), [obstáculo])
  content((2.6, 0.9), [luz bloqueada])
})
