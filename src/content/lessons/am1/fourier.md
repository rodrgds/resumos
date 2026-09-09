---
title: Séries de Fourier
description: Funções periódicas, coeficientes de Fourier pelas fórmulas de Euler e convergência da série, com um exemplo completo.
section: conteudo
order: 12
---

Enquanto a série de Taylor aproxima uma função perto de um ponto com polinómios, a **série de Fourier** representa uma função periódica em todo o seu domínio como soma de senos e cossenos. Para engenharia, é a linguagem natural de sinais e vibrações: cada termo é uma harmónica com frequência múltipla da fundamental.

## Funções periódicas e a forma da série

Uma função $f$ é **periódica** de período $T > 0$ se $f(x+T) = f(x)$ para todo o $x$. A cadeira trabalha com período $2\pi$: se a série converge, a sua soma herda esse período, porque cada termo $\cos(nx)$ e $\sin(nx)$ tem período $2\pi$.

A série de Fourier de $f$ escreve-se

$$
f(x) \sim \frac{a_0}{2} + \sum_{n=1}^{\infty} \big(a_n \cos(nx) + b_n \sin(nx)\big),
$$

onde $a_0, a_n, b_n$ são os **coeficientes de Fourier**. Escreve-se $a_0/2$ em vez de $a_0$ por conveniência: assim a fórmula de $a_n$ abaixo também produz $a_0$ para $n = 0$. O til indica que a igualdade depende da convergência, tratada no fim.

## Coeficientes: as fórmulas de Euler

A chave é a **ortogonalidade** de senos e cossenos em $[-\pi, \pi]$: integrais de produtos de harmónicas distintas anulam-se, e só sobrevivem os quadrados. Multiplicando a série por $\cos(mx)$ ou $\sin(mx)$ e integrando termo a termo, isolamos cada coeficiente. As **fórmulas de Euler** resultantes são:

$$
a_n = \frac{1}{\pi}\int_{-\pi}^{\pi} f(x)\cos(nx)\,dx, \qquad b_n = \frac{1}{\pi}\int_{-\pi}^{\pi} f(x)\sin(nx)\,dx,
$$

para $n \ge 0$ (com $a_0/2$ a usar $a_0$). Há dois atalhos de simetria que deves verificar primeiro: se $f$ é **par**, todos os $b_n$ são zero; se $f$ é **ímpar**, todos os $a_n$ são zero. Metade das contas desaparece.

## Exemplo completo: $f(x) = x$ em $]-\pi, \pi[$

Considera a função periódica de período $2\pi$ que vale $x$ em $]-\pi, \pi[$ (onda em dente de serra). Como $f$ é ímpar, $a_n = 0$ para todo o $n$. Para $b_n$:

$$
b_n = \frac{1}{\pi}\int_{-\pi}^{\pi} x\sin(nx)\,dx = \frac{2}{\pi}\int_0^{\pi} x\sin(nx)\,dx,
$$

porque o integrando $x\sin(nx)$ é par. Primitivando por partes ($u = x$, $dv = \sin(nx)\,dx$):

$$
\int x\sin(nx)\,dx = -\frac{x\cos(nx)}{n} + \frac{\sin(nx)}{n^2}.
$$

Avaliando de $0$ a $\pi$: em $\pi$ dá $-\pi\cos(n\pi)/n + 0 = -\pi(-1)^n/n$; em $0$ dá $0$. Logo

$$
b_n = \frac{2}{\pi}\left(-\frac{\pi(-1)^n}{n}\right) = \frac{2(-1)^{n+1}}{n},
$$

e a série é

$$
x \sim \sum_{n=1}^{\infty} \frac{2(-1)^{n+1}}{n}\sin(nx) = 2\left(\sin x - \frac{\sin 2x}{2} + \frac{\sin 3x}{3} - \dots\right).
$$

Os primeiros termos já desenham a reta: com $n = 1$, $2\sin x$ acompanha $x$ perto da origem; somar $- \sin 2x$ corrige a curvatura. Quanto mais harmónicas, melhor o ajuste dentro de $]-\pi, \pi[$.

## Convergência e o teorema da representação

Nem sempre a série iguala a função ponto a ponto. O **teorema da representação** dá condições suficientes: se $f$ é periódica de período $2\pi$, contínua por partes e com derivadas laterais em cada ponto de $[-\pi, \pi]$, então a série de Fourier converge, e a sua soma vale $f(x)$ onde $f$ é contínua.

Nos pontos de salto, a série converge para a **média dos limites laterais**, $(f(x^-) + f(x^+))/2$. No exemplo do dente de serra, em $x = \pi$ a função salta de $\pi$ para $-\pi$, e a série soma $0$, a média. Este comportamento nos saltos (com o fenómeno de Gibbs nas somas parciais) é normal e esperado, não um erro de cálculo.

:::tip[Plano de ataque num exercício]
Primeiro, identifica período e paridade para anular metade dos coeficientes. Depois calcula os restantes com as fórmulas de Euler, usando partes quando aparece $x$ vezes seno ou cosseno. Por fim, escreve a série e discute a convergência: igualdade onde a função é contínua, média dos limites laterais nos saltos.
:::
