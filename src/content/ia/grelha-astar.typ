#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  let h = (r, c) => (3 - r) + (3 - c)
  for r in range(4) {
    for c in range(4) {
      let blocked = ((r == 1) and (c == 1)) or ((r == 1) and (c == 2)) or ((r == 2) and (c == 1))
      if blocked {
        draw.rect((c, 3 - r), (c + 1, 4 - r), fill: rgb("8c2d3b"))
      } else {
        draw.rect((c, 3 - r), (c + 1, 4 - r))
        draw.content((c + 0.5, 3.5 - r), [#h(r, c)])
      }
    }
  }
  draw.rect((0, 3), (1, 4), stroke: 2pt + rgb("28716c"))
  draw.rect((3, 0), (4, 1), stroke: 2pt + rgb("28716c"))
})
