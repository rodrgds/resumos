#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  draw.set-style(stroke: 1pt + rgb("8c2d3b"))
  for i in range(4) {
    let y = -i * 1.7
    draw.rect((2.0, y), (6.0, y + 1.4))
  }
  draw.content((4.0, 0.7), [endereços altos])
  draw.content((4.0, -6.1), [endereços baixos])
  draw.line((7.2, -5.4), (6.0, -5.4), mark: (end: ">"))
  draw.content((8.6, -5.4), [SP])
  draw.line((7.2, -2.0), (7.2, -4.6), mark: (end: ">"))
  draw.content((7.2, -1.5), [push: subtrai])
  draw.line((8.6, -4.6), (8.6, -2.0), mark: (end: ">"))
  draw.content((8.6, -1.5), [pop: adiciona])
})
