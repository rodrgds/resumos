#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  draw.set-style(stroke: 1pt + rgb("8c2d3b"))
  draw.line((-4.6, 0), (3.6, 0))
  for v in range(-4, 4) {
    draw.line((v, -0.12), (v, 0.12))
    draw.content((v, -0.55), [#str(v)])
  }
  draw.content((-0.5, 0.75), [3 bits: de $-4$ a $3$])
  draw.line((3, 0.35), (3.9, 0.35), mark: (end: ">"))
  draw.line((3.9, 0.35), (3.9, -0.05))
  draw.line((3.9, -0.05), (-4.6, -0.05))
  draw.line((-4.6, -0.05), (-4.6, -0.3), mark: (end: ">"))
  draw.content((-0.35, -0.75), [somar 1 a $3$ dá $-4$ (_overflow_)])
})
