#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  import draw: *
  // Energia cinética (escura) e potencial (clara) em quatro fases do ciclo
  let xs = (0, 1.8, 3.6, 5.4)
  let ks = (0, 2, 0, 2)
  let us = (2, 0, 2, 0)
  let nomes = ("x = A", "x = 0", "x = -A", "x = 0")
  for i in range(4) {
    let x = xs.at(i)
    rect((x, 0), (x + 0.5, ks.at(i)), fill: black)
    rect((x + 0.6, 0), (x + 1.1, us.at(i)), fill: rgb("f3e9e9"), stroke: black)
    content((x + 0.55, -0.05), [#nomes.at(i)], anchor: "north")
  }
  content((0.25, 2.25), [$K$], anchor: "south")
  content((6.15, 1.0), [$U$], anchor: "west")
})
