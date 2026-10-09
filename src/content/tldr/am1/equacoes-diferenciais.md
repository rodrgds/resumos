## Ordem e soluções

Uma EDO relaciona $y(x)$ com as suas derivadas. A ordem é a da derivada mais alta. É linear se $y$ e as derivadas aparecem à primeira potência, sem produtos entre si, com coeficientes dependentes apenas de $x$.

Uma solução satisfaz a equação num intervalo. As condições iniciais fixam constantes; indica sempre onde a expressão e a equação estão definidas.

## Separáveis e homogéneas

- Em $y'=f(x)g(y)$, integra $dy/g(y)=f(x)dx$ onde $g(y)\ne0$. Antes de dividir, verifica os zeros de $g$, que podem dar soluções constantes.
- Para $y'=F(y/x)$, $x\ne0$, toma $v=y/x$. Como $y'=v+xv'$, fica $xv'=F(v)-v$, separável. Verifica os zeros de $F(v)-v$ antes de dividir.

Por exemplo, $y'=xy$ dá $y=Ke^{x^2/2}$, incluindo $y=0$ com $K=0$. Já $y'=y^2$, $y(0)=1$, dá $y=1/(1-x)$ no intervalo $]-\infty,1[$. Não atravesses a singularidade.

A noção de homogénea $y'=F(y/x)$ é diferente de uma linear com termo independente zero.

## Linear de primeira ordem

Para $y'+Py=Q$, com $P,Q$ contínuas no intervalo, usa

$$
\mu=e^{\int Pdx},\qquad
(\mu y)'=\mu Q,\qquad
y=\frac{\int\mu Qdx+C}{\mu}.
$$

Um dado $y(x_0)=y_0$ determina uma única solução nesse intervalo. Para $y'+2y=e^{-x}$, $\mu=e^{2x}$ e $y=e^{-x}+Ce^{-2x}$. Com $y(0)=2$, $C=1$.

## Bernoulli

Para $y'+Py=Qy^n$, $n\ne0,1$, em soluções não nulas toma $v=y^{1-n}$:

$$
v'+(1-n)Pv=(1-n)Q.
$$

Resolve esta linear, regressa a $y$ e verifica as soluções excluídas pela divisão, bem como o domínio real da potência.

Em $y'+y=y^2$, a substituição $v=1/y$ dá $v'-v=-1$. Assim,

$$
y=\frac1{1+Ce^x},
$$

em intervalos sem zeros do denominador. Acrescenta $y=0$; $y=1$ já aparece com $C=0$.

[Segunda ordem e escolha de particulares](/cadeiras/am1/equacoes-segunda-ordem/#característica-e-problemas-de-valor-inicial).
