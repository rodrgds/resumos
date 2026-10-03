#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 11pt)
#canvas({
  draw.line((0, 0), (6, 0), stroke: .8pt)
  draw.content((0, -.45), [Início])
  draw.content((6, -.45), [Alvo])
  draw.circle((6, 0), radius: .5, stroke: 1pt)
  draw.content((6, .85), [W = 40 px])
  draw.content((3, .35), [D = 240 px])
  draw.line((0, -.9), (6, -.9), stroke: .6pt + rgb("8c2d3b"))
  draw.content((3, -1.35), text(fill: rgb("8c2d3b"), [Distância ao centro do alvo]))
})
