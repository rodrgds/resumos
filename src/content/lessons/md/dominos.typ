#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#canvas({
  import draw: *
  // Fila de 5 dominós: a base derruba o primeiro, o passo propaga
  rect((0, 0), (0.5, 1.2))
  rect((1, 0), (1.5, 1.2))
  rect((2, 0), (2.5, 1.2))
  rect((3, 0), (3.5, 1.2))
  rect((4, 0), (4.5, 1.2))
  content((0.25, 1.45), [1])
  content((1.25, 1.45), [2])
  content((2.25, 1.45), [3])
  content((3.25, 1.45), [k])
  content((4.25, 1.45), [k+1])
  content((0.25, -0.3), [base])
  line((0.25, -0.15), (0.25, 0.05), mark: (end: ">"))
  content((2.75, -0.3), [passo])
  line((1.6, -0.15), (3.9, -0.15), mark: (start: ">", end: ">"))
})
