#import "@preview/cetz:0.5.2": canvas, draw
#import "@preview/cetz-plot:0.1.4": plot
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  plot.plot(size: (12, 6), x-min: 0, x-max: 5, y-min: 0, y-max: 1.1,
    x-tick-step: 1, y-tick-step: 0.5, x-label: [$t$ (em unidades de $tau$)], y-label: [$h(t)$ (normalizada)], legend: "inner-north-east", {
      plot.add(x => calc.exp(-x), domain: (0, 5), label: [$e^(-t \/ tau)$], style: (stroke: rgb("8c2d3b")))
      plot.add(((1, 0), (1, 0.368)), style: (stroke: black))
    })
})
