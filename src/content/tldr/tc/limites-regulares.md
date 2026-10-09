## Fecho das regulares

As regulares são fechadas para união, interseção, diferença, complemento, concatenação, estrela, reverso e intercalação. Toda a linguagem finita é regular.

- **Produto de DFA completos**, sobre o mesmo alfabeto: guarda $(p,q)$ e atualiza ambas as componentes por cada letra. Para interseção, ambas devem ser finais; para união, basta uma; para diferença $A\setminus B$, a primeira deve ser final e a segunda não.
- **Complemento:** troca finais e não finais num DFA completo.
- **Reverso:** inverte as arestas, torna o antigo início final e cria um início com ε para todos os antigos finais.
- **Intercalação:** um NFA-pares escolhe qual componente avança em cada letra; a outra fica parada. Conserva a ordem interna de cada palavra e exige ambas finais.
- **Quociente à direita** $L/a=\{w\mid wa\in L\}$: torna final $q$ quando $\delta(q,a)\in F$.
- **Derivada à esquerda** $a\backslash L=\{w\mid aw\in L\}$: muda o início para $\delta(q_0,a)$.

## Decisão e equivalência

| Pergunta            | Algoritmo                                                                 |
| ------------------- | ------------------------------------------------------------------------- |
| $L=\emptyset$?      | Procura um final alcançável                                               |
| $L=\Sigma^*$?       | Testa vazio no complemento                                                |
| $L$ infinita?       | Num DFA, procura um ciclo alcançável que permita chegar a um final        |
| $L_1\subseteq L_2$? | Testa vazio de $L_1\setminus L_2$                                         |
| $L_1=L_2$?          | No produto, procura um par alcançável com exatamente uma componente final |

Se o último teste encontra esse par, os rótulos do percurso dão uma palavra distinguidora. Pesquisa em largura encontra uma das mais curtas. Se não há tal par, as linguagens são iguais. Um ciclo ε isolado não garante infinitude; usar DFA evita essa confusão.

## Minimização

Estados $p,q$ são equivalentes quando **todas** as continuações dão a mesma resposta de aceitação.

1. Remove estados inacessíveis.
2. Marca pares final/não final, distinguidos por $\varepsilon$.
3. Marca um par se alguma letra leva a um par já marcado. Repete até estabilizar.
4. Junta os estados dos pares não marcados em classes.

Se $w$ distingue os destinos por $a$, então $aw$ distingue os estados de origem. O DFA mínimo completo é único a menos dos nomes dos estados.

[Exemplo com rondas e palavras distinguidoras](/cadeiras/tc/limites-regulares/#rondas-da-tabela-e-palavras-distinguidoras).

## Lema da repetição regular

Se $L$ é regular, existe $p\ge1$ tal que **toda** a palavra $s\in L$ de comprimento pelo menos $p$ admite $s=xyz$ com:

$$
|y|\ge1,\qquad |xy|\le p,\qquad
\forall i\ge0,\ xy^iz\in L.
$$

É uma condição necessária. Satisfazê-la não prova regularidade.

Para provar **não regularidade**:

1. Supõe regularidade e recebe $p$.
2. Escolhe $s\in L$, dependente de $p$, com $|s|\ge p$.
3. Considera **qualquer** decomposição válida, sem escolher o corte.
4. Mostra que existe $i\ge0$ que produz uma palavra fora de $L$.

Em $L=\{0^n1^n\mid n\ge0\}$, escolhe $s=0^p1^p$. Qualquer corte válido tem $y=0^k$, $k\ge1$. Com $i=0$, ficam $0^{p-k}1^p$, com contagens diferentes. Contradição.

Também podes usar fecho: se $H=\{0^i1^j\mid i\ne j\}$ fosse regular, $0^*1^*\setminus H$ seria regular, mas é precisamente a linguagem não regular anterior.
