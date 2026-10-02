#set page(width: 300pt, height: auto, margin: 8pt)
#set text(size: 12pt, fill: rgb("292a30"))
#set par(leading: 5pt)
#let accent = rgb("8c2d3b")
#let secondary = rgb("28716c")
#let entry(evento, data, estado) = grid(
  columns: (20pt, 130pt, 1fr),
  column-gutter: 4pt,
  align: left,
  [#evento],
  text(size: 11pt, data),
  text(size: 11pt, estado),
)

*Índice (evento_id, data_hora)*

Entradas ordenadas primeiro por evento,
depois por data e hora dentro de cada evento.

#v(4pt)
#entry([*id*], [*data_hora*], [*Filtro*])
#v(8pt)
#entry(2, [2026-12-14 21:30], [Outro evento])
#v(8pt)
#block(
  width: 100%,
  inset: 6pt,
  stroke: 1pt + secondary,
  radius: 4pt,
)[
  #text(fill: secondary)[*1. Igualdade: evento_id = 3*]
  #v(6pt)
  #entry(3, [2026-11-30 23:59], [Antes do início])
  #v(8pt)
  #block(
    width: 100%,
    inset: 5pt,
    stroke: 1.5pt + accent,
    fill: accent.lighten(92%),
    radius: 3pt,
  )[
    #text(fill: accent)[*2. Intervalo de dezembro*]
    #v(6pt)
    #entry(3, [2026-12-01 00:00], [Incluído])
    #v(8pt)
    #entry(3, [2026-12-14 21:30], [Incluído])
    #v(8pt)
    #entry(3, [2026-12-31 23:59], [Incluído])
  ]
  #v(8pt)
  #entry(3, [2027-01-01 00:00], [Fim excluído])
]
#v(8pt)
#entry(4, [2026-12-14 21:30], [Outro evento])
#v(10pt)
Início incluído: *2026-12-01 00:00*.
Fim excluído: *2027-01-01 00:00*.
