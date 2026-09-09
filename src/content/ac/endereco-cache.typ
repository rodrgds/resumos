#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 9pt)
#canvas({
  draw.rect((0, 0), (21, 2), fill: rgb("f3e9e9"), stroke: 1pt + rgb("8c2d3b"))
  draw.content((10.5, 1), [etiqueta · 21 bits · 31–11])
  draw.rect((21, 0), (26, 2), fill: rgb("e4efec"), stroke: 1pt + rgb("28716c"))
  draw.content((23.5, 1), [índice · 5 bits · 10–6])
  draw.rect((26, 0), (32, 2), fill: rgb("f3e9e9"), stroke: 1pt + rgb("8c2d3b"))
  draw.content((29, 1), [offset · 6 bits · 5–0])
})
