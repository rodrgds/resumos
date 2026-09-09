---
title: Retrocesso e ramificação
description: Explorar o espaço de procura com poda por viabilidade e por limite, e provar que nada se perde.
section: conteudo
order: 7
---

Quando não há estrutura para um guloso nem sobreposição para uma tabela, resta explorar o espaço de soluções. O retrocesso (**backtracking**) constrói candidatos passo a passo e desiste de um ramo assim que ele se revela inviável. A ramificação com poda (**branch and bound**) acrescenta um limite otimista que desiste de ramos que já não conseguem bater o melhor valor conhecido. Nos dois casos, a poda só é válida se provares que o ramo cortado não continha nada melhor.

## Retrocesso: desistir cedo

O retrocesso mantém uma solução parcial e tenta estendê-la. Se a extensão viola uma restrição, volta atrás (**retrocede**) e tenta a próxima alternativa. A ordem das tentativas não afeta a correção, mas afeta a velocidade: tenta primeiro as alternativas mais promissoras para encontrar boas soluções cedo, porque uma boa solução conhecida alimenta a poda.

## Exemplo: 4 rainhas passo a passo

Coloca 4 rainhas num tabuleiro 4 por 4 sem ataques mútuos, uma por coluna. Coluna 1 na linha 1. Coluna 2: as linhas 1 e 2 estão atacadas (linha e diagonal da rainha 1), por isso tenta a linha 3. Coluna 3: a linha 1 está atacada pela coluna 1, a linha 2 pela diagonal da coluna 2, a linha 3 pela linha da coluna 2 e a linha 4 pela diagonal da coluna 2. Beco sem saída: retrocede. A coluna 2 ainda tem a linha 4 livre, mas aí a coluna 3 só admite a linha 2 e a coluna 4 esgota-se (linhas 1 e 2 presas às linhas das colunas 1 e 3, linha 3 na diagonal da coluna 3, linha 4 na linha da coluna 2). Retrocede então até à coluna 1 e move-a para a linha 2. Coluna 2 na linha 4, coluna 3 na linha 1, coluna 4 na linha 3. Solução: **linhas [2, 4, 1, 3]**, que confirmas sem ataques em nenhum par. O algoritmo visitou uma fração minúscula das $4^4 = 256$ colocações, porque cada beco sem saída podou uma subárvore inteira.

## Ramificação com poda: cortar por limite

No branch and bound para otimização, cada nó tem um **limite**: uma estimativa otimista do melhor valor alcançável dali (para maximização, um teto). Se o teto não supera o melhor valor já conhecido, poda o ramo inteiro. Volta à [mochila da força bruta](/cadeiras/da/forca-bruta/) com capacidade 7, ordenando por razão valor por peso: D (1,6), A (1,5), B (1,33), C (1,25). Na raiz, enche fracionariamente: D inteiro (peso 5), A inteiro (peso 2, mochila cheia), teto $8 + 3 = 11$. Como D e A cabem mesmo, 11 é admissível e passa a melhor valor. No ramo que exclui D, o teto fracionário é A e B inteiros mais meia fração de C: $3 + 4 + 2{,}5 = 9{,}5$, abaixo de 11, por isso poda sem explorar. Resultado: **ótimo 11 provado visitando dois nós**, contra os 16 subconjuntos da enumeração.

:::warning[Poda sem prova é adivinha]
"Este ramo parecia mau" não poda nada. A poda por viabilidade exige mostrar a restrição violada; a poda por limite exige mostrar o cálculo do teto e compará-lo com o melhor conhecido. No teste, escreve os dois números lado a lado antes de riscar o ramo.
:::
