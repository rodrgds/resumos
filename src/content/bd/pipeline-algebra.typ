#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: .7pt,
  spacing: (26pt, 20pt),
  node((0, 0), [Encomenda], name: <t>),
  node((0, 1), [$sigma$ data = 2026-01-05], name: <s>),
  node((0, 2), [$bowtie$ C pelo idCliente], name: <j>),
  node((0, 3), [$pi$ nome], name: <p>),
  node((0, 4), [Ana], name: <r>),
  edge(<t>, <s>, "->"),
  edge(<s>, <j>, "->"),
  edge(<j>, <p>, "->"),
  edge(<p>, <r>, "->"),
)
