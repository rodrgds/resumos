#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({

  draw.line((30.0pt, 0.0pt), (482.0pt, 0.0pt), stroke: .8pt + black)
  draw.rect((136.0pt, 0.0pt), (424.0pt, 100.0pt), fill: rgb("f3e9e9"), stroke: 1pt + rgb("8c2d3b"))
  draw.rect((184.0pt, 0.0pt), (280.0pt, 100.0pt), fill: rgb("28716c"), stroke: none)
  draw.line((136.0pt, -4.0pt), (136.0pt, 4.0pt), stroke: .8pt + black)
  draw.content((136.0pt, -16.0pt), [2])
  draw.line((184.0pt, -4.0pt), (184.0pt, 4.0pt), stroke: .8pt + black)
  draw.content((184.0pt, -16.0pt), [3])
  draw.line((280.0pt, -4.0pt), (280.0pt, 4.0pt), stroke: .8pt + black)
  draw.content((280.0pt, -16.0pt), [5])
  draw.line((424.0pt, -4.0pt), (424.0pt, 4.0pt), stroke: .8pt + black)
  draw.content((424.0pt, -16.0pt), [8])
  draw.content((458.0pt, 50.0pt), [f(x) = 1/6])
  draw.content((232.0pt, 50.0pt), [P = 1/3])
})
