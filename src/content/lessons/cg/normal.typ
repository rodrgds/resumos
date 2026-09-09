#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 9pt)
#canvas({
  import draw: *
  let A = (0, 0)
  let B = (3, 0)
  let C = (0, 2.4)
  line(A, B, C, close: true, stroke: 1pt + rgb("292a30"), fill: rgb("f3e9e9"))
  for (p, nome) in ((A, [$A$]), (B, [$B$]), (C, [$C$])) {
    circle(p, radius: 0.09, fill: rgb("8c2d3b"), stroke: none)
    content(p, anchor: "north", pad(2pt, text(nome)))
  }
  let G = (1, 0.8)
  circle(G, radius: 0.16, fill: rgb("28716c"), stroke: white)
  circle(G, radius: 0.05, fill: white, stroke: none)
  content((1, 0.25), [normal $+z$])
})
