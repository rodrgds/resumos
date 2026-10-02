#set page(width: 304pt, height: auto, margin: 8pt)
#set text(size: 14pt)
#set par(leading: 5pt)

#let accent = rgb("8c2d3b")
#let secondary = rgb("28716c")

#let medida(inicio, largura) = grid(
  columns: (inicio * 1pt, largura * 1pt),
  [],
  align(center)[
    width: 240px
    #v(3pt)
    #block(width: 100%, height: 6pt, stroke: (top: 1pt + accent, left: 1pt + accent, right: 1pt + accent))[]
  ],
)

#let corte(conteudo) = grid(
  columns: (10pt, 2pt, 12pt, conteudo * 1pt, 12pt, 2pt, 10pt),
  gutter: 0pt,
  rect(width: 100%, height: 40pt, fill: white, stroke: (left: .7pt + black, top: .7pt + black, bottom: .7pt + black)),
  rect(width: 100%, height: 40pt, fill: accent, stroke: none),
  rect(width: 100%, height: 40pt, fill: secondary, stroke: none),
  block(width: 100%, height: 40pt, fill: white, inset: 0pt)[#align(center + horizon)[Conteúdo: #conteudo px]],
  rect(width: 100%, height: 40pt, fill: secondary, stroke: none),
  rect(width: 100%, height: 40pt, fill: accent, stroke: none),
  rect(width: 100%, height: 40pt, fill: white, stroke: (right: .7pt + black, top: .7pt + black, bottom: .7pt + black)),
)

*content-box*
#v(4pt)
#medida(24, 240)
#corte(240)
#v(4pt)
Até à borda: 268px\
Com margens: 288px

#v(14pt)
*border-box*
#v(4pt)
#medida(10, 240)
#corte(212)
#v(4pt)
Até à borda: 240px\
Com margens: 260px

#v(12pt)
#grid(
  columns: (12pt, 1fr), column-gutter: 6pt, row-gutter: 5pt,
  rect(width: 12pt, height: 12pt, fill: white, stroke: .7pt), [Margem: 10px por lado],
  rect(width: 12pt, height: 12pt, fill: accent, stroke: none), [Borda: 2px por lado],
  rect(width: 12pt, height: 12pt, fill: secondary, stroke: none), [Padding: 12px por lado],
)
#v(8pt)
Corte horizontal, à mesma escala.\
As margens ficam fora de width.
