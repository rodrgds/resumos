#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#table(
  columns: (auto, auto, auto, auto, auto, auto, auto, auto),
  inset: 7pt,
  stroke: .5pt + rgb("8c2d3b"),
  fill: (x, y) => if y == 0 { rgb("f3e9e9") } else { none },
  table.header([Instrução], [1], [2], [3], [4], [5], [6], [7]),
  [`lw t0`], [IF], [ID], [EX], [MEM], [WB], [], [],
  [`add t1,t0,t2`], [], [IF], [ID], [ID], [EX], [MEM], [WB],
  [Bolha], [], [], [], [EX], [MEM], [WB], [],
)
#v(6pt)
ID é mantido no ciclo 4. O dado do load segue de MEM/WB para EX no ciclo 5.
