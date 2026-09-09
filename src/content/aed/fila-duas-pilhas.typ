#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 9pt)
#canvas({
  let caixa(x, y, v, w: 1.6, h: 1) = {
    draw.rect((x, y), (x + w, y + h))
    draw.content((x + w / 2, y + h / 2), [#v])
  }
  draw.content((1, 7.2), [*após push 1, push 2*])
  draw.content((0.2, 6.2), [entrada:])
  caixa(1.6, 5.7, [1]); caixa(1.6, 6.7, [2])
  draw.content((0.2, 4.7), [saída:])
  draw.content((6, 7.2), [*após o primeiro pop*])
  draw.content((5.2, 6.2), [entrada:])
  draw.content((5.2, 4.7), [saída:])
  caixa(6.6, 4.2, [2])
  draw.content((6.6, 3.4), [devolve 1])
  draw.content((11, 7.2), [*após push 3, pop, pop*])
  draw.content((10.2, 6.2), [entrada:])
  draw.content((10.2, 4.7), [saída:])
  draw.content((11.6, 4.2), [devolve 3])
  draw.content((11.6, 3.4), [saída: 1, 2, 3])
})
