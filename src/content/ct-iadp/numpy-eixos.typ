#set page(width: 270pt, height: auto, margin: 8pt)
#set text(size: 14pt, fill: black)
#set par(leading: 5pt)
#let reduced = rgb("#8c2d3b")
#let retained = rgb("#28716c")
#let cell(body) = align(center, body)

#text(weight: "bold")[Vendas: 2 lojas × 3 produtos]
#parbreak()
#text(size: 13pt)[Forma inicial: `(2, 3)`]
#v(10pt)

#text(weight: "bold", fill: reduced)[`sum(axis=0)`]
#parbreak()
#text(size: 13pt)[Somar as lojas de cada produto.]
#v(5pt)
#grid(
  columns: (64pt, 60pt, 60pt, 60pt),
  row-gutter: 7pt,
  [], cell([P0]), cell([P1]), cell([P2]),
  [Loja 0], cell([2]), cell([3]), cell([4]),
  [Loja 1], cell([5]), cell([1]), cell([2]),
  [], cell(text(fill: reduced)[$arrow.b$]),
  cell(text(fill: reduced)[$arrow.b$]),
  cell(text(fill: reduced)[$arrow.b$]),
  [Total], cell(text(fill: retained, weight: "bold")[7]),
  cell(text(fill: retained, weight: "bold")[4]),
  cell(text(fill: retained, weight: "bold")[6]),
)
#v(7pt)
#text(size: 13pt, fill: reduced)[Elimina eixo 0: lojas.]
#parbreak()
#text(size: 13pt, fill: retained)[Mantém 3 produtos: forma `(3,)`.]
#v(14pt)
#line(length: 100%, stroke: 0.6pt + black)
#v(14pt)

#text(weight: "bold", fill: reduced)[`sum(axis=1)`]
#parbreak()
#text(size: 13pt)[Somar os produtos de cada loja.]
#v(5pt)
#grid(
  columns: (64pt, 37pt, 37pt, 37pt, 20pt, 49pt),
  row-gutter: 7pt,
  [], cell([P0]), cell([P1]), cell([P2]), [], cell([Total]),
  [Loja 0], cell([2]), cell([3]), cell([4]),
  cell(text(fill: reduced)[$arrow.r$]),
  cell(text(fill: retained, weight: "bold")[9]),
  [Loja 1], cell([5]), cell([1]), cell([2]),
  cell(text(fill: reduced)[$arrow.r$]),
  cell(text(fill: retained, weight: "bold")[8]),
)
#v(7pt)
#text(size: 13pt, fill: reduced)[Elimina eixo 1: produtos.]
#parbreak()
#text(size: 13pt, fill: retained)[Mantém 2 lojas: forma `(2,)`.]
