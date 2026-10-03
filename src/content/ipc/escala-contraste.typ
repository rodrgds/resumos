#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 15pt)
#canvas({
  draw.line((0, 0), (6.3, 0), stroke: .8pt)
  for r in (1, 7, 14, 21) {
    let x = r * 0.3
    draw.line((x, -.12), (x, .12), stroke: .6pt)
    draw.content((x, -.45), [#r])
  }
  draw.line((.9, 0), (.9, .65), stroke: 1.2pt + rgb("8c2d3b"))
  draw.content((.9, 1.1), anchor: "west", text(fill: rgb("8c2d3b"), [Texto grande: 3:1]))
  draw.line((1.35, 0), (1.35, -1.05), stroke: 1.2pt + rgb("28716c"))
  draw.content((1.35, -1.5), anchor: "west", text(fill: rgb("28716c"), [Texto normal: 4,5:1]))
  draw.content((3.15, -2.15), [Rácio de contraste])
})
