---
title: Transformações geométricas 2D e 3D
description: Translação, escala e rotação em coordenadas homogéneas, composição e câmara.
section: conteudo
order: 2
---

Mover um objeto na cena é multiplicar os seus vértices por uma matriz. Rodar a câmara é multiplicar por outra. As **transformações geométricas** são o vocabulário com que se diz onde está cada coisa e para onde olha a câmara. Se dominares a composição de matrizes, metade dos exercícios da cadeira passam a ser multiplicações que já sabes fazer.

## Coordenadas homogéneas

A translação não é linear: somar $(t_x, t_y)$ a um ponto não se escreve como produto por uma matriz $2 \times 2$. A solução é acrescentar uma coordenada e trabalhar em **coordenadas homogéneas**: o ponto 2D $(x, y)$ passa a $(x, y, 1)$ e o ponto 3D $(x, y, z)$ passa a $(x, y, z, 1)$. Com esta coordenada extra, translação, escala e rotação escrevem-se todas como produtos por matrizes, e compor transformações é multiplicar matrizes. No fim divide-se pela última coordenada para voltar ao espaço original. Revê o [produto de matrizes](/cadeiras/alga/matrizes/) se a multiplicação já não sair automática, porque a ordem vai importar.

As três transformações básicas em 2D, aplicadas a vetores coluna, são:

$$
T(t_x, t_y) = \begin{bmatrix} 1 & 0 & t_x \\ 0 & 1 & t_y \\ 0 & 0 & 1 \end{bmatrix}, \qquad
S(s_x, s_y) = \begin{bmatrix} s_x & 0 & 0 \\ 0 & s_y & 0 \\ 0 & 0 & 1 \end{bmatrix}, \qquad
R(\theta) = \begin{bmatrix} \cos\theta & -\sin\theta & 0 \\ \sin\theta & \cos\theta & 0 \\ 0 & 0 & 1 \end{bmatrix}.
$$

Em 3D as matrizes são $4 \times 4$ com a mesma estrutura: a translação ocupa a última coluna, a escala a diagonal e a rotação um bloco $3 \times 3$. Rotações em 3D fazem-se eixo a eixo, e cada eixo tem a sua matriz.

## A ordem muda o resultado

Com vetores coluna, a matriz da direita aplica-se primeiro: em $M = T \cdot R \cdot S$, o ponto sofre primeiro a escala $S$, depois a rotação $R$ e por fim a translação $T$. Trocar a ordem dá outro movimento. Esta é a armadilha clássica: "rodar e depois mover" não é "mover e depois rodar".

Toma o ponto $P = (1, 0, 0)$, a escala uniforme $S$ de fator 2, a rotação $R$ de $90°$ sobre $z$ e a translação $T$ de $(1, 0, 0)$:

$$
S = \begin{bmatrix} 2 & 0 & 0 & 0 \\ 0 & 2 & 0 & 0 \\ 0 & 0 & 2 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}, \quad
R = \begin{bmatrix} 0 & -1 & 0 & 0 \\ 1 & 0 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}, \quad
T = \begin{bmatrix} 1 & 0 & 0 & 1 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}.
$$

Com $M = T \cdot R \cdot S$, o ponto escala primeiro para $(2, 0, 0)$, roda para $(0, 2, 0)$ e translada para $(1, 2, 0)$. Podes confirmar multiplicando a matriz composta:

$$
M = T \cdot R \cdot S = \begin{bmatrix} 0 & -2 & 0 & 1 \\ 2 & 0 & 0 & 0 \\ 0 & 0 & 2 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}, \qquad
M \cdot \begin{bmatrix} 1 \\ 0 \\ 0 \\ 1 \end{bmatrix} = \begin{bmatrix} 1 \\ 2 \\ 0 \\ 1 \end{bmatrix}.
$$

Com a ordem trocada, $M' = S \cdot R \cdot T$, o ponto translada primeiro para $(2, 0, 0)$, roda para $(0, 2, 0)$ e escala para $(0, 4, 0)$. Mesmo ingredientes, destino diferente. Quando o enunciado disser "roda o objeto sobre si próprio e depois coloca-o na posição", a rotação fica à direita e a translação à esquerda.

## Instancing e câmara

A composição também serve para reutilizar geometria: defines um modelo uma vez e desenhas várias cópias com matrizes de modelação diferentes. A isto chama-se **instancing**, e é como se enche uma cena de árvores ou cadeiras sem duplicar vértices.

A **transformação de vista** é a mesma ideia ao contrário: em vez de mover a câmara pelo mundo, move-se o mundo para a frente da câmara com a matriz inversa do seu posicionamento. Uma câmara na posição $C$ a olhar para o ponto $A$ constrói-se com uma base ortonormal (direita, cima, frente) que roda o mundo, seguida da translação por $-C$. Rotações, projeções e composição enquanto aplicações lineares estão explicadas nas [aplicações lineares](/cadeiras/alga/aplicacoes-lineares/).

:::warning[A convenção antes da conta]
Antes de multiplicares, confirma três coisas: vetores coluna ou linha (muda o lado da matriz), ângulos em graus ou radianos e se a rotação é sobre o eixo certo. Nove em cada dez exercícios errados falham aqui, não na multiplicação.
:::
