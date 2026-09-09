#import "@preview/cetz:0.5.2": canvas, draw
#import "@preview/cetz-plot:0.1.4": plot
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  draw.set-style(axes: (stroke: .5pt), legend: (stroke: none))
  plot.plot(size: (12, 6), x-min: 1, x-max: 4, y-min: 0, y-max: 70,
    x-tick-step: 1, y-tick-step: 10, x-label: [Fase], y-label: [Custo relativo], legend: "inner-north-west", {
      plot.add(x => x * x * x, domain: (1, 4), label: [defeito], style: (stroke: rgb("8c2d3b")))
    })
})
