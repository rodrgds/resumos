#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  import draw: *
  line((0, 0), (5.2, 0), mark: (end: "stealth"))
  content((5.2, 0), [$x$], anchor: "west")
  line((0, 0), (0, 3), mark: (end: "stealth"))
  content((0, 3), [$U$], anchor: "south")
  line((0, 2.6), (1.2, 0.6), (2.6, 0.6), (3.8, 2.4), (5, 1.2))
  line((0, 1.5), (5, 1.5), stroke: (dash: "dashed"))
  content((5, 1.5), [$E$], anchor: "west")
  content((1.9, 0.35), [permitido], anchor: "north")
  content((3.8, 2.7), [proibido], anchor: "south")
})
