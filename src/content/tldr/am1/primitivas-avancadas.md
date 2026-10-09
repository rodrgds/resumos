## Frações racionais

1. Divide polinómios se $\deg P\ge\deg Q$.
2. Fatora o denominador em lineares e quadráticos irredutíveis reais.
3. Inclui todas as potências dos fatores repetidos e compara coeficientes.

| Fator no denominador                   | Termos da decomposição                |
| -------------------------------------- | ------------------------------------- |
| $(x-a)^m$                              | $\sum_{j=1}^m A_j/(x-a)^j$            |
| $(x^2+bx+c)^m$, discriminante negativo | $\sum_{j=1}^m(B_jx+C_j)/(x^2+bx+c)^j$ |

Para $(3x+1)/(x^2-1)$, a decomposição é $2/(x-1)+1/(x+1)$. A primitiva é $2\ln|x-1|+\ln|x+1|+C$, em intervalos que evitam $\pm1$.

Num quadrático, separa a derivada do denominador e completa o quadrado. A primeira parte costuma dar logaritmo; a restante, arco-tangente. Para potências repetidas, é útil

$$
\int\frac{dx}{(1+x^2)^2}
=\frac12\left(\arctan x+\frac{x}{1+x^2}\right)+C.
$$

[Quadrático repetido desenvolvido](/cadeiras/am1/primitivas-avancadas/#quadrático-irredutível-repetido).

## Potências trigonométricas

Em $\sin^m x\cos^n x$, com $m,n$ inteiros não negativos:

- $m$ ímpar: guarda $\sin x\,dx$, usa $u=\cos x$ e $\sin^2x=1-\cos^2x$.
- $n$ ímpar: guarda $\cos x\,dx$ e usa $u=\sin x$.
- Ambos pares: usa $\sin^2x=(1-\cos2x)/2$ e $\cos^2x=(1+\cos2x)/2$.

Assim, $\sin^2x\cos^2x=(1-\cos4x)/8$ e a primitiva é $x/8-\sin4x/32+C$.

Para tangente e secante, procura $\sec^2x\,dx=d(\tan x)$ ou $\sec x\tan x\,dx=d(\sec x)$. Nas funções cotangente e cossecante surgem sinais negativos.

$$
\int\sec x\,dx=\ln|\sec x+\tan x|+C.
$$

## Substituições

A substituição universal $t=\tan(x/2)$ transforma expressões racionais em seno e cosseno:

$$
\sin x=\frac{2t}{1+t^2},\quad
\cos x=\frac{1-t^2}{1+t^2},\quad
dx=\frac{2dt}{1+t^2}.
$$

Vale em intervalos que evitam os pontos onde $\tan(x/2)$ não existe. Para atravessá-los, ajusta ramos e constantes sem criar saltos.

Para $a>0$, escolhe:

| Raiz             | Substituição habitual |
| ---------------- | --------------------- |
| $\sqrt{a^2-x^2}$ | $x=a\sin t$           |
| $\sqrt{a^2+x^2}$ | $x=a\tan t$           |
| $\sqrt{x^2-a^2}$ | $x=a\sec t$           |

Escolhe o intervalo de $t$ para controlar sinais: $\sqrt{u^2}=|u|$. Com $|x|<a$ e $t\in]-\pi/2,\pi/2[$, $\int dx/\sqrt{a^2-x^2}=\arcsin(x/a)+C$.
