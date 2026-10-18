## Fecho das regulares

As linguagens regulares são fechadas para união, interseção, diferença, complemento, concatenação, estrela, reverso e intercalação. Toda a linguagem finita é regular.

- O **produto** combina dois DFA completos sobre o mesmo alfabeto. Cada estado é um par $(p,q)$, com $p$ do primeiro DFA e $q$ do segundo, e cada letra atualiza ambas as componentes. Os finais dependem da operação: ambas as componentes finais na interseção, pelo menos uma componente final na união, primeira final e segunda não final na diferença.
- O **complemento** troca finais com não finais num DFA completo.
- O **reverso** inverte as arestas; o antigo início passa a ser o único final e um início novo liga por ε aos antigos finais.
- A **intercalação** usa pares $(p,q)$ onde cada letra avança apenas uma componente. Cada ramo escolhe a palavra de origem da letra e os finais exigem ambas as componentes finais, o que conserva a ordem interna de cada palavra.
- O **quociente** $L/a$ torna final cada estado $q$ com $\delta(q,a)$ final. A **derivada** $a\backslash L$ desloca o início para $\delta(q_0,a)$.

## Decisão e equivalência

| Pergunta            | Procedimento                                                                                                          |
| ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| $L=\emptyset$?      | Verifica se nenhum estado final é alcançável a partir do início.                                                      |
| $L=\Sigma^*$?       | Complementa o DFA completo e testa se a linguagem resultante é vazia.                                                 |
| $L$ infinita?       | No DFA, procura um ciclo alcançável do início do qual se alcance um estado final. Um ciclo só de ε num NFA não chega. |
| $L_1\subseteq L_2$? | Testa se a diferença $L_1\setminus L_2$ é vazia.                                                                      |
| $L_1=L_2$?          | No produto, procura um par alcançável com exatamente uma componente final.                                            |

Se esse par não existir, as linguagens são iguais. Se existir, os rótulos do percurso desde o início formam uma palavra que distingue as linguagens, e a pesquisa em largura encontra uma das mais curtas.

## Minimização

Parte de um DFA completo e procede assim:

1. Remove os estados inacessíveis a partir do início.
2. Marca cada par com um estado final e outro não final, pois a palavra vazia $\varepsilon$ já os distingue.
3. Marca o par $(p,q)$ quando alguma letra $a$ leva a um par já marcado. Repete este passo até nenhuma ronda produzir marcas novas.
4. Junta os pares que continuam sem marca em classes de equivalência.

A palavra $w$ distingue os destinos por $a$ exatamente quando $aw$ distingue as origens, o que justifica a propagação para trás. O DFA mínimo completo é único a menos dos nomes dos estados.

## Lema da repetição

Se $L$ é regular, existe um inteiro $p\ge1$ tal que toda a palavra $s\in L$ com $|s|\ge p$ admite uma decomposição $s=xyz$ com $|y|\ge1$, $|xy|\le p$ e $xy^iz\in L$ para todo o inteiro $i\ge0$. Esta condição é necessária, mas não suficiente para provar regularidade.

Para refutar, supõe que $L$ é regular, recebe esse $p$, escolhe uma palavra $s$ em função de $p$, cobre **todas** as decomposições válidas e exibe um $i$ cuja palavra bombeada sai de $L$.

- Com $L=\{0^n1^n\mid n\ge0\}$ e $s=0^p1^p$, qualquer corte válido tem $y=0^k$ com $1\le k\le p$; retirar $y$ com $i=0$ quebra a igualdade entre os blocos.
- Mostrar que **um** corte falha não chega. Em $L=\{(00)^n\mid n\ge0\}$, fixa um inteiro $p\ge2$ e $s=0^{2p}$: o corte $y=0$ sai da linguagem com $i=0$, mas o corte válido $y=00$ bombeia dentro de $L$ para todo $i\ge0$. Só contrarias o lema quando todos os cortes válidos falham. Da mesma forma, exibir um corte que funciona numa palavra isolada não prova que a linguagem é regular.
- Em alternativa, usa o fecho: se $\{0^i1^j\mid i\ne j\}$ fosse regular, então $0^*1^*$ menos essa linguagem seria $0^n1^n$.

[Exemplo com rondas e palavras distinguidoras](/cadeiras/tc/limites-regulares/#rondas-da-tabela-e-palavras-distinguidoras).
