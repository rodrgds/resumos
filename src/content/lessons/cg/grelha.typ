#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 9pt)
#canvas({
  import draw: *
  for x in range(6) {
    for y in range(3) {
      rect((x, y), (x + 1, y + 1), stroke: 0.5pt + rgb("292a30"), fill: white)
    }
  }
  for (x, y) in ((0, 0), (1, 0), (2, 1), (3, 1), (4, 2), (5, 2)) {
    rect((x, y), (x + 1, y + 1), stroke: 0.5pt + rgb("292a30"), fill: rgb("8c2d3b"))
  }
  content((0.5, 0.5), text(fill: white, "E"))
  content((1.5, 0.5), text(fill: white, "E"))
  content((2.5, 1.5), text(fill: white, "NE"))
  content((3.5, 1.5), text(fill: white, "E"))
  content((4.5, 2.5), text(fill: white, "NE"))
  content((5.5, 2.5), text(fill: white, "E"))
})
