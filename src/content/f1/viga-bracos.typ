#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 12pt)
#canvas({
  import draw: *
  line((0.4, 1.6), (5.2, 1.6), stroke: 1.2pt)
  line((0.4, 0.4), (0.4, 1.6))
  line((5.2, 0.4), (5.2, 1.6))
  content((0.4, 0.25), [$A$], anchor: "north")
  content((5.2, 0.25), [$B$], anchor: "north")
  line((2.8, 1.6), (2.8, 0.9), mark: (end: "stealth"))
  content((2.8, 0.8), [peso], anchor: "north")
  line((4.3, 1.6), (4.3, 0.9), mark: (end: "stealth"))
  content((4.3, 0.8), [carga], anchor: "north")
  line((0.4, 2.0), (2.8, 2.0), mark: (start: "stealth", end: "stealth"))
  content((1.6, 2.1), [$2 "m"$], anchor: "south")
  line((0.4, 2.4), (4.3, 2.4), mark: (start: "stealth", end: "stealth"))
  content((2.3, 2.5), [$3 "m"$], anchor: "south")
})
