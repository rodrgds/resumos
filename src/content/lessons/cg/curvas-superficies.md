---
title: Curvas e superfícies
description: Curvas paramétricas de Bézier avaliadas por de Casteljau e a passagem a superfícies.
section: conteudo
order: 4
---

Malhas de triângulos aproximam superfícies suaves à força de subdivisão. As **curvas e superfícies paramétricas** descrevem a suavidade diretamente com fórmulas, e só no fim se convertem em triângulos para renderizar. São elas que desenham letras, carroçarias e personagens. A curva de Bézier é a porta de entrada: simples, geométrica e com um algoritmo de avaliação que se faz à mão.

## Curvas paramétricas

Uma **curva paramétrica** é uma função $\mathbf{P}(t)$ que para cada $t$ num intervalo (normalmente $[0, 1]$) devolve um ponto. Uma **curva de Bézier cúbica** fica definida por quatro pontos de controlo $P_0, P_1, P_2, P_3$: a curva começa em $P_0$, termina em $P_3$ e os dois do meio puxam-na sem a tocar. Mover um ponto de controlo deforma só a vizinhança, o que torna a edição intuitiva.

A avaliação faz-se pelo algoritmo de **de Casteljau**: interpolação linear repetida. Para um dado $t$, interpola cada par de pontos adjacentes com peso $t$, obtendo menos um ponto; repete até restar um só, que é $\mathbf{P}(t)$. Com $t = 0{,}5$ cada passo é uma média simples, ideal para fazer à mão.

## Exemplo: um ponto da curva

Sejam $P_0 = (0, 0)$, $P_1 = (1, 2)$, $P_2 = (3, 2)$ e $P_3 = (4, 0)$, com $t = 0{,}5$. Primeira ronda de médias:

$$
Q_0 = \frac{P_0 + P_1}{2} = (0{,}5,\ 1), \qquad
Q_1 = \frac{P_1 + P_2}{2} = (2,\ 2), \qquad
Q_2 = \frac{P_2 + P_3}{2} = (3{,}5,\ 1).
$$

Segunda ronda:

$$
R_0 = \frac{Q_0 + Q_1}{2} = (1{,}25,\ 1{,}5), \qquad
R_1 = \frac{Q_1 + Q_2}{2} = (2{,}75,\ 1{,}5).
$$

Ronda final:

$$
S = \frac{R_0 + R_1}{2} = (2,\ 1{,}5).
$$

O ponto da curva em $t = 0{,}5$ é $(2,\ 1{,}5)$. Repara que ficou abaixo dos pontos de controlo do meio, que estão em altura 2: a curva não passa por eles, apenas é atraída. E repara ainda que o algoritmo subdivide a curva ao meio como bónus: os pontos $P_0, Q_0, R_0, S$ definem a metade esquerda e $S, R_1, Q_2, P_3$ a metade direita.

:::warning[O erro mais comum]
Interpolar pontos não adjacentes ou saltar uma ronda. O de Casteljau só mistura vizinhos e reduz a lista de um ponto por ronda: 4 pontos, depois 3, depois 2, depois 1. Se o teu esquema não encolhe assim, volta atrás.
:::

## De curvas a superfícies

Uma **superfície paramétrica** é $\mathbf{S}(u, v)$ com dois parâmetros: uma grelha de pontos de controlo em vez de uma fila. O **retalho de Bézier** bicúbico usa $4 \times 4$ pontos e avalia-se aplicando de Casteljau numa direção e depois na outra. Coser vários retalhos exige continuidade nas fronteiras, e é aí que entram as variantes usadas na indústria (_splines_, B-splines, NURBS), que garantem suavidade automática entre troços. Para a cadeira, fixa a ideia central: a superfície suave nasce de pontos de controlo e só vira [malha de triângulos](modelacao-malhas/) na altura de desenhar.
