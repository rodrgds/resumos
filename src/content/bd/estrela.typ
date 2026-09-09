#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: .7pt,
  spacing: (30pt, 30pt),
  node((1, 1), [Vendas \ qtd, valor], name: <f>),
  node((0, 0), [Tempo \ dia, mês, ano], name: <t>),
  node((2, 0), [Produto \ nome, categoria], name: <p>),
  node((1, 2), [Cliente \ nome, cidade], name: <c>),
  edge(<t>, <f>),
  edge(<p>, <f>),
  edge(<c>, <f>),
)
