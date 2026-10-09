## Decisão e classes

Um problema de decisão responde sim/não. A mochila pergunta se existe seleção de peso no máximo $W$ e valor pelo menos $K$; otimização pede o maior valor.

- **P** contém os problemas de decisão resolvidos em tempo polinomial no tamanho da representação da entrada.
- **NP** contém os que têm certificados de tamanho polinomial, verificáveis em tempo polinomial. Não significa "não polinomial": $P\subseteq NP$ e não sabemos se $P=NP$.
- **NP-difícil** recebe uma redução polinomial de todo o problema de NP. **NP-completo** é também membro de NP. A versão de otimização costuma ser chamada NP-difícil.
- **co-NP** contém os complementos de NP. Uma atribuição falsa certifica que uma fórmula não é tautologia; assim TAUTOLOGY está em co-NP, sem decidir a pertença a NP.

Indecidibilidade significa ausência de algoritmo para todas as entradas, não apenas dificuldade de tempo.

## Direção e conteúdo de uma redução

$A\le_pB$ exige uma transformação polinomial $f$ com

$$x\in A\iff f(x)\in B.$$

Um algoritmo para $B$ resolveria $A$. Para provar dificuldade de um novo $B$, reduz **um problema difícil conhecido para $B$** e demonstra construção, custo e ambas as implicações. Mostrar $B\le_pSAT$ e dar um verificador não prova que $B$ seja NP-difícil.

| Redução                          | Construção essencial                                                                                                                                    |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CIRCUIT-SAT para CNF-SAT         | Variável por fio e cláusulas por porta, mais saída verdadeira                                                                                           |
| CNF-SAT para 3-CNF-SAT           | Divide cláusulas longas com variáveis auxiliares; preserva satisfazibilidade para alguma escolha das auxiliares                                         |
| SAT para CLIQUE                  | Vértice por ocorrência de literal; arestas entre cláusulas distintas e literais não contraditórios; pede clique de tamanho igual ao número de cláusulas |
| CLIQUE para VERTEX-COVER         | Complementa o grafo; clique de tamanho $k$ equivale a cobertura de tamanho no máximo $n-k$ no complemento                                               |
| CLIQUE para SUBGRAPH-ISOMORPHISM | Usa $K_k$ como padrão                                                                                                                                   |

Para porta $z=x\land y$, as cláusulas são $(\neg z\lor x)\land(\neg z\lor y)\land(z\lor\neg x\lor\neg y)$. Cada porta acrescenta tamanho constante. Não enumeres todas as atribuições para construir a redução.

Na redução para clique, ocorrências iguais em cláusulas diferentes continuam a ser vértices diferentes. Para cobertura, $C$ cobre $G$ se e só se $V\setminus C$ é independente em $G$.

## Três cores e 2-SAT

Na redução de 3-SAT para três cores, um triângulo fixa $T,F,B$. Cada par $x,\neg x$ liga-se entre si e a $B$, recebendo $T,F$ em sentidos opostos.

Para cada cláusula, cria um triângulo $I_1,I_2,I_3$. Liga $I_i$ a $O_i$ e $O_i$ ao literal e a **$T$**. Três literais falsos forçam todos os $O_i$ a $B$ e deixam só duas cores para o triângulo: impossível. Se o primeiro literal é verdadeiro, dá externos $F,B,B$ e internos $B,T,F$, uma extensão válida. A construção é linear em variáveis e cláusulas; verificar cores custa $O(n+m)$.

Uma clique de tamanho $k$ exige $k$ cores; o guloso num grafo simples usa no máximo $\Delta+1$, sem garantir mínimo.

**2-SAT** está em P. Cada cláusula $(a\lor b)$ dá $\neg a\to b$ e $\neg b\to a$. É insatisfazível se alguma variável partilhar SCC com a negação. Caso contrário, numa ordem topológica da condensação, atribui $x$ verdadeiro quando a componente de $x$ fica depois da de $\neg x$. Não confundas posição topológica com identificador arbitrário de SCC. Custo $O(n+q)$ para $n$ variáveis e $q$ cláusulas.

## Certificados e autorredução

Isomorfismo exige uma **bijeção** $\pi$ e, para todos os pares distintos, $uv\in E(G)\iff\pi(u)\pi(v)\in E(H)$. Verificar só arestas existentes ignora arestas extra. Matrizes permitem verificação $O(n^2)$, provando pertença a NP, sem provar P ou NP-completude.

Para reduzir SUBSET-SUM a PARTITION, com positivos $A$, alvo $T\ge0$ e soma $s$, acrescenta $b=|s-2T|$ se positivo. A metade passa a $(s+b)/2$. Se $s>2T$, retirar $b$ do lado que o contém recupera soma $T$; se $s<2T$, o lado sem $b$ já soma $T$; se iguais, não acrescentas nada. Construção e verificação são polinomiais nos bits.

Um decisor também pode construir:

- Mochila: fixa cada objeto dentro ou fora, perguntando sobre o resto com limites ajustados $W-w_i,K-v_i$ se incluído. Conserva uma resposta afirmativa, em até $n$ chamadas.
- HAM-CYCLE: remove cada aresta se o decisor ainda responder sim. Após até $m$ chamadas, o grafo hamiltoniano minimal é o ciclo procurado.

## Casos especiais e aproximação

Cobertura numa árvore enraizada usa estados excluir/escolher:

$$C_0(u)=\sum_{v\text{ filho}}C_1(v),\qquad C_1(u)=1+\sum_{v\text{ filho}}\min(C_0(v),C_1(v)).$$

Nas folhas são 0 e 1; resposta na raiz é o mínimo. Cada aresta é processada uma vez: $O(n)$.

Com $k$ objetos excecionais fixo e restantes de peso igual, enumera $2^k$ seleções e completa pelos maiores valores que cabem. É polinomial para $k$ constante e resto polinomial. Uma DP em capacidade binária pode ser apenas pseudopolinomial.

Para fator $\rho\ge1$ e custos positivos, aproximação admissível e polinomial garante $C\le\rho OPT$ em minimização ou $C\ge OPT/\rho$ em maximização. PTAS é polinomial na entrada para cada precisão $\varepsilon>0$ fixa; FPTAS é polinomial também em $1/\varepsilon$.

[Reduções e provas completas](/cadeiras/da/complexidade-aproximacao/).
