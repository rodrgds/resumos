#import "@preview/cetz:0.5.2": canvas, draw
#import "@preview/cetz-plot:0.1.4": plot
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  draw.set-style(axes: (stroke: .5pt), legend: (stroke: none))
  plot.plot(size: (12, 7), x-min: 0, x-max: 4, y-min: 0, y-max: 16,
    x-tick-step: 1, y-tick-step: 4, x-label: [$f$], y-label: [$P$], legend: "inner-north-west", {
      plot.add(f => f, domain: (0, 4), label: [$V$ fixa], style: (stroke: rgb("28716c")))
      plot.add(f => f * f * f / 4, domain: (0, 4), label: [$V$ sobe com $f$], style: (stroke: rgb("8c2d3b")))
    })
})
