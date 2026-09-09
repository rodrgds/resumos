#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 9pt)
#canvas({
  draw.set-style(stroke: 1pt + rgb("8c2d3b"))
  for i in range(8) {
    let x = i * 1.5
    draw.rect((x, 0), (x + 1.4, 1.4))
    draw.content((x + 0.7, -0.5), [#str(5000 + i)])
  }
  draw.line((0, -1.3), (11.9, -1.3))
  draw.line((0, -1.3), (0, -1.1))
  draw.line((11.9, -1.3), (11.9, -1.1))
  draw.content((5.95, -1.8), [`LDUR X0, [X1, #0]` com `X1 = 5000` lê estes 8 bytes])
})
