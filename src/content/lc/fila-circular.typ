#set page(width: auto, height: auto, margin: 6pt)
#set text(size: 11pt)
#let accent = rgb("8c2d3b")
#let soft = rgb("f3e9e9")
#let slot(value) = block(
  width: 56pt, height: 30pt,
  fill: if value == [livre] { white } else { soft },
  stroke: 1pt + accent, radius: 3pt,
  align(center + horizon, value),
)
#let state(title, values, indices) = block[
  #text(weight: "bold", title)
  #v(7pt)
  #grid(
    columns: (56pt, 56pt, 56pt),
    column-gutter: 6pt, row-gutter: 4pt,
    align(center)[0], align(center)[1], align(center)[2],
    ..values.map(slot),
  )
  #v(5pt)
  #indices
]

#state([1. Inserir A e B], ([A], [B], [livre]), [in = 2 · out = 0 · count = 2])
#v(12pt)
#state([2. Retirar A e inserir C], ([livre], [B], [C]), [in = 0 · out = 1 · count = 2])
#text(fill: accent)[Depois da posição 2, volta a 0.]
#v(12pt)
#state([3. Inserir D: fila cheia], ([D], [B], [C]), [in = out = 1 · count = 3])
#v(8pt)
*Saídas a partir de out*
#linebreak()
Posições: 1 → 2 → 0
#linebreak()
Valores: B → C → D
