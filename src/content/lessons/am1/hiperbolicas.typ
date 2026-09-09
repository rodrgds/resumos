#import "@preview/cetz:0.5.2": canvas, draw
#import "@preview/cetz-plot:0.1.4": plot
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  plot.plot(size: (12, 7), x-min: -2, x-max: 2, y-min: -4, y-max: 4,
    x-label: [$x$], y-label: [$y$], legend: "inner-north-west", {
    plot.add(x => (calc.exp(x) - calc.exp(-x)) / 2, domain: (-2, 2), label: [$sinh x$], style: (stroke: rgb("28716c")))
    plot.add(x => (calc.exp(x) + calc.exp(-x)) / 2, domain: (-2, 2), label: [$cosh x$], style: (stroke: rgb("8c2d3b")))
  })
})
