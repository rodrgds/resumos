#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  // Linha 1: o guloso escolhe 4 e fica sem completar os 6.
  draw.content((0, 2.2), [guloso:], anchor: "west")
  draw.rect((1.6, 1.8), (5.2, 2.6), fill: rgb("f3e9e9"),
    stroke: 1pt + rgb("8c2d3b"))
  draw.content((3.4, 2.2), [4])
  draw.rect((5.4, 1.8), (7.6, 2.6), stroke: rgb("8c2d3b") + 1pt,
    stroke-dasharray: "dashed")
  draw.content((6.5, 2.2), [falta 2])
  // Linha 2: o ótimo usa duas moedas de 3.
  draw.content((0, 0.8), [ótimo:], anchor: "west")
  draw.rect((1.6, 0.4), (4.3, 1.2), fill: rgb("28716c"))
  draw.content((2.95, 0.8), text(fill: white)[3])
  draw.rect((4.5, 0.4), (7.2, 1.2), fill: rgb("28716c"))
  draw.content((5.85, 0.8), text(fill: white)[3])
})
