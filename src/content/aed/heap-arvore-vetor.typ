#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  let no(x, y, v) = {
    draw.circle((x, y), radius: .5)
    draw.content((x, y), [#v])
  }
  no(0, 0, [1]); no(-2, -1.8, [3]); no(2, -1.8, [4])
  no(-3, -3.6, [7]); no(-1, -3.6, [5]); no(2, -3.6, [9])
  draw.line((-.35, -.4), (-1.7, -1.4)); draw.line((.35, -.4), (1.7, -1.4))
  draw.line((-2.35, -2.2), (-2.75, -3.2)); draw.line((-1.65, -2.2), (-1.25, -3.2))
  draw.line((2, -2.3), (2, -3.1))
  draw.content((-4.4, -5.4), [índice:])
  for (i, v) in ([1], [3], [4], [7], [5], [9]).enumerate() {
    draw.rect((-3.4 + i * 1.7, -6.2), (-1.9 + i * 1.7, -5.4))
    draw.content((-2.65 + i * 1.7, -5.8), [#v])
    draw.content((-2.65 + i * 1.7, -6.7), [#i])
  }
})
