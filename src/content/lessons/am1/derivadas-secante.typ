#import "@preview/cetz:0.5.2": canvas, draw
#import "@preview/cetz-plot:0.1.4": plot
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  import draw: *
  plot.plot(size: (12, 7), x-min: 0, x-max: 2.6, y-min: 0, y-max: 6.5,
    x-label: [$x$], y-label: [$y$], legend: "inner-north-west", {
    plot.add(x => x * x, domain: (0, 2.5), label: [$y = x^2$], style: (stroke: rgb("28716c")))
    plot.add(x => 2 * x - 1, domain: (0.6, 2.4), label: [tangente], style: (stroke: (dash: "dashed")))
    plot.add(x => 3 * x - 2, domain: (0.8, 2.4), label: [secante $h = 1$], style: (stroke: rgb("8c2d3b")))
    plot.add(x => 2.5 * x - 1.5, domain: (0.8, 2), label: [secante $h = 0.5$], style: (stroke: rgb("c97b2d")))
  })
})
