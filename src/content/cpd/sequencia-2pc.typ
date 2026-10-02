#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#table(
  columns: (60pt, 60pt, 60pt),
  inset: 4pt,
  align: center,
  stroke: none,
  table.header([*Coordenador*], [*P1*], [*P2*]),
  table.hline(stroke: 0.5pt + rgb("9aa0a6")),
  [Envia\ preparar], [Recebe\ preparar], [Recebe\ preparar],
  table.hline(stroke: 0.5pt + rgb("9aa0a6")),
  [Recolhe\ votos], [Regista\ preparado;\ envia sim], [Regista\ preparado;\ envia sim],
  table.hline(stroke: 0.5pt + rgb("9aa0a6")),
  [Regista\ confirmar], [Espera\ decisão], [Espera\ decisão],
  table.hline(stroke: 0.5pt + rgb("9aa0a6")),
  [Envia\ confirmar], [Regista e\ aplica\ confirmar], [Regista e\ aplica\ confirmar],
  table.hline(stroke: 0.5pt + rgb("9aa0a6")),
  [Recebe\ confirmação\ de receção], [Confirma\ receção], [Confirma\ receção],
)
#v(6pt)
#block(width: 180pt)[
  Lê de cima para baixo. Um participante preparado sem acesso a uma decisão conhecida pode bloquear.
]
