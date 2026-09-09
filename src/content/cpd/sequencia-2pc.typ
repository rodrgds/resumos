#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 10pt)
#diagram(
  spacing: (24pt, 12pt),
  node((0, 0), [Coordenador]),
  node((1, 0), [P1]),
  node((2, 0), [P2]),
  node((0, 1), [preparar?]),
  node((1, 1), [recebe]),
  node((2, 1), [recebe]),
  edge((0, 1), (1, 1), "->"),
  edge((0, 1), (2, 1), "->"),
  node((1, 2), [vota sim]),
  node((2, 2), [vota sim]),
  node((0, 2), [recolhe votos]),
  edge((1, 2), (0, 2), "->"),
  edge((2, 2), (0, 2), "->"),
  node((0, 3), [se falhar aqui, bloqueia]),
  edge((0, 2), (0, 3), "->"),
  node((0, 4), [confirmar]),
  node((1, 4), [confirma]),
  node((2, 4), [confirma]),
  edge((0, 3), (0, 4), "->"),
  edge((0, 4), (1, 4), "->"),
  edge((0, 4), (2, 4), "->"),
)
