#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 11pt)
#grid(
  columns: (auto, auto, auto),
  column-gutter: 12pt, row-gutter: 8pt,
  [*Expressão*], [*Tipo da divisão*], [*Resultado*],
  [`7 / 2`], [inteira: os dois operandos são `int`], [`3`],
  [`7 / 2.0`], [real: um operando é `double`], [`3.5`],
)
