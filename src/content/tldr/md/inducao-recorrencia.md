## Indução simples e forte

Para provar $P(n)$ para todo inteiro $n\ge n_0$:

1. Prova a base $P(n_0)$.
2. Toma $k\ge n_0$ arbitrário e assume $P(k)$.
3. Deduz $P(k+1)$ sem assumir essa conclusão.

A indução forte permite assumir **todos** os casos $P(n_0),\ldots,P(k)$ no passo. Usa-a quando a decomposição pode pedir um caso anterior diferente de $k$, como os fatores de um número composto.

- Verificar exemplos não prova a afirmação universal.
- Confere se o passo funciona imediatamente depois das bases. Para moedas de 3 e 5, provar todos os valores $n\ge8$ por acrescentar 3 exige bases 8, 9 e 10.
- Numa desigualdade, justifica a direção e o intervalo em que cada comparação vale.

## Reutilizar a hipótese

Para somas, separa o termo novo. Para $n\ge0$:

$$
\sum_{i=1}^{n}i^2=\frac{n(n+1)(2n+1)}6.
$$

A base usa a soma vazia igual a zero. No passo, substitui a soma até $k$ pela hipótese e acrescenta $(k+1)^2$ para obter a fórmula de $k+1$.

Para divisibilidade, torna explícito o múltiplo. Se $5^k-1=4q$, então $5^{k+1}-1=5(5^k-1)+4=4(5q+1)$. A base $n=0$ prova $4\mid(5^n-1)$ para todos os naturais.

Uma definição recursiva precisa de bases e de argumentos que diminuam. Para provar propriedades, usa as mesmas divisões em casos e a hipótese nos argumentos menores. A indução forte permite usar $n/2$ ou $n-1$, quando a definição os pede.

## Recorrências

Uma recorrência precisa das condições iniciais. A conjetura obtida de primeiros termos deve ser verificada nas bases e substituída na recorrência.

Nas Torres de Hanói com três pinos, $n$ discos, um movimento por disco do topo e sem maior sobre menor:

$$
H_0=0,\qquad H_n=2H_{n-1}+1,\qquad H_n=2^n-1.
$$

São os movimentos mínimos: as duas transferências dos $n-1$ menores e o movimento do maior impõem o mesmo limite que o algoritmo atinge.

## Primeira ordem

Para $a_n=ra_{n-1}+b$, $n\ge1$, com $a_0$ dado:

$$
a_n=\begin{cases}
r^na_0+b\dfrac{r^n-1}{r-1},&r\ne1,\\
a_0+nb,&r=1.
\end{cases}
$$

Por exemplo, $a_0=2$ e $a_n=3a_{n-1}+1$ dão $(5\cdot3^n-1)/2$. Confere o índice zero e a relação entre termos.

## Segunda ordem homogénea

Para coeficientes constantes e $n\ge2$:

$$
a_n=\alpha a_{n-1}+\beta a_{n-2},\qquad
r^2-\alpha r-\beta=0.
$$

- Com raízes distintas **não nulas** $r_1,r_2$, usa $a_n=Ar_1^n+Br_2^n$.
- Com raiz dupla **não nula** $r$, usa $a_n=(A+Bn)r^n$.
- Determina $A,B$ pelas duas condições iniciais. Trata à parte raízes zero e recorrências não homogéneas.

Para $a_0=2,a_1=5$ e $a_n=3a_{n-1}-2a_{n-2}$, as raízes são 1 e 2. $A+B=2,A+2B=5$ dão $a_n=3\cdot2^n-1$.

[Provas por indução e resolução de recorrências](/cadeiras/md/inducao-recorrencia/).
