#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#canvas({
  import draw: *
  circle((0, 0), radius: 1.6)
  content((0, 1.95), [12])
  content((1, 1.7), [1])
  content((1.7, 1), [2])
  content((1.95, 0), [3])
  content((1.7, -1), [4])
  content((1, -1.7), [5])
  content((0, -1.95), [6])
  content((-1, -1.7), [7])
  content((-1.7, -1), [8])
  content((-1.95, 0), [9])
  content((-1.7, 1), [10])
  content((-1, 1.7), [11])
  // 17 horas cai no 5; 8 + 6 avança até ao 2
  circle((1, -1.7), radius: 0.28)
  content((0, 0.35), [17 = 5])
  content((0, -0.35), [8 + 6 = 2])
})
