---
title: Valores e vetores próprios e diagonalização
description: Polinómio característico, cálculo de valores e vetores próprios, diagonalização e matrizes simétricas.
section: conteudo
order: 9
---

Há vetores que uma matriz não roda nem deforma, apenas estica ou encolhe: entram numa direção e saem na mesma direção. São os **vetores próprios**, e o fator de escala é o **valor próprio**. Encontrá-los é descobrir os eixos naturais da transformação, e quando há uma base deles, a matriz torna-se diagonal: a forma mais simples possível.

## Definição

Seja $A$ quadrada de ordem $n$. Um escalar $\lambda$ é um **valor próprio** e um vetor não nulo $v$ é um **vetor próprio** associado quando

$$
Av = \lambda v.
$$

Repara nas duas exigências: $v \neq 0$ (o vetor nulo satisfaz a equação para qualquer $\lambda$, por isso está excluído) e a igualdade é exata, não aproximada.

Para encontrar $\lambda$, reescreve-se como $(A - \lambda I)v = 0$. Como $v \neq 0$, o sistema homogéneo tem de ter soluções não triviais, o que acontece exatamente quando

$$
\det(A - \lambda I) = 0.
$$

O primeiro membro é um polinómio de grau $n$ em $\lambda$, o **polinómio característico**. As suas raízes são os valores próprios. Depois, para cada valor próprio, resolve-se o sistema $(A - \lambda I)v = 0$ para obter os vetores próprios (que formam o **espaço próprio** associado, sempre um subespaço).

## Exemplo completo

Seja $A = \begin{bmatrix} 4 & 1 \\ 2 & 3 \end{bmatrix}$. Então

$$
A - \lambda I = \begin{bmatrix} 4 - \lambda & 1 \\ 2 & 3 - \lambda \end{bmatrix},
$$

$$
\det(A - \lambda I) = (4 - \lambda)(3 - \lambda) - 2 = \lambda^2 - 7\lambda + 10 = (\lambda - 5)(\lambda - 2).
$$

Os valores próprios são $\lambda_1 = 5$ e $\lambda_2 = 2$.

Para $\lambda_1 = 5$: $\begin{bmatrix} -1 & 1 \\ 2 & -2 \end{bmatrix}\begin{bmatrix} x \\ y \end{bmatrix} = 0$ dá $-x + y = 0$ (a segunda equação é redundante), logo $y = x$. Os vetores próprios são os múltiplos não nulos de $(1, 1)$. Confirma: $A(1,1) = (5, 5) = 5(1,1)$.

Para $\lambda_2 = 2$: $\begin{bmatrix} 2 & 1 \\ 2 & 1 \end{bmatrix}\begin{bmatrix} x \\ y \end{bmatrix} = 0$ dá $2x + y = 0$, logo os múltiplos de $(1, -2)$. Confirma: $A(1,-2) = (4 - 2, 2 - 6) = (2, -4) = 2(1,-2)$.

## Diagonalização

Se conseguires uma base de vetores próprios, a matriz da aplicação nessa base é diagonal, com os valores próprios na diagonal. Em forma matricial: se $P$ tem como colunas os vetores próprios (pela ordem dos valores $\lambda_1, \dots, \lambda_n$), então

$$
P^{-1}AP = D = \begin{bmatrix} \lambda_1 & & \\ & \ddots & \\ & & \lambda_n \end{bmatrix}.
$$

Com o exemplo, $P = \begin{bmatrix} 1 & 1 \\ 1 & -2 \end{bmatrix}$ e $D = \begin{bmatrix} 5 & 0 \\ 0 & 2 \end{bmatrix}$. Verifica a igualdade $AP = PD$ (que evita inverter $P$): $AP = \begin{bmatrix} 5 & 2 \\ 5 & -4 \end{bmatrix}$ e $PD = \begin{bmatrix} 5 & 2 \\ 5 & -4 \end{bmatrix}$. Iguais. A matriz é **diagonalizável**.

Isto nem sempre é possível. Há duas causas de falha: o polinómio característico pode não ter raízes reais suficientes (sobre $\mathbb{R}$, uma rotação de $90^\circ$ não tem valores próprios reais), ou pode haver um valor próprio cuja multiplicidade como raiz exceda a dimensão do seu espaço próprio. Vetores próprios associados a valores próprios **distintos** são sempre independentes, por isso uma matriz $n \times n$ com $n$ valores próprios distintos é garantidamente diagonalizável.

A diagonalização simplifica potências: $A^k = PD^kP^{-1}$, e $D^k$ calcula-se elevando cada entrada da diagonal. É assim que se estudam evoluções iteradas (potências de matrizes de transição, recorrências) sem multiplicar matrizes dezenas de vezes.

## Matrizes simétricas e o teorema espectral

Uma matriz real simétrica ($A^T = A$) é sempre diagonalizável, com valores próprios reais e vetores próprios de valores distintos automaticamente ortogonais. É o **teorema espectral**: existe uma base ortonormada de vetores próprios, e a matriz de passagem pode ser escolhida ortogonal ($P^{-1} = P^T$).

Vê com $S = \begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix}$ (a matriz da página de mudanças de base). O polinómio característico é $(2-\lambda)^2 - 1 = \lambda^2 - 4\lambda + 3 = (\lambda - 3)(\lambda - 1)$. Para $\lambda = 3$: $-x + y = 0$, vetor $(1, 1)$. Para $\lambda = 1$: $x + y = 0$, vetor $(1, -1)$. Os dois vetores são ortogonais ($(1,1) \cdot (1,-1) = 0$), como o teorema promete, e normalizando obténs a base ortonormada $\{(1/\sqrt{2}, 1/\sqrt{2}), (1/\sqrt{2}, -1/\sqrt{2})\}$.

:::note[Cónicas e quádricas (tópico opcional)]
O programa indica, caso haja tempo, a aplicação do teorema espectral à identificação de cónicas e quádricas. A ideia: uma equação do segundo grau como $2x^2 + 2xy + 2y^2 = 3$ escreve-se com a matriz simétrica $S$ acima, e rodando para a base própria as variáveis cruzadas desaparecem. Com $u, v$ nas direções de $(1,1)$ e $(1,-1)$, a equação fica $3u^2 + v^2 = 3$, ou seja, $u^2 + v^2/3 = 1$: uma elipse de semieixos $1$ e $\sqrt{3}$. O sinal e o número de valores próprios positivos, negativos e nulos classificam a curva ou superfície.
:::

## O que costuma correr mal

- Aceitar o vetor nulo como vetor próprio, ou apresentar "vetores próprios" sem verificar $Av = \lambda v$ no fim.
- Resolver $\det(A - \lambda I) = 0$ com erros de sinal no polinómio característico, sobretudo no termo independente (que vale $(-1)^n \det A$ e serve de verificação).
- Assumir que qualquer matriz diagonaliza. Testa sempre se tens $n$ vetores próprios independentes antes de escrever $P^{-1}AP = D$.
- Montar $P$ com os vetores por ordem e $D$ com os valores por outra ordem. A coluna $j$ de $P$ tem de corresponder à posição $j$ da diagonal de $D$.
- Em matrizes simétricas, esquecer que a ortogonalidade entre espaços próprios distintos é garantida, mas vetores dentro do mesmo espaço próprio ainda precisam de ser ortogonalizados se quiseres uma base ortonormada.
