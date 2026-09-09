---
title: Complexidade e estruturas
description: Notação assimptótica revista, regras de soma e produto, e a escolha da estrutura certa antes de desenhar.
section: conteudo
order: 1
---

Antes de desenhares um algoritmo, precisas de duas coisas: uma régua para medir o custo e uma caixa de ferramentas com as estruturas que fazem cada operação depressa. Esta página revê a notação assimptótica e mostra como a estrutura escolhida decide o custo antes de escreveres a primeira linha do algoritmo.

## A régua: O grande

Dizemos que $f(n)$ é $O(g(n))$ quando $f$ cresce no máximo tão depressa como $g$, a menos de constantes e para entradas grandes. Na prática, lês $O(n^2)$ como "duplica a entrada e o tempo quadruplica, mais coisa menos coisa". O que conta é o termo dominante: $3n^2 + 10n + 5$ é $O(n^2)$, porque para $n$ grande o $n^2$ esmaga o resto.

Duas regras chegam para quase tudo. Na **sequência**, somas e ficas com o pior: um passo $O(n)$ seguido de um passo $O(n^2)$ dá $O(n^2)$. Nos **ciclos aninhados**, multiplicas: dois ciclos de $n$ iterações com trabalho constante dão $O(n^2)$. E diz sempre o que é $n$ e o que estás a contar: " $n$ é o tamanho do vetor e conto comparações" evita metade das confusões.

:::warning[O custo esconde-se nos detalhes]
$O(1)$ não quer dizer instantâneo, quer dizer independente de $n$. E o pior caso manda: um algoritmo que é rápido quase sempre mas explode numa entrada adversa é um algoritmo $O(\text{explosão})$. Nos mini-testes, identifica sempre se te pedem pior caso, caso médio ou amortizado.
:::

## A caixa de ferramentas

Cada estrutura compra velocidade numa operação e paga-a noutra. O vetor dá acesso direto por posição em $O(1)$ mas inserir no meio custa $O(n)$. A lista ligada inverte a troca em alguns casos, mas perde o acesso direto. A tabela de dispersão dá procura, inserção e remoção em $O(1)$ médio à custa de memória extra e de um pior caso degradado. A árvore equilibrada de pesquisa dá tudo em $O(\log n)$ com garantias. Não há estrutura melhor em absoluto; há a estrutura certa para o padrão de acessos do teu algoritmo.

## Exemplo: procurar num vetor de inteiros

Tens o vetor `[4, 1, 7, 3, 9, 2, 8, 5]` e queres saber se contém o valor `8` e em que posição. A procura linear percorre do início: compara `4`, `1`, `7`, `3`, `9`, `2` e só no sétimo elemento encontra `8`. São 7 comparações para $n = 8$, e no pior caso são $n$. Custo: $O(n)$ tempo e $O(1)$ memória extra.

Com uma tabela de dispersão construída sobre os mesmos valores, a procura de `8` calcula a função de dispersão, salta diretamente para o balde e confirma em 1 comparação típica. Custo médio: $O(1)$ tempo, à custa de $O(n)$ memória para a tabela e de um pior caso $O(n)$ se tudo colidir no mesmo balde. Para $n = 8$ a diferença é irrelevante; para $n = 10^6$ com muitas procuras, é a diferença entre segundos e horas. É este raciocínio, feito antes de desenhar, que as próximas páginas assumem: cada técnica de [força bruta](/cadeiras/da/forca-bruta/) a [programação dinâmica](/cadeiras/da/programacao-dinamica/) vive ou morre do custo das operações que repete.
