#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  import draw: *
  // Rampa a 30 graus e cilindro em contacto em Q, centro em C
  line((0, 0), (3.5, 0))
  line((0, 2), (3.5, 0), stroke: 1.2pt)
  let Q = (2.0, 0.85)
  let C = (2.28, 1.32)
  circle(C, radius: 0.55, fill: white)
  circle(Q, radius: 0.05, fill: black)
  content(Q, [Q], anchor: "north-east")
  // Braço do torque entre centro e contacto
  line(C, Q, stroke: (dash: "dashed"))
  content((2.02, 1.05), [$R$], anchor: "east")
  // Peso no centro
  line(C, (2.28, 0.35), mark: (end: "stealth"))
  content((2.28, 0.35), [$P$], anchor: "west")
  // Normal no contacto
  line(Q, (2.45, 1.63), mark: (end: "stealth"))
  content((2.55, 1.70), [$N$], anchor: "west")
  // Atrito estático rampa acima
  line(Q, (1.31, 1.25), mark: (end: "stealth"))
  content((1.31, 1.25), [$f$], anchor: "east")
})
