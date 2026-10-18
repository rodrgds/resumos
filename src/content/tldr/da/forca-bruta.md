## Quando a enumeração serve

Gera todos os candidatos, testa validade antes de comparar e guarda o melhor. A prova exige que **toda a solução válida** apareça. Em existência, só devolve falso após esgotar ramos.

| Problema            | Candidatos                       | Custo direto                                                       |
| ------------------- | -------------------------------- | ------------------------------------------------------------------ |
| Intervalo contíguo  | $n(n+1)/2$ pares $i\le j$        | $\Theta(n^2)$ com soma acumulada; $\Theta(n^3)$ se recalcular      |
| Mochila 0-1         | $2^n$ subconjuntos               | $\Theta(2^n)$ com acumulados; $\Theta(n2^n)$ por máscara com somas |
| Soma exata $T$      | Incluir ou excluir cada elemento | $\Theta(2^n)$ nós; pilha $O(n)$                                    |
| Trocos com stock    | $\prod_i(s_i+1)$ quantidades     | Manter totais evita fator $n$                                      |
| TSP com origem fixa | $(n-1)!$ ordens                  | $\Theta(n!)$ com $n$ arestas cada                                  |

## Intervalo não vazio

```text
melhor = A[0]
para i = 0 até n-1:
    soma = 0
    para j = i até n-1:
        soma += A[j]
        se soma > melhor: guardar soma, i, j
```

- Inicializa com elemento real; zero admitiria vazio com todos negativos.
- Em `[-4,3,-1,5,-6,2]`, o melhor é `[3,-1,5]`, soma 7.

## Subconjuntos e podas

- Valida peso antes de comparar valor; $C,D$ com valor 13 pode exceder $W$.
- Máscara com $1\ll n$ exige respeitar largura do tipo.
- Soma parcial acima de $T$ só poda se restantes forem não negativos.
- Para reconstruir, guarda melhor máscara ou copia escolhas do caminho.

## TSP

Fixa origem para remover rotações. Em instância simétrica não dirigida, podes eliminar inversas duplicadas com regra explícita. Em dirigida, essa regra pode remover o ótimo. Não confundas hamiltoniano (vértices) com euleriano (arestas).

[Enumeração e execução](/cadeiras/da/forca-bruta/).
