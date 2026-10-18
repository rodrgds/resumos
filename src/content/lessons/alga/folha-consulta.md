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

Trabalhamos sobre $\mathbb R$. $A$ é $m\times n$ e $r=\operatorname{car}(A)$ é o número de pivôs da forma em escada. Cada secção indica a página com a explicação completa.

## Decidir o método

| Pergunta                                  | Resposta                                                                                                                                    |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| O produto $AB$ existe? De onde para onde? | Colunas de $A$ = linhas de $B$. Resultado: linhas de $A$ × colunas de $B$. Lê os tipos lado a lado: $(m\times p)(p\times n)$ dá $m\times n$ |
| $AX=B$ ou $XA=B$? De que lado multiplico? | $AX=B$ multiplica **à esquerda**: $X=A^{-1}B$. $XA=B$ multiplica **à direita**: $X=BA^{-1}$. Trocar o lado dá outra matriz                  |
| $(AB)^{-1}$ ou $(AB)^T$? Que ordem?       | A ordem inverte-se sempre: $(AB)^{-1}=B^{-1}A^{-1}$, $(AB)^T=B^TA^T$                                                                        |
| Sistema com parâmetro?                    | Separa os zeros do pivô antes de dividir. Determinante nulo não distingue impossível de indeterminado                                       |
| Base por geradores ou equações?           | Geradores: elimina colunas, fica com as **originais** nos pivôs. Equações: parametriza pelas livres                                         |
| Preciso de normal ou de número?           | Normal ou área: produto vetorial. Ângulo ou comprimento: produto escalar. Volume: produto misto                                             |
| Reta ou plano? Que vetor uso?             | Reta: ponto + **direção** (ao longo). Plano: ponto + **normal** (perpendicular). Trocar dá o objeto perpendicular ao pretendido             |
| Lei por dados?                            | Decompõe o argumento na base dos dados e aplica linearidade a cada parcela                                                                  |
| Que matriz de passagem? Em que sentido?   | $M_{B\to C}$ recebe coordenadas **em $B$** e devolve **em $C$**. A coluna $j$ é $[b_j]_C$                                                   |
| Diagonaliza?                              | Precisas de $n$ vetores próprios independentes reais. Por raiz: $m_g=m_a$ em todas                                                          |
| Cónica com termo cruzado?                 | Matriz simétrica, centro por $2Ah+\ell=0$, $Q$ ortogonal para retirar cruzados                                                              |

## Matrizes e determinantes

$(m\times n)(n\times p)=m\times p$. $(AB)^T=B^TA^T$. Se invertíveis, $(AB)^{-1}=B^{-1}A^{-1}$ e $AXB=C\Rightarrow X=A^{-1}CB^{-1}$.

$$
\det\begin{bmatrix}a&b\\c&d\end{bmatrix}=ad-bc,\qquad
A^{-1}=\frac1{ad-bc}\begin{bmatrix}d&-b\\-c&a\end{bmatrix}\quad(ad-bc\ne0).
$$

Laplace: retira linha $i$ e coluna $j$ ($M_{ij}$), cofator $C_{ij}=(-1)^{i+j}\det M_{ij}$, $\det A=\sum_j a_{ij}C_{ij}$. Adjunta $\operatorname{adj}(A)=C^T$; se $\det A\ne0$, $A^{-1}=\operatorname{adj}(A)/\det A$.

| Operação na linha       | Efeito no determinante |
| ----------------------- | ---------------------- |
| Trocar duas             | Muda o sinal           |
| Multiplicar por $k$     | Multiplica por $k$     |
| Somar múltiplo de outra | Mantém                 |

Quadradas da mesma ordem $n$: triangular dá o produto da diagonal; $\det(AB)=\det A\det B$; $\det(A^T)=\det A$; $\det(kA)=k^n\det A$. Sarrus só em $3\times3$. Área: $|\det[u\ v]|$; volume: $|\det[u\ v\ w]|$. [Explicação](/cadeiras/alga/determinantes/).

## Sistemas e bases

Gauss atua na ampliada inteira; pivôs não precisam de ser 1; nunca divides por expressão paramétrica antes de separar os zeros.

| $Ax=b$, $n$ incógnitas            | Classificação               |
| --------------------------------- | --------------------------- |
| $r<\operatorname{car}[A\mid b]$   | Impossível                  |
| $r=\operatorname{car}[A\mid b]=n$ | Uma solução                 |
| $r=\operatorname{car}[A\mid b]<n$ | Infinitas, $n-r$ parâmetros |

$Ax=0$ tem sempre solução; não triviais exatamente quando $r<n$. $[A\mid I]\to[I\mid A^{-1}]$ se invertível. Cramer exige quadrada com $\det A\ne0$: $x_i=\det A_i/\det A$. [Gauss](/cadeiras/alga/sistemas-lineares/).

Subespaço: contém 0, fechado para soma e escalares. Geradores em colunas: base nas **colunas originais com pivô**, dimensão $r$. Equações homogéneas: parametrizar, dimensão $n-r$. Independência: $Ac=0$ só com $c=0$.

$$
\dim(U+V)=\dim U+\dim V-\dim(U\cap V),\qquad
U\oplus V\iff U\cap V=\{0\}.
$$

Para completar uma base, acrescenta vetores fora do espaço gerado. [Bases](/cadeiras/alga/espacos-vetoriais/).

## Produtos e ortogonalidade

$$
u\cdot v=\sum_i u_i v_i,\quad \|u\|=\sqrt{u\cdot u},\quad
\cos\theta=\frac{u\cdot v}{\|u\|\|v\|}\quad(u,v\ne0).
$$

$u\times v=(u_2v_3-u_3v_2,u_3v_1-u_1v_3,u_1v_2-u_2v_1)$ em $\mathbb R^3$. Área do paralelogramo: $\|u\times v\|$; triângulo: metade. Volume: $|(u\times v)\cdot w|$; tetraedro: um sexto. $u\times v=0$: dependência; misto zero: coplanaridade.

$$
\operatorname{proj}_u v=\frac{v\cdot u}{u\cdot u}u\quad(u\ne0),\qquad
u_j=v_j-\sum_{i<j}\frac{v_j\cdot u_i}{u_i\cdot u_i}u_i.
$$

Gram-Schmidt usa os $u_i$ anteriores; normaliza no fim; resultado zero retira-se. Base ortogonal de $W$: soma das projeções; erro em $W^\perp$. $\dim W+\dim W^\perp=n$. [Ortogonalidade](/cadeiras/alga/ortogonalidade/).

## Retas e planos

Reta: $P+td$, $d\ne0$; direção com zero: coordenada fixa, sem divisão. Plano: $n\cdot X=c$, $n\ne0$; por três pontos não alinhados: $n=(Q-P)\times(R-P)\ne0$.

$$
d(P,\text{plano})=\frac{|n\cdot P-c|}{\|n\|},\quad
H=P-\frac{n\cdot P-c}{n\cdot n}n,\quad P'=2H-P.
$$

O ponto médio de $P$ e $P'$ é $H$; o segmento $P-P'$ é perpendicular ao plano. Erro comum: aplicar a fórmula com a equação ainda fora da forma $n\cdot X=c$.

Pé na reta $Q+td$: $H=Q+((P-Q)\cdot d)/(d\cdot d)\,d$; distância $\|P-H\|$ (vale em $\mathbb R^2$ sem produto vetorial).

Duas retas com direções proporcionais: testa se um ponto de uma pertence à outra (coincidentes) ou não (paralelas distintas). Com direções independentes: $(Q-P)\cdot(d_1\times d_2)=0$ dá concorrentes, senão enviesadas. Distância nesse caso: módulo do misto sobre $\|d_1\times d_2\|$. Direções paralelas: usa ponto-reta.

Ângulo mínimo: entre retas ou planos (pelas normais), $|d_1\cdot d_2|/(\|d_1\|\|d_2\|)$ é o cosseno; reta-plano, $|d\cdot n|/(\|d\|\|n\|)$ é o **seno** (complementar do ângulo com a normal). [Geometria](/cadeiras/alga/retas-planos/).

## Aplicações, coordenadas e valores próprios

Linear: $T(au+bv)=aT(u)+bT(v)$ com $a,b\in\mathbb R$. $T(0)=0$ é necessário mas não suficiente (exemplo que falha: $(x^2,y)$). $\ker T$: resolver $Ax=0$; imagem: gerada pelas colunas, base nas **originais** com pivô.

Em $\mathbb R^n\to\mathbb R^m$: $n=\dim\ker T+\dim\operatorname{Im}T$. Injetiva quando o núcleo é $\{0\}$; sobrejetiva quando a característica é $m$. Composta $S\circ T$: matriz $BA$, com a base de saída de $T$ igual à de entrada de $S$.

$$
v=P_B[v]_B,\quad [v]_C=P_C^{-1}P_B[v]_B,\quad
[T]_{C\leftarrow B}=P_C^{-1}AP_B.
$$

Lê da direita para a esquerda: $P_B$ converte a entrada, $A$ aplica, $P_C^{-1}$ converte a saída. Erro comum: multiplicar $v_E$ por $M_{U\to E}$ quando se quer $v_U$; isso é a tradução ao contrário. Colunas de $P_B,P_C$ são bases, logo invertíveis. Mesma base nova nos dois lados de um endomorfismo: $A_{\mathrm{novo}}=P^{-1}AP$. [Mudanças de base](/cadeiras/alga/mudanca-de-base/).

$$
p_A(\lambda)=\det(A-\lambda I),\quad E_\lambda=\ker(A-\lambda I),\quad
AP=PD,\quad A^k=PD^kP^{-1}.
$$

Próprio **não nulo**; colunas de $P$ na ordem de $D$. Para expoentes negativos, todos os valores próprios têm de ser não nulos. Erro comum: manter $D$ antigo depois de trocar colunas de $P$; verifica sempre $AP=PD$. E $P^T\ne P^{-1}$ sem base ortonormada.

Constante de $p_A$: $\det A$; dominante: $(-1)^n$. Soma das raízes: $\operatorname{tr}A$; produto: $\det A$. São testes de sinal, não substituem os espaços próprios. Diagonaliza em $\mathbb R$ com $n$ próprios reais independentes; por raiz: $1\leq m_g\leq m_a$ e exige $m_g=m_a$. Distintos bastam, sem ser necessários. $J=\begin{bmatrix}2&1\\0&2\end{bmatrix}$ não diagonaliza ($m_a=2$, $m_g=1$); $2I$ sim. [Diagonalização](/cadeiras/alga/valores-proprios/).

Base própria determina a lei: decompõe e multiplica cada parcela. Se $A$ diagonaliza, $A^2$ diagonaliza na mesma base; o recíproco é falso.

Simétrica (opcional): $Q^TAQ=D$ com $Q$ ortogonal. Forma $X^TAX+\ell^TX+k=0$: metade do cruzado fora da diagonal; centro em $2Ah+\ell=0$; diagonaliza ortogonalmente e analisa lineares e constante. [Cónicas e quádricas](/cadeiras/alga/conicas-quadricas/).
