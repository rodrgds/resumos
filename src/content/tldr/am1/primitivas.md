## Primitivas imediatas

Uma primitiva $F$ de $f$ num intervalo satisfaz $F'=f$. Todas as primitivas nesse intervalo são $F+C$; componentes separadas do domínio podem ter constantes diferentes.

| Integrando         | Primitiva, além de $C$    | Condição                                |
| ------------------ | ------------------------- | --------------------------------------- |
| $x^\alpha$         | $x^{\alpha+1}/(\alpha+1)$ | $\alpha\ne-1$, num intervalo do domínio |
| $1/x$              | $\ln\vert x\vert $        | $x\ne0$                                 |
| $e^x$, $a^x$       | $e^x$, $a^x/\ln a$        | $a>0$, $a\ne1$                          |
| $\cos x$, $\sin x$ | $\sin x$, $-\cos x$       | Radianos                                |
| $\sec^2x$          | $\tan x$                  | Onde definida                           |
| $1/(1+x^2)$        | $\arctan x$               | $x\in\mathbb R$                         |
| $1/\sqrt{1-x^2}$   | $\arcsin x$               | $\vert x\vert <1$                       |

A integração é linear, mas não preserva produtos de funções.

## Substituição

Procura uma função interior e a sua derivada. Com $u=g(x)$ e $du=g'(x)dx$,

$$
\int f(g(x))g'(x)dx=F(g(x))+C,\qquad F'=f.
$$

- Reescreve todo o integrando e o diferencial na nova variável.
- Corrige constantes: $\int x/(1+x^2)dx=\frac12\ln(1+x^2)+C$.
- Em geral, $\int f'/f=\ln|f|+C$ onde $f\ne0$.
- Num integral definido, muda também os limites, ou volta a $x$ antes de aplicar os limites originais.

Por exemplo, $u=1+x^2$ dá $\int_0^1 2x/(1+x^2)dx=\int_1^2du/u=\ln2$.

## Partes

$$
\int u\,dv=uv-\int v\,du.
$$

Escolhe $u$ que simplifique ao derivar e $dv$ fácil de integrar. Para $\int xe^{2x}dx$, toma $u=x$ e $v=e^{2x}/2$:

$$
\int xe^{2x}dx=e^{2x}\left(\frac x2-\frac14\right)+C.
$$

- Para $\ln x$, podes usar $dv=dx$: a primitiva é $x\ln x-x+C$, com $x>0$.
- Se o integral inicial reaparece depois de partes, resolve a equação resultante.
- Na versão definida, $\int_a^buv'=[uv]_a^b-\int_a^bu'v$.

Em funções por ramos, ajusta constantes para continuidade da primitiva e verifica a derivada no ponto de união. No fim, derivar o resultado confirma a conta. Um integral definido é um número e não leva $+C$.

[Exemplo de união de ramos](/cadeiras/am1/primitivas/#primitivas-de-funções-contínuas-definidas-por-ramos).
