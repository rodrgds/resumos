---
title: Cheat sheet de ALGA
description: Fórmulas, testes e passos de cálculo para matrizes, sistemas, espaços vetoriais, aplicações lineares e valores próprios.
section: recursos
studyKind: revision
editorial:
  sources:
    - title: Resumos ALGA SofiaViP
      url: https://drive.google.com/file/d/1ZBprkJ8SuJvpFFTPqFwNNsCzJyhdJoeA/view
  coverage: As 11 páginas do PDF cobrem matrizes, determinantes, sistemas lineares, subespaços de R^n, bases, aplicações lineares, mudanças de base e diagonalização.
  gaps:
    - O PDF não trata produtos vetorial e misto, retas, planos, o teorema espectral nem a diagonalização de matrizes simétricas.
    - A edição do programa e as regras de avaliação a que estes apontamentos correspondem não foram confirmadas.
---

Todas as matrizes e todos os espaços desta folha são **reais**.

## Matrizes e determinantes

Para $A\in M_{m\times n}$ e $B\in M_{n\times p}$, o produto existe e tem dimensão $m\times p$:

$$
(AB)_{ij}=\sum_{k=1}^{n}a_{ik}b_{kj},\qquad (AB)^T=B^TA^T.
$$

Soma e subtração exigem dimensões iguais. O produto **não é comutativo** em geral, mesmo quando $AB$ e $BA$ existem. Para $A$ quadrada, $\operatorname{tr}(A)=\sum_i a_{ii}$; $A$ é simétrica se $A^T=A$. Revê [o produto de matrizes](/cadeiras/alga/matrizes/#produto-de-matrizes) e [a transposta](/cadeiras/alga/matrizes/#transposta).

Para $A=\begin{bmatrix}a&b\\c&d\end{bmatrix}$,

$$
\det A=ad-bc,\qquad
A^{-1}=\frac{1}{ad-bc}\begin{bmatrix}d&-b\\-c&a\end{bmatrix}
\quad\text{se }ad-bc\ne0.
$$

Numa matriz $n\times n$, o cofactor é $C_{ij}=(-1)^{i+j}\det A_{ij}$, onde $A_{ij}$ resulta de eliminar a linha $i$ e a coluna $j$. Para uma linha fixa $i$, $\det A=\sum_{j=1}^n a_{ij}C_{ij}$; podes expandir de modo análogo por uma coluna. Escolhe uma com zeros. Se $\det A\ne0$, então $A^{-1}=\operatorname{adj}(A)/\det A$, com $\operatorname{adj}(A)=(C_{ij})^T$. Vê [Laplace e a adjunta](/cadeiras/alga/determinantes/#regra-de-laplace-e-matriz-adjunta).

| Alteração de uma linha (ou coluna) | Efeito no determinante |
| ---------------------------------- | ---------------------- |
| Trocar duas                        | Muda de sinal          |
| Multiplicar uma por $k$            | Multiplica por $k$     |
| Somar a uma um múltiplo de outra   | Não muda               |

Para matrizes quadradas da mesma ordem, $\det(AB)=\det A\det B$, $\det(A^T)=\det A$ e $A$ é invertível se e só se $\det A\ne0$. Numa triangular, o determinante é o produto da diagonal. **Não** vale $\det(A+B)=\det A+\det B$ em geral. O módulo de $\det A$ mede a área ou o volume escalado pelos vetores das colunas em dimensão 2 ou 3. Revê [as propriedades](/cadeiras/alga/determinantes/#propriedades-que-poupam-trabalho).

## Sistemas lineares e inversa por Gauss

Para $Ax=b$ com $n$ incógnitas, reduz a matriz aumentada $[A\mid b]$ por operações elementares de linhas. Uma linha $[0\ \cdots\ 0\mid c]$, com $c\ne0$, prova que o sistema é impossível. Caso contrário, identifica pivôs e toma as colunas sem pivô como variáveis livres. Se $x_0$ é uma solução, **todas** são $x_0+z$ com $z\in\ker A$. Segue [o método de Gauss](/cadeiras/alga/sistemas-lineares/#o-método-de-gauss).

Escrevendo $r=\operatorname{car}(A)$ e $r'=\operatorname{car}([A\mid b])$:

| Condição | Soluções                               |
| -------- | -------------------------------------- |
| $r<r'$   | Nenhuma                                |
| $r=r'=n$ | Uma                                    |
| $r=r'<n$ | Infinitas, com $n-r$ parâmetros livres |

Num sistema homogéneo $Ax=0$ há sempre a solução nula. Há outras exatamente quando $\operatorname{car}(A)<n$. Se $A$ é quadrada, $\det A\ne0$ equivale a uma única solução para **cada** $b$. Vê [a classificação pela característica](/cadeiras/alga/sistemas-lineares/#característica-e-classificação).

Para calcular $A^{-1}$, reduz $[A\mid I_n]$ até $[I_n\mid A^{-1}]$. Se o bloco esquerdo não chegar a $I_n$, $A$ é singular. A [regra de Cramer](/cadeiras/alga/determinantes/#regra-de-cramer) só serve para $A$ **quadrada e invertível**: $x_i=\det(A_i)/\det A$, substituindo a coluna $i$ de $A$ por $b$.

## Subespaços, bases e coordenadas

Um conjunto não vazio $S\subseteq\mathbb R^n$ é subespaço se for fechado para $u+v$ e $\alpha u$. Tem de conter $0$. Para $S=\operatorname{span}(v_1,\ldots,v_k)$, põe os geradores em colunas: os pivôs dão uma base **entre as colunas originais**, e a característica dá $\dim S$. Para testar independência, resolve $[v_1\ \cdots\ v_k]c=0$; só a solução $c=0$ significa independência. Revê [subespaços](/cadeiras/alga/espacos-vetoriais/#subespaços-conjuntos-fechados-para-as-operações) e [independência](/cadeiras/alga/espacos-vetoriais/#independência-linear).

Uma base ordenada $B=(b_1,\ldots,b_n)$ gera o espaço e é independente. Se $P_B=[b_1\ \cdots\ b_n]$ em coordenadas canónicas, então $v=P_B[v]_B$ e $[v]_B=P_B^{-1}v$. Uma base de $\mathbb R^n$ tem exatamente $n$ vetores; para $n$ vetores, basta verificar independência **ou** geração. Vê [bases e coordenadas](/cadeiras/alga/espacos-vetoriais/#bases-e-dimensão).

Numa base ortonormada, $b_i\cdot b_j=0$ para $i\ne j$ e $\|b_i\|=1$. Para subespaços $U,W$, $U\oplus W$ quer dizer $U+W$ com representação única, ou seja, $U\cap W=\{0\}$. Se ainda $U+W=\mathbb R^n$, então $\dim U+\dim W=n$.

## Aplicações lineares e mudança de base

Para $T:\mathbb R^n\to\mathbb R^m$ linear, $T(u+v)=T(u)+T(v)$ e $T(\alpha u)=\alpha T(u)$. Na base canónica, a coluna $j$ da matriz $A$ é $T(e_j)$. Calcula $\ker T$ resolvendo $Ax=0$ e $\operatorname{im}T$ usando uma base do espaço das colunas. O [teorema das dimensões](/cadeiras/alga/aplicacoes-lineares/#núcleo-imagem-e-o-teorema-das-dimensões) dá

$$
n=\dim\ker T+\dim\operatorname{im}T.
$$

$T$ é injetiva se $\ker T=\{0\}$; é sobrejetiva se $\operatorname{car}(A)=m$. Para um endomorfismo de $\mathbb R^n$, injetividade, sobrejetividade, $\det A\ne0$ e invertibilidade são equivalentes.

Para bases ordenadas $B$ no domínio e $C$ no contradomínio, a coluna $j$ de $[T]_{B,C}$ é $[T(b_j)]_C$. Se $P_{B\to E}$ recebe coordenadas em $B$ e devolve coordenadas na base $E$, então $[v]_E=P_{B\to E}[v]_B$ e $P_{E\to B}=P_{B\to E}^{-1}$. Para um endomorfismo com matriz antiga $A$, se $P$ leva coordenadas **novas para antigas**, a matriz nova é $P^{-1}AP$. Revê [a direção da mudança](/cadeiras/alga/mudanca-de-base/#coordenadas-e-a-matriz-de-passagem) e [a matriz da aplicação](/cadeiras/alga/mudanca-de-base/#mudar-a-matriz-de-uma-aplicação-linear).

## Valores próprios e diagonalização

Para $A\in M_{n\times n}$, encontra as raízes reais de $p_A(\lambda)=\det(A-\lambda I_n)$. Para cada raiz, resolve $(A-\lambda I_n)v=0$: $E_\lambda=\ker(A-\lambda I_n)$ é o espaço próprio, mas um **vetor próprio tem de ser não nulo**. $0$ é valor próprio se e só se $A$ é singular. Numa matriz triangular, os valores próprios são as entradas da diagonal. Vê [a definição e o cálculo](/cadeiras/alga/valores-proprios/#definição).

$A$ é diagonalizável sobre $\mathbb R$ se e só se existe uma base real de vetores próprios. Escolhe essas colunas para $P$; então $P^{-1}AP=D$ e a diagonal de $D$ lista os valores próprios pela mesma ordem. Com valores próprios distintos $\lambda_1,\ldots,\lambda_s$, verifica $\sum_i\dim E_{\lambda_i}=n$. Ter $n$ valores próprios distintos garante diagonalização, mas **não é necessário**. Confirma a conta por $AP=PD$. Vê [diagonalização](/cadeiras/alga/valores-proprios/#diagonalização).

Esta folha cobre o PDF consultado, não todo o programa de ALGA. Para os temas que nele faltam, usa as páginas de [produtos vetoriais](/cadeiras/alga/produtos-vetoriais/) e [retas e planos](/cadeiras/alga/retas-planos/).
