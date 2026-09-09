#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 8pt)
#diagram(
  node-stroke: .5pt, edge-stroke: .5pt, spacing: (8pt, 14pt),
  node((3, 0), [$[5,2,7,1,6,3,4]$]),
  node((1, 1), [$[5,2,7,1]$]), node((5, 1), [$[6,3,4]$]),
  node((0, 2), [$[5,2]$]), node((2, 2), [$[7,1]$]), node((5, 2), [$[3,4]$]),
  node((0, 3), [$[2,5]$]), node((2, 3), [$[1,7]$]), node((5, 3), [$[3,4]$]),
  node((1, 4), [$[1,2,5,7]$]), node((5, 4), [$[3,4,6]$]),
  node((3, 5), [$[1,2,3,4,5,6,7]$]),
  edge((3, 0), (1, 1)), edge((3, 0), (5, 1)),
  edge((1, 1), (0, 2)), edge((1, 1), (2, 2)), edge((5, 1), (5, 2)),
  edge((0, 2), (0, 3), label: [$1$]), edge((2, 2), (2, 3), label: [$1$]), edge((5, 2), (5, 3), label: [$1$]),
  edge((0, 3), (1, 4)), edge((2, 3), (1, 4), label: [$3$]), edge((5, 3), (5, 4), label: [$2$]),
  edge((1, 4), (3, 5)), edge((5, 4), (3, 5), label: [$6$]),
)
