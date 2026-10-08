#import "@preview/cetz:0.5.2": canvas, draw
#import "@preview/cetz-plot:0.1.4": plot
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 12pt)
#canvas({
  plot.plot(size: (11, 7), x-min: 0, x-max: calc.pi, y-min: 0, y-max: 3,
    x-tick-step: calc.pi / 2, y-tick-step: 1,
    x-label: [$x$], y-label: [temperatura], legend: none, {
    plot.add(x => x * (calc.pi - x), domain: (0, calc.pi), style: (stroke: rgb("8c2d3b")))
    plot.add(x => 8 / calc.pi * calc.sin(x * 1rad), domain: (0, calc.pi), style: (stroke: (paint: rgb("28716c"), dash: "dashed")))
  })
})

#align(center)[Contínuo: $x(pi-x)$. Tracejado: $(8/pi) sin(x)$.]
#align(center)[No centro: $pi^2/4 approx 2.467$ e $8/pi approx 2.546$.]
