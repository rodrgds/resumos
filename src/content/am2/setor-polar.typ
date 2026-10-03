#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 12pt)
#canvas({
  let inner = 2
  let outer = 3
  let angle = 25deg
  let last = 55deg
  let polar(r, a) = (r * calc.cos(a), r * calc.sin(a))
  draw.line((0, 0), (4.2, 0), mark: (end: ">"))
  draw.content((4.3, -0.3), [$x$])
  draw.line((0, 0), polar(3.7, angle), stroke: (dash: "dashed"))
  draw.line((0, 0), polar(3.7, last), stroke: (dash: "dashed"))
  draw.arc((0, 0), anchor: "origin", radius: inner, start: angle, stop: last, stroke: rgb("8c2d3b"))
  draw.arc((0, 0), anchor: "origin", radius: outer, start: angle, stop: last, stroke: rgb("8c2d3b"))
  draw.line(polar(inner, angle), polar(outer, angle), stroke: rgb("8c2d3b"))
  draw.line(polar(inner, last), polar(outer, last), stroke: rgb("8c2d3b"))
  draw.content((1.1, 0.25), [$r$])
  draw.content((3.2, 0.9), [$dif r$])
  draw.content((2.9, 2.4), [$r dif theta$])
  draw.content((1.9, 1.6), [$dif A$])
  draw.content((2, -0.7), [largura radial $dif r$; largura angular $approx r dif theta$])
})
