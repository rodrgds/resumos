#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  import draw: *
  content((0, 4.5), [T1 = 12 s num núcleo], anchor: "west")
  rect((0, 3.9), (6.0, 4.3), fill: rgb("9aa0a6"), stroke: none)
  content((0, 3.0), [Tp ideal = 3 s em 4 núcleos], anchor: "west")
  rect((0, 2.4), (1.5, 2.8), fill: rgb("28716c"), stroke: none)
  content((0, 1.5), [Tp real = 4 s em 4 núcleos], anchor: "west")
  rect((0, 0.9), (1.5, 1.3), fill: rgb("28716c"), stroke: none)
  rect((1.5, 0.9), (2.0, 1.3), fill: rgb("8c2d3b"), stroke: none)
  content((2.2, 1.1), [fatia serial + coordenação], anchor: "west")
})
