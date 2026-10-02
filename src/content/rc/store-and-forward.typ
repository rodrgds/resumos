#set page(width: auto, height: auto, margin: 4pt)
#set text(size: 12pt, fill: rgb("292a30"))
#set par(spacing: 8pt)

#let slot(body, active: false) = block(
  width: 64pt,
  height: 30pt,
  fill: if active { rgb("f3e9e9") } else { none },
  stroke: if active { 1pt + rgb("8c2d3b") } else { 0.5pt + rgb("292a30") },
  inset: 4pt,
)[#align(center + horizon, body)]

#align(center)[Tempo desde o início]
#grid(
  columns: (64pt, 64pt, 64pt, 64pt),
  align: center,
  [0 a 1 s], [1 a 2 s], [2 a 3 s], [3 a 4 s],
)

*Origem → router*
#grid(
  columns: (64pt, 64pt, 64pt, 64pt),
  slot([P1], active: true),
  slot([P2], active: true),
  slot([P3], active: true),
  slot([Livre]),
)

*Router → destino*
#grid(
  columns: (64pt, 64pt, 64pt, 64pt),
  slot([Livre]),
  slot([P1], active: true),
  slot([P2], active: true),
  slot([P3], active: true),
)
