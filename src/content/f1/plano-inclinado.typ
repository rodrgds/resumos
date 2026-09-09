#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  import draw: *
  // Triângulo do plano: base, altura e rampa a 30 graus
  line((0, 0), (5.2, 0))
  line((0, 0), (0, 3), stroke: (dash: "dashed"))
  line((0, 3), (5.2, 0), stroke: 1.2pt)
  // Ângulo da rampa junto à base
  arc((5.2, 0), radius: 0.7, start: 150deg, stop: 180deg)
  content((4.23, 0.26), [$theta$])
  // Bloco sobre a rampa
  rect((1.85, 1.75), (2.55, 2.45), fill: white)
  let B = (2.2, 2.1)
  // Peso vertical para baixo
  line(B, (2.2, 0.9), mark: (end: "stealth"))
  content((2.2, 0.9), [$P$], anchor: "west")
  // Normal perpendicular à rampa
  line(B, (2.85, 3.22), mark: (end: "stealth"))
  content((2.95, 3.30), [$N$], anchor: "west")
  // Atrito paralelo à rampa, para cima
  line(B, (1.25, 2.65), mark: (end: "stealth"))
  content((1.25, 2.65), [$f$], anchor: "east")
  // Eixos: x ao longo do plano, y perpendicular
  line(B, (3.5, 1.35), mark: (end: "stealth"))
  content((3.5, 1.35), [$x$], anchor: "west")
  line(B, (2.65, 2.88), stroke: (dash: "dashed"), mark: (end: "stealth"))
  content((2.65, 2.88), [$y$], anchor: "west")
})
