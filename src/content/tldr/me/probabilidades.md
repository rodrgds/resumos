## Acontecimentos e contagem

O espaço amostral $\Omega$ contém os resultados; um acontecimento é um subconjunto. $A\cup B$ significa pelo menos um; $A\cap B$, ambos; $A^c$, nenhum A.

$$P(A^c)=1-P(A),\qquad P(A\cup B)=P(A)+P(B)-P(A\cap B).$$

Num espaço finito **equiprovável**, $P(A)=|A|/|\Omega|$. «Ao acaso» não basta para garantir equiprobabilidade.

| Escolher $k$ de $n$      | Número de resultados      |
| ------------------------ | ------------------------- |
| Sem ordem nem reposição  | $\binom nk=n!/[k!(n-k)!]$ |
| Com ordem, sem reposição | $n!/(n-k)!$               |
| Com ordem e reposição    | $n^k$                     |

De seis peças aprovadas e quatro rejeitadas, escolher três sem reposição dá probabilidade $\binom62\binom41/\binom{10}3=0,5$ de exatamente duas aprovadas. Com reposição independente, dá $3(0,6)^2(0,4)=0,432$.

## Condicionamento e independência

$$P(A\mid B)=\frac{P(A\cap B)}{P(B)},\quad P(B)>0;\qquad P(A\cap B)=P(B)P(A\mid B).$$

- A condicionada restringe o universo a B. Em geral, $P(A\mid B)\ne P(B\mid A)$.
- Independência significa $P(A\cap B)=P(A)P(B)$. Acontecimentos incompatíveis de probabilidades positivas não são independentes.
- Independência aos pares não garante independência conjunta de vários acontecimentos.

## Probabilidade total e Bayes

Para uma partição $B_i$ disjunta, exaustiva e com $P(B_i)>0$:

$$P(A)=\sum_iP(B_i)P(A\mid B_i),$$

$$P(B_j\mid A)=\frac{P(B_j)P(A\mid B_j)}{\sum_iP(B_i)P(A\mid B_i)},\quad P(A)>0.$$

Com 2% de defeitos, deteção de 95% entre defeituosas e falso alarme de 4% entre boas:

$$P(\text{defeito}\mid\text{alarme})=\frac{0,02(0,95)}{0,02(0,95)+0,98(0,04)}\approx0,3265.$$

Os 95% não são a probabilidade de defeito após alarme. [Tabela dos alarmes esperados](/cadeiras/me/probabilidades/#alarmes-e-probabilidade-de-defeito).
