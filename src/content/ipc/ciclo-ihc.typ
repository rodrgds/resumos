#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt, spacing: 30pt,
  node((0, 0), [Pessoa], corner-radius: 4pt),
  node((2, 0), [Sistema], corner-radius: 4pt),
  edge((0, 0), (2, 0), [age: toques, voz], bend: 18deg),
  edge((2, 0), (0, 0), [responde: ecrãs, sons], bend: 18deg),
  node((1, -1), text(size: 8pt)[_A UI é a superfície de contacto; a UX é a experiência total._], stroke: none),
)
