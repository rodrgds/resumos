#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 9pt)
#canvas({
  draw.line((0, 0), (10.5, 0), stroke: .8pt)
  for r in (1, 2, 3, 4.5, 7, 10, 14, 21) {
    let x = r * 0.5
    draw.line((x, -.12), (x, .12), stroke: .6pt)
    draw.content((x, -.45), [#r])
  }
  draw.content((5.25, -1.0), [rácio de contraste])
  draw.line((1.5, .12), (1.5, .55), stroke: 1.2pt + rgb("8c2d3b"))
  draw.content((1.5, .95), text(fill: rgb("8c2d3b"), [texto grande 3:1]))
  draw.line((2.25, .12), (2.25, .55), stroke: 1.2pt + rgb("28716c"))
  draw.content((2.25, .95), text(fill: rgb("28716c"), [texto normal 4,5:1]))
})
