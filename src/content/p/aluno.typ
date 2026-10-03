#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 11pt)
#table(
  columns: (auto, auto),
  inset: 8pt,
  [*Código exterior à classe*], [*Acesso permitido?*],
  [`a.apresentar()`], [Sim, método público],
  [`a.nome` ou `a.numero`], [Não, membros privados],
)
#v(8pt)
Os métodos da classe podem aceder aos seus membros privados.
