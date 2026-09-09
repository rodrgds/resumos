#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 9pt)
#canvas({
  draw.content((0, 5.5), [sem sobreposição:]);
  draw.rect((2, 4), (6, 5), fill: rgb("f3e9e9"), stroke: 1pt + rgb("8c2d3b"));
  draw.content((4, 4.5), [DMA: bloco 1]);
  draw.rect((6, 4), (10, 5), fill: rgb("e4efec"), stroke: 1pt + rgb("28716c"));
  draw.content((8, 4.5), [CPU: bloco 1]);
  draw.content((0, 2.5), [com sobreposição:]);
  draw.rect((2, 1), (6, 2), fill: rgb("f3e9e9"), stroke: 1pt + rgb("8c2d3b"));
  draw.content((4, 1.5), [DMA: bloco 2]);
  draw.rect((4, 0), (8, 1), fill: rgb("e4efec"), stroke: 1pt + rgb("28716c"));
  draw.content((6, 0.5), [CPU: bloco 1]);
})
