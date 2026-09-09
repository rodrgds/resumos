#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  let no(x, y, v) = {
    draw.circle((x, y), radius: .5)
    draw.content((x, y), [#v])
  }
  draw.content((-4, 1.4), [dist. 0]); draw.content((-1.3, 1.4), [dist. 1]); draw.content((1.3, 1.4), [dist. 2]); draw.content((4, 1.4), [dist. 3])
  no(-4, 0, [1]); no(-1.8, 0, [2]); no(-.8, 0, [3]); no(1, 0, [4]); no(2.4, 0, [5]); no(4, 0, [6])
  draw.line((-3.5, 0), (-2.3, 0), mark: (end: ">")); draw.line((-1.3, 0), (-1, 0), mark: (end: ">"))
  draw.line((-1.8, -.35), (.7, -.35), mark: (end: ">")); draw.line((-.3, -.35), (.7, -.35), mark: (end: ">"))
  draw.line((1, -.35), (3.6, -.15), mark: (end: ">")); draw.line((2.9, -.15), (3.6, -.05), mark: (end: ">"))
})
