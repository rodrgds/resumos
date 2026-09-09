---
title: Pesquisa e ordenação em arrays
description: Pesquisa sequencial e binária, ordenação por comparação e o confronto quicksort contra mergesort.
section: conteudo
order: 2
---

Ordenar é o problema mais estudado da computação, porque aparece dentro de quase tudo: pesquisar depressa, remover duplicados, juntar conjuntos, preparar dados para outro algoritmo. Esta página fixa a pesquisa em vetores, apresenta as ordenações que tens de saber seguir à mão e explica por que nenhuma ordenação por comparação escapa a $O(n \log n)$.

## Pesquisar: sequencial e binária

A **pesquisa sequencial** percorre o vetor do início ao fim até encontrar o valor ou esgotar as posições: $O(n)$ no pior caso, $O(1)$ de espaço, e funciona em qualquer vetor. A **pesquisa binária** exige o vetor ordenado e compara com o elemento do meio: se o alvo for menor, continua na metade esquerda; se for maior, na direita. Cada comparação corta os candidatos a metade, por isso custa $O(\log n)$, como contaste na página anterior.

Há variantes que deves reconhecer: encontrar a **primeira** ou a **última** ocorrência num vetor com repetidos (quando o meio é igual ao alvo, continua-se para o lado respetivo em vez de parar), e o limite de inserção (a posição onde o valor entraria para manter a ordem). Todas mantêm $O(\log n)$ porque cada passo continua a descartar metade.

## Ordenação por comparação

| Algoritmo | Pior caso | Caso médio | Espaço extra | Estável |
| --------- | --------- | ---------- | ------------ | ------- |
| Seleção   | $O(n^2)$  | $O(n^2)$   | $O(1)$       | não     |
| Inserção  | $O(n^2)$  | $O(n^2)$   | $O(1)$       | sim     |
| Mergesort | $O(n \log n)$ | $O(n \log n)$ | $O(n)$  | sim     |
| Quicksort | $O(n^2)$  | $O(n \log n)$ | $O(\log n)$ | não    |

A **ordenação por seleção** repete "escolhe o mínimo do que falta e põe-no na posição": simples, sempre quadrática, boa quando trocar é caro e comparar é barato. A **ordenação por inserção** insere cada elemento na parte já ordenada: quadrática no geral, mas $O(n)$ num vetor quase ordenado, por isso é a escolha para entradas pequenas. **Estável** significa que elementos iguais mantêm a ordem relativa original, o que interessa quando ordenas por uma chave e há desempates noutra.

O limite fundamental: qualquer algoritmo que só compare pares de elementos precisa de $\Omega(n \log n)$ comparações no pior caso. A intuição é que $n$ elementos têm $n!$ ordens possíveis e cada comparação só distingue dois resultados, por isso são precisas pelo menos $\log_2(n!) \approx n \log n$ comparações para isolar a ordem certa. O mergesort atinge este limite; o quicksort atinge-o em média.

## Mergesort num vetor de 7 elementos

O mergesort divide ao meio, ordena cada metade e **intercala** (merge) as metades ordenadas. Segue o vetor $[5, 2, 7, 1, 6, 3, 4]$:

- Divide em $[5, 2, 7, 1]$ e $[6, 3, 4]$.
- A primeira metade divide em $[5, 2]$ e $[7, 1]$, que ordenam para $[2, 5]$ (1 comparação: $5$ contra $2$) e $[1, 7]$ (1 comparação). A intercalação compara $2$ com $1$ (fica $1$), $2$ com $7$ (fica $2$), $5$ com $7$ (fica $5$) e despeja o $7$: $[1, 2, 5, 7]$ com 3 comparações.
- A segunda metade divide em $[6]$ e $[3, 4]$; esta ordena para $[3, 4]$ (1 comparação) e a intercalação com $[6]$ compara $6$ com $3$ e com $4$: $[3, 4, 6]$ com 2 comparações.
- A intercalação final de $[1, 2, 5, 7]$ com $[3, 4, 6]$ compara $1$ com $3$, $2$ com $3$, $5$ com $3$, $5$ com $4$, $5$ com $6$ e $7$ com $6$, e despeja o $7$: $[1, 2, 3, 4, 5, 6, 7]$ com 6 comparações.

Total: $1 + 1 + 3 + 1 + 2 + 6 = 14$ comparações. Repara no padrão: cada nível da divisão faz cerca de $n$ comparações e há $\log n$ níveis, daí o $O(n \log n)$. O preço é o vetor auxiliar de tamanho $n$ em cada intercalação.

## Quicksort no mesmo vetor

O quicksort escolhe um **pivô**, **particiona** (menores à esquerda, maiores à direita) e resolve cada lado. Com o esquema de Lomuto e pivô na última posição, a primeira partição de $[5, 2, 7, 1, 6, 3, 4]$ com pivô $4$ faz 6 comparações e produz $[2, 1, 3, 4, 6, 7, 5]$, com o $4$ já na posição final. Resolve $[2, 1, 3]$ (pivô $3$, 2 comparações, fica igual), $[2, 1]$ (pivô $1$, 1 comparação, troca para $[1, 2]$), $[6, 7, 5]$ (pivô $5$, 2 comparações, passa a $[5, 7, 6]$) e $[7, 6]$ (1 comparação, troca para $[6, 7]$). Total: $6 + 2 + 1 + 2 + 1 = 12$ comparações.

Neste vetor o quicksort fez menos comparações (12 contra 14) e não usou vetor auxiliar. Mas o seu pior caso é real: com o vetor já ordenado e pivô na ponta, cada partição só isola um elemento e o custo degrada para $O(n^2)$. A defesa é escolher bem o pivô (aleatório, ou mediana de três) e mudar para inserção nas partições pequenas. É por isso que a [STL](/cadeiras/p/templates-stl/) usa uma variante híbrida no `sort`, não o quicksort puro.

:::warning[Comparações não são tudo]
Dois algoritmos com o mesmo $O$ podem diferir por constantes, localidade de cache e número de trocas. O quicksort costuma ganhar ao mergesort na prática porque trabalha no próprio vetor, com acessos sequenciais que a cache adora. A análise assintótica ordena os candidatos; a medição escolhe o vencedor.
:::

## Ordenação linear

Sem comparar pares, o limite $n \log n$ não se aplica. A **counting sort** conta quantas vezes aparece cada valor (quando os valores estão num intervalo pequeno conhecido) e reescreve o vetor: $O(n + k)$ para $k$ valores possíveis. A **radix sort** ordena dígito a dígito com uma ordenação estável auxiliar. O truque é sempre o mesmo: trocar comparações por informação sobre os valores. Quando os valores são arbitrários, volta-se à comparação.
