#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 12pt)
#import "@preview/cetz:0.5.2": canvas, draw

#canvas({
  import draw: *
  let accent = rgb("8c2d3b")
  let soft = rgb("f3e9e9")
  scale(1.8)
  line((0, 0), (2, 0), (4/3, 4/3), (0, 2), close: true,
    fill: soft, stroke: 0.8pt)
  // Hachurar apenas a parte da relaxação eliminada pelo corte.
  for i in range(1, 12) {
    let y = i / 6
    let left = 2 - y
    let right = calc.min((4 - y) / 2, 4 - 2 * y)
    line((left, y), (right, y), stroke: (paint: accent, thickness: 0.6pt))
  }
  line((0, 2), (2, 0), stroke: (paint: accent, thickness: 1.4pt, dash: "dashed"))
  for x in range(3) {
    for y in range(3 - x) {
      circle((x, y), radius: 0.045, fill: black, stroke: none)
    }
  }
  circle((4/3, 4/3), radius: 0.06, fill: white, stroke: (paint: accent, thickness: 1.2pt))
  line((1.4, 1.4), (1.7, 1.8), stroke: 0.6pt)
  content((1.65, 2.02), [$(4/3, 4/3)$])
  content((0.6, 0.55), [$x+y=2$])
  line((0, 0), (2.35, 0), stroke: 0.7pt)
  line((0, 0), (0, 2.35), stroke: 0.7pt)
  content((2.35, -0.2), [$x$])
  content((-0.2, 2.35), [$y$])
  for i in range(3) { content((i, -0.23), [#i]) }
  for i in range(1, 3) { content((-0.23, i), [#i]) }
})

#align(center)[Pontos preenchidos: soluções inteiras.\
Hachuras: região eliminada pelo corte.]
