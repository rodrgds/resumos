---
title: Programação dinâmica
description: Subproblemas sobrepostos com memoização ou tabela, e reconstrução da solução a partir da tabela.
section: conteudo
order: 5
---

A programação dinâmica aplica-se quando o problema se parte em subproblemas **sobrepostos**: os mesmos cálculos repetem-se vezes sem conta. Em vez de os repetir, guarda cada resultado à primeira vez que o calcula, por memoização (de cima para baixo) ou por tabela (de baixo para cima). As duas formas dão o mesmo resultado; a tabela costuma ser mais rápida e a memoização mais fácil de escrever.

## Exemplo de aquecimento: Fibonacci

O Fibonacci ingénuo `fib(n) = fib(n-1) + fib(n-2)` recalcula tudo: `fib(5)` dispara **15 chamadas**, porque `fib(3)` é calculado duas vezes, `fib(2)` três vezes, e por aí abaixo. A árvore de recursão é exponencial para um problema com apenas 6 valores distintos. Com memoização, cada valor de `fib(0)` a `fib(5)` calcula-se uma vez:

```cpp
#include <vector>

long long fib(int n, std::vector<long long> &memo) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    return memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
}
```

Com `memo` inicializado a `-1`, `fib(5, memo)` devolve 5 depois de calcular cada entrada uma só vez: 6 cálculos em vez de 15 chamadas, e a diferença explode com $n$. O preço é a memória da tabela, $O(n)$ aqui. Esta é a troca central da técnica: tempo por memória.

## Exemplo completo: mochila 0-1 com tabela

Volta à mochila da [força bruta](/cadeiras/da/forca-bruta/): objetos A (2, 3), B (3, 4), C (4, 5), D (5, 8), capacidade 7. A tabela `dp[i][w]` guarda o melhor valor usando os primeiros $i$ objetos com capacidade $w$. Cada célula decide: ignoro o objeto $i$ (fico com `dp[i-1][w]`) ou levo-o (fico com `dp[i-1][w-peso_i] + valor_i`).

Preenchendo linha a linha, a última linha (objeto D) termina em `dp[4][7] = 11`. Para reconstruir o conjunto, anda para trás: `dp[4][7] = 11` difere de `dp[3][7] = 8`, por isso D entra e sobra capacidade 2; `dp[3][2] = 3` iguala `dp[2][2] = 3`, por isso C fica de fora; `dp[2][2] = 3` iguala `dp[1][2] = 3`, B fica de fora; `dp[1][2] = 3` difere de `dp[0][2] = 0`, A entra. Conjunto: **{A, D}, valor 11**, exatamente o ótimo da enumeração, obtido com $4 \times 8 = 32$ células em vez de $2^4$ subconjuntos avaliados à força bruta. Com $n$ objetos e capacidade $W$, o custo é $O(nW)$: polinomial em $n$, mas atenção que $W$ é um número, não um tamanho, por isso diz-se pseudo-polinomial.

:::warning[Quando a técnica não se aplica]
Sem sobreposição não há nada para guardar: a [divisão e conquista](/cadeiras/da/divisao-conquista/) na fusão resolve subproblemas disjuntos, e forçar lá uma tabela só gasta memória. E sem subestrutura ótima (o ótimo global não se monta de ótimos parciais), a tabela calcula depressa a resposta errada. Verifica as duas condições antes de desenhar a tabela.
:::
