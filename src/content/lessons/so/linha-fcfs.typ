#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  import draw: *
  let y = 2
  // Gantt FCFS: P1 0-6, P2 6-9, P3 9-11, P4 11-15
  let blocos = ((0, 6, "P1"), (6, 9, "P2"), (9, 11, "P3"), (11, 15, "P4"))
  for (ini, fim, nome) in blocos {
    rect((ini, y - 1), (fim, y), stroke: rgb("8c2d3b"), fill: rgb("f3e9e9"))
    content((ini, fim), (y - 1, y), [#nome])
  }
  // eixo
  line((0, y - 1.6), (15, y - 1.6), stroke: .5pt)
  for t in range(0, 16) {
    line((t, y - 1.6), (t, y - 1.8), stroke: .5pt)
    content((t, t), (y - 2.5, y - 1.8), [#text(size: 9pt)[#str(t)]])
  }
})
