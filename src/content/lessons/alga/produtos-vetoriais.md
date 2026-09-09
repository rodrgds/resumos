---
title: Produtos escalar, vetorial e misto
description: Os três produtos em R2 e R3, ângulos, áreas, volumes e ortogonalidade.
section: conteudo
order: 5
---

Somar vetores e multiplicar por escalares chega para a álgebra, mas a geometria precisa de medir: comprimentos, ângulos, áreas e volumes. Há três produtos para isso, cada um com o seu papel. O escalar devolve um número e mede ângulos; o vetorial devolve um vetor perpendicular aos dois fatores e mede áreas; o misto combina os dois e mede volumes.

## Produto escalar: ângulos e comprimentos

O **produto escalar** (ou interno usual) de $u = (u_1, \dots, u_n)$ por $v = (v_1, \dots, v_n)$ é

$$
u \cdot v = u_1 v_1 + u_2 v_2 + \dots + u_n v_n.
$$

A **norma** de $u$ é $\|u\| = \sqrt{u \cdot u}$, o comprimento do vetor. Com $u = (3, 4)$, $\|u\| = \sqrt{9 + 16} = 5$.

A ligação à geometria está na fórmula $u \cdot v = \|u\| \, \|v\| \cos \theta$, onde $\theta$ é o ângulo entre os vetores. Com $u = (1, 0)$ e $v = (1, 1)$: $u \cdot v = 1$, $\|u\| = 1$, $\|v\| = \sqrt{2}$, logo $\cos \theta = 1/\sqrt{2}$ e $\theta = 45^\circ$. O sinal do produto escalar diz-te o tipo de ângulo: positivo é agudo, zero é reto, negativo é obtuso.

Dois vetores com produto escalar nulo dizem-se **ortogonais** (perpendiculares). As propriedades essenciais são a comutatividade, $u \cdot v = v \cdot u$, a distributividade e $(ku) \cdot v = k(u \cdot v)$. Um erro clássico é tentar "dividir" por um vetor ou distribuir uma norma: $\|u + v\|$ não é $\|u\| + \|v\|$ em geral (é a desigualdade triangular: $\|u + v\| \leq \|u\| + \|v\|$).

## Produto vetorial: só em R3

O **produto vetorial** só existe em $\mathbb{R}^3$. Para $a = (a_1, a_2, a_3)$ e $b = (b_1, b_2, b_3)$,

$$
a \times b = (a_2 b_3 - a_3 b_2,\; a_3 b_1 - a_1 b_3,\; a_1 b_2 - a_2 b_1).
$$

Uma mnemónica é o determinante simbólico com os versores $e_1, e_2, e_3$ na primeira linha:

$$
a \times b = \det \begin{bmatrix}
e_1 & e_2 & e_3 \\
a_1 & a_2 & a_3 \\
b_1 & b_2 & b_3
\end{bmatrix},
$$

expandido pela primeira linha. Com $a = (1, 0, 0)$ e $b = (0, 1, 0)$ obténs $(0, 0, 1)$: o produto dos dois primeiros versores canónicos é o terceiro, e as permutações cíclicas funcionam da mesma forma.

O vetor $a \times b$ é ortogonal a $a$ e a $b$ (confirma com o produto escalar: dá sempre zero), e o seu módulo mede a **área do paralelogramo** definido por $a$ e $b$:

$$
\|a \times b\| = \|a\| \, \|b\| \sin \theta.
$$

Por exemplo, $a = (2, 0, 0)$ e $b = (0, 3, 0)$ dão $a \times b = (0, 0, 6)$, com módulo 6: o retângulo de lados 2 e 3. O sentido segue a **regra da mão direita**: com o indicador ao longo de $a$ e o dedo médio ao longo de $b$, o polegar aponta para $a \times b$.

As propriedades pedem atenção porque são quase, mas não exatamente, as habituais:

- **anticomutatividade**: $a \times b = -(b \times a)$;
- distributividade e $(ka) \times b = a \times (kb) = k(a \times b)$;
- **não** é associativo: $a \times (b \times c)$ difere em geral de $(a \times b) \times c$.

Se $a \times b = 0$ com $a$ e $b$ não nulos, os vetores são paralelos (um é múltiplo escalar do outro). É um teste de paralelismo muito prático.

## Produto misto: volumes e coplanaridade

O **produto misto** de três vetores de $\mathbb{R}^3$ é o número $[u, v, w] = (u \times v) \cdot w$, que coincide com o determinante da matriz que tem os três vetores como linhas (ou colunas):

$$
[u, v, w] = \det \begin{bmatrix}
u_1 & u_2 & u_3 \\
v_1 & v_2 & v_3 \\
w_1 & w_2 & w_3
\end{bmatrix}.
$$

O seu módulo é o **volume do paralelepípedo** definido pelos três vetores. Os versores canónicos dão determinante 1, logo o cubo unitário tem volume 1, como esperado.

A consequência mais usada: $[u, v, w] = 0$ exatamente quando os três vetores são **coplanares** (linearmente dependentes). Testa $u = (1, 1, 0)$, $v = (0, 1, 1)$, $w = (1, 2, 1)$. Primeiro $u \times v = (1 \cdot 1 - 0 \cdot 1,\; 0 \cdot 0 - 1 \cdot 1,\; 1 \cdot 1 - 1 \cdot 0) = (1, -1, 1)$. Depois $(u \times v) \cdot w = 1 \cdot 1 + (-1) \cdot 2 + 1 \cdot 1 = 0$. São coplanares: de facto, $w = u + v$. Permutações cíclicas dos três vetores mantêm o valor do produto misto; trocar dois deles troca o sinal, tal como no determinante.

## Quadro comparativo

| Produto      | Onde vive      | Resultado | Mede                     | Zero significa     |
| ------------ | -------------- | --------- | ------------------------ | ------------------ |
| $u \cdot v$  | $\mathbb{R}^n$ | escalar   | ângulo, comprimento      | ortogonalidade     |
| $u \times v$ | $\mathbb{R}^3$ | vetor     | área do paralelogramo    | vetores paralelos  |
| $[u, v, w]$  | $\mathbb{R}^3$ | escalar   | volume do paralelepípedo | vetores coplanares |

## O que costuma correr mal

- Calcular produtos vetoriais em $\mathbb{R}^2$. Não existem: ou trabalhas com o escalar, ou mergulhas os vetores em $\mathbb{R}^3$ com terceira coordenada zero.
- Trocar a ordem do produto vetorial sem trocar o sinal, ou assumir associatividade.
- Errar sinais nas componentes do meio do produto vetorial (a segunda componente é $a_3 b_1 - a_1 b_3$, com a ordem "trocada" em relação ao que o padrão sugere).
- Esquecer o módulo ao calcular áreas e volumes: o produto vetorial é um vetor e o misto tem sinal; áreas e volumes usam o valor absoluto.
