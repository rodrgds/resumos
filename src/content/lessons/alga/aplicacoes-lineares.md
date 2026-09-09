---
title: Aplicações lineares
description: Definição, núcleo e imagem, teorema das dimensões e representação matricial.
section: conteudo
order: 7
---

Uma **aplicação linear** (ou transformação linear) é uma função entre espaços vetoriais que respeita as operações: preserva somas e múltiplos escalares. Rotações, projeções, reflexões e derivação de polinómios são exemplos. A recompensa desta abstração é que cada aplicação linear corresponde a uma matriz, e todas as perguntas sobre a função passam a ser contas com essa matriz.

## Definição e primeiro teste

Uma função $T: V \to W$ entre espaços vetoriais é linear quando, para todos $u, v \in V$ e escalares $\alpha, \beta$,

$$
T(\alpha u + \beta v) = \alpha T(u) + \beta T(v).
$$

Isto equivale às duas condições separadas, $T(u + v) = T(u) + T(v)$ e $T(\alpha u) = \alpha T(u)$, mas a versão junta é mais rápida de verificar.

O teste mais rápido de todos: se $T(0) \neq 0$, a aplicação não é linear. Por exemplo, $T(x, y) = (x + 1, y)$ não é linear porque $T(0, 0) = (1, 0)$. Atenção ao recíproco: $T(0) = 0$ não chega para provar linearidade, apenas elimina os casos óbvios. Um exemplo que passa no teste do zero e mesmo assim falha: $T(x, y) = (x^2, y)$, porque $T(2 \cdot (1, 0)) = (4, 0) \neq 2T(1, 0) = (2, 0)$.

Um exemplo que funciona: $T: \mathbb{R}^2 \to \mathbb{R}^3$ dada por $T(x, y) = (x + 2y, -y, x - y)$. Verifica com $(x_1, y_1)$, $(x_2, y_2)$ e escalares $\alpha, \beta$: cada coordenada do resultado é uma expressão linear, logo a soma e os escalares saem para fora sem obstáculos. Vais usá-lo ao longo da página.

## Núcleo, imagem e o teorema das dimensões

O **núcleo** (ou kernel) de $T$ é o conjunto dos vetores que $T$ envia para zero:

$$
\ker T = \{v \in V : T(v) = 0\}.
$$

É sempre um subespaço do domínio. Para o exemplo, $T(x, y) = (0, 0, 0)$ dá $x + 2y = 0$, $-y = 0$ e $x - y = 0$, logo $y = 0$ e $x = 0$: o núcleo é só $\{(0, 0)\}$.

A **imagem** de $T$ é o conjunto dos valores atingidos, $\operatorname{Im} T = \{T(v) : v \in V\}$, um subespaço do espaço de chegada. No exemplo, $T(x, y) = x(1, 0, 1) + y(2, -1, -1)$, por isso a imagem é gerada por $(1, 0, 1)$ e $(2, -1, -1)$, dois vetores independentes: é um plano em $\mathbb{R}^3$.

O **teorema das dimensões** (ou teorema núcleo-imagem) liga as duas:

$$
\dim \ker T + \dim \operatorname{Im} T = \dim V.
$$

Aqui, $0 + 2 = 2 = \dim \mathbb{R}^2$. Confirmado. Este teorema responde a perguntas de existência sem contas: uma aplicação linear de $\mathbb{R}^2$ em $\mathbb{R}^3$ nunca é sobrejetiva, porque a imagem tem dimensão no máximo 2.

O núcleo decide a **injetividade**: $T$ é injetiva exatamente quando $\ker T = \{0\}$. A imagem decide a **sobrejetividade**: $T$ é sobrejetiva exatamente quando $\operatorname{Im} T = W$. O exemplo é injetivo mas não sobrejetivo. Quando o domínio e o contradomínio têm a mesma dimensão, basta verificar uma das duas: injetiva equivale a sobrejetiva (e ambas a "o núcleo é trivial").

## Representação matricial

Fixadas bases no domínio e no espaço de chegada, cada aplicação linear descreve-se por uma matriz: a coluna $j$ é a imagem do $j$-ésimo vetor da base do domínio, escrita em coordenadas na base de chegada. Com as bases canónicas, basta aplicar $T$ aos versores.

Para o exemplo $T(x, y) = (x + 2y, -y, x - y)$: $T(1, 0) = (1, 0, 1)$ e $T(0, 1) = (2, -1, -1)$. A matriz é

$$
M(T) = \begin{bmatrix}
1 & 2 \\
0 & -1 \\
1 & -1
\end{bmatrix},
$$

e aplicar $T$ é multiplicar: $T(x, y) = M(T)\begin{bmatrix} x \\ y \end{bmatrix}$. Confirma com $(3, 1)$: a matriz dá $(3 + 2, -1, 3 - 1) = (5, -1, 2)$, igual à fórmula direta.

Duas consequências práticas. A **composta** de aplicações corresponde ao produto das matrizes (pela ordem certa: a matriz de $S \circ T$ é $M(S)M(T)$). E $T$ é invertível (isomorfismo) exatamente quando a matriz é quadrada e invertível; nesse caso, a matriz da inversa é a inversa da matriz.

O núcleo de $T$ é o conjunto das soluções do sistema homogéneo $M(T)X = 0$, e a imagem é o espaço gerado pelas colunas de $M(T)$. Por isso a característica da matriz dá $\dim \operatorname{Im} T$, e o teorema das dimensões mais não é do que "variáveis livres mais pivôs igual ao número de incógnitas" com outro nome.

## Um endomorfismo completo

Considera $S: \mathbb{R}^2 \to \mathbb{R}^2$ com $S(x, y) = (2x + y, x + 2y)$. A matriz canónica é $\begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix}$, de determinante $4 - 1 = 3 \neq 0$. Logo $S$ é invertível, o núcleo é trivial e a imagem é todo o $\mathbb{R}^2$: injetiva e sobrejetiva. A inversa obtém-se invertendo a matriz:

$$
M(S)^{-1} = \frac{1}{3}\begin{bmatrix} 2 & -1 \\ -1 & 2 \end{bmatrix},
\qquad S^{-1}(u, v) = \left(\frac{2u - v}{3}, \frac{-u + 2v}{3}\right).
$$

Verifica com $(u, v) = (5, 4)$: $S^{-1}(5, 4) = (2, 1)$, e $S(2, 1) = (5, 4)$. Fechou o ciclo.

## O que costuma correr mal

- Concluir linearidade só porque $T(0) = 0$. É condição necessária, não suficiente: testa sempre a soma e o produto por escalar, com um contraexemplo concreto se suspeitares.
- Construir a matriz da aplicação com as imagens em linha em vez de coluna, ou trocar a ordem do produto na composta $S \circ T$.
- Misturar bases: a matriz canónica só vale para as bases canónicas dos dois lados. Com outras bases, precisas das matrizes de mudança de base (próxima página).
- Esquecer que injetividade é sobre o núcleo e sobrejetividade sobre a imagem, e tentar prová-las diretamente com quantificadores quando o teorema das dimensões resolve em duas linhas.
