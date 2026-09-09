#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#canvas({
  import draw: *
  // Grelha 2x2 do mundo de Tarski
  line((0, 0), (4, 0))
  line((0, 2), (4, 2))
  line((0, 4), (4, 4))
  line((0, 0), (0, 4))
  line((2, 0), (2, 4))
  line((4, 0), (4, 4))
  // a: cubo pequeno (quadrado) na casa de cima à esquerda
  rect((0.6, 2.6), (1.4, 3.4))
  content((1, 2.25), [a])
  // b: tetraedro grande (triângulo) na casa de baixo à direita
  line((2.5, 0.4), (3.5, 0.4))
  line((3.5, 0.4), (3, 1.6))
  line((3, 1.6), (2.5, 0.4))
  content((3, 0.15), [b])
})
