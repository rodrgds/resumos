#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 11pt)
// Dois tabuleiros 4x4, casa 0,8 cm. Linha 1 em cima.
#let casa = 0.8
#let tabuleiro(ox, rainhas, pontos) = {
  for c in range(4) {
    for r in range(4) {
      let par = calc.rem(c + r, 2) == 0
      draw.rect((ox + c * casa, (3 - r) * casa),
        (ox + (c + 1) * casa, (4 - r) * casa),
        fill: if par { rgb("f3e9e9") } else { white }, stroke: 0.5pt)
    }
  }
  for (c, r) in rainhas {
    draw.content((ox + (c - 1) * casa + casa / 2, (4 - r) * casa + casa / 2),
      text(weight: "bold")[Q])
  }
  for (c, r) in pontos {
    draw.circle((ox + (c - 1) * casa + casa / 2, (4 - r) * casa + casa / 2),
      radius: 0.06, fill: rgb("8c2d3b"), stroke: none)
  }
}
#canvas({
  // Esquerda: parcial [1, 3] com a coluna 3 toda atacada.
  tabuleiro(0, ((1, 1), (2, 3)), ((3, 1), (3, 2), (3, 3), (3, 4)))
  draw.content((1.6, -0.4), [beco na coluna 3])
  // Direita: solução [2, 4, 1, 3].
  tabuleiro(4.4, ((1, 2), (2, 4), (3, 1), (4, 3)), ())
  draw.content((6.0, -0.4), [solução [2, 4, 1, 3]])
})
