#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: .7pt,
  spacing: (30pt, 30pt),
  node((0, 0), [Cliente \ #underline[id], nome, email], name: <c>),
  node((2, 0), [Encomenda \ #underline[id], data], name: <e>),
  node((2, 2), [Produto \ #underline[id], nome, preco, stock], name: <p>),
  node((0, 2), [ItemEncomenda \ qtd], name: <i>),
  edge(<c>, <e>, [faz · $"1"$ : $"*"$]),
  edge(<e>, <p>, [contém · $"*"$ : $"1..*"$]),
  edge(<i>, <e>, [classe associativa], stroke: (dash: "dashed")),
  edge(<i>, <p>, stroke: (dash: "dashed")),
)
