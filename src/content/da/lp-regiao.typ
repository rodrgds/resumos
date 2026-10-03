#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#import "@preview/cetz:0.5.2": canvas, draw
#canvas({
  import draw: *
  line((0, 0), (4.5, 0), stroke: 0.7pt)
  line((0, 0), (0, 3.8), stroke: 0.7pt)
  line((0, 4), (4, 0), stroke: (dash: "dashed"))
  line((2, 0), (2, 3.8), stroke: (dash: "dashed"))
  line((0, 3), (4.3, 3), stroke: (dash: "dashed"))
  line((0,0), (2,0), (2,2), (1,3), (0,3), close: true, fill: rgb("e8dce1"), stroke: rgb("8c2d3b"))
  circle((2,2), radius: 0.07, fill: rgb("8c2d3b"))
  content((3.2,2.2), [(2, 2), z = 10])
  content((4.5,-0.2), [x])
  content((-0.2,3.8), [y])
  for i in range(4) { content((i,-0.25), [#i]); }
  for i in range(1,4) { content((-0.25,i), [#i]); }
})
