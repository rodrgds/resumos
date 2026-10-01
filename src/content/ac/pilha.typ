#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#table(
  columns: (auto, auto, auto),
  inset: 8pt,
  stroke: .6pt + rgb("8c2d3b"),
  table.header([Endereço], [Conteúdo RV32], [Posição no frame]),
  [sp antigo], [Fora do frame], [sp novo + 16],
  [sp novo + 12], [ra guardado · 4 bytes], [12(sp)],
  [sp novo + 4 a 11], [Espaço livre · 8 bytes], [],
  [sp novo], [s0 guardado · 4 bytes], [0(sp)],
)
#v(6pt)
Reserva: `sp ← sp − 16`. Retorno: repor s0 e ra; `sp ← sp + 16`.
