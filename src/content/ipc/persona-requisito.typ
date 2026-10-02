#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 11pt, fill: rgb("292a30"))
#diagram(
  node-stroke: 1pt + rgb("8c2d3b"),
  node-fill: white,
  edge-stroke: 1pt + rgb("28716c"),
  spacing: 18pt,
  node((0, 0), [*Evidência fictícia*\
    Alternam entre o catálogo de salas\
    e o chat para confirmar o grupo.], corner-radius: 4pt),
  node((0, 1), [*Necessidade interpretada*\
    Encontrar uma sala para o grupo\
    num horário comum.], corner-radius: 4pt),
  node((0, 2), [*Requisito funcional proposto*\
    Filtrar salas por capacidade mínima\
    e disponibilidade.], corner-radius: 4pt),
  node((0, 3), [*Avaliação mensurável*\
    No teste com o protótipo, pelo menos\
    8 de 10 participantes representativos\
    encontram uma opção válida\
    em até 60 s, sem ajuda.], corner-radius: 4pt),
  edge((0, 0), (0, 1), "-|>"),
  edge((0, 1), (0, 2), "-|>"),
  edge((0, 2), (0, 3), "-|>"),
)
