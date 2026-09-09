#import "@preview/cetz:0.5.2": canvas, draw
#import "@preview/cetz-plot:0.1.4": plot
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  plot.plot(size: (10, 8), x-min: 0, x-max: 1.2, y-min: 0, y-max: 1.2,
    x-tick-step: 0.5, y-tick-step: 0.5, x-label: [$x$], y-label: [$y$], legend: none, {
    plot.add(x => x * x, domain: (0, 1), style: (stroke: rgb("8c2d3b")))
  })
})
