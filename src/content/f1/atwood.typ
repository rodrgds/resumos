#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 12pt)
#canvas({
  import draw: *
  line((1, 3.4), (3, 3.4))
  circle((2, 3.4), radius: 0.4)
  rect((0.7, 1.6), (1.3, 2.4), fill: white)
  rect((2.7, 1.2), (3.3, 2.0), fill: white)
  line((1, 2.4), (1, 3.4))
  line((3, 2.0), (3, 3.4))
  content((1, 1.4), [$m_1$], anchor: "north")
  content((3, 1.0), [$m_2$], anchor: "north")
  line((0.45, 2.0), (0.45, 2.8), mark: (end: "stealth"))
  line((3.55, 1.6), (3.55, 0.8), mark: (end: "stealth"))
  content((0.45, 2.9), [$a$], anchor: "south")
  content((3.55, 0.7), [$a$], anchor: "north")
})
