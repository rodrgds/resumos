#import "@preview/cetz:0.5.2": canvas, draw
#import "@preview/cetz-plot:0.1.4": plot
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  draw.set-style(axes: (stroke: .5pt), legend: (stroke: none))
  plot.plot(
    size: (12, 7),
    x-min: 0,
    x-max: 2,
    y-min: 0,
    y-max: 8,
    x-tick-step: .5,
    y-tick-step: 2,
    x-label: [$f/f_0$],
    y-label: [$P/P_0$],
    legend: "inner-north-west",
    {
      plot.add(
        r => r,
        domain: (0, 2),
        label: [V fixa],
        style: (stroke: rgb("28716c")),
      )
      plot.add(
        r => r * r * r,
        domain: (0, 2),
        label: [V proporcional a f],
        style: (stroke: rgb("8c2d3b")),
      )
    },
  )
})
