#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 11pt)

#let accent = rgb("#8c2d3b")
#let soft = rgb("#f3e9e9")
#let secondary = rgb("#28716c")

#canvas({
  import draw: *
  let row(y, values, logical: none) = {
    for (i, value) in values.enumerate() {
      let tail = logical != none and i >= logical
      rect((i * 0.9, y), ((i + 1) * 0.9, y + 0.8),
        fill: if tail { white } else { soft },
        stroke: if tail { (paint: black, dash: "dashed") } else { accent })
      content(((i + 0.5) * 0.9, y + 0.4), value)
    }
  }

  content((0, 1.5), [*1. sort* · tamanho 7], anchor: "west")
  row(0, ([1], [2], [2], [3], [4], [5], [5]))
  line((6.3, 0), (6.3, -0.4), (5.6, -0.4))
  content((5.5, -0.4), [end()], anchor: "east")

  content((0, -1.8), [*2. unique* · tamanho 7], anchor: "west")
  row(-3.3, ([1], [2], [3], [4], [5], [?], [?]), logical: 5)
  line((4.5, -2.4), (4.5, -3.9), (2.9, -3.9), stroke: secondary)
  content((2.8, -3.9), [fim lógico], anchor: "east", fill: secondary)
  line((6.3, -3.3), (6.3, -4.7), (5.6, -4.7))
  content((5.5, -4.7), [end() antigo], anchor: "east")
  content((0, -5.5), [? = valor não especificado], anchor: "west")

  content((0, -6.8), [*3. erase* · tamanho 5], anchor: "west")
  row(-8.3, ([1], [2], [3], [4], [5]))
  line((4.5, -8.3), (4.5, -8.9), (3.8, -8.9))
  content((3.7, -8.9), [novo end()], anchor: "east")
})
