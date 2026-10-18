## Indução

Para $P(n)$ com $n\ge n_0$:

1. Prova a base $P(n_0)$.
2. Toma um $k\ge n_0$ arbitrário e assume $P(k)$.
3. Deduz $P(k+1)$ sem assumir essa conclusão.

A indução forte assume $P(n_0),\ldots,P(k)$ no passo; usa-a quando a decomposição pede um caso anterior a $k$.

- Exemplos isolados não provam a afirmação universal.
- Confere se o passo funciona logo depois das bases. Para cobrir todos os valores $n\ge8$ com moedas de 3 e 5 por acrescentar 3, precisas das bases 8, 9 e 10.
- Numa desigualdade, justifica a direção e o intervalo de cada comparação.

Para somas, separa o termo novo. Para $n\ge0$:

$$
\sum_{i=1}^{n}i^2=\frac{n(n+1)(2n+1)}6.
$$

A base usa a soma vazia igual a zero. No passo, substitui a soma até $k$ pela hipótese e acrescenta $(k+1)^2$.

Para a divisibilidade, explicita o múltiplo. Se $5^k-1=4q$, então $5^{k+1}-1=5(5^k-1)+4=4(5q+1)$.

Em $C_{2n}$ bipartido, com base $C_4$: num ciclo de $2n+2$ vértices troca $u-x-y-v$ por $uv$, aplica a hipótese ao ciclo menor e repõe $x,y$ alternados. Um só vértice daria um ciclo ímpar, fora da hipótese.

## Recorrências

Uma recorrência precisa das condições iniciais. Uma conjetura a partir dos primeiros termos verifica-se nas bases e na relação.

Nas Torres de Hanói, com $n$ discos e as regras habituais:

$$
H_0=0,\qquad H_n=2H_{n-1}+1,\qquad H_n=2^n-1.
$$

São os movimentos mínimos: as duas transferências dos $n-1$ discos menores e o disco maior impõem o mesmo limite que o algoritmo atinge.

## Primeira ordem

Para $a_n=ra_{n-1}+b$, $n\ge1$, com $a_0$ dado:

$$
a_n=\begin{cases}
r^na_0+b\dfrac{r^n-1}{r-1},&r\ne1,\\
a_0+nb,&r=1.
\end{cases}
$$

Por exemplo, $a_0=2$ e $a_n=3a_{n-1}+1$ dão $(5\cdot3^n-1)/2$. Confere o índice zero e a relação entre termos.

## Segunda ordem

Para coeficientes constantes e $n\ge2$:

$$
a_n=\alpha a_{n-1}+\beta a_{n-2},\qquad r^2-\alpha r-\beta=0.
$$

- As raízes distintas não nulas $r_1,r_2$ dão $a_n=Ar_1^n+Br_2^n$.
- A raiz dupla não nula $r$ dá $a_n=(A+Bn)r^n$.
- Determina $A$ e $B$ pelas duas condições iniciais. Trata à parte as raízes zero e os casos não homogéneos.

Para $a_0=2,a_1=5$ e $a_n=3a_{n-1}-2a_{n-2}$, as raízes são 1 e 2. $A+B=2,A+2B=5$ dão $a_n=3\cdot2^n-1$.

[Provas por indução e resolução de recorrências](/cadeiras/md/inducao-recorrencia/).
