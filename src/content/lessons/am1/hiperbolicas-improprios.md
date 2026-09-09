---
title: Funções hiperbólicas e integrais impróprios
description: Seno e cosseno hiperbólicos, as suas derivadas e primitivas, e integrais em intervalos ilimitados ou com singularidades.
section: conteudo
order: 9
---

As funções hiperbólicas são combinações da exponencial que aparecem em cabos suspensos, vibrações e, nesta cadeira, como treino de derivação e primitivação. Os integrais impróprios estendem depois o integral de Riemann a intervalos infinitos ou a funções com singularidades, usando limites.

## Funções hiperbólicas

O **seno hiperbólico** e o **cosseno hiperbólico** definem-se por

$$
\sinh x = \frac{e^x - e^{-x}}{2}, \qquad \cosh x = \frac{e^x + e^{-x}}{2}.
$$

As restantes seguem por quociente: $\tanh x = \sinh x/\cosh x$, $\coth x = \cosh x/\sinh x$, $\operatorname{sech} x = 1/\cosh x$ e $\operatorname{csch} x = 1/\sinh x$. O domínio do $\sinh$, $\cosh$ e $\operatorname{sech}$ é todo o $\mathbb{R}$; $\tanh$ exclui os zeros do $\cosh$ (nenhum real, mas atenção ao contradomínio $]-1, 1[$).

A identidade central é o análogo hiperbólico do teorema de Pitágoras trigonométrico:

$$
\cosh^2 x - \sinh^2 x = 1.
$$

Confirma-se expandindo: $\frac{1}{4}\big((e^x+e^{-x})^2 - (e^x-e^{-x})^2\big) = \frac{1}{4}(4e^x e^{-x}) = 1$. Repara no sinal menos, a diferença que distingue o mundo hiperbólico do trigonométrico.

As derivadas trocam $\sinh$ e $\cosh$ entre si:

$$
\frac{d}{dx}\sinh x = \cosh x, \qquad \frac{d}{dx}\cosh x = \sinh x, \qquad \frac{d}{dx}\tanh x = \operatorname{sech}^2 x.
$$

A primeira confirma-se derivando a definição: $(e^x + e^{-x})/2 = \cosh x$. Daqui saem primitivas úteis: $\int \sinh x\,dx = \cosh x + C$ e $\int \cosh x\,dx = \sinh x + C$. Para quocientes, a substituição resolve: com $u = \cosh x$,

$$
\int \tanh x\,dx = \int \frac{\sinh x}{\cosh x}\,dx = \ln(\cosh x) + C,
$$

sem módulo, porque $\cosh x > 0$ sempre.

## Integrais impróprios

Um **integral impróprio** envolve um limite infinito ou uma singularidade, e define-se por passagem ao limite. Para intervalo ilimitado:

$$
\int_a^{\infty} f(x)\,dx = \lim_{b \to \infty} \int_a^b f(x)\,dx,
$$

e diz-se **convergente** se o limite existe finito, **divergente** caso contrário. Para singularidade em $c$ interior, parte-se o integral em $[a, c[$ e $]c, b]$ e exige-se convergência dos dois lados.

Exemplo convergente: $\int_1^{\infty} \frac{dx}{x^2}$. Calcula até $b$ e passa ao limite:

$$
\int_1^b x^{-2}\,dx = 1 - \frac{1}{b} \xrightarrow[b \to \infty]{} 1.
$$

O integral converge com valor $1$. Contrasta com $\int_1^{\infty} \frac{dx}{x} = \lim_{b\to\infty} \ln b = \infty$, que diverge: o expoente $1$ é a fronteira, tal como nas séries-$p$.

Com singularidade na origem: $\int_0^1 \frac{dx}{\sqrt{x}}$. Para $a > 0$:

$$
\int_a^1 x^{-1/2}\,dx = 2 - 2\sqrt{a} \xrightarrow[a \to 0^+]{} 2.
$$

Converge com valor $2$, apesar de a função explodir em $0$: a área acumula devagar o suficiente.

Os **critérios de comparação** evitam calcular primitivas quando só a natureza interessa: se $0 \le f \le g$ e $\int g$ converge, então $\int f$ converge; se $\int f$ diverge, $\int g$ diverge. Compara com as bitolas $1/x^p$ no infinito ($p > 1$ converge) e $(x-c)^{-p}$ na singularidade ($p < 1$ converge).

:::warning[Não substituas cegamente]
Aplicar Barrow diretamente a um integral impróprio sem limites esconde singularidades e dá valores absurdos (por exemplo, $\int_{-1}^{1} dx/x^2$ não é $-2$). Identifica primeiro os pontos problemáticos e escreve os limites laterais.
:::

## Para onde ir

Com o cálculo integral fechado, a cadeira usa-o para resolver equações onde a incógnita é uma função: as [equações diferenciais ordinárias](equacoes-diferenciais/).
