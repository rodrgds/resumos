#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 12pt)
#canvas({
  import draw: *
  let inclination = 30deg
  let width = 5.2
  let height = width * calc.tan(inclination)
  let Q = (2.2, height - 2.2 * calc.tan(inclination))
  let point(along, normal) = (
    Q.at(0) + along * calc.cos(inclination) + normal * calc.sin(inclination),
    Q.at(1) - along * calc.sin(inclination) + normal * calc.cos(inclination),
  )
  line((0, 0), (width, 0))
  line((0, 0), (0, height), stroke: (dash: "dashed"))
  line((0, height), (width, 0), stroke: 1.2pt)
  arc((width, 0), anchor: "origin", radius: 0.7, start: 150deg, stop: 180deg)
  content((4.23, 0.26), [$theta$])
  line(point(-0.35, 0), point(0.35, 0), point(0.35, 0.7), point(-0.35, 0.7), close: true, fill: white)
  let B = point(0, 0.35)
  line(B, (B.at(0), B.at(1) - 1.2), mark: (end: "stealth"))
  content((B.at(0), B.at(1) - 1.2), [$P$], anchor: "west")
  line(B, point(0, 1.65), mark: (end: "stealth"))
  content(point(0, 1.75), [$N$], anchor: "west")
  line(B, point(-1.2, 0.35), mark: (end: "stealth"))
  content(point(-1.2, 0.35), [$f$], anchor: "east")
  // Eixos separados das forças para distinguir orientação de interação.
  let O = (0.55, 0.85)
  line(O, (1.5, 0.30), stroke: (dash: "dashed"), mark: (end: "stealth"))
  content((1.55, 0.30), [$x$], anchor: "west")
  line(O, (0.95, 1.54), stroke: (dash: "dashed"), mark: (end: "stealth"))
  content((0.95, 1.54), [$y$], anchor: "south")
})
