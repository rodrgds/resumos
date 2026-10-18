#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#canvas({
  import draw: *
  let cw = 1.35
  let ch = 1.0
  let ox = 0.9
  let oy = 0.6
  // grelha 4 colunas (BC) x 2 linhas (A)
  // fundo dos grupos
  rect((ox, oy), (ox + 2 * cw, oy + 2 * ch), fill: rgb("#8c2d3b22"), stroke: none)
  rect((ox, oy), (ox + cw, oy + ch), fill: rgb("#28716c33"), stroke: none)
  rect((ox + 3 * cw, oy), (ox + 4 * cw, oy + ch), fill: rgb("#28716c33"), stroke: none)
  // contornos dos grupos
  rect((ox, oy), (ox + 2 * cw, oy + 2 * ch), stroke: rgb("#8c2d3b"), fill: none)
  rect((ox, oy), (ox + cw, oy + ch), stroke: rgb("#28716c"), fill: none)
  rect((ox + 3 * cw, oy), (ox + 4 * cw, oy + ch), stroke: rgb("#28716c"), fill: none)
  // linhas da grelha
  for c in range(5) {
    line((ox + c * cw, oy), (ox + c * cw, oy + 2 * ch), stroke: rgb("#9aa0a6"))
  }
  for r in range(3) {
    line((ox, oy + r * ch), (ox + 4 * cw, oy + r * ch), stroke: rgb("#9aa0a6"))
  }
  // rótulos das colunas BC em ordem Gray
  content((ox + 0.5 * cw, oy + 2 * ch + 0.28), [00])
  content((ox + 1.5 * cw, oy + 2 * ch + 0.28), [01])
  content((ox + 2.5 * cw, oy + 2 * ch + 0.28), [11])
  content((ox + 3.5 * cw, oy + 2 * ch + 0.28), [10])
  content((ox + 2 * cw, oy + 2 * ch + 0.62), [BC])
  // rótulos das linhas A
  content((ox - 0.32, oy + 1.5 * ch), [0])
  content((ox - 0.32, oy + 0.5 * ch), [1])
  content((ox - 0.62, oy + ch), [A])
  // valores: A=0 -> 1 1 0 0; A=1 -> 1 1 0 1
  content((ox + 0.5 * cw, oy + 1.5 * ch), [1])
  content((ox + 1.5 * cw, oy + 1.5 * ch), [1])
  content((ox + 2.5 * cw, oy + 1.5 * ch), [0])
  content((ox + 3.5 * cw, oy + 1.5 * ch), [0])
  content((ox + 0.5 * cw, oy + 0.5 * ch), [1])
  content((ox + 1.5 * cw, oy + 0.5 * ch), [1])
  content((ox + 2.5 * cw, oy + 0.5 * ch), [0])
  content((ox + 3.5 * cw, oy + 0.5 * ch), [1])
})
