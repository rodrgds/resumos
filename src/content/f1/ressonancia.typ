#import "@preview/cetz:0.5.2": canvas, draw
#import "@preview/cetz-plot:0.1.4": plot
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  draw.set-style(axes: (stroke: .5pt), legend: (stroke: none))
  plot.plot(size: (12, 6), x-min: 0, x-max: 2, y-min: 0, y-max: 5.5,
    x-tick-step: 0.5, y-tick-step: 1, x-label: [$omega_f \/ omega_0$], y-label: [$A \/ A_"est"$], legend: "inner-north-east", {
      plot.add(r => 1 / calc.sqrt(calc.pow(1 - r * r, 2) + calc.pow(2 * 0.1 * r, 2)), domain: (0, 2), label: [$zeta = 0,1$], style: (stroke: rgb("8c2d3b")))
      plot.add(r => 1 / calc.sqrt(calc.pow(1 - r * r, 2) + calc.pow(2 * 0.3 * r, 2)), domain: (0, 2), label: [$zeta = 0,3$], style: (stroke: rgb("28716c")))
    })
})
