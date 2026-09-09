#import "@preview/cetz:0.5.2": canvas, draw
#import "@preview/cetz-plot:0.1.4": plot
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  plot.plot(size: (12, 7), x-min: -1.5, x-max: 1.5, y-min: -0.5, y-max: 4.5,
    x-label: [$x$], y-label: [$y$], legend: "inner-north-west", {
    plot.add(x => calc.exp(x), domain: (-1.5, 1.5), label: [$e^x$], style: (stroke: rgb("28716c")))
    plot.add(x => 1 + x, domain: (-1.5, 1.5), label: [$P_1$], style: (stroke: (dash: "dashed")))
    plot.add(x => 1 + x + x * x / 2, domain: (-1.5, 1.5), label: [$P_2$], style: (stroke: rgb("8c2d3b")))
    plot.add(x => 1 + x + x * x / 2 + x * x * x / 6, domain: (-1.5, 1.5), label: [$P_3$], style: (stroke: rgb("c97b2d")))
  })
})
