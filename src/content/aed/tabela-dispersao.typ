#import "@preview/cetz:0.5.2": canvas, draw
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  let casa(i, vs) = {
    let y = 6 - i * 1.5
    draw.content((-1.6, y + .4), [#i])
    if vs.len() == 0 {
      draw.rect((-.6, y), (1.4, y + .8))
    } else {
      for (j, v) in vs.enumerate() {
        draw.rect((-.6 + j * 2, y), (1.4 + j * 2, y + .8))
        draw.content((.4 + j * 2, y + .4), [#v])
      }
    }
  }
  draw.content((-1.6, 7.2), [*pos.*])
  casa(0, ()); casa(1, ()); casa(2, (9, 30)); casa(3, ()); casa(4, (25, 18)); casa(5, (12,)); casa(6, ())
})
