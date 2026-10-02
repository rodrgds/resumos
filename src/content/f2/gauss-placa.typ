#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 16pt)

#let field = rgb("8c2d3b")
#let charge = rgb("28716c")

#canvas(length: 28pt, {
  import draw: *
  // Corte da caixa: as tampas são perpendiculares ao eixo z.
  rect((1.5, 0.1), (10.5, 3.8), fill: charge.transparentize(90%), stroke: none)
  line((1.5, 0.1), (1.5, 3.8), stroke: charge + 1.2pt)
  line((10.5, 0.1), (10.5, 3.8), stroke: charge + 1.2pt)
  content((6, 5.2), [Placa infinita: $rho_V > 0$])
  content((6, 4.4), [Laterais: $arrow(E) dot arrow(n) = 0$])

  rect((3, 0.6), (9, 3.4), stroke: (paint: black, thickness: 1.2pt, dash: "dashed"))
  line((3, 0.6), (3, 3.4), stroke: black + 2pt)
  line((9, 0.6), (9, 3.4), stroke: black + 2pt)
  content((6, 2.6), [Caixa de Gauss])
  content((6, 1.8), [Tampas: área $A$])

  line((3, 2.6), (1.8, 2.6), stroke: field + 2pt, mark: (end: ">"))
  line((9, 2.6), (10.2, 2.6), stroke: field + 2pt, mark: (end: ">"))
  content((2.3, 3.1), text(fill: field)[$arrow(E)$])
  content((9.7, 3.1), text(fill: field)[$arrow(E)$])
  line((3, 1.3), (1.8, 1.3), stroke: black + 1pt, mark: (end: ">"))
  line((9, 1.3), (10.2, 1.3), stroke: black + 1pt, mark: (end: ">"))
  content((2.3, 1.8), [$arrow(n)$])
  content((9.7, 1.8), [$arrow(n)$])

  line((0.5, 0), (11.5, 0), stroke: black + 0.7pt, mark: (end: ">"))
  content((11.7, 0), [$z$])
  for (x, label) in ((1.5, $-L$), (3, $-z$), (6, $0$), (9, $z$), (10.5, $L$)) {
    line((x, -0.1), (x, 0.1), stroke: black + 0.7pt)
    content((x, -0.45), label)
  }
  line((3, -1.1), (9, -1.1), stroke: charge + 1pt)
  line((3, -0.9), (3, -1.3), stroke: charge + 1pt)
  line((9, -0.9), (9, -1.3), stroke: charge + 1pt)
  content((6, -1.65), [Espessura incluída: $2z$])
  content((3, -2.5), [Fluxo: $E A$])
  content((9, -2.5), [Fluxo: $E A$])
  content((6, -3.4), [$0 < z < L quad Q_("int") = rho_V A (2z)$])
})
