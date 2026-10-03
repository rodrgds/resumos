#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: .7pt,
  spacing: (30pt, 30pt),
  node((1, 1), [FactoVenda \ #underline[idEncomenda, idProduto] \ idTempo, idCliente \ qtd, valorCentimos], name: <f>),
  node((0, 0), [Tempo \ #underline[idTempo] \ dia, mês, ano], name: <t>),
  node((2, 0), [Produto \ #underline[idProduto] \ nome, categoria], name: <p>),
  node((1, 2), [Cliente \ #underline[idCliente] \ nome], name: <c>),
  edge(<f>, <t>, "->", [FK]),
  edge(<f>, <p>, "->", [FK]),
  edge(<f>, <c>, "->", [FK]),
)
