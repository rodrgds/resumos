#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  draw.rect((30pt, 0pt), (110pt, 50pt), fill: rgb("8c2d3b"), stroke: .5pt + white)
  draw.rect((110pt, 0pt), (190pt, 100pt), fill: rgb("8c2d3b"), stroke: .5pt + white)
  draw.rect((190pt, 0pt), (350pt, 50pt), fill: rgb("8c2d3b"), stroke: .5pt + white)
  draw.line((30pt, 0pt), (355pt, 0pt), stroke: .7pt + black)
  draw.line((30pt, 0pt), (30pt, 115pt), stroke: .7pt + black)
  for (x, label) in ((30pt, [0]), (110pt, [2]), (190pt, [4]), (350pt, [8])) {
    draw.content((x, -12pt), label)
  }
  draw.content((14pt, 50pt), [0,1])
  draw.content((14pt, 100pt), [0,2])
  draw.content((190pt, -30pt), [Duração])
  draw.content((190pt, 127pt), [Densidade de frequência relativa])
  draw.content((70pt, 63pt), [área 0,2])
  draw.content((150pt, 110pt), [área 0,4])
  draw.content((270pt, 63pt), [área 0,4])
})
