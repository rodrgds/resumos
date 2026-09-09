#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  draw.set-style(stroke: 1pt + rgb("8c2d3b"))
  let nomes = ("FA3", "FA2", "FA1", "FA0")
  for i in range(4) {
    let x = i * 2.6
    draw.rect((x, 0), (x + 2.2, 1.8))
    draw.content((x + 1.1, 0.9), [#text(weight: "bold")[#nomes.at(i)]])
  }
  draw.line((10.4, 0.9), (11.2, 0.9), mark: (end: ">"))
  draw.content((11.9, 0.9), [entra 0])
  draw.line((7.8, 0.9), (7.0, 0.9), mark: (end: ">"))
  draw.line((5.2, 0.9), (4.4, 0.9), mark: (end: ">"))
  draw.line((2.6, 0.9), (1.8, 0.9), mark: (end: ">"))
  draw.line((0, 0.9), (-0.8, 0.9), mark: (end: ">"))
  draw.content((-1.5, 0.9), [sai 1])
  draw.content((5.2, 2.4), [o transporte viaja da posição 0 (direita) para a 3 (esquerda)])
  for i in range(4) {
    let x = i * 2.6
    draw.line((x + 0.6, 1.8), (x + 0.6, 2.5))
    draw.line((x + 1.6, 1.8), (x + 1.6, 2.5))
    draw.content((x + 0.6, 2.75), [$A$])
    draw.content((x + 1.6, 2.75), [$B$])
    draw.line((x + 1.1, 0), (x + 1.1, -0.7))
    draw.content((x + 1.1, -1.0), [$S$])
  }
})
