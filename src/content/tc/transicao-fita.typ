#set page(width: 194pt, height: auto, margin: 6pt)
#set text(size: 12pt)
#let accent = rgb("#8c2d3b")
#let soft = rgb("#f3e9e9")
#let cell(symbol, active: false) = box(
  width: 32pt, height: 28pt,
  stroke: if active { 1.5pt + accent } else { 0.7pt },
  fill: if active { soft } else { white },
  align(center + horizon, symbol),
)
#let tape(symbols, head, state) = {
  grid(columns: (32pt, 32pt, 32pt, 32pt),
    ..symbols.enumerate().map(((i, symbol)) => cell(symbol, active: i == head)),
    ..range(4).map(i => align(center, if i == head { [#text(fill: accent)[$arrow.t$ \ #state]] })),
  )
}
#align(center)[
  *Antes* \ $0 1 q_2 X 1$
  #v(5pt)
  #tape(($0$, $1$, $X$, $1$), 2, $q_2$)
  #v(10pt)
  $delta(q_2, X) = (p, Y, R)$ \
  #text(size: 10pt)[Escreve Y e avança à direita.]
  #v(10pt)
  *Depois* \ $0 1 Y p 1$
  #v(5pt)
  #tape(($0$, $1$, $Y$, $1$), 3, $p$)
]
