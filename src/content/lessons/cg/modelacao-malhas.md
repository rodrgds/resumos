---
title: Malhas poligonais e sólidos
description: Triângulos, normais, orientação e noções de sólidos para construir cenas 3D.
section: conteudo
order: 3
---

A maioria dos objetos 3D que vês num jogo é uma **malha poligonal**: uma coleção de triângulos colados pelas arestas que aproxima uma superfície. Modelar é escolher esses triângulos, e sombreá-los bem exige saber para onde aponta cada face. Esta página mostra a estrutura da malha e a conta mais importante sobre ela, a normal de um triângulo.

## A estrutura da malha

Uma malha guarda três listas: **vértices** (posições 3D), **arestas** (pares de vértices) e **faces** (normalmente triângulos, trios de vértices). O triângulo é a face preferida porque três pontos definem sempre um plano, enquanto um quadrilátero pode ficar torcido. Mais triângulos significa superfície mais suave e mais memória; menos triângulos significa arestas visíveis e renderização mais rápida. Esse compromisso aparece em todos os projetos.

Cada face tem dois lados: a **face frontal**, que deve ser visível, e a **face traseira**, que normalmente se descarta. O que distingue uma da outra é a **ordem dos vértices** (_winding_): vistos de fora do objeto, os vértices da face frontal aparecem por ordem contrária aos ponteiros do relógio. O hardware usa esta convenção para o _backface culling_, que salta as faces traseiras sem as rasterizar e poupa metade do trabalho em objetos fechados.

## A normal do triângulo

A **normal** é o vetor perpendicular à face, e é ela que diz à [iluminação](iluminacao-sombreamento/) quanta luz a face recebe. Para o triângulo de vértices $A$, $B$ e $C$, constrói duas arestas e faz o produto vetorial:

$$
\mathbf{n} = (B - A) \times (C - A),
$$

seguido da normalização $\hat{\mathbf{n}} = \mathbf{n} / \lVert \mathbf{n} \rVert$. Pela regra da mão direita, esta normal aponta para o lado de onde os vértices $A$, $B$, $C$ se veem por ordem contrária aos ponteiros do relógio, ou seja, para fora se a ordem estiver certa.

Toma $A = (0, 0, 0)$, $B = (1, 0, 0)$ e $C = (0, 1, 0)$. As arestas são $B - A = (1, 0, 0)$ e $C - A = (0, 1, 0)$, e o produto vetorial dá:

$$
\mathbf{n} = (1, 0, 0) \times (0, 1, 0) = (0 \cdot 0 - 0 \cdot 1,\ 0 \cdot 0 - 1 \cdot 0,\ 1 \cdot 1 - 0 \cdot 0) = (0, 0, 1).
$$

O módulo é $1$, por isso a normal unitária é $(0, 0, 1)$: aponta para $+z$, perpendicular ao plano $xy$ onde vive o triângulo. Se trocares $B$ com $C$, a normal sai $(0, 0, -1)$ e a face passa a olhar para o outro lado. É assim que se deteta uma malha com a orientação trocada: as normais apontam para dentro do objeto em vez de para fora.

:::tip[Normais de vértice]
Na prática, cada vértice guarda a média das normais das faces vizinhas, e a iluminação interpola essas normais pela face. É isso que faz uma esfera de poucos triângulos parecer redonda em vez de facetada. Vais usar esta ideia no sombreamento de Phong.
:::

## Dos triângulos aos sólidos

Triângulos soltos não chegam para operações como furar ou unir objetos: é preciso saber o que é dentro e fora. Um **sólido** válido é fechado (sem buracos na fronteira), com cada aresta partilhada por exatamente duas faces e orientação consistente. Representações como fronteira por faces, geometria sólida construtiva (união, interseção e diferença de primitivas) ou voxels impõem essa validade de formas diferentes. Para o projeto da cadeira basta reter a ideia: uma malha para renderizar pode ter falhas que uma malha para imprimir em 3D não pode ter.
