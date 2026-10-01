---
title: Cheat sheet de ALGA
description: Fórmulas, condições e decisões de cálculo para consultar enquanto resolves exercícios.
section: recursos
studyKind: revision
editorial:
  basedOn: 2026/27
  sources:
    - title: Resumos ALGA SofiaViP
      url: https://drive.google.com/file/d/1ZBprkJ8SuJvpFFTPqFwNNsCzJyhdJoeA/view
---

Trabalhamos sobre $\mathbb R$. $A$ tem $m$ linhas e $n$ colunas; $r=\operatorname{car}(A)$.

## Matrizes e determinantes

$(m\times n)(n\times p)=m\times p$. $(AB)^T=B^TA^T$. Se as inversas existirem, $(AB)^{-1}=B^{-1}A^{-1}$. $AXB=C\Rightarrow X=A^{-1}CB^{-1}$.

$$
\det\begin{bmatrix}a&b\\c&d\end{bmatrix}=ad-bc,\qquad
A^{-1}=\frac1{ad-bc}\begin{bmatrix}d&-b\\-c&a\end{bmatrix}\quad(ad-bc\ne0).
$$

$C_{ij}=(-1)^{i+j}\det M_{ij}$; Laplace: $\det A=\sum_j a_{ij}C_{ij}$. $\operatorname{adj}(A)=C^T$; $A^{-1}=\operatorname{adj}(A)/\det A$ se $\det A\ne0$.

| Operação                               | Efeito no determinante |
| -------------------------------------- | ---------------------- |
| Trocar duas linhas                     | Muda o sinal           |
| Multiplicar uma linha por $k$          | Multiplica por $k$     |
| Somar a uma linha um múltiplo de outra | Mantém                 |

Triangular: produto da diagonal. $\det(AB)=\det A\det B$, $\det(A^T)=\det A$, $\det(kA)=k^n\det A$. Sarrus só em $3\times3$. Área: $|\det[u\ v]|$; volume: $|\det[u\ v\ w]|$. [Explicação](../determinantes/).

## Sistemas e bases

Gauss atua em **toda** a ampliada. Pivôs não precisam de ser 1. Nunca divides por uma expressão paramétrica antes de separar os seus zeros.

| Para $Ax=b$, com $n$ incógnitas   | Classificação               |
| --------------------------------- | --------------------------- |
| $r<\operatorname{car}[A\mid b]$   | Impossível                  |
| $r=\operatorname{car}[A\mid b]=n$ | Uma solução                 |
| $r=\operatorname{car}[A\mid b]<n$ | Infinitas, $n-r$ parâmetros |

$Ax=0$: sempre possível. $[A\mid I]\to[I\mid A^{-1}]$ se $A$ invertível. Cramer exige $A$ quadrada e $\det A\ne0$: $x_i=\det A_i/\det A$. [Gauss](../sistemas-lineares/).

Subespaço: contém 0, fechado para soma e escalares. Geradores em colunas: base nas **colunas originais com pivô**, dimensão $r$. Equações homogéneas: parametrizar, dimensão $n-r$. Independência: $Ac=0$ só tem $c=0$.

$$
\dim(U+V)=\dim U+\dim V-\dim(U\cap V),\qquad
U\oplus V\iff U\cap V=\{0\}.
$$

Para completar uma base, acrescenta vetores fora do espaço já gerado. [Bases](../espacos-vetoriais/).

## Produtos e ortogonalidade

$$
u\cdot v=\sum_i u_i v_i,\quad \|u\|=\sqrt{u\cdot u},\quad
\cos\theta=\frac{u\cdot v}{\|u\|\|v\|}\quad(u,v\ne0).
$$

$u\times v=(u_2v_3-u_3v_2,u_3v_1-u_1v_3,u_1v_2-u_2v_1)$ em $\mathbb R^3$. Área do paralelogramo: $\|u\times v\|$; triângulo: metade. Volume: $|(u\times v)\cdot w|$; tetraedro: um sexto.

$$
\operatorname{proj}_u v=\frac{v\cdot u}{u\cdot u}u\quad(u\ne0),\qquad
u_j=v_j-\sum_{i<j}\frac{v_j\cdot u_i}{u_i\cdot u_i}u_i.
$$

Gram-Schmidt usa os $u_i$ anteriores; normaliza no fim. Base ortogonal de $W$: soma das projeções; erro em $W^\perp$. $\dim W+\dim W^\perp=n$. [Ortogonalidade](../ortogonalidade/).

## Retas e planos

Reta: $P+td$, $d\ne0$. Plano: $n\cdot X=c$, $n\ne0$. Plano por três pontos: $n=(Q-P)\times(R-P)\ne0$.

$$
d(P,\text{plano})=\frac{|n\cdot P-c|}{\|n\|},\quad
H=P-\frac{n\cdot P-c}{n\cdot n}n,\quad P'=2H-P.
$$

Pé na reta $Q+td$: $H=Q+((P-Q)\cdot d)/(d\cdot d)\,d$. Distância: $\|P-H\|$.

Retas de direções independentes: concorrentes se $(Q-P)\cdot(d_1\times d_2)=0$, enviesadas caso contrário. Distância: módulo desse misto dividido por $\|d_1\times d_2\|$. Direções paralelas exigem a fórmula ponto-reta.

Ângulo mínimo entre retas: $|d_1\cdot d_2|/(\|d_1\|\|d_2\|)$ é o cosseno; entre planos, usa normais; reta-plano, $|d\cdot n|/(\|d\|\|n\|)$ é o **seno**. [Geometria](../retas-planos/).

## Aplicações, coordenadas e valores próprios

Linear: $T(au+bv)=aT(u)+bT(v)$. $T(0)=0$ é necessário, não suficiente. $\ker T$: resolver $Ax=0$; imagem: base nas colunas originais com pivô. $n=\dim\ker T+\dim\operatorname{Im}T$. Injetiva: núcleo nulo; sobrejetiva: característica $m$. Composição $S\circ T$: $BA$, com bases intermédias compatíveis.

$$
v=P_B[v]_B,\quad [v]_C=P_C^{-1}P_B[v]_B,\quad
[T]_{C\leftarrow B}=P_C^{-1}AP_B.
$$

Mesma base no domínio e chegada de um endomorfismo: $A_{\mathrm{novo}}=P^{-1}AP$. [Mudanças de base](../mudanca-de-base/).

$$
p_A(\lambda)=\det(A-\lambda I),\quad E_\lambda=\ker(A-\lambda I),\quad
AP=PD,\quad A^k=PD^kP^{-1}.
$$

Vetor próprio **não nulo**. Constante de $p_A$: $\det A$; coeficiente dominante: $(-1)^n$. Diagonaliza em $\mathbb R$ se houver $n$ vetores próprios reais independentes. Para cada raiz: $1\leq m_g\leq m_a$; exige $m_g=m_a$ e todas as raízes reais. Valores distintos bastam, mas não são necessários. [Diagonalização](../valores-proprios/).

Simétrica: $Q^TAQ=D$, com $Q$ ortogonal. Forma quadrática $X^TAX+\ell^TX+k=0$: metade do coeficiente cruzado fora da diagonal; centro resolve $2Ah+\ell=0$; diagonaliza ortogonalmente e analisa também termos lineares e constante. [Cónicas e quádricas](../conicas-quadricas/).
