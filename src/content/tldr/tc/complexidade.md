## Tamanho e custo

- O tamanho $n$ é o comprimento da **codificação**, não o valor descrito. Um inteiro $N\ge1$ em binário usa $\lfloor\log_2N\rfloor+1$ bits, logo $2^{n-1}\le N<2^n$; o caso $N=0$ representa-se à parte com um bit. Um algoritmo com $N$ passos é exponencial em $n$, embora seja linear no valor ou no unário.
- Pior caso $T(n)$: máximo de passos em entradas de comprimento $n$. $O(n^k)$ polinomial ($k$ fixo); $2^n$, $n!$ não. Polinomial não garante rapidez prática.

| Tarefa ($n$ palavra, $s$ estados) | Custo                           |
| --------------------------------- | ------------------------------- |
| Simular DFA                       | $O(n)$                          |
| Simular NFA por conjuntos         | $O(ns^2)$                       |
| Determinizar NFA                  | Até $2^s$ estados               |
| Thompson (expressão de $r$)       | $O(r)$ estados e arestas        |
| CYK (CFG fixa em CNF)             | $O(n^3)$ tempo, $O(n^2)$ espaço |

Testar palavra em NFA simula conjuntos, sem o DFA inteiro. Contar atualizações de eliminação ignora o crescimento dos rótulos.

## P e NP

- **P:** decididas por TM determinística em tempo polinomial. Regulares e CFL fixas estão em P.
- **NP:** cada resposta sim tem um certificado de comprimento polinomial, verificado em tempo polinomial por um verificador **determinístico**. Isto equivale a uma TM não determinística que decide em tempo polinomial em todos os ramos. NP significa tempo polinomial não determinístico, não "não polinomial".

$$
w\in L\iff\exists c,\ |c|\le p(|w|)\ \text{e}\ V(w,c)\ \text{aceita}.
$$

O verificador $V$ é determinístico e corre em tempo polinomial para um polinómio $p$ fixo; fora de $L$, **nenhum** certificado o faz aceitar. No caminho hamiltoniano com $v$ vértices, o certificado é a lista de vértices, com $O(v\log v)$ bits, e a verificação confirma cobertura e arestas. A inclusão $P\subseteq NP$ está estabelecida; a igualdade $P=NP$ continua em aberto. Um algoritmo exponencial conhecido não prova um limite inferior.

## Reduções e NP-completude

$A\le_p B$: $f$ computável em tempo polinomial com $x\in A\iff f(x)\in B$. Se $B\in P$, então $A\in P$. Dificuldade de $B$: reduz **o problema difícil a $B$**.

- **NP-difícil:** todo o problema de NP se reduz a $B$ em tempo polinomial.
- **NP-completo:** NP-difícil e em NP. Para provar, descreve primeiro o certificado, o seu tamanho polinomial e o verificador determinístico; depois reduz a $B$ um problema já NP-completo, com as duas implicações e o custo polinomial.
- Se algum NP-completo está em P, $P=NP$. Só NP-difícil não garante pertença a NP nem decidibilidade.

SAT é NP-completo. Para exigir variável verdadeira: $f(\varphi)=\varphi\land z$ com $z$ nova (a disjunção $\varphi\lor z$ aceitaria fórmulas impossíveis). Atribuição estende-se com $z$ verdadeiro; restrição satisfaz $\varphi$.

Esta página amplia o percurso; a profundidade da avaliação atual não está confirmada.

[Certificados e reduções completos](/cadeiras/tc/complexidade/#np-certificados-verificáveis).
