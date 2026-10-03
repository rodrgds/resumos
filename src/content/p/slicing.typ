#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 11pt)
#table(
  columns: (auto, auto),
  inset: 8pt,
  [*Expressão*], [*Objeto usado por `total()`*],
  [`Promocao p(100, 0.25)`], [Original: base e desconto. Devolve `75`.],
  [`Produto copia = p`], [Novo objeto: apenas base. Devolve `100`.],
  [`const Produto& r = p`], [Original, sem cópia. Chamada virtual devolve `75`.],
)
#v(8pt)
A referência à base conserva o objeto derivado, mas só expõe a interface da base.
