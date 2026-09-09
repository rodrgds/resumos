#import "@preview/cetz:0.5.2": canvas, draw
#import "@preview/cetz-plot:0.1.4": plot
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  draw.set-style(axes: (stroke: .5pt), legend: (stroke: none))
  plot.plot(size: (12, 6), x-min: 1, x-max: 10, y-min: 0, y-max: 100,
    x-tick-step: 1, y-tick-step: 20, x-label: [$n$], y-label: [Passos], legend: "inner-north-west", {
      plot.add(x => 1, domain: (1, 10), label: [$O(1)$], style: (stroke: rgb("28716c")))
      plot.add(x => calc.log(x, base: 2), domain: (1, 10), label: [$O(log n)$], style: (stroke: rgb("4a7fb5")))
      plot.add(x => x, domain: (1, 10), label: [$O(n)$], style: (stroke: rgb("8c2d3b")))
      plot.add(x => x * calc.log(x, base: 2), domain: (1, 10), label: [$O(n log n)$], style: (stroke: rgb("b5791f")))
      plot.add(x => x * x, domain: (1, 10), label: [$O(n^2)$], style: (stroke: rgb("5b4a8a")))
    })
})
