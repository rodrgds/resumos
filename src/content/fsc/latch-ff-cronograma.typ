#set page(width: auto, height: auto, margin: 8pt)
// Cronograma: latch transparente contra flip-flop D no flanco
// Cada coluna e um instante apos estabilizacao.
#table(columns: 6, [instante],[D],[enable/clk],[latch Q],[FF Q],[leitura],[t0],[1],[1/subida],[1],[1],[ambos capturam 1],[t1],[0],[1/alto],[0],[1],[latch segue; FF conserva],[t2],[1],[0/subida],[0],[1],[latch fechado conserva 0; FF mantem 1 amostrado])
