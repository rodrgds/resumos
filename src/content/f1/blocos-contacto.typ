#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 12pt)
#canvas({
  import draw: *
  line((0, 0), (5.4, 0))
  rect((1.2, 0), (2.4, 1.0), fill: white)
  rect((2.4, 0), (3.8, 1.0), fill: white)
  content((1.8, 0.88), [$1$])
  content((3.1, 0.88), [$2$])
  line((0.2, 0.5), (1.2, 0.5), mark: (end: "stealth"))
  content((0.2, 0.5), [$F$], anchor: "east")
  line((2.4, 0.65), (3.1, 0.65), mark: (end: "stealth"))
  line((2.4, 0.35), (1.7, 0.35), mark: (end: "stealth"))
})
