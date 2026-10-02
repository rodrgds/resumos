#import "@preview/cetz:0.5.2": canvas, draw
#import "@preview/cetz-plot:0.1.4": plot
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 13pt)
#let response(r, damping) = 1 / calc.sqrt(calc.pow(1 - r * r, 2) + calc.pow(2 * damping * r, 2))
#let peak(damping) = calc.sqrt(1 - 2 * damping * damping)
#let accent = rgb("8c2d3b")
#let secondary = rgb("28716c")
#canvas({
  draw.set-style(axes: (stroke: .5pt), legend: (stroke: none))
  draw.set-style(circle: (fill: white, stroke: 1pt + accent), rect: (fill: white, stroke: 1pt + secondary))
  plot.plot(size: (7.5, 6), x-min: 0, x-max: 2, y-min: 0, y-max: 5.5,
    x-tick-step: 0.5, y-tick-step: 1, x-label: [$Omega \/ omega_0$], y-label: [$A \/ (F_0\/k)$], {
      plot.add(((1, 0), (1, 5.5)), style: (stroke: (paint: black, thickness: .6pt, dash: "dotted")))
      plot.add(r => 1, domain: (0, 2), style: (stroke: (paint: black, thickness: .6pt, dash: "dotted")))
      plot.add(r => response(r, 0.1), domain: (0, 2), samples: 401, style: (stroke: (paint: accent, thickness: 1.5pt)))
      plot.add(r => response(r, 0.3), domain: (0, 2), samples: 401, style: (stroke: (paint: secondary, thickness: 1.5pt, dash: "dashed")))
      plot.add(((peak(0.1), response(peak(0.1), 0.1)),), mark: "o", style: (stroke: accent))
      plot.add(((peak(0.3), response(peak(0.3), 0.3)),), mark: "square", style: (stroke: secondary))
    })
})
#align(center)[
  #text(fill: accent)[$gamma\/omega_0 = 0,1$: contínuo, círculo] \
  #text(fill: secondary)[$gamma\/omega_0 = 0,3$: tracejado, quadrado] \
  Pontilhado: $Omega\/omega_0 = 1$ e $A\/(F_0\/k) = 1$.
]
