#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 11pt)
#diagram(
  node-stroke: 1pt, spacing: 24pt,
  node((0, 0), [*Folha 1*\
    Escolher B101 ou B102], corner-radius: 4pt),
  node((0, 1), [*Folha 2*\
    Rever sala e horário], corner-radius: 4pt),
  node((0, 2), [*Folha 3*\
    Reserva confirmada], corner-radius: 4pt),
  edge((0, 0), (0, 1), [Rever], "-|>", label-side: left, label-sep: 6pt),
  edge((0, 1), (0, 2), [Confirmar], "-|>"),
  edge((0, 1), (0, 0), [Voltar], "-|>", bend: 55deg, label-side: left, label-sep: 6pt),
  node((0, 3), [O operador troca folhas\
    segundo regras definidas.], stroke: none),
)
