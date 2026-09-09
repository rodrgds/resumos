#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  draw.set-style(stroke: 1pt + rgb("8c2d3b"))
  let nomes = ("registos", "SRAM", "DRAM", "ROM")
  for i in range(4) {
    let y = -i * 1.8
    draw.rect((1.5, y), (8.5, y + 1.4))
    draw.content((5.0, y + 0.7), [#nomes.at(i)])
  }
  draw.line((0.5, 0.2), (0.5, -5.0), mark: (start: ">", end: ">"))
  draw.content((0.5, 0.7), [mais rápida])
  draw.content((0.5, -5.5), [mais densa])
})
