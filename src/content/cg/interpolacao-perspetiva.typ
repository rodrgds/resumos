#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  import draw: *
  let A = (0, 0)
  let B = (4, 0)
  let C = (0, 4)
  let P = (1, 1)
  line(P, B, C, close: true, fill: rgb("e7efed"), stroke: none)
  line(P, A, C, close: true, fill: rgb("eee5e6"), stroke: none)
  line(P, A, B, close: true, fill: rgb("eeeeee"), stroke: none)
  line(A, B, C, close: true, stroke: 1pt + rgb("292a30"))
  for p in (A, B, C) {
    line(P, p, stroke: 0.7pt + rgb("292a30"))
  }
  for p in (A, B, C) {
    circle(p, radius: 0.06, fill: rgb("292a30"), stroke: none)
  }
  content((0, -0.35), [A (0,0)])
  content((4, -0.35), [B (4,0)])
  content((0, 4.35), [C (0,4)])
  circle(P, radius: 0.08, fill: rgb("8c2d3b"), stroke: none)
  content((1.65, 1.05), [P (1,1)])
  content((1.7, 1.6), [$lambda_A=1/2$])
  content((0.32, 1.75), [1/4])
  content((1.65, 0.3), [1/4])
})
