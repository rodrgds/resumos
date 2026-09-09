---
title: Otimização e evolução
description: Pesquisa local, subida da colina presa num ótimo local, arrefecimento simulado e algoritmos evolutivos.
section: conteudo
order: 5
---

Nem todos os problemas pedem um caminho. Muitas vezes pedem um bom estado final, e o caminho até lá é irrelevante: é o caso de horários, escalas e das 4 rainhas desta página. A **pesquisa local** anda de vizinho em vizinho a melhorar uma função de avaliação, sem guardar a história. É barata e cega ao passado, o que lhe dá velocidade e lhe cria a armadilha central do tema: os ótimos locais.

## O exemplo das 4 rainhas

Tabuleiro 4 por 4 com uma rainha por coluna, representado pelo vetor das linhas, como [1, 4, 2, 3] (coluna 1 na linha 1, coluna 2 na linha 4, e por aí fora). A função de avaliação conta **pares de rainhas que se atacam** (mesma linha ou mesma diagonal): 0 é solução, e queremos minimizar. Vizinhos são os estados que mudam a linha de exatamente uma coluna, 12 vizinhos por estado.

Confirma a conta no estado inicial [1, 4, 2, 1]: os pares são (1,1)-(2,4), (1,1)-(3,2), (1,1)-(4,1), (2,4)-(3,2), (2,4)-(4,1) e (3,2)-(4,1). Atacam-se (1,1)-(4,1) pela linha e (3,2)-(4,1) pela diagonal. Total: 2 ataques.

## Subida da colina e o ótimo local

A **subida da colina** (hill climbing) repete: avalia os 12 vizinhos e move-se para o melhor; se nenhum for melhor, para. Passo 1 a partir de [1, 4, 2, 1]: um dos melhores vizinhos é [1, 4, 2, 3], com 1 ataque (só o par (3,2)-(4,3) se ataca na diagonal; confirma os outros cinco pares). Desce de 2 para 1 e move-se.

Passo 2 a partir de [1, 4, 2, 3]: os 12 vizinhos valem 2, 3 ou 4 ataques. Os vizinhos que mudam a coluna 1 valem 2, 3 e 3; os da coluna 2 valem 4, 3 e 3; os da coluna 3 valem 3, 3 e 2; os da coluna 4 valem 2, 3 e 3. Nenhum chega a 0 nem empata 1. A subida para aqui: estado com 1 ataque onde tudo à volta é pior. É um **ótimo local**, e a subida da colina, que só aceita melhorias, nunca mais sai dele. Repara que [3, 1, 4, 2] tem 0 ataques (verifica os seis pares: nenhuma linha repetida, nenhuma diagonal com diferença igual), por isso o ótimo global existe e está longe.

## Sair da armadilha

Há três saídas clássicas. O **arrefecimento simulado** aceita por vezes um vizinho pior, com probabilidade que diminui ao longo do tempo (a "temperatura"). No início salta muito e explora; no fim comporta-se como a subida e refina. Aceitar piorar temporariamente é o que permite atravessar o vale entre o ótimo local e o global.

O **reinício aleatório** sorteia um estado novo quando prende e recomeça a subida. É simples e surpreendentemente eficaz quando os ótimos locais são muitos mas baratos de escalar.

Os **algoritmos evolutivos** mantêm uma população de estados e aplicam **seleção** (os melhores reproduzem-se), **cruzamento** (filhos combinam partes de dois pais) e **mutação** (troca aleatória de um gene). Uma mutação no estado preso, por exemplo trocar a coluna 1 de 1 para 3, produz [3, 4, 2, 3] com 3 ataques: pior no imediato, mas noutra região do espaço, onde a subida seguinte pode encontrar outro caminho. A mutação não promete melhorar; promete diversidade, que é o que falta a uma população presa.

:::tip[Como cai em teste]
Pedem-te para executar dois ou três passos de subida da colina com a função dada, ou para explicar porque prendeu e que técnica o solta. Conta sempre todos os pares (para 4 rainhas são 6) e escreve os valores dos vizinhos antes de escolher. A justificação do ótimo local é uma frase com números: "vale 1 e os 12 vizinhos valem 2 ou mais".
:::

## O limite teórico

Estes métodos aproximados existem porque os problemas exatos são difíceis: muitas otimizações combinatórias são NP-difíceis, e a exaustão não escala, como recorda a página de [complexidade](/cadeiras/tc/complexidade/). A pesquisa local troca a garantia de otimalidade por velocidade e boas soluções na prática, e a escolha entre subida, arrefecimento e evolução depende do formato dos ótimos locais do teu problema.
