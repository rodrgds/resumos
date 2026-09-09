#import "@preview/cetz:0.5.2": canvas, draw
#import "@preview/cetz-plot:0.1.4": plot
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  plot.plot(size: (12, 6), x-min: 0, x-max: 3, y-min: 0, y-max: 1.1,
    x-tick-step: 1, y-tick-step: 0.2, x-label: [$f \/ f_c$], y-label: [$|H|$], legend: "inner-south-east", {
      plot.add(x => 1 / calc.sqrt(1 + x * x), domain: (0, 3), label: [passa-baixo], style: (stroke: rgb("8c2d3b")))
      plot.add(x => x / calc.sqrt(1 + x * x), domain: (0, 3), label: [passa-alto], style: (stroke: rgb("28716c")))
      plot.add(((1, 0), (1, 0.707)), style: (stroke: black))
    })
})
