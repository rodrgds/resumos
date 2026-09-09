#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  import draw: *
  content((0, 2.6), [Percurso por linhas: cada linha de 64 bytes serve 8 acessos], anchor: "west")
  for i in range(8) {
    rect((i * 1.0, 1.4), (i * 1.0 + 0.9, 2.0), fill: rgb("28716c"), stroke: none)
    content((i * 1.0 + 0.45, 1.7), [#str(i)])
  }
  content((0, 0.6), [Percurso por colunas: cada linha serve 1 acesso], anchor: "west")
  rect((0, -0.6), (0.9, 0.0), fill: rgb("28716c"), stroke: none)
  content((0.45, -0.3), [0])
  for i in range(1, 8) {
    rect((i * 1.0, -0.6), (i * 1.0 + 0.9, 0.0), fill: rgb("e5e7eb"), stroke: none)
  }
  content((8.2, -0.3), [7 elementos desperdiçados], anchor: "west")
})
