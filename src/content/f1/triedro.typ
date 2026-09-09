#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  import draw: *
  let C = (0, 0)
  let P = (2.30, 1.93)
  // Arco da trajetória em torno do centro de curvatura C
  arc(C, radius: 3, start: 25deg, stop: 55deg)
  // Raio de curvatura a tracejado
  line(C, P, stroke: (dash: "dashed"))
  content((1.02, 0.72), [ρ], anchor: "north-east")
  // Ponto material e centro
  circle(P, radius: 0.06, fill: black)
  content(P, [P], anchor: "south-west")
  circle(C, radius: 0.06, fill: black)
  content(C, [C], anchor: "north-east")
  // Velocidade ao longo da tangente
  line(P, (1.27, 3.16), mark: (end: "stealth"))
  content((1.27, 3.16), [$v$], anchor: "south")
  // Aceleração centrípeta para o centro
  line(P, (1.23, 1.03), mark: (end: "stealth"))
  content((1.05, 1.30), [$a_n$], anchor: "east")
})
