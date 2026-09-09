#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 11pt)
#diagram(
  node-stroke: 1pt, spacing: 26pt,
  node((0, 1), [parte `Base`], name: <base1>),
  node((0, 0), [parte `Derivada`], name: <der>),
  node((1, 0.5), [`Base copia = d` \ (só cabe a parte `Base`)], name: <copia>),
  node((2, 0.5), [`Base& ref = d` \ (aponta ao objeto todo)], name: <ref>),
  edge(<der>, <base1>, "-"),
  edge(<base1>, <copia>, "->", label: [corta]),
  edge(<ref>, <der>, "->", label: [vê tudo]),
)
