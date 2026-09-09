#import "@preview/cetz:0.5.2": canvas, draw
#import "@preview/cetz-plot:0.1.4": plot
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  import draw: *
  plot.plot(size: (12, 7), x-min: 1, x-max: 64, y-min: 0, y-max: 5.5,
    x-tick-step: 10, y-tick-step: 1, x-label: [$p$], y-label: [$S_p$], legend: "inner-north-west", {
    plot.add(x => 1 / (0.2 + 0.8 / x), domain: (1, 64), label: [$f = 0,2$], style: (stroke: rgb("8c2d3b")))
    plot.add(x => 5, domain: (1, 64), label: [teto $1/f = 5$], style: (stroke: rgb("28716c")))
  })
})
