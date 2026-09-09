#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 11pt)
#diagram(
  node-stroke: 1pt, spacing: 26pt,
  node((0, 1), [privado: \ `nome`, `numero`], name: <priv>),
  node((0, 0), [público: \ `apresentar()`], name: <pub>),
  node((1, 0.5), [objeto `a`], name: <obj>),
  edge(<obj>, <pub>, "->", label: [pode chamar]),
  edge(<obj>, <priv>, "->", label: [não toca]),
)
