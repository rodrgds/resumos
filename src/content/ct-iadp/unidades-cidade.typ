#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 16pt)
#canvas({
  draw.line((0, 0), (10, 0), stroke: 0.6pt)
  for n in range(0, 11, step: 2) {
    draw.line((n, -0.1), (n, 0.1), stroke: 0.6pt)
    draw.content((n, -0.4), [#n])
  }
  draw.rect((0, 0.8), (9, 1.5), fill: rgb("28716c"), stroke: none)
  draw.content((0, 1.8), anchor: "west", [Braga: 9 unidades])
  draw.rect((0, 2.6), (5, 3.3), fill: rgb("8c2d3b"), stroke: none)
  draw.content((0, 3.6), anchor: "west", [Porto: 5 unidades])
  draw.content((5, -1), [Unidades vendidas])
})
