#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  draw.line((0, 0), (10, 0))
  for d in range(1, 11) {
    draw.line((d - 0.5, 0), (d - 0.5, -0.15))
    draw.content((d - 0.5, -0.5), [#d])
  }
  draw.line((0, 0.9), (2, 0.9), stroke: (paint: rgb("28716c"), thickness: 10pt))
  draw.line((2, 0.9), (7, 0.9), stroke: (paint: rgb("8c2d3b"), thickness: 10pt))
  draw.line((7, 0.9), (9, 0.9), stroke: (paint: rgb("514993"), thickness: 10pt))
  draw.circle((9.5, 0.9), radius: 0.18, fill: rgb("8c2d3b"), stroke: none)
  draw.content((1, 1.7), [especificação])
  draw.content((4.5, 1.7), [implementação])
  draw.content((8, 1.7), [validação])
  draw.content((9.5, 1.7), [revisão])
})
