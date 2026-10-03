#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  let no(x, y, v) = {
    draw.circle((x, y), radius: .5)
    draw.content((x, y), [#v])
  }
  draw.content((-4.5, 2.2), [dist. 0])
  draw.content((-1.5, 2.2), [dist. 1])
  draw.content((1.5, 2.2), [dist. 2])
  draw.content((4.5, 2.2), [dist. 3])
  no(-4.5, 0, [1]); no(-1.5, 1, [2]); no(-1.5, -1, [3])
  no(1.5, 1, [4]); no(1.5, -1, [5]); no(4.5, 0, [6])
  draw.line((-4.02, .16), (-1.98, .84), mark: (end: ">"))
  draw.line((-4.02, -.16), (-1.98, -.84), mark: (end: ">"))
  draw.line((-1, 1), (1, 1), mark: (end: ">"))
  draw.line((-1.08, -.72), (1.08, .72), mark: (end: ">"))
  draw.line((-1, -1), (1, -1), mark: (end: ">"))
  draw.line((1.98, .84), (4.02, .16), mark: (end: ">"))
  draw.line((1.98, -.84), (4.02, -.16), mark: (end: ">"))
})
