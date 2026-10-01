#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#table(
  columns: (auto, auto, auto, auto),
  inset: 8pt,
  stroke: .6pt + rgb("8c2d3b"),
  table.header([Bloco], [Transferência DMA], [Processamento CPU], [Concluído]),
  [1], [0–4 ms], [4–7 ms], [7 ms],
  [2], [4–8 ms], [8–11 ms], [11 ms],
  [3], [8–12 ms], [12–15 ms], [15 ms],
)
#v(6pt)
Sobreposição: 15 ms. Sequencial: 3 × (4 + 3) = 21 ms.
