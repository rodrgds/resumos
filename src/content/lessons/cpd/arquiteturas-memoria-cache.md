---
title: Máquinas paralelas e memória cache
description: Memória partilhada e distribuída, linhas de cache e o efeito da ordem de acesso no desempenho.
section: conteudo
order: 2
---

Dois programas com as mesmas operações podem demorar tempos muito diferentes conforme a ordem em que tocam na memória. Esta página explica porquê, e é a base prática do primeiro projeto da cadeira.

## Duas organizações de memória

Nas máquinas de **memória partilhada**, todos os núcleos veem o mesmo espaço de endereços. É o teu portátil e é o modelo do OpenMP. Programar é mais simples, porque uma variável é visível a todas as threads, mas é preciso sincronizar os acessos, como vais ver na página de [concorrência](concorrencia-sincronizacao/).

Nas máquinas de **memória distribuída**, cada nó tem a sua memória privada e os nós trocam mensagens pela rede. É o modelo dos clusters e é a porta de entrada para a segunda metade da cadeira. Programar exige decidir explicitamente que dados viajam e quando.

## A cache decide

Entre o núcleo e a memória principal há caches pequenas e rápidas, organizadas em **linhas** de tipicamente 64 bytes. Quando o núcleo lê um endereço, traz a linha inteira. Se os acessos seguintes caírem na mesma linha, são quase gratuitos (_localidade espacial_). Se saltarem de linha em linha, cada acesso paga uma ida à memória.

Em C, uma matriz `double a[N][N]` guarda cada linha seguida em memória. Percorrer por linhas usa cada linha de cache até ao fim, 8 doubles por linha de 64 bytes. Percorrer por colunas salta $N \times 8$ bytes a cada acesso e desperdiça 7 doubles de cada linha trazida.

## Exemplo completo

Multiplicação ingénua $C = A \times B$ com $N = 1024$, somando ao longo de $k$. A versão por linhas fixa $i$ e $j$ e percorre $k$ em sequência, aproveitando a cache. A versão por colunas percorre a matriz saltando entre linhas. Numa medição típica num portátil atual:

| Versão      | Tempo          |
| ----------- | -------------- |
| Por linhas  | cerca de 1,1 s |
| Por colunas | cerca de 3,9 s |

A diferença, um fator de 3 a 4, vem quase toda da cache, porque as operações aritméticas são as mesmas. A leitura crítica: antes de paralelizar, ordena os acessos. Um programa paralelo com mau padrão de acesso multiplica o problema pelo número de núcleos, que passam a disputar a largura de banda da memória em vez de calcular.

:::details[Ver por que 8 doubles por linha]
Um `double` ocupa 8 bytes e a linha de cache tem 64 bytes, por isso cada linha traz 8 elementos seguidos. No percurso por linhas, cada falta à cache serve 8 acessos úteis. No percurso por colunas com $N = 1024$, cada acesso cai numa linha diferente e cada falta serve 1 acesso útil, pelo que o programa traz cerca de 8 vezes mais dados da memória.
:::
