#import "@preview/cetz:0.5.2": canvas, draw
#import "@preview/cetz-plot:0.1.4": plot
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  plot.plot(size: (11, 8), x-min: -3, x-max: 3, y-min: -3, y-max: 3,
    x-tick-step: 1, y-tick-step: 1, x-label: [$x$], y-label: [$y$], legend: none, {
    plot.add(x => 1 / x, domain: (0.34, 3), style: (stroke: rgb("8c2d3b")))
    plot.add(x => 1 / x, domain: (-3, -0.34), style: (stroke: rgb("8c2d3b")))
  })
})
