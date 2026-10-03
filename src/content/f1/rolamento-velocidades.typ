#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 12pt)
#canvas({
  import draw: *
  line((0, 0), (5.4, 0))
  circle((2.7, 1.0), radius: 1.0, fill: white)
  circle((2.7, 1.0), radius: 0.05, fill: black)
  line((2.7, 1.0), (4.2, 1.0), mark: (end: "stealth"))
  content((4.2, 1.0), [$v_"CM"$], anchor: "west")
  line((2.7, 0.0), (1.5, 0.0), mark: (end: "stealth"))
  content((1.45, 0.4), [rot], anchor: "east")
  line((2.7, 2.0), (4.4, 2.0), mark: (end: "stealth"))
  content((4.4, 2.0), [$2 v_"CM"$], anchor: "west")
  content((2.7, -0.35), [contacto: 0], anchor: "north")
})
