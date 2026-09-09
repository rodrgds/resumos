#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 11pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: 24pt,
  node((0, 0), [1. Utilizador para App: `registarPedido(itens)`], corner-radius: 4pt),
  edge("-|>"),
  node((0, 1), [2. App para Pedido: `criar(itens)`], corner-radius: 4pt),
  edge("-|>"),
  node((0, 2), [3. Pedido para Pedido: `calcularTotal()`], corner-radius: 4pt),
  edge("-|>"),
  node((0, 3), [4. Pedido para App: `pedido`], corner-radius: 4pt),
  edge("-|>"),
  node((0, 4), [5. App para BaseDados: `guardar(pedido)`], corner-radius: 4pt),
  edge("-|>"),
  node((0, 5), [6. BaseDados para App: `ok`], corner-radius: 4pt),
  edge("-|>"),
  node((0, 6), [7. App para Utilizador: `confirmação`], corner-radius: 4pt),
  node((1, 3), [Alternativo: item sem preço, a App devolve erro sem guardar], corner-radius: 4pt),
  edge((0, 3), (1, 3), "-|>"),
)
