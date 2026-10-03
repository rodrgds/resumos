#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 12pt)
#canvas({
  import draw: *
  let inclination = 30deg
  let height = 3.5 * calc.tan(inclination)
  let Q = (2, height - 2 * calc.tan(inclination))
  let R = 0.65
  let C = (Q.at(0) + R * calc.sin(inclination), Q.at(1) + R * calc.cos(inclination))
  line((0, 0), (3.5, 0))
  line((0, height), (3.5, 0), stroke: 1.2pt)
  circle(C, radius: R, fill: white)
  line(C, Q, stroke: (dash: "dashed"))
  content((C.at(0) - 0.18, C.at(1) - 0.13), [$R$], anchor: "east")
  circle(Q, radius: 0.05, fill: black)
  content(Q, [Q], anchor: "north-east")
  line(C, (C.at(0), 0.2), mark: (end: "stealth"))
  content((C.at(0), 0.2), [$P$], anchor: "west")
  line(Q, (Q.at(0) + 1.3 * calc.sin(inclination), Q.at(1) + 1.3 * calc.cos(inclination)), mark: (end: "stealth"))
  content((Q.at(0) + 1.3 * calc.sin(inclination), Q.at(1) + 1.3 * calc.cos(inclination)), [$N$], anchor: "south-west")
  line(Q, (Q.at(0) - calc.cos(inclination), Q.at(1) + calc.sin(inclination)), mark: (end: "stealth"))
  content((Q.at(0) - calc.cos(inclination), Q.at(1) + calc.sin(inclination)), [$f$], anchor: "south")
})
