---
title: Trabalho e energia
description: Trabalho de forças constantes e variáveis, teorema da energia cinética, conservação da energia mecânica e potência.
section: conteudo
order: 3
---

Resolver tudo com $\sum \vec{F} = m\vec{a}$ funciona, mas obriga a acompanhar cada instante. O trabalho e a energia oferecem um atalho: relacionam diretamente velocidades em dois pontos, sem passar pelos detalhes do percurso. É a mesma física das [leis de Newton](/cadeiras/f1/leis-newton/), vista de outro ângulo.

## Trabalho de uma força

O **trabalho** de uma força constante $\vec{F}$ num deslocamento retilíneo $\vec{d}$ é o produto escalar

$$
W = \vec{F} \cdot \vec{d} = Fd\cos\phi,
$$

em joules ($\text{J}$), onde $\phi$ é o ângulo entre a força e o deslocamento. Só a componente ao longo do deslocamento trabalha: uma força perpendicular, como a normal num plano horizontal ou a tensão no movimento circular uniforme, realiza trabalho nulo.

Quando a força varia ao longo do trajeto, somam-se as contribuições infinitesimais com um integral, do tipo estudado no [integral definido](/cadeiras/am1/integral-definido/):

$$
W = \int_{x_1}^{x_2} F(x)\,dx.
$$

O exemplo clássico é a mola: $F = -kx$ dá $W = -k(x_2^2 - x_1^2)/2$ ao passar de $x_1$ a $x_2$. O sinal negativo indica que a mola resiste ao alongamento.

## Teorema da energia cinética

A **energia cinética** de um ponto material é $K = mv^2/2$. O **teorema da energia cinética** afirma que o trabalho total feito sobre o corpo é exatamente o que a sua energia cinética ganha:

$$
W_{\text{total}} = \Delta K = \frac{1}{2}mv_2^2 - \frac{1}{2}mv_1^2.
$$

Isto vale sempre, para qualquer força. Um exemplo rápido: um carro de $m = 1000\ \text{kg}$ que trava dos $20\ \text{m/s}$ até parar perde $K = 1000 \times 400/2 = 200\,000\ \text{J}$. Esse é o trabalho que os travões têm de dissipar, e explica porque dobrar a velocidade quadruplica a distância de travagem.

## Energia potencial e conservação

Algumas forças permitem definir uma **energia potencial** $U$: o trabalho delas entre dois pontos depende só dos pontos, não do caminho. São as **forças conservativas**. As duas que interessam aqui:

- peso (perto da superfície): $U_g = mgh$, com $h$ medido desde uma referência à escolha;
- mola ideal: $U_e = kx^2/2$, com $x$ medido desde o comprimento natural.

Quando só atuam forças conservativas, a **energia mecânica** $E = K + U$ conserva-se: $E_1 = E_2$. O atrito é o contraexemplo padrão, porque o seu trabalho depende do caminho percorrido e dissipa energia mecânica em calor.

## Exemplo completo: bloco lançado por uma mola

Um bloco de $m = 0{,}50\ \text{kg}$ está encostado a uma mola de $k = 200\ \text{N/m}$ comprimida de $x = 0{,}10\ \text{m}$, sobre uma superfície horizontal sem atrito. Ao largar a mola, com que velocidade sai o bloco, e até que altura $h$ sobe se a seguir entrar numa rampa sem atrito?

Os dados são $m$, $k$ e $x$; as incógnitas são a velocidade $v$ à saída e a altura $h$. Como não há atrito, a energia mecânica conserva-se e basta comparar três instantes: mola comprimida com bloco parado, bloco livre na horizontal e bloco parado no topo da rampa.

Na largada, a energia é toda potencial elástica: $E = kx^2/2 = 200 \times 0{,}10^2/2 = 200 \times 0{,}010/2 = 1{,}0\ \text{J}$. À saída da mola, é toda cinética: $mv^2/2 = 1{,}0$, logo $v^2 = 2 \times 1{,}0/0{,}50 = 4{,}0$ e $v = 2{,}0\ \text{m/s}$. No topo da rampa, é potencial gravítica: $mgh = 1{,}0$, logo $h = 1{,}0/(0{,}50 \times 9{,}8) = 1{,}0/4{,}9 \approx 0{,}20\ \text{m}$.

Repara que a massa aparece nos dois lados e, neste caso sem atrito, a altura final nem depende dela: $h = v^2/(2g) = 4{,}0/19{,}6 \approx 0{,}20\ \text{m}$, o mesmo valor. Se houvesse atrito no plano, teríamos de subtrair o trabalho dissipado, e a conservação simples deixaria de valer. É por isso que o enunciado sublinhar "sem atrito" é uma pista, não um detalhe.

:::details[De onde vem a conservação]
Parte do teorema da energia cinética, $W_{\text{total}} = \Delta K$, e separa o trabalho em conservativo e não conservativo. Por definição de potencial, $W_{\text{cons}} = -\Delta U$. Então $-\Delta U + W_{\text{não cons}} = \Delta K$, ou seja, $\Delta(K + U) = W_{\text{não cons}}$. Sem trabalho não conservativo, $K + U$ é constante. Experimenta refazer esta dedução com papel tapado: é o argumento que liga esta página à anterior.
:::

## Potência

A **potência** mede a rapidez com que o trabalho é feito, em watts ($\text{W}$): $P = dW/dt$. Para uma força constante com o ponto de aplicação a mover-se a velocidade $\vec{v}$,

$$
P = \vec{F} \cdot \vec{v}.
$$

Exemplo: um motor que eleva uma carga de $m = 1000\ \text{kg}$ à velocidade constante de $2{,}0\ \text{m/s}$ exerce $F = mg = 9800\ \text{N}$ e debita $P = 9800 \times 2{,}0 = 19\,600\ \text{W}$, ou seja, $19{,}6\ \text{kW}$. A velocidade ser constante diz que a resultante é nula (primeira lei), mas o motor continua a realizar trabalho contra o peso.

## Para onde ir

Até aqui tratámos corpos isolados. O passo seguinte junta vários corpos: o [centro de massa e o momento linear](/cadeiras/f1/centro-massa-momento/).
