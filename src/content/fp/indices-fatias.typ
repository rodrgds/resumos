#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  import draw: *
  let n = 9
  for i in range(n) {
    rect((i * 1.2, 0), ((i + 1) * 1.2, 1), stroke: 1pt + rgb("28716c"))
  }
  let s = ("p", "r", "o", "g", "r", "a", "m", "a", "r")
  for i in range(n) {
    content((i * 1.2 + 0.6, 0.5), s.at(i))
    content((i * 1.2 + 0.6, -0.45), str(i))
  }
  line((0, 1.35), (4 * 1.2, 1.35), stroke: 1pt + rgb("8c2d3b"))
  line((0, 1.35), (0, 1.15), stroke: 1pt + rgb("8c2d3b"))
  line((4 * 1.2, 1.35), (4 * 1.2, 1.15), stroke: 1pt + rgb("8c2d3b"))
  content((2.4, 1.8), [`s[0:4]`])
})
