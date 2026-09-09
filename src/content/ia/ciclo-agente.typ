#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 11pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), node-fill: rgb("f3e9e9"), spacing: (40pt, 30pt),
  node((0, 0), [Duas salas], name: <amb>),
  node((1, 0), [(A, sujo)], name: <per>),
  node((1, 1), [Agente], name: <ag>, corner-radius: 8pt),
  node((0, 1), [Aspirar], name: <act>),
  edge(<amb>, <per>, "->", [sensores]),
  edge(<per>, <ag>, "->"),
  edge(<ag>, <act>, "->"),
  edge(<act>, <amb>, "->", [atuadores]),
)
