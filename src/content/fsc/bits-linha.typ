#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  draw.set-style(stroke: 1pt + rgb("8c2d3b"))
  let bits = ("1", "1", "0", "0", "1")
  let pots = ($2^4$, $2^3$, $2^2$, $2^1$, $2^0$)
  for i in range(5) {
    let x = i * 1.6
    draw.rect((x, 0), (x + 1.4, 1.4))
    draw.content((x + 0.7, 0.7), [#text(size: 14pt)[#bits.at(i)]])
    draw.content((x + 0.7, -0.5), [#pots.at(i)])
  }
  draw.content((0.7, 2.1), [*MSB*])
  draw.content((7.1, 2.1), [*LSB*])
  draw.line((0.7, 1.85), (0.7, 1.45), mark: (end: ">"))
  draw.line((7.1, 1.85), (7.1, 1.45), mark: (end: ">"))
})
