#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 9pt)
#canvas({
  import draw: *
  rect((0, 0), (3, 3), stroke: 1pt + rgb("292a30"), fill: rgb("f3e9e9"))
  rect((3.4, 0.75), (3.4 + 1.5, 0.75 + 1.5), stroke: 1pt + rgb("292a30"), fill: rgb("f3e9e9"))
  rect((5.3, 1.125), (5.3 + 0.75, 1.125 + 0.75), stroke: 1pt + rgb("292a30"), fill: rgb("f3e9e9"))
  content((1.5, -0.4), [256])
  content((4.15, -0.4), [128])
  content((5.675, -0.4), [64])
  content((3.4, 2.6), [cada nível tem um quarto dos texeis, a pirâmide soma cerca de mais um terço])
})
