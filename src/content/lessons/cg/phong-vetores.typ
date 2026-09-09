#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 9pt)
#canvas({
  import draw: *
  let O = (0, 0)
  line((-2.2, 0), (2.2, 0), stroke: 0.6pt + rgb("292a30"))
  line(O, (0, 2.2), stroke: 1.2pt + rgb("8c2d3b"), mark: (end: ">"))
  line(O, (-1.6, 1.2), stroke: 1pt + rgb("28716c"), mark: (end: ">"))
  line(O, (1.6, 1.2), stroke: 1pt + rgb("28716c"), stroke-dasharray: (4pt, 3pt), mark: (end: ">"))
  line(O, (0.4, 1.8), stroke: 1pt + rgb("292a30"), mark: (end: ">"))
  line(O, (-0.8, 1.5), stroke: 1pt + rgb("292a30"), stroke-dasharray: (4pt, 3pt), mark: (end: ">"))
  content((0, 2.35), [$bold(n)$])
  content((-1.85, 1.35), [$bold(l)$])
  content((1.85, 1.35), [$bold(r)$])
  content((0.65, 1.95), [$bold(v)$])
  content((-1.05, 1.65), [$bold(h)$])
})
