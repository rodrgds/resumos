#import "@preview/cetz:0.5.2": canvas, draw
#import "@preview/cetz-plot:0.1.4": plot
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  plot.plot(size: (10, 8), x-min: -2.5, x-max: 2.5, y-min: 0, y-max: 5,
    x-tick-step: 1, y-tick-step: 1, x-label: [$r$], y-label: [$z$], legend: none, {
    plot.add(x => x * x, domain: (-2, 2), style: (stroke: rgb("8c2d3b")))
    plot.add(x => 4, domain: (-2, 2), style: (stroke: (dash: "dashed")))
  })
})
