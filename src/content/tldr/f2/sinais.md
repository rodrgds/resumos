## Tempo, valores e transformações

- $x(t)$ existe em tempo contínuo, mas pode ter saltos. $x[n]$ usa índices inteiros; amostrar dá $x[n]=x(nT_s)$.
- Quantizar restringe valores. Para gama $[U_{\min},U_{\max})$ e $N$ bits, o passo uniforme típico é $\Delta=(U_{\max}-U_{\min})/2^N$; com arredondamento e sem saturação, o erro tem módulo até $\Delta/2$.
- $x(t-t_0)$ atrasa se $t_0>0$; $x(-t)$ reflete; $x(at)$ comprime por $|a|$ quando $|a|>1$ e também reflete quando $a<0$.

Localiza o suporte resolvendo desigualdades no argumento. Se $x$ ocupa $0\le t\le2$, $x(2t-2)$ ocupa $1\le t\le2$.

$$
x_p(t)=\frac{x(t)+x(-t)}2,\qquad x_i(t)=\frac{x(t)-x(-t)}2.
$$

A soma das componentes par e ímpar recupera $x$. Periodicidade exige $x(t+T_0)=x(t)$; em tempo discreto, o período é inteiro. $\cos(\Omega n)$ é periódica apenas se $\Omega/(2\pi)$ for racional.

## Escalão, impulso, energia e potência

O escalão $u(t)$ vale zero antes de zero e um depois. Dirac é uma distribuição de área unitária:

$$
\int f(t)\delta(t-t_0)dt=f(t_0).
$$

Em discreto, $\delta[n]$ vale um em zero e zero nos outros índices; $x[n]=\sum_kx[k]\delta[n-k]$.

$$
E_x=\int_{-\infty}^{\infty}|x(t)|^2dt,\qquad
P_x=\lim_{T\to\infty}\frac1{2T}\int_{-T}^{T}|x(t)|^2dt.
$$

Em discreto, usa somas e média sobre $2N+1$ índices. Para tensão, as unidades são $\mathrm{V^2\,s}$ e $\mathrm{V^2}$; energia e potência numa resistência exigem dividir por $R$.

- Sinal de energia: $0<E_x<\infty$, com $P_x=0$.
- Sinal de potência: $0<P_x<\infty$, com $E_x=\infty$.
- Para $Ae^{-at}u(t)$, $a>0$ e $A\ne0$, $E_x=A^2/(2a)$. Uma sinusoide não nula tem $P_x=A^2/2$.
- Nem todo o sinal pertence a uma destas classes. Não calcules $\delta^2$ como função ordinária.

## Propriedades dos sistemas

| Propriedade         | Teste                                                              |
| ------------------- | ------------------------------------------------------------------ |
| Sem memória         | Saída atual usa apenas entrada atual                               |
| Causal              | Não usa entrada futura                                             |
| BIBO estável        | Toda a entrada limitada dá saída limitada                          |
| Linear              | $S[ax_1+bx_2]=aS[x_1]+bS[x_2]$ para quaisquer entradas e escalares |
| Invariante no tempo | Atrasar entrada atrasa igualmente saída                            |

$y=tx(t)$ é linear e variante; $y=x^2$ é não linear e invariante. Em circuitos com armazenamento, usa estado inicial nulo ou separa a resposta inicial para definir a transformação linear. [Ver testes de propriedades](/cadeiras/f2/sinais/#linearidade-e-invariância-no-tempo).
