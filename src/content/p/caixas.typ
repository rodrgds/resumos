#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 11pt)
#diagram(
  node-stroke: 1pt, spacing: 28pt,
  node((0, 0), [`a` \ `3`], name: <caixa-a>),
  node((1, 0), [`p`], name: <caixa-p>),
  node((2, 0), [`b` \ `4`], name: <caixa-b>),
  edge(<caixa-p>, <caixa-a>, "->", label: [endereço de `a`]),
)
