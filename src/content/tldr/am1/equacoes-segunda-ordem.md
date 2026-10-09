## Equação característica

Para $ay''+by'+cy=0$, com coeficientes constantes e $a\ne0$, resolve $ar^2+br+c=0$.

| Raízes                        | Solução homogénea                             |
| ----------------------------- | --------------------------------------------- |
| Reais distintas $r_1,r_2$     | $C_1e^{r_1x}+C_2e^{r_2x}$                     |
| Real dupla $r$                | $(C_1+C_2x)e^{rx}$                            |
| $\alpha\pm i\beta$, $\beta>0$ | $e^{\alpha x}(C_1\cos\beta x+C_2\sin\beta x)$ |

As duas condições iniciais determinam $C_1,C_2$. Em $y''-4y'+4y=0$, $y(0)=0$, $y'(0)=1$, a raiz dupla é $2$, logo $y=xe^{2x}$.

## Redução de ordem

Conhecendo uma solução homogénea $y_1$ que não se anula no intervalo, escreve $y=y_1u$. Substitui e toma $v=u'$ para reduzir a uma primeira ordem.

Para $x^2y''+2xy'-2y=0$, $y_1=x$ dá $xv'+4v=0$ e depois

$$
y=C_1x+C_2/x^2,
$$

num intervalo que não atravessa zero.

## Particular e ressonância

Numa não homogénea, $y=y_h+y_p$.

- Com coeficientes constantes e termo polinomial, exponencial ou trigonométrico, tenta uma particular da família completa e determina coeficientes por substituição.
- Se o candidato coincide com soluções homogéneas, multiplica-o por uma potência de $x$ suficiente para remover essa coincidência.

Em $y''+y=\sin x$, seno e cosseno já pertencem à homogénea. Usa $y_p=x(A\cos x+B\sin x)$. Substituir dá $A=-1/2$, $B=0$, logo $y_p=-x\cos x/2$.

## Variação dos parâmetros

Normaliza primeiro: $ay''+by'+cy=f$ passa a $y''+py'+qy=g$, com $g=f/a$.

Para uma base homogénea $y_1,y_2$ com Wronskiano $W=y_1y_2'-y_1'y_2\ne0$,

$$
y_p=u_1y_1+u_2y_2,\qquad
u_1'=-\frac{y_2g}{W},\qquad
u_2'=\frac{y_1g}{W}.
$$

Integra e soma $y_h$; as constantes dessas integrações podem ser absorvidas em $y_h$.

Para $y''+y=\sec x$ em $]-\pi/2,\pi/2[$, usa $y_1=\cos x$, $y_2=\sin x$, $W=1$. Resulta

$$
y_p=\cos x\ln(\cos x)+x\sin x.
$$

O intervalo garante $\cos x>0$. [Dedução e verificação](/cadeiras/am1/equacoes-segunda-ordem/#variação-dos-parâmetros).
