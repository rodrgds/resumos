#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 9pt)
#canvas({
  import draw: *
  let row(x, y, txt, hit) = {
    rect((x, y), (x + 3.2, y + 0.62), fill: if hit { rgb("8c2d3b").lighten(75%) } else { white }, stroke: .6pt + rgb("8c2d3b"))
    content((x + 1.6, y + 0.31), txt)
  }
  content((1.6, 5.6), [*Sem índice: varre tudo*])
  row(0, 4.6, [rock, 12-01], true)
  row(0, 3.85, [fado, 03-02], false)
  row(0, 3.1, [rock, 04-03], true)
  row(0, 2.35, [jazz, 05-03], false)
  row(0, 1.6, [rock, 06-03], true)
  line((3.6, 5.2), (3.6, 1.6), mark: (end: ">"), stroke: 1pt + rgb("8c2d3b"))
  content((4.5, 3.4), [lê as 5\nlinhas])
  content((7.6, 5.6), [*Com índice: salta direto*])
  rect((6, 4.5), (9.2, 5.15), fill: rgb("28716c").lighten(80%), stroke: .6pt + rgb("28716c"))
  content((7.6, 4.82), [índice em categoria])
  row(6, 3.5, [rock, 12-01], true)
  row(6, 2.75, [rock, 04-03], true)
  row(6, 2.0, [rock, 06-03], true)
  line((7.6, 4.5), (7.6, 4.12), mark: (end: ">"), stroke: 1pt + rgb("28716c"))
  content((9.7, 3.0), [lê só as 3\nlinhas rock])
})
