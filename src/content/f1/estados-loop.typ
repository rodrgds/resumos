#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  import draw: *
  arc((2.5, 1.4), radius: 1.4, start: 0deg, stop: 360deg)
  line((0, 0), (5, 0))
  content((3.9, 1.4), [lado: $R$], anchor: "west")
  content((1.9, 2.95), [partida: $h$], anchor: "east")
  content((3.3, 2.95), [topo: $2 R$], anchor: "west")
  line((2.36, 2.78), (2.36, 2.1), mark: (end: "stealth"))
  content((2.36, 2.84), [$P$], anchor: "east")
  line((2.64, 2.78), (2.64, 2.1), mark: (end: "stealth"))
  content((2.64, 2.84), [$N$], anchor: "west")
})
