#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 12pt)
#canvas({
  import draw: *
  arc((2.8, 1.4), anchor: "origin", radius: 1.4, start: 0deg, stop: 360deg)
  line((0, 0), (4.8, 0))
  // A partida e o fundo partilham o mesmo zero de altura.
  line((0.2, 3.5), (1.4, 0))
  circle((0.2, 3.5), radius: 0.06, fill: black)
  content((0.25, 3.65), [partida], anchor: "south")
  line((0.05, 0), (0.05, 3.5), stroke: (dash: "dashed"))
  content((0.05, 1.6), [$h$], anchor: "east")
  content((4.2, 1.4), [$R$], anchor: "west")
  content((2.8, 3.05), [topo: $2 R$], anchor: "south")
  circle((2.8, 2.8), radius: 0.06, fill: black)
  line((2.66, 2.78), (2.66, 2.1), mark: (end: "stealth"))
  content((2.56, 2.5), [$P$], anchor: "east")
  line((2.94, 2.78), (2.94, 2.1), mark: (end: "stealth"))
  content((3.04, 2.5), [$N$], anchor: "west")
})
