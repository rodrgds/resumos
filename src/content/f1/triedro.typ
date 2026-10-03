#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 12pt)
#canvas({
  import draw: *
  let C = (0, 0)
  let inclination = 40deg
  let P = (3 * calc.cos(inclination), 3 * calc.sin(inclination))
  // CeTZ usa o início do arco por defeito; o centro é a âncora origin.
  arc(C, anchor: "origin", radius: 3, start: 20deg, stop: 65deg, stroke: 1.2pt)
  line(C, P, stroke: (dash: "dashed"))
  content((1.02, 0.72), [$rho$], anchor: "north-east")
  circle(P, radius: 0.06, fill: black)
  content(P, [P], anchor: "south-west")
  circle(C, radius: 0.06, fill: black)
  content(C, [C], anchor: "north-east")
  let V = (P.at(0) - 1.6 * calc.sin(inclination), P.at(1) + 1.6 * calc.cos(inclination))
  line(P, V, mark: (end: "stealth"))
  content(V, [$v$], anchor: "south")
  let A = (1.6 * calc.cos(inclination), 1.6 * calc.sin(inclination))
  line(P, A, mark: (end: "stealth"))
  content(A, [$a_n$], anchor: "south-east")
})
