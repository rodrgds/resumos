#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"), spacing: (24pt, 26pt),
  node((0, 0), [navegador]),
  node((4, 0), [servidor PHP]),
  edge((0, 0), (4, 0), "->", label: [`GET /pesquisa.php?q=queijo`]),
  node((0, 1.5), [navegador]),
  node((4, 1.5), [servidor PHP]),
  edge((4, 1.5), (0, 1.5), "->", label: [`200 OK · application/json`]),
)
