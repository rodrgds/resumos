#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 6pt)
#set text(size: 12pt)

#canvas({
  import draw: *
  let grupo-c = rgb("8c2d3b")
  let grupo-ab = rgb("287a70")

  content((3, 3.95), [Colunas $B C$ em código Gray])
  for (coluna, bits) in ("00", "01", "11", "10").enumerate() {
    content((1.5 * coluna + 0.75, 3.35), [#bits])
  }
  content((-0.65, 3.35), [$A$])
  for linha in range(2) {
    let y = 1.5 * (1 - linha)
    content((-0.65, y + 0.75), [#linha])
    for (coluna, bc) in (0, 1, 3, 2).enumerate() {
      let indice = 4 * linha + bc
      let valor = if (1, 3, 5, 6, 7).contains(indice) { 1 } else { 0 }
      let x = 1.5 * coluna
      content((x + 0.75, y + 0.65), text(size: 16pt, weight: "bold", [#valor]))
      content((x + 0.3, y + 1.15), text(size: 10pt, [$m_#indice$]))
    }
  }
  for x in (0, 1.5, 3, 4.5, 6) {
    line((x, 0), (x, 3), stroke: 0.6pt)
  }
  for y in (0, 1.5, 3) {
    line((0, y), (6, y), stroke: 0.6pt)
  }

  rect((1.6, 0.1), (4.4, 2.9), radius: 0.15, stroke: 1.8pt + grupo-c)
  rect((3.1, 0.2), (5.9, 1.3), radius: 0.15,
    stroke: (paint: grupo-ab, thickness: 1.8pt, dash: "dashed"))

  content((3, -0.5), [$m_7$ pertence aos dois grupos])
  line((0, -1.15), (0.7, -1.15), stroke: 1.8pt + grupo-c)
  content((0.9, -1.15), [$C$: 1, 3, 5, 7], anchor: "west")
  line((0, -1.8), (0.7, -1.8),
    stroke: (paint: grupo-ab, thickness: 1.8pt, dash: "dashed"))
  content((0.9, -1.8), [$A B$: 6, 7], anchor: "west")
})
