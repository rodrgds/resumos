#import "@preview/cetz:0.5.2": canvas, draw

#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 12pt)
#let accent = rgb("8c2d3b")
#let secondary = rgb("28716c")

Diferença de energia: 8 W menos 10 W\
$Delta E = 5 - 0.002 t$ (kWh)

#canvas({
  import draw: *
  // Uma unidade horizontal representa 1000 h; a vertical representa 1 kWh.
  let point(t, e) = (t / 1000 * 2.6, e * 0.65)
  line((0, -0.8), (0, 3.65), stroke: 0.7pt)
  line((0, 0), (7.9, 0), stroke: 0.7pt)
  content((-0.15, 3.75), [kWh], anchor: "south-west")

  for e in (0, 3, 5) {
    let y = e * 0.65
    line((-0.1, y), (0.1, y), stroke: 0.7pt)
    content((-0.2, y), str(e), anchor: "east")
  }
  for (t, label) in ((0, "0"), (1000, "1000"), (2500, "2500"), (3000, "3000")) {
    let x = t / 1000 * 2.6
    line((x, -0.1), (x, 0.1), stroke: 0.7pt)
    content((x, -1.0), label, anchor: "north")
  }
  content((3.9, -1.65), [Horas de utilização], anchor: "north")

  line(point(1000, 0), point(1000, 3), stroke: (paint: secondary, thickness: 0.7pt, dash: "dashed"))
  line(point(2500, -0.75), point(2500, 0), stroke: (paint: secondary, thickness: 0.7pt, dash: "dashed"))
  line(point(0, 5), point(3000, -1), stroke: (paint: accent, thickness: 1.7pt))
  for (t, e) in ((0, 5), (1000, 3), (2500, 0)) {
    circle(point(t, e), radius: 0.09, fill: accent, stroke: none)
  }
  content((0.2, 3.4), [5 kWh], anchor: "south-west")
  content((2.8, 2.1), [3 kWh], anchor: "south-west")
})

2500 h: compensação energética\
Antes: a de 8 W exige mais energia.\
Depois: a de 8 W exige menos energia.
