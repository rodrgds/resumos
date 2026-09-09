#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 9pt)
#canvas({
  import draw: *
  let dot(p, nome) = {
    circle(p, radius: 0.09, fill: rgb("8c2d3b"), stroke: none)
    content(p, anchor: "south-west", pad(2pt, text(nome)))
  }
  line((0, 0), (3.4, 0), mark: (end: ">"), stroke: 0.5pt)
  line((0, 0), (0, 4.6), mark: (end: ">"), stroke: 0.5pt)
  content((3.55, 0), [$x$])
  content((0, 4.75), [$y$])
  dot((1, 0), [$P$])
  dot((2, 0), [$S$])
  dot((0, 2), [$R$])
  line((1, 0), (2, 0), stroke: rgb("28716c"))
  line((2, 0), (0, 2), stroke: rgb("28716c"))
  dot((1, 2), [$T_(T R S)$])
  line((0, 2), (1, 2), stroke: rgb("28716c"), mark: (end: ">"))
  dot((0, 4), [$T_(S R T)$])
  line((0, 2), (0, 4), stroke: rgb("8c2d3b"), mark: (end: ">"))
})
