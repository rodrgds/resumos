#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 9pt)
#let via = rgb("f3e9e9")
#table(
  columns: 9,
  stroke: 0.5pt + rgb("8c2d3b"),
  align: center,
  table.header([i\w], [0], [1], [2], [3], [4], [5], [6], [7]),
  [0], [0], [0], [0], [0], [0], [0], [0], [0],
  [A], [0], [0], table.cell(fill: via)[3], [3], [3], [3], [3], [3],
  [B], [0], [0], table.cell(fill: via)[3], [4], [4], [7], [7], [7],
  [C], [0], [0], table.cell(fill: via)[3], [4], [5], [7], [8], [9],
  [D], [0], [0], [3], [4], [5], [8], [8], table.cell(fill: via)[11],
)
