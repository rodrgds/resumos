## Probabilidade, acumulada e densidade

Uma variável aleatória X associa um número a cada resultado do espaço amostral.

| Modelo                 | Probabilidades                                                                                                                    |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Discreto               | $f_X(x)=P(X=x)\ge0$, com $\sum_x f_X(x)=1$; soma os valores pretendidos.                                                          |
| Contínuo com densidade | $f_X\ge0$, com integral total 1; $P(a<X<b)=\int_a^b f_X(x)dx$. Cada ponto tem probabilidade zero, mas a densidade pode exceder 1. |

A acumulada $F_X(x)=P(X\le x)$ é não decrescente, contínua à direita e tem limites 0 e 1 nos extremos.

$$P(a<X\le b)=F_X(b)-F_X(a),\qquad P(a\le X\le b)=F_X(b)-F_X(a^-).$$

Um salto da acumulada em x vale $P(X=x)$. Num modelo discreto, incluir uma fronteira pode mudar a resposta; com densidade, pontos isolados não alteram a área.

Para $f_X(x)=cx$ em $0<x<2$ e zero fora, $\int_0^2cx\,dx=1$ dá $c=1/2$. No interior, $F_X(x)=x^2/4$ e a mediana é $\sqrt2$, não o ponto médio do suporte.

## Momentos e transformações

$$E(X)=\sum_x xf_X(x)\quad\text{ou}\quad\int_{-\infty}^{\infty}xf_X(x)dx.$$

Uma média finita requer $E(|X|)<\infty$. Para calcular $E(g(X))$, substitui x por $g(x)$ na soma ou integral; em geral, não obténs $g(E(X))$.

Com segundo momento finito:

$$\operatorname{Var}(X)=E(X^2)-[E(X)]^2,\qquad \sigma_X=\sqrt{\operatorname{Var}(X)}.$$

Para $Y=aX+b$:

$$E(Y)=aE(X)+b,\quad \operatorname{Var}(Y)=a^2\operatorname{Var}(X),\quad \sigma_Y=|a|\sigma_X.$$

Se X toma $-1,0,2$ com probabilidades $0,2;0,5;0,3$, então $E(X)=0,4$, $E(X^2)=1,4$ e $\operatorname{Var}(X)=1,24$. Para $Y=X^2$, a média é 1,4, não $0,4^2$.

[Construção da acumulada discreta](/cadeiras/me/variaveis-aleatorias/#distribuição-acumulada).
