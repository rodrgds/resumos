#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 9pt)
#canvas({
  import draw: *
  let P = ((0, 0), (1, 2), (3, 2), (4, 0))
  let Q = ((0.5, 1), (2, 2), (3.5, 1))
  let R = ((1.25, 1.5), (2.75, 1.5))
  let S = (2, 1.5)
  line(P.at(0), P.at(1), P.at(2), P.at(3), stroke: rgb("292a30"), stroke-dasharray: (4pt, 3pt))
  line(Q.at(0), Q.at(1), Q.at(2), stroke: rgb("28716c"))
  line(R.at(0), R.at(1), stroke: rgb("8c2d3b"), stroke-width: 1.2pt)
  for (i, p) in P.enumerate() {
    circle(p, radius: 0.09, fill: rgb("292a30"), stroke: none)
    content(p, anchor: "south", pad(2pt, text("P" + str(i))))
  }
  for (i, p) in Q.enumerate() {
    circle(p, radius: 0.07, fill: rgb("28716c"), stroke: none)
    content(p, anchor: "north", pad(2pt, text("Q" + str(i))))
  }
  for (i, p) in R.enumerate() {
    circle(p, radius: 0.07, fill: rgb("8c2d3b"), stroke: none)
  }
  content(R.at(0), anchor: "east", pad(2pt, text("R0")))
  content(R.at(1), anchor: "west", pad(2pt, text("R1")))
  circle(S, radius: 0.1, fill: rgb("8c2d3b"), stroke: white)
  content(S, anchor: "south", pad(2pt, text("S")))
})
