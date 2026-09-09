#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  import draw: *
  circle((1.6, 0), radius: 1.5, stroke: 1.2pt + rgb("28716c"), fill: none)
  circle((3.4, 0), radius: 1.5, stroke: 1.2pt + rgb("8c2d3b"), fill: none)
  content((0.7, 0), [`A - B`])
  content((2.5, 0), [`A ∩ B`])
  content((4.3, 0), [`B - A`])
  content((1.1, -2), [`A`])
  content((3.9, -2), [`B`])
})
