---
title: Cinemática do ponto material
description: Vetores posição, velocidade e aceleração, separação de variáveis e movimento curvilíneo com aceleração centrípeta.
section: conteudo
order: 1
---

A cinemática descreve o movimento sem perguntar que forças o causam. Essa pergunta fica para as [leis de Newton](/cadeiras/f1/leis-newton/). Aqui a tarefa é mais simples: dada a posição em função do tempo, extrair velocidade e aceleração, e dado um modelo de aceleração, reconstruir o movimento.

## Posição, velocidade e aceleração

A **posição** de um ponto material no instante $t$ é o vetor $\vec{r}(t)$, medido desde uma origem fixa, em metros. A **velocidade** é a taxa de variação da posição e a **aceleração** é a taxa de variação da velocidade:

$$
\vec{v}(t) = \frac{d\vec{r}}{dt}, \qquad \vec{a}(t) = \frac{d\vec{v}}{dt} = \frac{d^2\vec{r}}{dt^2}.
$$

Derivar cada componente dá as componentes da velocidade, e derivar outra vez dá as da aceleração. Se precisares de treinar a técnica, revê as [regras de derivação](/cadeiras/am1/derivadas/). O caminho inverso, de $\vec{a}(t)$ até $\vec{v}(t)$ e $\vec{r}(t)$, é integrar e fixar as constantes com as condições iniciais, como nas [primitivas](/cadeiras/am1/primitivas/).

Exemplo direto: $\vec{r}(t) = (3t,\ 2t^2)$ em metros, com $t$ em segundos. Então $\vec{v}(t) = (3,\ 4t)\ \text{m/s}$ e $\vec{a}(t) = (0,\ 4)\ \text{m/s}^2$. No instante $t = 2\ \text{s}$, a velocidade é $(3,\ 8)\ \text{m/s}$, com módulo $\sqrt{9 + 64} = \sqrt{73} \approx 8{,}5\ \text{m/s}$.

## Separação de variáveis num caso com atrito

Muitas vezes a aceleração depende da própria velocidade, e a equação passa a ser uma equação diferencial. Se ela for separável, resolve-se como nas [equações diferenciais de primeira ordem](/cadeiras/am1/equacoes-diferenciais/).

Considera um bloco de massa $m = 2{,}0\ \text{kg}$ lançado com velocidade inicial $v_0 = 10\ \text{m/s}$ sobre uma superfície onde a força de atrito é proporcional à velocidade, $F = -bv$ com $b = 0{,}50\ \text{N·s/m}$. Pela segunda lei de Newton, $m\,dv/dt = -bv$. Os dados são $m$, $b$ e $v_0$, e queremos $v(t)$ e a distância percorrida.

Separando as variáveis:

$$
\frac{dv}{v} = -\frac{b}{m}\,dt, \qquad \ln v = -\frac{b}{m}t + C.
$$

Com $v(0) = v_0$, obtemos $C = \ln v_0$ e portanto

$$
v(t) = v_0 e^{-(b/m)t}.
$$

O quociente $b/m$ vale $0{,}50/2{,}0 = 0{,}25\ \text{s}^{-1}$, por isso $v(t) = 10\,e^{-0{,}25t}\ \text{m/s}$. No instante $t = 4{,}0\ \text{s}$, o expoente é $-1{,}0$ e $v = 10\,e^{-1} \approx 10 \times 0{,}3679 \approx 3{,}7\ \text{m/s}$.

A posição obtém-se integrando a velocidade desde $t = 0$:

$$
x(t) = \int_0^t v_0 e^{-(b/m)s}\,ds = \frac{mv_0}{b}\left(1 - e^{-(b/m)t}\right).
$$

Aqui $mv_0/b = 2{,}0 \times 10 / 0{,}50 = 40\ \text{m}$. Em $t = 4{,}0\ \text{s}$, $x = 40 \times (1 - e^{-1}) \approx 40 \times 0{,}6321 \approx 25{,}3\ \text{m}$. Repara que, mesmo com tempo infinito, o bloco percorre apenas $40\ \text{m}$: a exponencial nunca chega a zero, mas a distância total converge. É o comportamento típico do atrito viscoso, e vale a pena comparar com o atrito seco da página das [leis de Newton](/cadeiras/f1/leis-newton/), onde a paragem acontece em tempo finito.

:::tip[Verifica sempre a solução na equação]
Deriva $v(t) = 10\,e^{-0{,}25t}$: $dv/dt = -2{,}5\,e^{-0{,}25t}$. Multiplica por $m = 2{,}0$: $-5{,}0\,e^{-0{,}25t}$. E $-bv = -0{,}50 \times 10\,e^{-0{,}25t} = -5{,}0\,e^{-0{,}25t}$. Os dois lados coincidem, por isso a solução está certa.
:::

## Movimento curvilíneo e aceleração centrípeta

Quando a trajetória é curva, convém decompor a aceleração em duas direções: a **tangencial**, ao longo da velocidade, que muda o módulo da velocidade, e a **normal** (ou centrípeta), perpendicular à velocidade e apontada para o interior da curva, que muda a direção da velocidade. Os vetores tangente e normal são os mesmos da geometria das [curvas paramétricas](/cadeiras/am2/curvas-parametricas/).

O módulo da componente normal é

$$
a_n = \frac{v^2}{\rho},
$$

onde $\rho$ é o **raio de curvatura** da trajetória no ponto, em metros. Curvas mais apertadas têm $\rho$ pequeno e exigem maior aceleração centrípeta para a mesma velocidade. O inverso, $\kappa = 1/\rho$, chama-se **curvatura** e mede quão depressa a trajetória dobra. No caso particular do movimento circular uniforme de raio $R$, o raio de curvatura é o próprio $R$ e $a_n = v^2/R = \omega^2 R$, dirigida para o centro.

Exemplo: um carro faz uma curva de raio $R = 50\ \text{m}$ a velocidade constante $v = 20\ \text{m/s}$ (cerca de $72\ \text{km/h}$). A aceleração é puramente centrípeta, com módulo $a_n = 20^2/50 = 400/50 = 8{,}0\ \text{m/s}^2$, apontada para o centro da curva. São quase $0{,}8g$, o que explica porque a curva aperta a essa velocidade exige pneus e piso em boas condições.

:::warning[Velocidade constante não significa aceleração nula]
No movimento circular uniforme o módulo da velocidade não muda, por isso a componente tangencial é zero. Mas a direção muda continuamente, logo existe aceleração centrípeta. "Aceleração" mede qualquer mudança do vetor velocidade, não só mudanças de rapidez.
:::

## Para onde ir

Com o movimento descrito, o passo seguinte é explicar as suas causas: as [leis de Newton](/cadeiras/f1/leis-newton/).
