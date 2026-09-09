#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#canvas({
  import draw: *
  // para todo x existe y: cada x escolhe o seu y
  rect((0, 0.6), (2.4, 2.4))
  content((1.2, 2.7), [para todo x existe y])
  content((0.6, 1.6), [x1])
  content((1.8, 1.6), [x2])
  content((1.2, 0.1), [y])
  line((0.8, 1.35), (1.1, 0.35), mark: (end: ">"))
  line((1.6, 1.35), (1.3, 0.35), mark: (end: ">"))
  // existe y para todo x: o mesmo y serve todos
  rect((3.4, 0.6), (5.8, 2.4))
  content((4.6, 2.7), [existe y para todo x])
  content((4, 1.6), [x1])
  content((5.2, 1.6), [x2])
  content((4.6, 0.1), [y])
  line((4.2, 1.35), (4.55, 0.35), mark: (end: ">"))
  line((5, 1.35), (4.65, 0.35), mark: (end: ">"))
})
