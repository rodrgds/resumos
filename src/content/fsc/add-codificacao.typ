#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 8pt)
#canvas({
  draw.set-style(stroke: 1pt + rgb("8c2d3b"))
  draw.content((-0.6, 0.7), [`ADD`])
  let campos = (
    ("10001011000", "OPCODE", 11),
    ("00010", "Rm", 5),
    ("000000", "SHAMT", 6),
    ("00001", "Rn", 5),
    ("00000", "Rd", 5),
  )
  let x = 0.0
  let total = 0.0
  for c in campos {
    total += c.at(2)
  }
  for c in campos {
    let w = c.at(2) / total * 24.0
    draw.rect((x, 0), (x + w, 1.4))
    draw.content((x + w / 2, 0.95), [#c.at(1)])
    draw.content((x + w / 2, 0.35), [`#c.at(0)`])
    x += w
  }
  draw.content((12.0, -0.6), [`ADD X0, X1, X2`: soma `X1` com `X2` em `X0`])
})
