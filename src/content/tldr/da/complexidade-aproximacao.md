## Classes e certificados

- **P:** conjunto de problemas de decisão resolvidos em tempo polinomial no tamanho da representação.
- **NP:** problemas de decisão com certificado de tamanho polinomial que se verifica em tempo polinomial. Vale $P\subseteq NP$ e a igualdade está por provar. NP significa não determinístico polinomial, não "não polinomial".
- **NP-difícil:** todo o problema de NP se reduz a ele em tempo polinomial. **NP-completo:** é NP-difícil e pertence a NP. A versão de otimização associada a um problema NP-completo diz-se NP-difícil; nem toda a otimização é difícil, pois MST e caminhos mínimos nesta cadeira são polinomiais.
- Indecidível é sem algoritmo para todas as entradas, não apenas lento.

## Reduzir na direção certa

$$x\in A\iff f(x)\in B,\quad f\text{ polinomial}.$$

Solver de $B$ resolve $A$. Para provar $B$ difícil, reduz **difícil conhecido para $B$**, com construção, custo e duas implicações. Mostrar $B\le_p\text{SAT}$ não prova dificuldade.

| Redução               | Ideia                                                         |
| --------------------- | ------------------------------------------------------------- |
| CIRCUIT-SAT a CNF-SAT | Variável por fio; cláusulas por porta                         |
| CNF-SAT a 3-CNF-SAT   | Divide longas com auxiliares                                  |
| SAT a CLIQUE          | Vértice por ocorrência; clique com tamanho de cláusulas       |
| CLIQUE a VERTEX-COVER | Complemento; clique $k$ equivale a cobertura $n-k$            |
| 3-SAT a 3 cores       | Triângulo $T,F,B$; pares $x,\neg x$; dispositivo por cláusula |

Para $z=x\land y$: $(\neg z\lor x)\land(\neg z\lor y)\land(z\lor\neg x\lor\neg y)$.

Na construção de 3-SAT para 3 cores, cada cláusula tem um dispositivo $O_i$ ligado às suas três literais. Se as três literais forem falsas, o dispositivo é forçado a usar a cor $B$ e bloqueia a coloração do seu triângulo interno. Se pelo menos uma literal for verdadeira, existe uma extensão válida. O guloso usa no máximo $\Delta+1$ cores; um clique de tamanho $k$ exige $k$ cores distintas.

**2-SAT em P:** $(a\lor b)$ dá $\neg a\to b$, $\neg b\to a$. Insatisfazível se $x$ partilha SCC com $\neg x$. $O(n+q)$.

## Autorredução e casos tratáveis

- Mochila: fixa dentro ou fora com decisor e limites ajustados; até $n$ chamadas.
- HAM-CYCLE: remove aresta se decisor continua sim; até $m$ chamadas.
- Cobertura em árvore: $C_0(u)=\sum C_1$, $C_1(u)=1+\sum\min(C_0,C_1)$; folhas 0 e 1; $O(n)$.
- $k$ exceções com resto uniforme: $2^k$ seleções mais prefixos; polinomial para $k$ fixo.

[Reduções e provas](/cadeiras/da/complexidade-aproximacao/).
