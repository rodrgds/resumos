#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  draw.line((0, 2), (10, 2))
  draw.content((-0.6, 2), anchor: "east", [puro])
  draw.rect((3, 1.7), (5, 2.3), fill: rgb("8c2d3b"), stroke: none)
  draw.content((4, 2.6), [pacote T])
  draw.line((2, 1.2), (6, 1.2), stroke: (dash: "dashed"))
  draw.content((4, 0.8), [vulnerável: 2T])
  draw.line((0, -0.6), (10, -0.6))
  draw.content((-0.6, -0.6), anchor: "east", [ranhuras])
  for i in range(6) {
    draw.line((i * 2, -0.9), (i * 2, -0.3))
  }
  draw.rect((4, -0.9), (6, -0.3), fill: rgb("28716c"), stroke: none)
  draw.content((5, -1.4), [vulnerável: T])
})
