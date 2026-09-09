---
title: Equações diferenciais ordinárias
description: EDOs de primeira ordem separáveis, homogéneas, lineares e de Bernoulli, e lineares de segunda ordem com coeficientes constantes.
section: conteudo
order: 10
---

Uma **equação diferencial ordinária (EDO)** envolve uma função desconhecida $y(x)$ e as suas derivadas. A **ordem** é a da derivada mais alta. Resolver é encontrar as funções que satisfazem a equação, em geral uma família com constantes (**solução geral**); fixar as constantes com condições como $y(x_0) = y_0$ dá uma **solução particular**. A estratégia é classificar a equação e aplicar o método da família.

## Variáveis separáveis

Se a equação se escreve como $y' = f(x)g(y)$, separa-se $y$ de $x$:

$$
\frac{dy}{g(y)} = f(x)\,dx,
$$

e integra-se cada lado. Exemplo: $y' = 2xy$ com $y(0) = 3$. Separando (para $y \ne 0$):

$$
\frac{dy}{y} = 2x\,dx, \qquad \ln|y| = x^2 + C, \qquad y = Ke^{x^2}.
$$

A condição $y(0) = 3$ dá $K = 3$, logo $y = 3e^{x^2}$. Confirma: $y' = 6xe^{x^2} = 2x(3e^{x^2}) = 2xy$. Certo. Perder a solução $y = 0$ ao dividir por $g(y)$ é o erro clássico: verifica sempre se os zeros de $g$ são soluções.

## Equações homogéneas de primeira ordem

Uma EDO de primeira ordem é **homogénea** quando se escreve como $y' = F(y/x)$, isto é, depende apenas do quociente $y/x$. A substituição $v = y/x$ (logo $y = vx$ e $y' = v + xv'$) transforma-a numa equação separável em $v$ e $x$.

Exemplo: $y' = (x^2 + y^2)/(xy)$, que é $(x/y) + (y/x)$. Com $v = y/x$:

$$
v + x\frac{dv}{dx} = \frac{1}{v} + v, \qquad x\frac{dv}{dx} = \frac{1}{v}, \qquad v\,dv = \frac{dx}{x}.
$$

Integrando: $v^2/2 = \ln|x| + C$, e voltando a $v = y/x$:

$$
y^2 = 2x^2(\ln|x| + C).
$$

Derivar para confirmar é trabalhoso, mas a estrutura garante: cada passo foi equivalência para $x \ne 0$ e $y \ne 0$.

## Lineares de primeira ordem e Bernoulli

A EDO **linear** de primeira ordem $y' + P(x)y = Q(x)$ resolve-se com o **fator integrante** $\mu(x) = e^{\int P(x)\,dx}$, que condensa o lado esquerdo numa derivada de produto:

$$
\frac{d}{dx}\big(\mu y\big) = \mu Q, \qquad y = \frac{1}{\mu}\int \mu Q\,dx.
$$

Exemplo: $y' + 2y = e^x$. O fator é $\mu = e^{2x}$, logo $(e^{2x}y)' = e^{3x}$, donde $e^{2x}y = e^{3x}/3 + C$ e $y = e^x/3 + Ce^{-2x}$. Confirma: $y' + 2y = e^x/3 - 2Ce^{-2x} + 2e^x/3 + 2Ce^{-2x} = e^x$. Certo.

A equação de **Bernoulli**, $y' + P(x)y = Q(x)y^n$ com $n \ne 0, 1$, reduz-se a linear com $v = y^{1-n}$. Exemplo completo: $y' + \frac{1}{x}y = xy^2$. Aqui $n = 2$, logo $v = y^{-1}$ e $v' = -y'/y^2$. Dividindo a equação por $y^2$:

$$
-v' + \frac{1}{x}v = x, \qquad v' - \frac{1}{x}v = -x.
$$

É linear em $v$ com fator $\mu = e^{\int -1/x\,dx} = 1/x$. Então $(v/x)' = -1$, logo $v/x = -x + C$ e $v = Cx - x^2$. Voltando a $y$:

$$
y = \frac{1}{Cx - x^2}.
$$

Confirmação: com $D = Cx - x^2$, $y' = -(C-2x)/D^2$ e $y'/y^2$... mais diretamente, $y' + y/x = [-(C-2x) + D/x]/D^2 = [-(C-2x) + C - x]/D^2 = x/D^2 = xy^2$. Certo.

## Segunda ordem linear com coeficientes constantes

A equação homogénea $ay'' + by' + cy = 0$ resolve-se pela **equação característica** $ar^2 + br + c = 0$:

- raízes reais distintas $r_1, r_2$: $y = C_1 e^{r_1 x} + C_2 e^{r_2 x}$;
- raiz dupla $r$: $y = (C_1 + C_2 x)e^{rx}$;
- raízes complexas $\alpha \pm i\beta$: $y = e^{\alpha x}(C_1\cos\beta x + C_2\sin\beta x)$.

Exemplo: $y'' + 7y' + 10y = 0$. A característica $r^2 + 7r + 10 = 0$ tem raízes $r = -2$ e $r = -5$, logo $y = C_1 e^{-2x} + C_2 e^{-5x}$. Verifica um termo: $(4 - 14 + 10)e^{-2x} = 0$. Certo.

Para a não homogénea $ay'' + by' + cy = f(x)$, a solução geral é $y = y_h + y_p$: a solução da homogénea mais uma solução particular. O **método dos coeficientes indeterminados** propõe $y_p$ com a forma de $f$ (polinómio, exponencial, seno ou cosseno) quando os coeficientes são constantes. Exemplo: $y'' - 3y' + 2y = e^{3x}$. Propõe $y_p = Ae^{3x}$: substituindo, $9A - 9A + 2A = 1$, logo $A = 1/2$ e $y_p = e^{3x}/2$. Se $f$ fosse solução da homogénea (ressonância), multiplicar-se-ia a proposta por $x$.

Quando só se conhece uma solução da homogénea com coeficientes não constantes, a **redução de ordem** procura a segunda na forma $y_2 = v(x)y_1(x)$.

## Para onde ir

As EDOs lineares com coeficientes constantes têm um método alternativo de resolução, por vezes mais rápido, baseado numa transformação integral: a [transformada de Laplace](laplace/).
