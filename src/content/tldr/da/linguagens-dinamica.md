## CYK por intervalos

Gramática em Chomsky: $A\to BC$ ou $A\to a$, mais $S\to\varepsilon$ isolado se preciso. Sem unitárias nem ternárias sem conversão.

Para palavra $w$ de tamanho $n$, célula $(i,\ell)$ guarda não-terminais que geram $w[i..i+\ell-1]$.

1. Comprimento 1: $A$ com $A\to w[i]$.
2. Comprimento crescente: divide em $k$ e $k'$; se $B$ gera esquerda e $C$ gera direita com $A\to BC$, inclui $A$.
3. Aceita se inicial está em $(0,n)$.

Custo direto $O(n^3\lvert P\rvert)$ com todas as divisões e produções. Vários não-terminais na célula não provam ambiguidade; é preciso mais de uma árvore desde o inicial.

## Kleene por intermediários

$$R_{ij}^{(k)}=R_{ij}^{(k-1)}\mid R_{ik}^{(k-1)}(R_{kk}^{(k-1)})^*R_{kj}^{(k-1)}.$$

Inicializa com transições diretas e $\varepsilon$ na diagonal. Une até estados finais. Conta $O(n^3)$ combinações; tamanho do texto pode explodir com estrelas aninhadas.

[Reconhecimento e construção](/cadeiras/da/linguagens-dinamica/).
