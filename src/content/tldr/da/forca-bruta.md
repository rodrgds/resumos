## Enumeração e correção

Força bruta gera todos os candidatos, testa a admissibilidade e guarda o melhor. A prova precisa de mostrar que **toda a solução válida** aparece na enumeração. Devolver falso numa procura de existência exige esgotar todos os candidatos possíveis.

O tempo depende do número de candidatos e do custo de avaliar cada um. Uma enumeração pequena também permite conferir resultados de algoritmos mais rápidos, sem provar a sua correção geral.

## Intervalo contíguo não vazio

Para $n$ elementos existem $n(n+1)/2$ intervalos $A[i..j]$, com $i\le j$.

- Recalcular cada soma dá $\Theta(n^3)$.
- Fixar $i$ e acumular a soma enquanto $j$ avança dá $\Theta(n^2)$ tempo e $\Theta(1)$ memória auxiliar.
- Inicializa o melhor com um elemento real. Zero admitiria um intervalo vazio quando todos são negativos.

```text
melhor = A[0]                         # entrada não vazia
para i = 0 até n-1:
    soma = 0
    para j = i até n-1:
        soma += A[j]
        se soma > melhor:
            guardar soma e extremos i, j
```

Em `[-4,3,-1,5,-6,2]`, o melhor é `[3,-1,5]`, soma 7. Somar só os positivos não conserva contiguidade.

## Subconjuntos e quantidades

| Problema         | Candidatos                                                | Custo direto                                          |
| ---------------- | --------------------------------------------------------- | ----------------------------------------------------- |
| Mochila 0-1      | $2^n$ subconjuntos; peso no máximo $W$, valor máximo      | $\Theta(n2^n)$ se recalculas as somas em cada máscara |
| Soma exata       | Incluir/excluir cada elemento; soma igual a $T$           | $\Theta(2^n)$ nós com soma acumulada; pilha $O(n)$    |
| Trocos com stock | Quantidade $q_i\in\{0,\ldots,s_i\}$; soma $\sum q_ic_i=T$ | $\prod_i(s_i+1)$ combinações completas                |

A recursão da mochila com peso e valor acumulados visita $2^{n+1}-1$ nós, com trabalho constante por extensão. Copiar seleções pode acrescentar custo; uma máscara guarda a melhor sem copiar um vetor inteiro.

Podar uma soma parcial acima de $T$ só é seguro se os restantes forem não negativos. Com alvo 5, $8+(-3)$ ainda chega ao alvo. Em C++, máscaras exigem respeitar a largura do tipo antes de deslocar bits.

## TSP

Fixar a cidade inicial deixa $(n-1)!$ ordens. Avaliar as $n$ arestas, incluindo o **regresso**, dá $\Theta(n!)$ tempo. Numa instância não dirigida e simétrica podes eliminar rotas inversas duplicadas; num grafo dirigido essa simetria não é válida.

Um circuito hamiltoniano visita vértices uma vez. Um circuito euleriano visita arestas uma vez.

[Enumeração, exemplos e execução](/cadeiras/da/forca-bruta/).
