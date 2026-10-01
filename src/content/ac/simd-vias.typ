#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)
#table(
  columns: (auto, auto, auto, auto, auto),
  inset: 8pt,
  stroke: .6pt + rgb("8c2d3b"),
  table.header(
    [Via],
    [B3 · bits 31–24],
    [B2 · bits 23–16],
    [B1 · bits 15–8],
    [B0 · bits 7–0],
  ),
  [a], [4], [3], [2], [250],
  [b], [40], [30], [20], [10],
  [ADD8(a,b)], [44], [33], [22], [4],
)
#v(6pt)
Cada soma é reduzida módulo 256. O carry de B0 não passa para B1.
