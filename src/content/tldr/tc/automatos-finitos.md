## DFA e aceitação

Um DFA é $M=(Q,\Sigma,\delta,q_0,F)$ com $\delta:Q\times\Sigma\to Q$ **total**: um destino por cada par estado/símbolo. Num DFA, um desenho incompleto abrevia um poço para as transições omitidas.

- O DFA aceita quando, **depois de consumir toda a entrada**, o estado atual é final. Passar por um final antes do fim não basta.
- A palavra vazia $\varepsilon$ é aceite se e só se o início $q_0$ pertence a $F$.

## Estados com significado

Para palavras terminadas em $ab$, guarda o sufixo útil do prefixo:

| Estado         | Significado     | $a$   | $b$   |
| -------------- | --------------- | ----- | ----- |
| $q_0$, inicial | Sem sufixo útil | $q_1$ | $q_0$ |
| $q_1$          | Termina em $a$  | $q_1$ | $q_2$ |
| $q_2$, final   | Termina em $ab$ | $q_1$ | $q_0$ |

$baab$ segue $q_0,q_0,q_1,q_1,q_2$ e aceita. $aba$ passa por $q_2$ mas termina em $q_1$ e rejeita.

A regra de recuperação pergunta, perante o estado $p$ e a letra $a$, qual é o sufixo útil do prefixo maior. Prova por indução nos prefixos que cada estado conserva o seu significado; só então o critério final equivale à condição nas duas direções.

[Construção e editor do DFA](/cadeiras/tc/automatos-finitos/#construir-e-testar-o-dfa).

## Transição estendida

$$
\widehat\delta(q,\varepsilon)=q,\qquad
\widehat\delta(q,xa)=\delta(\widehat\delta(q,x),a).
$$

$w\in L(M)$ se e só se $\widehat\delta(q_0,w)\in F$. Podes dividir a leitura em qualquer posição: $\widehat\delta(q,xy)=\widehat\delta(\widehat\delta(q,x),y)$.

## Restos e produto

- Para um binário lido do bit **mais** significativo para o menos: ler o bit $b$ quando o valor acumulado é $v$ dá $2v+b$. Para múltiplos do divisor $d$, guarda o resto $r$ e atualiza por $(2r+b)\bmod d$; o resto zero é final.
- Decide $\varepsilon$ e zeros iniciais à parte: usa um início novo não final e um poço para o primeiro $0$ quando a representação tem de começar em $1$.
- No sentido inverso, do menos para o mais significativo, guarda o resto $r$ e o peso $t$ da posição seguinte, com $(r,t)\mapsto((r+bt)\bmod d,2t\bmod d)$ desde $(0,1)$, onde $d$ é o divisor.
- O produto usa estados-pares com ambas as componentes atualizadas por cada letra. Os finais dependem da operação: a interseção exige ambas as componentes finais e a união exige pelo menos uma componente final.

[Contagens e convenções completas](/cadeiras/tc/automatos-finitos/#contar-por-restos).
