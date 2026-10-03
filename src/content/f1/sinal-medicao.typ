#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  import draw: *
  line((0, 0), (5.4, 0), mark: (end: "stealth"))
  content((5.4, 0), [$t$], anchor: "west")
  line((0, 0.8), (5.2, 0.8), stroke: (dash: "dashed"))
  content((5.2, 0.8), [base], anchor: "west")
  line((0.4, 0.8), (1.0, 2.4), (1.6, 0.8), (2.6, 2.0), (3.6, 0.8), (4.4, 1.7), (5.0, 0.8))
  line((1.0, 0.8), (1.0, 2.4), mark: (end: "stealth"))
  line((2.6, 0.8), (2.6, 2.0), mark: (end: "stealth"))
  content((1.0, 2.5), [$A_0$], anchor: "south")
  content((2.6, 2.1), [$A_1$], anchor: "south")
})
