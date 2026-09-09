#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), spacing: (18pt, 30pt),
  node((0, 0), [`^`]),
  node((1.6, 0), [`9`]),
  node((3.2, 0), [`\d{8}`]),
  node((4.8, 0), [`$`]),
  edge((0, 0), (1.6, 0), "->"),
  edge((1.6, 0), (3.2, 0), "->"),
  edge((3.2, 0), (4.8, 0), "->"),
  node((0, 1), [âncora: começa aqui]),
  node((1.6, 1), [o dígito 9]),
  node((3.2, 1), [oito dígitos]),
  node((4.8, 1), [âncora: acaba aqui]),
)
