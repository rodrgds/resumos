#import "@preview/cetz:0.5.2": canvas, draw
#import "@preview/cetz-plot:0.1.4": plot
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  plot.plot(size: (12, 6), x-min: 0, x-max: 6, y-min: 0, y-max: 1.1,
    x-tick-step: 1, y-tick-step: 0.2, x-label: [tempo (em unidades de $tau$)], y-label: [tensão (em unidades de $V_s$)], legend: "inner-south-east", {
      plot.add(x => 1 - calc.exp(-x), domain: (0, 6), label: [$1 - e^(-t \/ tau)$], style: (stroke: rgb("8c2d3b")))
      plot.add(((1, 0), (1, 0.632)), style: (stroke: black))
      plot.add(((3, 0), (3, 0.95)), style: (stroke: black))
      plot.add(((5, 0), (5, 0.993)), style: (stroke: black))
      plot.add(((0, 0.632), (6, 0.632)), style: (stroke: black))
    })
})
