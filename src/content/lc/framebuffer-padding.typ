#set page(width: auto, height: auto, margin: 6pt)
#set text(size: 9pt)
#let accent = rgb("8c2d3b")
#let soft = rgb("f3e9e9")
#let dark = rgb("292a30")
#let cell(fill, value, ink: dark) = block(
  width: 24pt, height: 20pt, fill: fill,
  stroke: 1pt + accent, radius: 2pt,
  align(center + horizon, text(fill: ink, value)),
)
Linha 0: bytes 0 a 11 visíveis, 12 a 13 de padding.
#grid(
  columns: (24pt, 24pt, 24pt, 24pt, 24pt, 24pt, 24pt, 24pt, 24pt, 24pt, 24pt, 24pt, 24pt, 24pt),
  column-gutter: 2pt, row-gutter: 2pt,
  cell(soft, [0]), cell(soft, [1]), cell(soft, [2]), cell(soft, [3]), cell(soft, [4]), cell(soft, [5]), cell(soft, [6]), cell(soft, [7]), cell(soft, [8]), cell(soft, [9]), cell(soft, [10]), cell(soft, [11]), cell(white, [pad]), cell(white, [pad]),
)
#v(6pt)
Linha 1: bytes 14 a 25 visíveis, 26 a 27 de padding; o píxel (3,1) ocupa os bytes 23, 24 e 25.
#grid(
  columns: (24pt, 24pt, 24pt, 24pt, 24pt, 24pt, 24pt, 24pt, 24pt, 24pt, 24pt, 24pt, 24pt, 24pt),
  column-gutter: 2pt, row-gutter: 2pt,
  cell(soft, [14]), cell(soft, [15]), cell(soft, [16]), cell(soft, [17]), cell(soft, [18]), cell(soft, [19]), cell(soft, [20]), cell(soft, [21]), cell(soft, [22]), cell(accent, [23], ink: white), cell(accent, [24], ink: white), cell(accent, [25], ink: white), cell(white, [pad]), cell(white, [pad]),
)
