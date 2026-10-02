#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#block(width: 176pt)[Linha de 64 bytes, com 8 doubles contíguos. Por linhas, usamos os oito.]
#v(5pt)
#table(
  columns: (22pt,) * 8,
  inset: 3pt,
  align: center,
  stroke: white,
  fill: rgb("28716c"),
  [0], [1], [2], [3], [4], [5], [6], [7],
)
#v(10pt)
#block(width: 176pt)[Por colunas, usamos um antes de saltar. Os outros sete só ajudam se a linha ficar na cache até à reutilização.]
#v(5pt)
#table(
  columns: (22pt,) * 8,
  inset: 3pt,
  align: center,
  stroke: white,
  fill: (x, y) => if x == 0 { rgb("28716c") } else { rgb("e5e7eb") },
  [0], [1], [2], [3], [4], [5], [6], [7],
)
