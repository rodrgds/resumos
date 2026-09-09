---
title: Rasterização 2D
description: Algoritmo do ponto médio para linhas e preenchimento de regiões por varrimento.
section: conteudo
order: 7
---

No fim da [pipeline](pipeline-visualizacao/), a geometria já está achatada no plano do ecrã e falta a última conversão: decidir que píxeis acendem. A **rasterização** faz exatamente isto, com aritmética inteira rápida em vez de equações caras. É o fecho da abordagem de cima para baixo da cadeira: do 3D até ao píxel.

## Linhas pelo ponto médio

Desenhar o segmento de $(0, 0)$ a $(5, 2)$ parece pedir a reta $y = 0{,}4x$ com arredondamentos, mas o algoritmo do **ponto médio** (variante de Bresenham) decide cada píxel com somas inteiras. Para declive entre $0$ e $1$, avança uma coluna de cada vez e escolhe entre o píxel leste (E) e o nordeste (NE), consoante o ponto médio entre eles fica acima ou abaixo da reta. A variável de decisão começa em $d = 2\Delta y - \Delta x$ e atualiza-se com $+2\Delta y$ após E e $+2(\Delta y - \Delta x)$ após NE.

Aqui $\Delta x = 5$ e $\Delta y = 2$, logo $d$ começa em $2 \times 2 - 5 = -1$. Segue os passos a partir de $(0, 0)$:

| $x$ | $d$ antes | Escolha | Píxel | $d$ depois |
| --- | --------- | ------- | ----- | ---------- |
| 1   | $-1$      | E       | $(1, 0)$ | $-1 + 4 = 3$ |
| 2   | $3$       | NE      | $(2, 1)$ | $3 - 6 = -3$ |
| 3   | $-3$      | E       | $(3, 1)$ | $-3 + 4 = 1$ |
| 4   | $1$       | NE      | $(4, 2)$ | $1 - 6 = -5$ |
| 5   | $-5$      | E       | $(5, 2)$ | $-5 + 4 = -1$ |

Os píxeis acesos são $(0, 0)$, $(1, 0)$, $(2, 1)$, $(3, 1)$, $(4, 2)$ e $(5, 2)$. Confirma com a reta: em $x = 2$, $y = 0{,}8$ arredonda para $1$; em $x = 4$, $y = 1{,}6$ arredonda para $2$. O algoritmo nunca calculou $0{,}8$ nem $1{,}6$: seguiu o sinal de $d$ com inteiros. Para outros octantes troca-se o eixo de avanço ou o sinal, mas a estrutura é a mesma.

## Regiões por varrimento

Preencher um polígono faz-se por **varrimento** (_scanline_): para cada linha horizontal, interseta a linha com as arestas, ordena as interseções e preenche entre pares. A regra dos pares garante que buracos e concavidades saem certos sem casos especiais.

Toma o triângulo de vértices $(1, 1)$, $(5, 1)$ e $(3, 4)$ e a linha $y = 2$. A aresta esquerda vai de $(1, 1)$ a $(3, 4)$ com declive $\Delta x / \Delta y = 2/3$, logo cruza $y = 2$ em $x = 1 + 2/3 \approx 1{,}67$. A aresta direita vai de $(5, 1)$ a $(3, 4)$ com declive $-2/3$ e cruza em $x = 5 - 2/3 \approx 4{,}33$. Preenchem-se os píxeis inteiros entre elas: $x = 2$, $3$ e $4$. Repete para cada linha e o triângulo fica sólido. As extremidades partilhadas entre arestas tratam-se com uma convenção fixa (por exemplo, contar o mínimo e excluir o máximo) para não pintar nem falhar a fronteira duas vezes.

:::tip[Como cai em teste]
O enunciado típico dá dois pontos e pede a tabela do ponto médio, ou dá um polígono pequeno e uma linha de varrimento com as interseções. Nos dois casos o método é mecânico: monta a tabela passo a passo em vez de tentares adivinhar os píxeis a olho. A tabela é a resposta.
:::
