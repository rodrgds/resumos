#import "@preview/cetz:0.5.2": canvas
#import "@preview/cetz-plot:0.1.4": plot
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  plot.plot(size: (12, 8), x-min: -3, x-max: 3, y-min: -6, y-max: 6,
    x-label: [$x$], y-label: [$y$], legend: "inner-north-west", {
    plot.add(x => x + 1 / x, domain: (-3, -0.18), label: [$x + 1/x$], style: (stroke: rgb("28716c")))
    plot.add(x => x + 1 / x, domain: (0.18, 3), style: (stroke: rgb("28716c")))
    plot.add(x => x, domain: (-3, 3), label: [$y = x$], style: (stroke: (dash: "dashed")))
  })
})
