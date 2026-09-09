#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
// Quadrado de lado 1: MST com 3 lados, fecho com o atalho D -> A.
#canvas({
  draw.circle((0, 0), radius: 0.07, fill: rgb("8c2d3b"), stroke: none)
  draw.circle((2.4, 0), radius: 0.07, fill: rgb("8c2d3b"), stroke: none)
  draw.circle((2.4, 2.4), radius: 0.07, fill: rgb("8c2d3b"), stroke: none)
  draw.circle((0, 2.4), radius: 0.07, fill: rgb("8c2d3b"), stroke: none)
  draw.content((-0.25, -0.25), [A])
  draw.content((2.65, -0.25), [B])
  draw.content((2.65, 2.65), [C])
  draw.content((-0.25, 2.65), [D])
  draw.line((0, 0), (2.4, 0), stroke: 1.5pt + rgb("28716c"))
  draw.line((2.4, 0), (2.4, 2.4), stroke: 1.5pt + rgb("28716c"))
  draw.line((2.4, 2.4), (0, 2.4), stroke: 1.5pt + rgb("28716c"))
  draw.line((0, 2.4), (0, 0), stroke: 1pt + rgb("8c2d3b"),
    stroke-dasharray: "dashed")
  draw.content((-0.35, 1.2), [atalho], anchor: "east")
  draw.content((1.2, -0.4), [árvore de suporte mínima: 3 lados])
})
