#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: .7pt,
  spacing: (26pt, 20pt),
  node((0, 0), [Encomenda], name: <t>),
  node((1, 0), [$sigma$ data], name: <s>),
  node((2, 0), [$bowtie$ Cliente], name: <j>),
  node((3, 0), [$pi$ nome], name: <p>),
  node((4, 0), [Ana], name: <r>),
  edge(<t>, <s>),
  edge(<s>, <j>),
  edge(<j>, <p>),
  edge(<p>, <r>),
)
