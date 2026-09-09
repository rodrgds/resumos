#import "@preview/cetz:0.5.2": canvas, draw
#import "@preview/cetz-plot:0.1.4": plot
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  plot.plot(size: (12, 7), x-min: -3.2, x-max: 3.2, y-min: -3.5, y-max: 3.5,
    x-label: [$x$], y-label: [$y$], legend: "inner-south-west", {
    plot.add(x => x, domain: (-3.14, 3.14), label: [reta], style: (stroke: (dash: "dashed")))
    plot.add(x => 2 * calc.sin(x), domain: (-3.14, 3.14), label: [$S_1$], style: (stroke: rgb("28716c")))
    plot.add(x => 2 * calc.sin(x) - calc.sin(2 * x), domain: (-3.14, 3.14), label: [$S_2$], style: (stroke: rgb("8c2d3b")))
    plot.add(x => 2 * calc.sin(x) - calc.sin(2 * x) + 2 * calc.sin(3 * x) / 3, domain: (-3.14, 3.14), label: [$S_3$], style: (stroke: rgb("c97b2d")))
  })
})
