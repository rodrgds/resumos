#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  import draw: *
  // Área sombreada sob F(x) = kx entre 0 e 0,10 m
  line((0, 0), (4.6, 0), mark: (end: "stealth"))
  content((4.6, 0), [$x$], anchor: "west")
  line((0, 0), (0, 2.8), mark: (end: "stealth"))
  content((0, 2.8), [$F$], anchor: "south")
  line((0, 0), (4, 2), stroke: 1.2pt)
  content((4.35, 2.2), [$F = k x$], anchor: "west")
  // Triângulo do trabalho com a base marcada
  line((0, 0), (4, 0), (4, 2), close: true, fill: rgb("f3e9e9"), stroke: none)
  line((4, 0), (4, 2), stroke: (dash: "dashed"))
  content((4, -0.02), [$0,10 "m"$], anchor: "north")
  content((2, 0.55), [$W$])
})
