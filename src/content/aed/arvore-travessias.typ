#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  let no(x, y, v, pre) = {
    draw.circle((x, y), radius: .55)
    draw.content((x, y), [#v])
    draw.content((x, y - .95), text(8pt, fill: rgb("8c2d3b"))[#pre])
  }
  no(0, 0, [4], [1]); no(-3, -2.2, [2], [2]); no(3, -2.2, [6], [5])
  no(-4.5, -4.4, [1], [3]); no(-1.5, -4.4, [3], [4]); no(1.5, -4.4, [5], [6]); no(4.5, -4.4, [7], [7])
  draw.line((-.45, -.45), (-2.6, -1.85)); draw.line((.45, -.45), (2.6, -1.85))
  draw.line((-3.45, -2.65), (-4.15, -3.95)); draw.line((-2.55, -2.65), (-1.85, -3.95))
  draw.line((2.55, -2.65), (1.85, -3.95)); draw.line((3.45, -2.65), (4.15, -3.95))
})
