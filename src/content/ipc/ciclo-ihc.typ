#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 11pt)
#diagram(
  node-stroke: 1pt, spacing: 30pt,
  node((0, 0), [Pessoa], corner-radius: 4pt),
  node((0, 1), [Sistema], corner-radius: 4pt),
  edge((0, 0), (0, 1), [Age:\
    toque, voz], "-|>", bend: 45deg, label-side: left),
  edge((0, 1), (0, 0), [Responde:\
    ecrã, som], "-|>", bend: 45deg, label-side: left),
  node((0, 2), [A UI permite a troca.\
    A UX inclui o contexto\
    e a experiência antes,\
    durante e depois do uso.], stroke: none),
)
