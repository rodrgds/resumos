#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  draw.line((0.5, 0.8), (9.5, 0.8), stroke: (paint: rgb("28716c"), thickness: 22pt))
  draw.line((1.5, 2.0), (8.5, 2.0), stroke: (paint: rgb("8c2d3b"), thickness: 22pt))
  draw.line((3, 3.2), (7, 3.2), stroke: (paint: rgb("514993"), thickness: 22pt))
  draw.content((5, 0.8), text(fill: white)[integração: módulos juntos])
  draw.content((5, 2.0), text(fill: white)[sistema: produto completo])
  draw.content((5, 3.2), text(fill: white)[aceitação: cliente confirma])
  draw.content((11.6, 0.8), [apanha erros nas fronteiras])
  draw.content((11.6, 2.0), [apanha o que só aparece com tudo ligado])
  draw.content((11.6, 3.2), [valida que resolve o problema certo])
})
