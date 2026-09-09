#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#canvas({
  import draw: *
  // Mapa de Karnaugh 2x4 da função maioria: colunas AB, linhas C
  line((1, 0), (5, 0))
  line((1, 1), (5, 1))
  line((1, 2), (5, 2))
  line((1, 0), (1, 2))
  line((2, 0), (2, 2))
  line((3, 0), (3, 2))
  line((4, 0), (4, 2))
  line((5, 0), (5, 2))
  content((1.5, 2.25), [00])
  content((2.5, 2.25), [01])
  content((3.5, 2.25), [11])
  content((4.5, 2.25), [10])
  content((0.6, 1.5), [0])
  content((0.6, 0.5), [1])
  // Uns da maioria: 110 na linha 0; 011, 111, 101 na linha 1
  content((3.5, 1.5), [1])
  content((2.5, 0.5), [1])
  content((3.5, 0.5), [1])
  content((4.5, 0.5), [1])
  content((1.5, 1.5), [0])
  content((2.5, 1.5), [0])
  content((4.5, 1.5), [0])
  content((1.5, 0.5), [0])
  // Grupos: B e C, A e C, A e B
  rect((2.05, 0.05), (3.95, 0.95))
  rect((3.05, 0.05), (4.95, 0.95))
  rect((3.05, 0.55), (3.95, 1.95))
})
