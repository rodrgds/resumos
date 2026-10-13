#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 13pt)
#canvas({
  draw.line((18pt, 0pt), (264pt, 0pt), stroke: .8pt + black)
  draw.line((18pt, 0pt), (18pt, 146pt), stroke: .8pt + black)
  for (x, label) in ((18pt, [-2]), (66pt, [-1]), (114pt, [0]), (162pt, [1]), (210pt, [2]), (258pt, [3])) {
    draw.line((x, -3pt), (x, 3pt), stroke: .6pt + black)
    draw.content((x, -13pt), label)
  }
  for (y, label) in ((26pt, [0,2]), (91pt, [0,7]), (130pt, [1])) {
    draw.content((7pt, y), label, anchor: "east")
  }
  draw.line((18pt, 0pt), (66pt, 0pt), stroke: 2pt + rgb("8c2d3b"))
  draw.line((66pt, 26pt), (114pt, 26pt), stroke: 2pt + rgb("8c2d3b"))
  draw.line((114pt, 91pt), (210pt, 91pt), stroke: 2pt + rgb("8c2d3b"))
  draw.line((210pt, 130pt), (258pt, 130pt), stroke: 2pt + rgb("8c2d3b"))
  for point in ((66pt, 0pt), (114pt, 26pt), (210pt, 91pt)) {
    draw.circle(point, radius: 3pt, fill: white, stroke: 1pt + rgb("8c2d3b"))
  }
  for point in ((66pt, 26pt), (114pt, 91pt), (210pt, 130pt)) {
    draw.circle(point, radius: 3pt, fill: rgb("8c2d3b"), stroke: 1pt + rgb("8c2d3b"))
  }
  draw.line((126pt, 26pt), (126pt, 91pt), stroke: .7pt + black, dash: "dashed")
  draw.content((132pt, 58pt), [salto 0,5], anchor: "west")
  draw.content((138pt, -32pt), [$x$])
  draw.content((30pt, 151pt), [$F_X(x)$])
})
