#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  let s = 4
  let barra(y, v, nome, cor) = {
    draw.rect((0, y), (v * s, y + 0.7), fill: cor, stroke: none)
    draw.content((v * s + 0.3, y + 0.35), anchor: "west", [#nome: #v ms])
  }
  barra(4.5, 0.4, [Transmissão 1], rgb("28716c"))
  barra(3.4, 25, [Propagação 1], rgb("8c2d3b"))
  barra(2.3, 6.1, [Router: fila e processamento], rgb("c97b2d"))
  barra(1.2, 7, [Transmissão 2 e propagação 2], rgb("28716c"))
  draw.content((0, 0.3), anchor: "west", [Total: 38,6 ms, a distância manda])
})
