#import "@preview/cetz:0.5.2": canvas
#import "@preview/cetz-plot:0.1.4": plot
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#canvas({
  plot.plot(size: (12, 5.5), x-min: 0, x-max: 10, y-min: 0, y-max: 6,
    x-label: [Estado], y-label: [Ataques], legend: "inner-north-east", {
    plot.add(((0, 5), (1, 4), (2, 2.5), (3, 1), (4, 2), (5, 3.5), (6, 3), (7, 1.5), (8, 0), (9, 1), (10, 2)),
      style: (stroke: rgb("8c2d3b")), label: [ataques])
    plot.add(((3, 1),), mark: "o", style: (stroke: rgb("28716c")), label: [ótimo local])
    plot.add(((8, 0),), mark: "s", style: (stroke: rgb("28716c")), label: [ótimo global])
  })
})
