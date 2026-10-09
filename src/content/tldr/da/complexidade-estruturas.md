## Tamanho da entrada e limites

Define os parâmetros e as operações contadas antes de dar um custo. Num grafo, $n=|V|$ e $m=|E|$; numa mochila, a capacidade numérica $W$ ocupa apenas $\Theta(\log(W+1))$ bits.

Para funções não negativas e constantes $c>0$, a partir de algum $n_0$:

- $f\in O(g)$ se $f(n)\le cg(n)$, um limite superior.
- $f\in\Omega(g)$ se $f(n)\ge cg(n)$, um limite inferior.
- $f\in\Theta(g)$ se valem os dois limites, possivelmente com constantes diferentes.

$3n^2+10n+5\in\Theta(n^2)$, embora também pertença a $O(n^3)$. Um limite superior não determina o melhor caso.

$$1\prec\log n\prec n\prec n\log n\prec n^2\prec n^3\prec2^n\prec n!.$$

## Contar trabalho

- Passos consecutivos somam custos. Um ciclo soma o trabalho de cada iteração.
- Um ciclo interior com $i$ operações, para $i=0,\ldots,n-1$, faz $n(n-1)/2$ operações: $\Theta(n^2)$.
- Duplicar um índice a cada passo até $n$ dá $\Theta(\log n)$ operações, evitando overflow na implementação.
- Percorrer uma vez todas as listas de adjacência examina $m$ arestas no total, não $nm$.
- Se uma fase produz $\Theta(n^2)$ elementos e depois os ordena, a ordenação custa $\Theta(n^2\log n)$.

Na procura linear, o melhor caso é $\Theta(1)$ e o pior $\Theta(n)$. O caso médio exige uma distribuição. **Amortizado** limita o custo de uma sequência: com crescimento geométrico, $n$ inserções num vetor custam $O(n)$, embora uma realocação isolada custe $\Theta(n)$.

## Estruturas e representação

| Estrutura          | Operação e condição                               | Custo                        |
| ------------------ | ------------------------------------------------- | ---------------------------- |
| Vetor              | Acesso por índice                                 | $\Theta(1)$                  |
| Vetor ordenado     | Pesquisa binária; inserir pode deslocar elementos | $O(\log n)$; inserção $O(n)$ |
| Fila ou pilha      | Inserir/retirar na extremidade adequada           | $O(1)$ habitual              |
| Heap binário       | Consultar mínimo; inserir/extrair                 | $O(1)$; $O(\log n)$          |
| Árvore equilibrada | Pesquisa, inserção, remoção                       | $O(\log n)$                  |
| Dispersão          | Com dispersão e ocupação adequadas                | $O(1)$ esperado; pior $O(n)$ |
| Union-find         | Compressão de caminhos e união por rank/tamanho   | $O(\alpha(n))$ amortizado    |

Uma matriz de adjacência usa $\Theta(n^2)$ espaço, testa uma aresta em $\Theta(1)$ e percorre vizinhos em $\Theta(n)$. Listas usam $\Theta(n+m)$ e percorrem vizinhos de $u$ em $\Theta(\deg(u))$. Distingue uma aresta de peso zero de ausência de aresta.

A `priority_queue` da STL não tem `decreaseKey`: inserir novos pares e ignorar antigos muda o número de entradas. Alterar uma prioridade já guardada não reorganiza a heap.

Uma tabela $O(nW)$ é **pseudopolinomial** quando $W$ vem em binário. Operações aritméticas só contam $O(1)$ quando os valores cabem no modelo usado; somar inteiros de $k$ bits custa $\Theta(k)$.

[Análise completa de tempo e memória](/cadeiras/da/complexidade-estruturas/).
