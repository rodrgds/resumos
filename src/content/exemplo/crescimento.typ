#import "@preview/cetz:0.5.2": canvas, draw
#import "@preview/cetz-plot:0.1.4": plot
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  draw.set-style(axes: (stroke: .5pt), legend: (stroke: none))
  plot.plot(size: (12, 6), x-min: 0, x-max: 10, y-min: 0, y-max: 100,
    x-tick-step: 2, y-tick-step: 20, x-label: [$n$], y-label: [Operações], legend: "inner-north-west", {
      plot.add(x => x, domain: (0, 10), label: [$n$], style: (stroke: rgb("28716c")))
      plot.add(x => x * x, domain: (0, 10), label: [$n^2$], style: (stroke: rgb("8c2d3b")))
    })
})
