#import "@preview/fletcher:0.5.8": diagram, node, edge
#set page(width: auto, height: auto, margin: 10pt)
#set text(size: 10pt)
#diagram(
  node-stroke: 1pt, spacing: (28pt, 24pt), {
    node((0, 0), [fração de polinómios], corner-radius: 4pt)
    node((1, 0), [trigonométrica], corner-radius: 4pt)
    node((2, 0), [com raízes], corner-radius: 4pt)
    node((0, 1), [decomposição em frações simples], corner-radius: 4pt)
    node((1, 1), [potência ímpar: guardar fator;#linebreak()potência par: linearizar;#linebreak()quociente: subst. universal], corner-radius: 4pt)
    node((2, 1), [subst. pela raiz ou#linebreak()trigonométrica], corner-radius: 4pt)
    edge((0, 0), (0, 1), "->")
    edge((1, 0), (1, 1), "->")
    edge((2, 0), (2, 1), "->")
  }
)
