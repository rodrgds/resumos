#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt, spacing: 26pt,
  node((0, 0), [Persona: Mariana, organiza o grupo], corner-radius: 4pt),
  node((2, 0), [Cenário: propor, cruzar, confirmar], corner-radius: 4pt),
  node((4, 0), [Requisito: dois blocos com sala], corner-radius: 4pt),
  edge((0, 0), (2, 0), [conta], "-|>"),
  edge((2, 0), (4, 0), [mede], "-|>"),
)
