## Convergência e somas

A série $\sum a_n$ converge se as somas parciais $S_N=\sum_{n=1}^Na_n$ tendem para um número finito. É necessário $a_n\to0$, mas não suficiente: $\sum1/n$ diverge.

- **Geométrica:** para $|r|<1$, $\sum_{n=m}^{\infty}cr^n=cr^m/(1-r)$. Por exemplo, $\sum_{n=3}^{\infty}2(1/4)^n=1/24$.
- **Telescópica:** cancela numa soma finita e só depois toma o limite. $\sum_{n=1}^N[1/n-1/(n+1)]=1-1/(N+1)\to1$.
- Alterar um número finito de termos preserva a convergência, mas pode alterar a soma.

## Escolha de critérios

| Critério              | Hipóteses e conclusão                                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Série $p$             | $\sum1/n^p$ converge exatamente para $p>1$                                                                                           |
| Comparação            | $0\le a_n\le b_n$ eventualmente e $\sum b_n$ convergente implicam $\sum a_n$ convergente. Uma minorante divergente força divergência |
| Comparação por limite | $a_n,b_n>0$ e $a_n/b_n\to L\in]0,+\infty[$ implicam a mesma natureza                                                                 |
| Razão                 | $a_n\ne0$ eventualmente; calcula $L=\lim\vert a_{n+1}/a_n\vert $                                                                     |
| Raiz                  | Calcula $L=\lim\sqrt[n]{\vert a_n\vert }$                                                                                            |

Na razão e na raiz, $L<1$ dá convergência absoluta; $L>1$ dá divergência; $L=1$ não decide. Fatoriais sugerem razão; potências de expoente $n$ sugerem raiz. Estes critérios não calculam geralmente a soma.

Para $a_n=3^n/n!$, $|a_{n+1}/a_n|=3/(n+1)\to0$, logo há convergência absoluta. A harmónica e $\sum1/n^2$ dão ambas razão com limite um, apesar de terem naturezas diferentes.

## Sinais alternados e erro

- **Leibniz:** se $b_n\ge0$, eventualmente decrescente e $b_n\to0$, então $\sum(-1)^{n-1}b_n$ converge.
- **Absoluta:** $\sum|a_n|$ converge, o que garante convergência de $\sum a_n$.
- **Condicional:** a série converge, mas a dos módulos diverge. A harmónica alternada é um exemplo.
- Se o decréscimo de Leibniz vale desde o início, o erro depois de $N$ termos satisfaz $|S-S_N|\le b_{N+1}$.

Para $\sum(-1)^{n-1}/n^2$, dez termos garantem erro no máximo $1/121<0{,}01$.

Começa pelo termo geral, procura uma estrutura reconhecível e testa convergência absoluta antes de usar alternância. O [critério do integral](/cadeiras/am1/hiperbolicas-improprios/#critério-do-integral-e-séries) exige uma função positiva, contínua e eventualmente decrescente.
