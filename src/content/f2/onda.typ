#import "@preview/cetz:0.5.2": canvas, draw
#import "@preview/cetz-plot:0.1.4": plot
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  plot.plot(size: (12, 6), x-min: 0, x-max: 12.6, y-min: -1.5, y-max: 1.5,
    x-tick-step: 6.28, y-tick-step: 1, x-label: [$x$], y-label: [$E, B$], legend: "inner-north-east", {
      plot.add(x => calc.cos(x), domain: (0, 12.6), label: [$E_y$], style: (stroke: rgb("8c2d3b")))
      plot.add(x => 0.6 * calc.cos(x), domain: (0, 12.6), label: [$B_z$ (à escala)], style: (stroke: rgb("28716c")))
    })
})
