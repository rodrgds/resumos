---
title: Divisão e conquista
description: Partir, resolver e combinar, com recorrências de custo resolvidas pela árvore de recursão.
section: conteudo
order: 4
---

Divisão e conquista é a técnica dos três verbos: **divide** a entrada em partes, **conquista** cada parte recursivamente e **combina** as soluções parciais. A análise faz-se com recorrências, e a árvore de recursão transforma a recorrência numa conta de somar por níveis.

## Exemplo numérico: pesquisa binária

No vetor ordenado `[1, 3, 5, 7, 9, 11, 13]`, procurar o `11`. Compara com o meio (`7`, índice 3): `11` é maior, descarta a metade esquerda. Compara com o meio da metade direita (`11`, índice 5): encontrado. São **2 comparações** contra até 7 da procura linear. Cada passo corta a entrada a metade, por isso o custo é $O(\log n)$: a recorrência $T(n) = T(n/2) + O(1)$ soma $O(1)$ por cada um dos $\log n$ níveis. A condição escondida é o vetor estar ordenado; sem ela, a metade descartada podia conter o alvo.

## Exemplo com combinação: ordenação por fusão

Ordenar `[5, 2, 8, 1]`: divide em `[5, 2]` e `[8, 1]`; conquista recursivamente em `[2, 5]` e `[1, 8]`; combina fundindo as duas metades ordenadas, comparando cabeças: sai `1`, depois `2`, depois `5`, depois `8`. Resultado `[1, 2, 5, 8]`, com a fusão a custar $O(n)$. A recorrência $T(n) = 2T(n/2) + O(n)$ resolve-se pela árvore: há $\log n$ níveis (cada nível parte tudo a metade até chegar a singletons) e cada nível soma $O(n)$ de fusões. Total: **$O(n \log n)$**, melhor que qualquer ordenação por comparações consegue evitar no pior caso.

:::tip[Desenha a árvore]
Perante uma recorrência, desenha dois ou três níveis com o custo de cada nó e soma por nível antes de tentares adivinhar a fórmula. Para $T(n) = 2T(n/2) + O(n)$ vês logo $\log n$ níveis de $O(n)$ cada. A árvore também mostra onde a recorrência vive: nas folhas (muito trabalho pequeno) ou na raiz (pouco trabalho grande).
:::

A mesma árvore serve para recorrências de outras páginas: o Fibonacci ingénuo da [programação dinâmica](/cadeiras/da/programacao-dinamica/) tem uma árvore exponencial, e é por isso que precisa de memoização. Se quiseres rever indução para provar estas contas, está em [indução e recorrência](/cadeiras/md/inducao-recorrencia/).
