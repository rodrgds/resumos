## DFA e aceitação

Um **DFA** é $M=(Q,\Sigma,\delta,q_0,F)$: estados finitos $Q$, alfabeto $\Sigma$, transição $\delta$, início $q_0\in Q$ e finais $F\subseteq Q$.

- $\delta:Q\times\Sigma\to Q$ é **total**: exatamente um destino por estado e símbolo. Transições omitidas num desenho devem levar a um poço, que repete todos os símbolos.
- Aceita se, **depois de consumir toda a entrada**, o estado é final. Passar por um final antes do fim não basta.
- A palavra vazia é aceite se e só se $q_0\in F$.

## Estados com significado

Para reconhecer palavras terminadas em $ab$, guarda o sufixo útil do prefixo lido:

| Estado             | Significado                  | $a$   | $b$   |
| ------------------ | ---------------------------- | ----- | ----- |
| $q_0$, inicial     | Nenhum dos sufixos seguintes | $q_1$ | $q_0$ |
| $q_1$              | Termina em $a$               | $q_1$ | $q_2$ |
| $q_2$, único final | Termina em $ab$              | $q_1$ | $q_0$ |

$baab$ segue $q_0,q_0,q_1,q_1,q_2$ e aceita. $aba$ passa por $q_2$, mas termina em $q_1$ e rejeita.

Para provar a construção, mostra por **indução nos prefixos** que o estado conserva o significado indicado. Depois mostra que o critério final equivale à condição da linguagem, nas duas direções. Testar algumas palavras apenas ajuda a encontrar erros.

[Construção e editor do DFA](/cadeiras/tc/automatos-finitos/#construir-e-testar-o-dfa).

## Transição estendida

$$
\begin{aligned}
\widehat\delta(q,\varepsilon)&=q,\\
\widehat\delta(q,xa)&=\delta(\widehat\delta(q,x),a).
\end{aligned}
$$

Assim, $w\in L(M)$ se e só se $\widehat\delta(q_0,w)\in F$. Podes dividir a leitura em qualquer posição:

$$
\widehat\delta(q,xy)=\widehat\delta(\widehat\delta(q,x),y).
$$

## Restos e produto

- Para binário lido do bit **mais significativo** para o menos significativo, ler $b$ transforma $v$ em $2v+b$. Para múltiplos de $d$, guarda apenas o resto $i$ e atualiza para $(2i+b)\bmod d$. O resto zero é final.
- Decide separadamente se permites $\varepsilon$ e zeros iniciais. Para exigir início em $1$, usa um início novo não final e um poço para o primeiro $0$.
- Se leres no sentido inverso, guarda também o peso $t$ da próxima posição: $(r,t)$ passa a $((r+bt)\bmod d,2t\bmod d)$, começando em $(0,1)$.
- Para combinar condições, usa estados-pares e atualiza ambas as componentes. Na interseção, ambas têm de ser finais; na união, basta uma. Por exemplo, a paridade de zeros e uns exige quatro pares de paridades.

[Contagens e convenções completas](/cadeiras/tc/automatos-finitos/#contar-por-restos).
