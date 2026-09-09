#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 9pt)
#canvas({
  import draw: *
  for i in range(4) {
    for j in range(4) {
      let p = (i * 1.1, j * 1.1)
      circle(p, radius: 0.09, fill: rgb("8c2d3b"), stroke: none)
    }
  }
  rect((0, 0), (3.3, 3.3), stroke: 1pt + rgb("292a30"))
  line((0, 3.3), (3.3, 3.3), stroke: 2pt + rgb("28716c"))
  line((3.3, 0), (3.3, 3.3), stroke: 2pt + rgb("28716c"))
  content((1.65, -0.45), [retalho com continuidade $C^0$ na fronteira verde])
})
