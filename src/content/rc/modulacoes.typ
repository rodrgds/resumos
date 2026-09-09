#import "@preview/cetz:0.5.2": canvas, draw
#import "@preview/cetz-plot:0.1.4": plot
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#let bit = x => if x < 2 { 1 } else if x < 4 { 0 } else if x < 6 { 1 } else { 1 }
#stack(dir: ttb, spacing: 12pt,
  [#canvas({
    draw.set-style(axes: (stroke: .5pt), legend: (stroke: none))
    plot.plot(size: (12, 2.6), x-min: 0, x-max: 8, y-min: -1.4, y-max: 1.4, y-tick-step: 1,
      x-tick-step: 2, y-ticks: (), x-label: [tempo], y-label: [ASK], {
      plot.add(x => bit(x) * calc.sin(3 * x), domain: (0, 8), style: (stroke: rgb("8c2d3b")))
    })
  })],
  [#canvas({
    draw.set-style(axes: (stroke: .5pt), legend: (stroke: none))
    plot.plot(size: (12, 2.6), x-min: 0, x-max: 8, y-min: -1.4, y-max: 1.4, y-tick-step: 1,
      x-tick-step: 2, y-ticks: (), x-label: [tempo], y-label: [FSK], {
      plot.add(x => calc.sin(x * (2 + 3 * bit(x))), domain: (0, 8), style: (stroke: rgb("28716c")))
    })
  })],
  [#canvas({
    draw.set-style(axes: (stroke: .5pt), legend: (stroke: none))
    plot.plot(size: (12, 2.6), x-min: 0, x-max: 8, y-min: -1.4, y-max: 1.4, y-tick-step: 1,
      x-tick-step: 2, y-ticks: (), x-label: [tempo], y-label: [PSK], {
      plot.add(x => calc.sin(3 * x + bit(x) * calc.pi), domain: (0, 8), style: (stroke: rgb("8c2d3b")))
    })
  })],
)
