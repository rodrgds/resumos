## Tamanho e custo

O tamanho $n$ é o **comprimento da codificação**. Um inteiro positivo $N$ em binário usa $\lfloor\log_2N\rfloor+1$ bits. Para $n$ bits, $2^{n-1}\le N<2^n$: fazer $N$ iterações é exponencial em $n$, embora seja linear no comprimento da representação unária.

O tempo no pior caso $T(n)$ é o máximo dos passos entre entradas de comprimento $n$. $O(n^k)$ é polinomial se $k$ for fixo; $2^n$ e $n!$ não são. Polinomial não garante rapidez prática.

## Custos de representações

Para palavra de comprimento $n$, autómato de $s$ estados e alfabeto fixo:

| Tarefa                                         | Custo ou tamanho                |
| ---------------------------------------------- | ------------------------------- |
| Simular DFA, acesso direto à tabela            | $O(n)$ tempo                    |
| Simular NFA por conjuntos e tabela de destinos | $O(ns^2)$ tempo                 |
| Determinizar NFA                               | Até $2^s$ estados               |
| Thompson, expressão de comprimento $r$         | $O(r)$ estados e arestas        |
| CYK, CFG fixa em CNF                           | $O(n^3)$ tempo, $O(n^2)$ espaço |

Para testar uma palavra num NFA, simula conjuntos sem construir o DFA inteiro. Na eliminação de estados, contar só atualizações ignora o crescimento dos rótulos; isso não prova custo polinomial para escrever a expressão.

## P e NP

- **P** contém as linguagens decididas por TM determinística em tempo polinomial.
- **NP** contém as linguagens com certificados de comprimento polinomial, verificáveis em tempo polinomial. Equivale a decisão por TM não determinística em tempo polinomial, com limite para todos os ramos.
- Para algum verificador $V$ e polinómio $p$:

$$
\begin{aligned}
w\in L\iff\exists c:\quad
&|c|\le p(|w|)\\
&\text{e }V(w,c)\text{ aceita}.
\end{aligned}
$$

Fora de $L$, **nenhum** certificado pode passar. $V$ tem de terminar em tempo polinomial e rejeitar certificados inválidos.

No caminho hamiltoniano, o certificado lista todos os vértices uma vez. Verifica comprimento, identificadores, ausência de repetições e arestas entre consecutivos. Para $v$ vértices, usa $O(v\log(v+1))$ bits, polinomial numa codificação explícita que inclui os isolados. Procurar todos os caminhos não é necessário para provar pertença a NP.

$P\subseteq NP$; não se sabe se $P=NP$. NP não significa "não polinomial". Um algoritmo conhecido exponencial não prova que todos o sejam.

## Reduções e NP-completude

$A\le_p B$ exige transformação $f$ computável em tempo polinomial, de tamanho de saída polinomial, que preserva ambas as respostas:

$$
x\in A\iff f(x)\in B.
$$

Se $B\in P$, então $A\in P$. Para demonstrar dificuldade de $B$, reduz **o problema difícil conhecido a $B$**.

- $B$ é **NP-difícil** se todo o problema de NP se reduz a $B$.
- $B$ é **NP-completo** se é NP-difícil e pertence a NP.
- Para provar NP-completude, apresenta certificado e verificador; depois reduz um problema NP-completo conhecido a $B$, provando as duas implicações e o custo.
- Se algum NP-completo estiver em P, então $P=NP$. Ser apenas NP-difícil não garante pertença a NP nem decidibilidade.

SAT é NP-completo. Para a variante que também exige alguma variável verdadeira, transforma $\varphi$ em $\varphi\land z$, com $z$ nova. Uma atribuição satisfatória estende-se com $z$ verdadeiro; uma que satisfaça a nova fórmula também satisfaz $\varphi$. A transformação $\varphi\lor z$ falha porque permite satisfazer mesmo uma fórmula original impossível.

Esta página amplia o percurso de linguagens formais; a profundidade da avaliação atual não está confirmada.

[Certificados e reduções completos](/cadeiras/tc/complexidade/#np-certificados-verificáveis).
