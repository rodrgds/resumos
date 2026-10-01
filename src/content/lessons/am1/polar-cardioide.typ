#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  import draw: *
  line((-1, 0), (6.5, 0))
  line((0, -4), (0, 4))
  content((6.5, 0), anchor: "west", [$x$])
  content((0, 4), anchor: "south", [$y$])
  let points = range(0, 181).map(i => {
    let angle = 2 * calc.pi * i / 180
    let r = 1 + calc.cos(angle)
    (3 * r * calc.cos(angle), 3 * r * calc.sin(angle))
  })
  line(..points, close: true, fill: rgb("28716c").transparentize(80%), stroke: rgb("28716c") + 1pt)
  content((3, -4), [$r = 1 + cos theta$])
})
