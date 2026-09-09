#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: .7pt,
  spacing: (24pt, 26pt),
  node((0, 0), [Cliente \ #underline[id], nome, email], name: <c>),
  node((0, 1), [Encomenda \ #underline[id], data, idCliente], name: <e>),
  node((0, 2), [Item \ #underline[idEncomenda], #underline[idProduto], qtd], name: <i>),
  node((0, 3), [Produto \ #underline[id], nome, preco, stock], name: <p>),
  edge(<e>, <c>, [FK], bend: 20deg),
  edge(<i>, <e>, [FK], bend: 20deg),
  edge(<i>, <p>, [FK], bend: -20deg),
)
