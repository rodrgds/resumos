#import "@preview/cetz:0.5.2": canvas, draw
#import "@preview/cetz-plot:0.1.4": plot
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  draw.set-style(axes: (stroke: .5pt), legend: (stroke: none))
  plot.plot(size: (12, 6), x-min: 0, x-max: 10, y-min: 0, y-max: 40,
    x-tick-step: 1, y-tick-step: 5, x-label: [Dia], y-label: [Pontos restantes], legend: "inner-north-east", {
      plot.add(x => 40 - 4 * x, domain: (0, 10), label: [ideal], style: (stroke: rgb("28716c")))
      plot.add(x => 40 - 2.8 * x, domain: (0, 5), label: [real], style: (stroke: rgb("8c2d3b")))
    })
})
