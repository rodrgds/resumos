---
title: Oscilações
description: Movimento harmónico simples, equação e energia do oscilador, amortecimento, forçamento e ressonância.
section: conteudo
order: 6
---

Uma mola a vibrar, um pêndulo a balançar e uma corda de guitarra partilham a mesma matemática: uma força restauradora proporcional ao afastamento produz um movimento sinusoidal. Estas oscilações são a primeira aplicação séria das equações diferenciais de segunda ordem da [página de AM1](/cadeiras/am1/equacoes-diferenciais/), e preparam o terreno para as ondas.

## Movimento harmónico simples

Um bloco de massa $m$ ligado a uma mola de constante $k$, sem atrito, obedece a $m\,d^2x/dt^2 = -kx$. Dividindo por $m$ e definindo a **frequência angular** $\omega = \sqrt{k/m}$, em $\text{rad/s}$:

$$
\frac{d^2x}{dt^2} + \omega^2 x = 0.
$$

A solução é sinusoidal, $x(t) = A\cos(\omega t + \phi)$, onde a **amplitude** $A$ e a **fase** $\phi$ se fixam com as condições iniciais. O movimento repete-se com **período** $T = 2\pi/\omega$ e **frequência** $f = 1/T = \omega/(2\pi)$, em hertz.

A energia do oscilador alterna entre cinética e potencial elástica, mas a soma é constante:

$$
E = \frac{1}{2}mv^2 + \frac{1}{2}kx^2 = \frac{1}{2}kA^2.
$$

A velocidade é máxima ao passar pelo equilíbrio, $v_{\text{máx}} = A\omega$, e nula nos extremos, onde a energia é toda potencial.

Exemplo com números: $m = 0{,}25\ \text{kg}$ e $k = 100\ \text{N/m}$. Então $\omega = \sqrt{100/0{,}25} = \sqrt{400} = 20\ \text{rad/s}$ e $T = 2\pi/20 = \pi/10 \approx 0{,}31\ \text{s}$. Com amplitude $A = 0{,}050\ \text{m}$, a energia é $E = 100 \times 0{,}050^2/2 = 100 \times 0{,}0025/2 = 0{,}125\ \text{J}$, e a velocidade máxima é $v_{\text{máx}} = 0{,}050 \times 20 = 1{,}0\ \text{m/s}$. Confirmação: $mv_{\text{máx}}^2/2 = 0{,}25 \times 1{,}0/2 = 0{,}125\ \text{J}$, igual à energia total, como tem de ser.

O **pêndulo simples** de comprimento $L$ comporta-se como um oscilador apenas para ângulos pequenos, onde $\sin\theta \approx \theta$ e a equação fica $d^2\theta/dt^2 + (g/L)\theta = 0$. O período é então $T = 2\pi\sqrt{L/g}$. Para $L = 1{,}0\ \text{m}$, $T = 2\pi\sqrt{1{,}0/9{,}8} = 2\pi \times 0{,}3194 \approx 2{,}0\ \text{s}$, o conhecido pêndulo dos segundos.

:::warning[O pêndulo só é harmónico em pequenos ângulos]
A aproximação $\sin\theta \approx \theta$ falha para amplitudes grandes, e o período real cresce com a amplitude. Sempre que vires $T = 2\pi\sqrt{L/g}$ aplicada a um pêndulo a balançar muito, desconfia: a fórmula pressupõe oscilações pequenas.
:::

## Amortecimento

Com uma força de atrito viscoso $-bv$, proporcional à velocidade como no exemplo da [cinemática](/cadeiras/f1/cinematica/), a equação passa a

$$
m\frac{d^2x}{dt^2} + b\frac{dx}{dt} + kx = 0.
$$

Há três regimes, conforme o amortecimento comparado com o valor crítico $b_c = 2\sqrt{km}$: **subamortecido** (oscila com amplitude a decair), **criticamente amortecido** (regressa ao equilíbrio o mais depressa possível sem oscilar) e **sobreamortecido** (regressa lentamente sem oscilar). As portas com mola usam amortecimento próximo do crítico: fecham depressa sem bater.

## Forçamento e ressonância

Se uma força externa periódica $F_0\cos(\omega_f t)$ empurrar o oscilador, após o transitório ele oscila à frequência imposta $\omega_f$, não à sua frequência natural. A amplitude dessa resposta cresce muito quando $\omega_f$ se aproxima da frequência natural $\omega_0 = \sqrt{k/m}$: é a **ressonância**. É o princípio da sintonia de um rádio e também a razão por que tropas atravessam pontes sem marchar cadenciado: uma excitação periódica na frequência certa acumula energia ciclo após ciclo, e só o amortecimento limita a amplitude final.

## Para onde ir

Com as oscilações fecha-se o programa da cadeira. Volta à [apresentação](index/) para rever o mapa completo, e resolve cada exemplo com papel tapado antes de te dares por pronto.
