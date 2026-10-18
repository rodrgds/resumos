## Medir antes de escolher

| Entrada                    | Tamanho relevante                                               | Armadilha                                        |
| -------------------------- | --------------------------------------------------------------- | ------------------------------------------------ |
| Vetor com $n$ elementos    | $n$                                                             | Ordenar antes tem custo próprio                  |
| Grafo                      | $n=\lvert V\rvert$, $m=\lvert E\rvert$; lista usa $\Theta(n+m)$ | Dizer "linear" sem representação esconde o custo |
| Mochila com capacidade $W$ | $W$ ocupa $\Theta(\log(W+1))$ bits                              | Tabela com $W$ colunas é enorme face à escrita   |
| Números sem limite         | Bits dos operandos                                              | Somar $k$ bits custa $\Theta(k)$                 |

Assume valores nos tipos usados e respeita limites dos enunciados.

## Limites assimptóticos

Para $f$ não negativa e $n$ grande:

- $f\in O(g)$ se $f(n)\le cg(n)$; limite superior.
- $f\in\Omega(g)$ se $f(n)\ge cg(n)$; limite inferior.
- $f\in\Theta(g)$ se valem os dois.

$3n^2+10n+5\in\Theta(n^2)$, embora também pertença a $O(n^3)$. $O(n^2)$ não fixa melhor caso nem tempo exato.

$$1\prec\log n\prec n\prec n\log n\prec n^2\prec n^3\prec2^n\prec n!.$$

Base do logaritmo muda constante. Potência $n^k$ com $k$ fixo é polinomial.

## Contar ciclos sem multiplicar às cegas

- Passos consecutivos somam; ciclo soma cada iteração.
- Triângulo $0,\ldots,n-1$ dá $n(n-1)/2$: $\Theta(n^2)$.
- Duplicar índice até $n$ dá $\Theta(\log n)$.
- Percorrer todas as listas de adjacência examina $m$ arestas, não $nm$.
- Fase que produz $\Theta(n^2)$ e ordena custa $\Theta(n^2\log n)$.

## Pior caso, médio e amortizado

- Procura linear: melhor $\Theta(1)$, pior $\Theta(n)$.
- Médio exige distribuição; média dos extremos não chega.
- **Amortizado** limita sequência: $n$ inserções em vetor com crescimento geométrico custam $O(n)$, embora uma realocação custe $\Theta(n)$.

## Estruturas e representação

| Estrutura          | Operação                        | Custo                        |
| ------------------ | ------------------------------- | ---------------------------- |
| Vetor              | Acesso                          | $\Theta(1)$                  |
| Vetor ordenado     | Pesquisa; inserção desloca      | $O(\log n)$; $O(n)$          |
| Fila ou pilha      | Extremos                        | $O(1)$                       |
| Heap               | Mínimo; inserir e extrair       | $O(1)$; $O(\log n)$          |
| Árvore equilibrada | Pesquisa e atualização          | $O(\log n)$                  |
| Dispersão          | Com boa função e ocupação       | $O(1)$ esperado; pior $O(n)$ |
| Union-find         | Com compressão e união por rank | $O(\alpha(n))$ amortizado    |

Matriz usa $\Theta(n^2)$ espaço e testa aresta em $\Theta(1)$. Listas usam $\Theta(n+m)$ e percorrem vizinhos de $u$ em $\Theta(\deg(u))$. Distingue peso zero de ausência de aresta.

`priority_queue` sem `decreaseKey`: insere novos pares e ignora antigos. Não alteres chave na heap sem reorganizar.

Tabela $O(nW)$ com $W$ em binário é **pseudopolinomial**, não polinomial na entrada.

[Análise completa](/cadeiras/da/complexidade-estruturas/).
