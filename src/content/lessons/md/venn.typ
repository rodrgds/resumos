#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#canvas({
  import draw: *
  circle((1.4, 1.4), radius: 1.3)
  circle((3, 1.4), radius: 1.3)
  content((0.5, 2.3), [A])
  content((3.9, 2.3), [B])
  content((0.6, 1.6), [1])
  content((0.6, 0.9), [2])
  content((2.2, 1.8), [3])
  content((2.2, 1), [4])
  content((3.6, 1.4), [5])
})
