#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  import draw: *
  // Posição x(t) = 2 + 3t - t^2, t em [0, 3] s, painel superior
  line((0.5, 0.6), (5.0, 0.6), mark: (end: "stealth"))
  content((5.0, 0.6), [$t$], anchor: "west")
  line((0.5, 0.6), (0.5, 3.0), mark: (end: "stealth"))
  content((0.5, 3.0), [$x$], anchor: "south")
  line((0.5, 1.56), (0.875, 1.89), (1.25, 2.16), (1.625, 2.37), (2.0, 2.52), (2.375, 2.61), (2.75, 2.64), (3.125, 2.61), (3.5, 2.52), (3.875, 2.37), (4.25, 2.16), (4.625, 1.89), (5.0, 1.56))
  content((2.75, 2.78), [x máximo], anchor: "south")
  line((2.75, 0.6), (2.75, 3.0), stroke: (dash: "dashed"))
  // Velocidade v_x(t) = 3 - 2t, painel inferior: começa no topo e desce
  line((0.5, -0.9), (5.0, -0.9), mark: (end: "stealth"))
  content((5.0, -0.9), [$t$], anchor: "west")
  line((0.5, -2.5), (0.5, -0.9), mark: (end: "stealth"))
  content((0.5, -0.78), [$v_x$], anchor: "south")
  line((0.5, -1.06), (5.0, -2.34))
  line((2.75, -0.9), (2.75, -2.5), stroke: (dash: "dashed"))
  content((2.75, -2.62), [t = 1,5 s], anchor: "north")
})
