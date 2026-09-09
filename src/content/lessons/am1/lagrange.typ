#import "@preview/cetz:0.5.2": canvas, draw
#import "@preview/cetz-plot:0.1.4": plot
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  plot.plot(size: (12, 7), x-min: 0, x-max: 3, y-min: 0, y-max: 7,
    x-label: [$x$], y-label: [$y$], legend: "inner-north-west", {
    plot.add(x => x * x, domain: (0, 2.6), label: [$y = x^2$], style: (stroke: rgb("28716c")))
    plot.add(x => 3 * x - 1.25, domain: (0.4, 2.6), label: [secante], style: (stroke: rgb("8c2d3b")))
    plot.add(x => 3 * x - 3, domain: (1.4, 2.6), label: [tangente paralela], style: (stroke: (dash: "dashed")))
  })
})
