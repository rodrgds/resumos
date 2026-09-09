#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 9pt)
#canvas({
  draw.rect((0, 0), (6, 5.6), stroke: .7pt)
  draw.content((3, 5.1), [*Conta*])
  for (i, campo) in ("nome", "email", "palavra-passe", "telemóvel").enumerate() {
    let y = 4.3 - i * 0.85
    draw.rect((.4, y - .55), (5.6, y), stroke: .5pt)
    draw.content((.7, y - .27), anchor: "west", [#campo])
  }
  draw.rect((.4, .25), (5.6, .95), fill: rgb("8c2d3b"), stroke: none)
  draw.content((3, .6), text(fill: white, [*Criar conta*]))
})
