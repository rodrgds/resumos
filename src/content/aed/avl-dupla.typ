#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  let no(x, y, v) = {
    draw.circle((x, y), radius: .5)
    draw.content((x, y), [#v])
  }
  draw.content((-5, 1), [*inserir 30, 10, 20*])
  no(-5, 0, [30]); no(-6.2, -1.6, [10]); no(-5, -3.2, [20])
  draw.line((-5.4, -.4), (-5.9, -1.2)); draw.line((-5.9, -2), (-5.2, -2.8))
  draw.content((0, 1), [*rodar 10 à esquerda*])
  no(0, 0, [30]); no(-1.2, -1.6, [20]); no(-2.4, -3.2, [10])
  draw.line((-.4, -.4), (-.9, -1.2)); draw.line((-1.5, -2), (-2.1, -2.8))
  draw.content((5, 1), [*rodar 30 à direita*])
  no(5, -.8, [20]); no(3.8, -2.4, [10]); no(6.2, -2.4, [30])
  draw.line((4.7, -1.2), (4, -2)); draw.line((5.3, -1.2), (6, -2))
})
