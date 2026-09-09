---
title: Variáveis aleatórias
description: Função massa, densidade e distribuição, valor esperado, variância, covariância e transformações lineares.
section: conteudo
order: 3
---

Uma variável aleatória traduz resultados em números: em vez de "caras e coroas", trabalhas com $X = 0$ ou $X = 1$. A partir daqui, toda a incerteza vive em funções: uma que diz quanto vale cada resultado e outra que acumula essas probabilidades. Esta página define essas funções e os dois resumos numéricos que as acompanham sempre, o valor esperado e a variância.

## Discretas: função massa e distribuição

Uma variável **discreta** toma valores isolados $x_1, x_2, \dots$. Descreve-se pela **função massa de probabilidade** $p(x) = P(X = x)$, com $p(x) \ge 0$ e soma 1. A **função de distribuição** acumula: $F(x) = P(X \le x) = \sum_{t \le x} p(t)$.

Exemplo: dois lançamentos de moeda equilibrada, $X$ o número de caras. Então $p(0) = 1/4$, $p(1) = 1/2$, $p(2) = 1/4$, e $F(1) = P(X \le 1) = 3/4$. A massa responde "quanto vale exatamente aqui"; a distribuição responde "quanto acumula até aqui". Nos testes, metade dos erros nasce de confundir as duas perguntas.

## Contínuas: densidade e integrais

Uma variável **contínua** toma valores num intervalo, e a probabilidade de um valor exato é zero. Descreve-se pela **função densidade de probabilidade** $f$, com $f(x) \ge 0$ e área total 1. Probabilidades são áreas:

$$
P(a < X < b) = \int_a^b f(x)\,dx, \qquad F(x) = P(X \le x) = \int_{-\infty}^{x} f(t)\,dt.
$$

Repara que a densidade não é uma probabilidade: pode valer mais de 1, desde que a área total seja 1. O que tem de estar entre 0 e 1 é sempre a área, nunca a altura. Se precisares de rever integrais, volta ao [integral definido](/cadeiras/am1/integral-definido/).

Exemplo: o tempo de espera por um autocarro, em minutos, modelado como uniforme em $[2, 8]$, com densidade $f(x) = 1/6$ nesse intervalo e 0 fora. A probabilidade de esperar entre 3 e 5 minutos é a área do retângulo:

$$
P(3 < X < 5) = \int_3^5 \frac{1}{6}\,dx = \frac{5 - 3}{6} = \frac{1}{3} \approx 0{,}333.
$$

## Valor esperado e variância

O **valor esperado** é a média pesada pelas probabilidades: $E[X] = \sum x\,p(x)$ no caso discreto e $E[X] = \int x\,f(x)\,dx$ no contínuo. No exemplo uniforme, $E[X] = (2 + 8)/2 = 5$ minutos, o centro do intervalo. Interpreta como média de longo prazo: repetindo a experiência muitas vezes, a média das observações aproxima-se deste valor.

A **variância** mede o espalhamento em torno dessa média:

$$
Var(X) = E[(X - E[X])^2] = E[X^2] - E[X]^2.
$$

A segunda forma poupa contas. No exemplo, $Var(X) = (8 - 2)^2/12 = 36/12 = 3$, e o desvio padrão é $\sqrt{3} \approx 1{,}73$ minutos. Guarda o padrão: a variância está em unidades ao quadrado; quem se interpreta na unidade original é sempre o desvio padrão.

:::tip[Linearidade do valor esperado]
$E[aX + b] = a\,E[X] + b$ vale sempre, sem condições. No exemplo, passar de minutos para uma "pontuação" $Y = 2X + 3$ dá $E[Y] = 2 \times 5 + 3 = 13$. Para a variância, $Var(aX + b) = a^2\,Var(X)$: a translação $b$ não espalha nada e a escala sai ao quadrado. Aqui $Var(Y) = 4 \times 3 = 12$.
:::

## Duas variáveis: covariância e correlação

Com duas variáveis interessa saber se variam juntas. A **covariância** é $Cov(X, Y) = E[XY] - E[X]E[Y]$: positiva quando valores altos de uma acompanham valores altos da outra, negativa no caso contrário, zero quando não há relação linear.

Exemplo discreto: $X$ e $Y$ valem 0 ou 1, com $P(0,0) = 0{,}4$, $P(0,1) = 0{,}1$, $P(1,0) = 0{,}1$, $P(1,1) = 0{,}4$. Então $E[X] = E[Y] = 0{,}5$ e $E[XY] = 1 \times 1 \times 0{,}4 = 0{,}4$, logo $Cov(X, Y) = 0{,}4 - 0{,}25 = 0{,}15$.

A covariância depende das unidades, por isso normaliza-se pelo produto dos desvios: o **coeficiente de correlação** $\rho = Cov(X, Y)/(\sigma_X \sigma_Y)$ está sempre entre $-1$ e $1$. Aqui $\sigma_X = \sigma_Y = 0{,}5$, logo $\rho = 0{,}15/0{,}25 = 0{,}6$, uma associação positiva moderada. E o aviso que a cadeira repete: correlação zero não significa independência, apenas ausência de relação linear.
