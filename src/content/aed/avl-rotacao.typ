#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  let no(x, y, v) = {
    draw.circle((x, y), radius: .5)
    draw.content((x, y), [#v])
  }
  draw.content((-2, 1), [*antes*])
  no(-2, 0, [10]); no(-2, -1.6, [20]); no(-2, -3.2, [30])
  draw.line((-2, -.5), (-2, -1.1)); draw.line((-2, -2.1), (-2, -2.7))
  draw.content((2, 1), [*depois*])
  no(2, -.8, [20]); no(.8, -2.4, [10]); no(3.2, -2.4, [30])
  draw.line((1.7, -1.2), (1, -2)); draw.line((2.3, -1.2), (3, -2))
})
